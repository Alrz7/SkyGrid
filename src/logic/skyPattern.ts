import { dataDir, tempDir, templateDir } from "@tauri-apps/api/path";
import {
  updateData as updateAstro,
  readData as readAstro,
  toNameCase,
} from "./ipGeoLocation.js";
import { skyCycle } from "./sources/skyCycle.js";
import { readData as readLocations } from "./GeoLocations.js";
import { readConfig } from "./gridconfig.js";

export async function findlocalTime(cityName: string, timeFormat: string = "reg"): Promise<string | Record<string, any> > {
  console.log(cityName)
  const locations = await readLocations();
  if (cityName in locations) {
    const location = locations[cityName];
    const timeZone = location["timezone"];
    console.log(timeZone);
    if (timeZone) {
      const time = timeFormat == "reg" ? intlTimeFormat(timeZone).time : intlTimeFormat(timeZone).fullTime;
      console.log(`time of ${timeZone} is : ${time} right now`);
      if (timeFormat == "reg"){
        return time;
      }else{
        return {time: time, zone: timeZone}
      }
      
    } else {
      console.log("no timezone has been found for this city1111");
      return '';
    }
  }
  console.log(`city ${cityName} doesn't exist in location list`);
  return '';
}

export function intlTimeFormat(ianaTimezoneName: string) {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: ianaTimezoneName,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(now);

  const year = parts.find((p) => p.type === "year")?.value;
  const month = parts.find((p) => p.type === "month")?.value;
  const day = parts.find((p) => p.type === "day")?.value;
  const hour = parts.find((p) => p.type === "hour")?.value;
  const minute = parts.find((p) => p.type === "minute")?.value;
  const second = parts.find((p) => p.type === "second")?.value;

  return {
    date: `${year}-${month}-${day}`,
    time: `${hour}:${minute}`,
    fullTime: `${hour}:${minute}:${second}`,
    fullStr: `${year}-${month}-${day}T${hour}:${minute}:${second}`,
  };
}
function sortHours(lst: Array<any>): any {
  const pivot = lst[0];
  const beef = [];
  const aft = [];
  for (let i = 1; i < lst.length; i++) {
    if (difrentHour(lst[i].time, pivot.time) > 0) {
      aft.push(lst[i]);
    } else {
      beef.push(lst[i]);
    }
  }
  return [
    ...(beef.length >= 2 ? sortHours(beef) : beef),
    pivot,
    ...(aft.length >= 2 ? sortHours(aft) : aft),
  ];
}

function difrentHour(t1: string, t2: string) {
  const [h1= 0, m1 = 0] = t1.split(":").map(Number);
  const [h2=0, m2=0] = t2.split(":").map(Number);
  let diff = h1 * 60 + m1 - (h2 * 60 + m2);
  // if (diff < -720) diff += 1440;
  return diff * 60;
}

function selectTitle(item: any , time: string) {
  // const time = timeNow().fullhr; for local time test
  // const time = '17:55';
  const titlelist = [
    "mid_night",
    "night_end",
    "astronomical_twilight_begin",
    "astronomical_twilight_end",
    "nautical_twilight_begin",
    "nautical_twilight_end",
    "civil_twilight_begin",
    "civil_twilight_end",
    "blue_hour_begin",
    "blue_hour_end",
    "golden_hour_begin",
    "golden_hour_end",
    "sunrise",
    "sunset",
    "golden_hour_begin",
    "golden_hour_end",
    "blue_hour_begin",
    "blue_hour_end",
    "civil_twilight_begin",
    "civil_twilight_end",
    "nautical_twilight_begin",
    "nautical_twilight_end",
    "astronomical_twilight_begin",
    "astronomical_twilight_end",
    "night_begin",
    "solar_noon",
    // "moonrise",
    // "moonset",
  ];
  const timelist = [
    item.astronomy.mid_night,
    item.astronomy.night_end,
    ...Object.values(item.astronomy.morning),
    item.astronomy.sunrise,
    item.astronomy.sunset,
    ...Object.values(item.astronomy.evening),
    item.astronomy.night_begin,
    item.astronomy.solar_noon,
    // item.astronomy.moonrise,
    // item.astronomy.moonset,
  ];
  const mergedList = timelist.map((val, indx) => ({
    time: val,
    title: titlelist[indx],
  }));
  const sorted = sortHours(mergedList);
  for (let [indx, val] of sorted.entries()) {
    // console.log(indx, sorted.length)
    if (
      difrentHour(time, val.time) > 0 &&
      (indx < sorted.length - 1
        ? difrentHour(time, sorted[indx + 1].time) < 0
        : true)
    ) {
      console.log(val.time, " < found > ", val["title"]);
      return val;
    }
  }
  console.log(sorted.at(-1)["time"], " <not found> ", sorted.at(-1)["title"]);
  return sorted.at(-1);
}

function SolarCondition(time: string, data: Record<string, any>) {
  const rs = {
    isMoonTime:
      difrentHour(time, data.moonrise) >= 0 &&
      difrentHour(time, data.moonset) < 0,
    isSunTime:
      difrentHour(time, data.sunrise) >= 0 &&
      difrentHour(time, data.sunset) < 0,
  };
  return rs;
}

export async function selectPattern(setPattern: any, cityName: any) {
  // console.log(cityName)
  if (cityName) {
    cityName = toNameCase(cityName);
    const astData = await updateAstro(cityName, findlocalTime);
    if (astData) {
      const time: any = await findlocalTime(cityName);
      const solarData = SolarCondition(time, astData.astronomy);
      if (time) {
        const selectedTitle = selectTitle(astData, time);
        for (let pallet in skyCycle) {
          // console.log(selectedTitle.title, " < _ _ >", pallet);
          // console.log(pallet)
          //  console.log(skyCycle[pallet][0].gradient)
          if (selectedTitle.title == pallet) {
            const backgroundColor = skyCycle[pallet][0].gradient;
            const hudColor = skyCycle[pallet][0].tempColor;
            // console.log("found it");
            // console.log(backgroundColor, " :: ", hudColor);
            console.log({ ...astData.astronomy, ...solarData });
            setPattern({
              background: backgroundColor,
              hud: hudColor,
              buttons: hudColor,
              chart: hudColor,
              solarData: { ...astData.astronomy, ...solarData },
            });
            return;
          }
        }
      }
      // console.log(`${selectedTitle.title} is not existing in source-List`);
    } else {
      console.log(`city ${cityName} not found in astDataList `);
    }
  }
}
