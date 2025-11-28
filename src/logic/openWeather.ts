import { fetch } from "@tauri-apps/plugin-http";
import {
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";
import { readData as readLocations } from "./GeoLocations.js";

export async function getWeather(cityName: string) {
  const locations = await readLocations();
  let location = undefined;

  if (locations && cityName) {
    location = cityName in locations ? locations[cityName] : false;
  }
  if (location) {
    const apiKey = await getApiKey();
    const dt = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location["lat"]}&lon=${location["lon"]}&appid=${apiKey}&units=metric`,
      { method: "GET" }
    );
    const data = await dt.json();
    saveData(cityName, data);
    return data;
  } else {
    console.log("there was not any location with that name in datas");
  }
}

async function getApiKey() {
  const apiKey = await readTextFile("SkyGrid/apiKey/openweatherKey.json", {
    baseDir: BaseDirectory.Document,
  });
  return JSON.parse(apiKey)["key"];
}

export async function saveData(
  cityName: string | null,
  data: Record<string, any>,
  target = "weather"
) {
  if (cityName) {
    const lastFile = await readData(target);
    if (lastFile === false) {
      const container = { cityName: data };
      await writeTextFile(
        `SkyGrid/Data/openWeather/${target}.json`,
        JSON.stringify(container),
        {
          baseDir: BaseDirectory.Document,
        }
      );
    } else {
      lastFile[cityName] = data;
      await writeTextFile(
        `SkyGrid/Data/openWeather/${target}.json`,
        JSON.stringify(lastFile),
        {
          baseDir: BaseDirectory.Document,
        }
      );
    }
  }
}

export async function readData(target = "weather") {
  const file = await readTextFile(`SkyGrid/Data/openWeather/${target}.json`, {
    baseDir: BaseDirectory.Document,
  });
  if (file) {
    const data = JSON.parse(file);
    return data;
  } else {
    return null;
  }
}
