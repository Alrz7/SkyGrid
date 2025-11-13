import { fetch } from "@tauri-apps/plugin-http";
import {
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";

export function toNameCase(str: string) {
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function getLocation(cityname: string, prtcl = "opn") {
  let dt;
  if (prtcl == "met") {
    dt = await fetch(
      // << IMP >>  to filter Countrys in this search we can build a static country code search like  Iran => "IR" and filter use it as ...&countryCode=${countryCode}
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityname}&count=1&language=en`,
      { method: "GET" }
    );
  } else {
    const apiKey = await getApiKey();
    dt = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityname}&limit=1&appid=${apiKey}&lang=en`,
      { method: "GET" }
    );
  }
  //   console.log(dt);
  if (dt.ok) {
    const data = await dt.json();
    // return data;
    if ("results" in data) {
      return data;
    } else {
      console.log(`no results found: ${JSON.stringify(data)}`);
      return null;
    }
  } else {
    console.log(`there was an error in request ${dt.status}`);
    return null;
  }
}

export async function addLocation(cityName: string) {
  const lastFile = await readData();
  const capname = toNameCase(cityName);

  if (capname&& lastFile && capname in lastFile) {
    console.log("city already exists in file");
  } else {
    const geoByMeteo = await getLocation(cityName, "met");
    //   const geoByOpenweather = getLocation(cityName, "opn");
    if (geoByMeteo) {
      console.log(geoByMeteo);
      console.log("got the location!!! going for save!");
      saveData(capname, geoByMeteo["results"][0]);
      return [capname, geoByMeteo["results"][0]]; //   <<IMP>>  the ["results"][0] represents the first result of the respond and this means the respond can have more than 1 item due to Api , open meteo's location coding Api supports up to 100 results in free licence...
    } else {
      return null;
      // nothing yet
    }
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
  target = "locations"
) {
  if (cityName) {
    const lastFile = await readData(target);
    if (lastFile === false) {
      const container = { cityName: data };
      await writeTextFile(
        `SkyGrid/Data/GeoLocations/${target}.json`,
        JSON.stringify(container),
        {
          baseDir: BaseDirectory.Document,
        }
      );
    } else {
      lastFile[cityName] = data;
      await writeTextFile(
        `SkyGrid/Data/GeoLocations/${target}.json`,
        JSON.stringify(lastFile),
        {
          baseDir: BaseDirectory.Document,
        }
      );
    }
  }
}

export async function readData(target = "locations") {
  const file = await readTextFile(`SkyGrid/Data/GeoLocations/${target}.json`, {
    baseDir: BaseDirectory.Document,
  });
  if (file) {
    const data = JSON.parse(file);
    return data;
  } else {
    return null;
  }
}
