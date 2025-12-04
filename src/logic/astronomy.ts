import { fetch } from "@tauri-apps/plugin-http";
import {
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";

import { readData as readLocations } from "./GeoLocations.js";
import { build } from "vite";

export async function getAstro(cityName: string) {
  const locations = await readLocations();
  let location = undefined;

  if (locations && cityName) {
    location = cityName in locations ? locations[cityName] : false;
  }
  if (location) {
    const dt = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${location["lat"]}&lng=${location["lon"]}`,
      { method: "GET" }
    );
    const data = await dt.json();
    saveData(cityName, data);
    // console.log(data);
    return data;
  } else {
    console.log(`there is no location with name of ${cityName} in datas`);
  }
}

export async function saveData(
  cityName: string | null,
  data: Record<string, any>,
  target = "astronomyData"
) {
  if (cityName) {
    const lastFile = await readData();
    if (!lastFile) {
      const container = { [cityName]: data };
      await writeTextFile(
        `SkyGrid/astroData/${target}.json`,
        JSON.stringify(container),
        {
          baseDir: BaseDirectory.Document,
        }
      );
    } else {
      lastFile[cityName] = data;
      await writeTextFile(
        `SkyGrid/astroData/${target}.json`,
        JSON.stringify(lastFile),
        {
          baseDir: BaseDirectory.Document,
        }
      );
    }
  }
}

export async function readData(target = "astronomyData") {
  const file = await readTextFile(`SkyGrid/Data/astroData/${target}.json`, {
    baseDir: BaseDirectory.Document,
  });
  if (file) {
    const data = JSON.parse(file);
    return data;
  } else {
    return null;
  }
}
