import { fetch } from "@tauri-apps/plugin-http";
import {
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";
import { readData as readLocations } from "./GeoLocations.js";

function difrentHour(timeString1: string, timeString2: string) {
  const date1 = new Date(timeString1 + "Z");
  const date2 = new Date(timeString2 + "Z");
  const differenceInMilliseconds = date1.getTime() - date2.getTime();
  return differenceInMilliseconds / (1000 * 3600);
}

async function getApiKey() {
  const apiKey = await readTextFile("SkyGrid/apiKey/ipGeoLocationKey.json", {
    baseDir: BaseDirectory.Document,
  });
  return JSON.parse(apiKey)["key"];
}

export function toNameCase(str: string) {
  // console.log(str)
  if (!str) return "";
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function getAstro(cityname: string) {
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
    console.log(data);
    return data;
  } else {
    console.log("there was not any location with that name in datas");
  }
}

export async function saveData(
  cityName: string,
  data: Record<string, any>,
  target = "locationData"
) {
  const lastFile = await readData();
  if (lastFile === false) {
    const container = { cityName: data };
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
    return null;
  }
}

export async function updateData(
  cityName: string,
  findlocalTime: any,
  engage: boolean
) {
  const DataList = await readData();
  if (cityName in DataList) {
    const lastData = DataList[cityName];
    const lastUpdateTime = `${lastData.astronomy.date}T${lastData.astronomy.current_time}`;
    const timeDiff = difrentHour(
      findlocalTime(cityName).fullStr,
      lastUpdateTime
    );
    if (engage) {
      // console.log("engaging in astro update")
      if (timeDiff >= 24) {
        const newData = await getAstro(cityName);
        return { ok: true, val: newData };
      } else {
        // console.log("no update in astro data is needed: IPGEO");
        return { ok: true, val: lastData };
      }
    } else {
      // console.log("no engage in astro update")
      return { ok: true, val: timeDiff >= 24 };
    }
  } else {
    if (engage) {
      console.log("city didn't exist in astronomic files")
      const newData = await getAstro(cityName);
      return { ok: true, val: newData };
    } else {
      console.log("city didn't exist in astData files, geting data... : IPGEO");
      return { ok: false, val: null };
    }
  }
}
