import { fetch } from "@tauri-apps/plugin-http";
import {
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";

import { readData as readLocations } from "./GeoLocations";

function toNameCase(str) {
  if (!str) return "";
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getAstro(cityname) {
  const locations = await readLocations();
  let location = undefined;

  const capname = toNameCase(cityname);
  if (locations) {
    location = capname in locations ? locations[capname] : false;
  }
  if (location) {
    const dt = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${location["lat"]}&lng=${location["lon"]}`,
      { method: "GET" }
    );
    const data = await dt.json();
    saveData(capname, data);
    // console.log(data);
    return data;
  } else {
    console.log("there was not any location with that name in datas");
  }
}

export async function saveData(cityName, data, target = "astronomyData") {
  const lastFile = await readData();
  if (lastFile === false) {
    const container = {};
    container[cityName] = data;
    await writeTextFile(
      `SkyGrid/Data/sunrise&set/${target}.json`,
      JSON.stringify(container),
      {
        baseDir: BaseDirectory.Document,
      }
    );
  } else {
    lastFile[cityName] = data;
    await writeTextFile(
      `SkyGrid/Data/sunrise&set/${target}.json`,
      JSON.stringify(lastFile),
      {
        baseDir: BaseDirectory.Document,
      }
    );
  }
}

export async function readData(target = "astronomyData") {
  const file = await readTextFile(`SkyGrid/Data/sunrise&set/${target}.json`, {
    baseDir: BaseDirectory.Document,
  });
  if (file) {
    const data = JSON.parse(file);
    return data;
  } else {
    return false;
  }
}
