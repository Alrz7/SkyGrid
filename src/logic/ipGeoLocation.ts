import { fetch } from "@tauri-apps/plugin-http";
import {
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";
import { readData as readLocations } from "./GeoLocations.js";
import { dateDiferenceToHour as difrentHour } from "../logic/sources/dry.js";
import { readKey, doesExist, checkDir } from "./DataManagement.js";

export async function getAstro(cityName: string) {
  if (cityName) {
    const locations = await readLocations();
    let location = undefined;

    if (locations && cityName) {
      location = cityName in locations ? locations[cityName] : null;
    }
    const apiKey = await readKey("ipGeoKey");
    console.log(apiKey);
    if (location && apiKey && apiKey.key) {
      // console.log(apiKey)
      // console.log(location)
      const dt = await fetch(
        `https://api.ipgeolocation.io/v2/astronomy?apiKey=${apiKey.key}&location=${cityName}&elevation=10`,
        { method: "GET" }
      );
      // console.log(dt)
      const data = await dt.json();
      saveData(cityName, data);
      console.log(data);
      return data;
    } else {
      // addNotif
      console.log("there was not any location with that name in datas");
    }
  }
}

export async function saveData(
  cityName: string | null,
  data: Record<string, any>,
  target = "locationData"
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

export async function readData(target = "locationData") {
  const adrs = `SkyGrid/astroData/${target}.json`;
  const ext = await doesExist(adrs);
  if (ext) {
    const file = await readTextFile(adrs, {
      baseDir: BaseDirectory.Document,
    });
    if (file) {
      const data = JSON.parse(file);
      return data;
    } else {
      return null;
    }
  } else {
    checkDir()
    return null;
  }
}

export async function updateData(
  cityName: string,
  findlocalTime: any,
  engage: boolean
) {
  const DataList = await readData();
  if (DataList && DataList && cityName in DataList) {
    const lastData = DataList[cityName];
    console.log(lastData)
    const lastUpdateTime = `${lastData.astronomy.date}T${lastData.astronomy.current_time}`;
    console.log(cityName)
    const localTime = await findlocalTime(cityName);
    console.log(localTime?.time.fullStr);
    const timeDiff = difrentHour(localTime?.time.fullStr, lastUpdateTime);
    console.log(cityName, engage);
    if (engage) {
      // console.log("engaging in astro update")
      if (timeDiff >= 24) {
        const newData = await getAstro(cityName);
        return { ok: true, isUpdate: false, val: newData };
      } else {
        console.log("no update in astro data is needed: IPGEO");
        return { ok: true, isUpdate: true, val: lastData };
      }
    } else {
      // console.log("no engage in astro update")
      return { ok: true, val: timeDiff >= 24 };
    }
  } else {
    if (engage) {
      console.log("city didn't exist in astronomic files");
      const newData = await getAstro(cityName);
      return { ok: true, isUpdate: false, val: newData };
    } else {
      console.log("city didn't exist in astData files, geting data... : IPGEO");
      return { ok: false, isUpdate: false, val: null };
    }
  }
}
