import { fetch } from "@tauri-apps/plugin-http";
import {
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";

import { readData as readLocations } from "./GeoLocations";

async function getApiKey() {
  const apiKey = await readTextFile("SkyGrid/apiKey/ipGeoLocationKey.json", {
    baseDir: BaseDirectory.Document,
  });
  return JSON.parse(apiKey)["key"];
}

export function toNameCase(str) {
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
    const apiKey = await getApiKey();
    // console.log(apiKey)
    // console.log(location)
    const dt = await fetch(
      `https://api.ipgeolocation.io/v2/astronomy?apiKey=${apiKey}&location=${capname}&elevation=10`,
      { method: "GET" }
    );
    // console.log(dt)
    const data = await dt.json();
    saveData(capname, data);
    console.log(data)
    return data;
  } else {
    console.log("there was not any location with that name in datas");
  }
}


export async function saveData(cityName, data, target = "locationData") {
  const lastFile = await readData();
  if (lastFile === false) {
    const container = {};
    container[cityName] = data;
    await writeTextFile(
      `SkyGrid/Data/ipGeo/${target}.json`,
      JSON.stringify(container),
      {
        baseDir: BaseDirectory.Document,
      }
    );
  } else {
    lastFile[cityName] = data;
    await writeTextFile(
      `SkyGrid/Data/ipGeo/${target}.json`,
      JSON.stringify(lastFile),
      {
        baseDir: BaseDirectory.Document,
      }
    );
  }
}

export async function readData(target = "locationData") {
  const file = await readTextFile(`SkyGrid/Data/ipGeo/${target}.json`, {
    baseDir: BaseDirectory.Document,
  });
  if (file) {
    const data = JSON.parse(file);
    return data;
  } else {
    return false;
  }
}