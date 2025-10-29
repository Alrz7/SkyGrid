import { fetch } from "@tauri-apps/plugin-http";
import {
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";
import { readData as readLocations } from "./GeoLocations";
import { clearMocks } from "@tauri-apps/api/mocks";

function getLocalTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  return {
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    date: `${year}-${month}-${day}`,
    fullStr: `${year}-${month}-${day}T${hour}:${minute}`,
  };
}

function difrentHour(timeString1, timeString2) {
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

export function toNameCase(str) {
  // console.log(str)
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
    console.log(data);
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

export async function updateData(cityName, intlTimeFormat) {
  const DataList = await readData();
  if (cityName in DataList) {
    const lastData = DataList[cityName];
    const lastUpdateTime = `${lastData.astronomy.date}T${lastData.astronomy.current_time}`;
    if (lastUpdateTime) {
      const timeDiff = difrentHour(intlTimeFormat().fullStr, lastUpdateTime);
      // console.log(intlTimeFormat().fullStr, lastUpdateTime);
      // console.log(timeDiff);
      if (timeDiff >= 24) {
        console.log("updating astronomic data : IPGEO");
        const newData = await getAstro(cityName);
        return newData;
      } else {
        console.log("no update in astro data is needed");
        return lastData;
      }
    } else {
      console.log("updating astronomic data : IPGEO");

      const newData = await getAstro(cityName);
      return newData;
    }
  } else {
    console.log("city didn't exist in astData files, geting data... : IPGEO");
    const newData = await getAstro(cityName);
    return newData;
  }
}
