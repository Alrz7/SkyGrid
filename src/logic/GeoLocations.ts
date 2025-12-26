import { fetch } from "@tauri-apps/plugin-http";
import {
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";
import { readKey, doesExist, checkDir } from "./DataManagement.js";
import { CitrusIcon } from "lucide-react";

async function getLocation(
  addNotif: any,
  cityName: string,
  searchCount: number,
  prtcl = "opn"
) {
  let dt;
  if (prtcl == "met") {
    dt = await fetch(
      // << IMP >>  to filter Countrys in this search we can build a static country code search like  Iran => "IR" and filter use it as ...&countryCode=${countryCode}
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=${searchCount}&language=en`,
      { method: "GET" }
    );
  } else {
    const apiKey = await readKey("openwKey");
    if (apiKey && apiKey.key) {
      dt = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey.key}&lang=en`,
        { method: "GET" }
      );
    } else {
      addNotif("error", "Apikey is Not set or Invalid");
      return null;
    }
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

export async function apiSearch(
  addNotif: any,
  cityName: string,
  searchCount: number
) {
  console.log("api-req1");
  const lastFile = await readData();

  if (lastFile && cityName in lastFile) {
    return { ok: true, avalable: true, list: [] };
  } else {
    const geoByMeteo = await getLocation(
      addNotif,
      cityName,
      searchCount,
      "met"
    );
    //   const geoByOpenweather = getLocation(cityName, "opn");
    if (geoByMeteo) {
      console.log(geoByMeteo);
      console.log(geoByMeteo["results"]);
      // saveData(cityName, geoByMeteo["results"][0]);
      return { ok: true, avalable: false, list: geoByMeteo["results"] }; //   <<IMP>>  the ["results"][0] represents the first result of the respond and this means the respond can have more than 1 item due to Api , open meteo's location coding Api supports up to 100 results in free licence...
    } else {
      return { ok: false, avalable: false, list: [] };
      // nothing yet
    }
  }
}

export async function saveData(
  cityName: string | null,
  data: Record<string, any>,
  target = "locations"
) {
  if (cityName) {
    const lastFile = await readData(target);
    if (!lastFile) {
      const container = { [cityName]: data };
      await writeTextFile(
        `SkyGrid/locationData/${target}.json`,
        JSON.stringify(container),
        {
          baseDir: BaseDirectory.Document,
        }
      );
    } else {
      lastFile[cityName] = data;
      await writeTextFile(
        `SkyGrid/locationData/${target}.json`,
        JSON.stringify(lastFile),
        {
          baseDir: BaseDirectory.Document,
        }
      );
    }
  }
}

export async function readData(target = "locations") {
  const adrs = `SkyGrid/locationData/${target}.json`;
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
    checkDir();
    return null;
  }
}

export async function deleteLocation(cityName:string, target = "locations") {
  const locations = await readData()
  if(locations && cityName in locations){
    delete locations[cityName]
    await writeTextFile(
        `SkyGrid/locationData/${target}.json`,
        JSON.stringify(locations),
        {
          baseDir: BaseDirectory.Document,
        }
      );
      return Object.keys(locations)
  }
  
}