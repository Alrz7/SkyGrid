import { dataDir, tempDir, templateDir } from "@tauri-apps/api/path";
import {
  updateData as updateAstro,
  readData as readAstro,
  toNameCase,
} from "./ipGeoLocation";
import { skyCycle } from "./sources/skyCycle";
import { readData as readLocations } from "./GeoLocations";

function timeNow() {
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
    fullhr: `${hour}:${minute}`,
    fullStr: `${year}-${month}-${day}T${hour}:${minute}`,
  };
}

async function getLocalTime(lat, lon) {
  console.log(lat, lon);
  const url = `https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // اگر خطا بود، پیام خطا را از سرور می‌گیریم
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // زمان محلی در قالب "HH:MM:SS"
    const timeOnly = data.time;
    console.log(data);

    // اطلاعات کامل دریافتی:
    // const localDateTime = data.dateTime; // e.g., "2025-10-28T01:30:15.3562412"
    // const ianaTimezoneName = data.timeZone; // e.g., "Asia/Tehran"

    console.log(`زمان محلی: ${timeOnly}`);

    return timeOnly;
  } catch (error) {
    console.log(error);
    console.error("خطا در TimeAPI.io:", error.message);
    return null;
  }
}

async function findlocalTime(cityName) {
  const locations = await readLocations();
  const capname = toNameCase(cityName);
  if (capname in locations) {
    const location = locations[capname];
    const timeZone = location["timezone"];
    if (timeZone) {
      const time = intlTimeFormat(timeZone).time;
      console.log(`time of ${timeZone} is : ${time} right now`);
      return time;
    } else {
      return null;
    }
  }
  console.log("no timezone has been found for this city");
  return null;
}

export function intlTimeFormat(ianaTimezoneName) {
  const now = new Date();
  const options = {
    timeZone: ianaTimezoneName,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
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
    fullStr: `${year}-${month}-${day}T${hour}:${minute}:${second}`,
  };
}
function sortHours(lst) {
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

function difrentHour(t1, t2) {
  const [h1, m1] = t1.split(":").map(Number);
  const [h2, m2] = t2.split(":").map(Number);
  let diff = h1 * 60 + m1 - (h2 * 60 + m2);
  // if (diff < -720) diff += 1440;
  return diff * 60;
}

function selectTitle(item, time) {
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
    "moonrise",
    "moonset",
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
    item.astronomy.moonrise,
    item.astronomy.moonset,
  ];
  const mergedList = timelist.map((val, indx) => ({
    time: val,
    title: titlelist[indx],
  }));
  const sorted = sortHours(mergedList);
  
  for (let [indx, val] of sorted.entries()) {
    // console.log(indx, val)
    if (
      difrentHour(time, val.time) > 0 &&
      (indx < sorted.length
        ? difrentHour(time, sorted[indx + 1].time) < 0
        : true)
    ) {
      console.log(val.time, " <-> ", val["title"]);
      return val;
    }
  }
  console.log(sorted.at(-1)["time"], " <not found> ", sorted.at(-1)["title"]);
  return sorted.at(-1);
}

export async function selectPattern(setColor, cityName) {
  // console.log(cityName)
  if (cityName) {
    cityName = toNameCase(cityName);
    const astData = await updateAstro(cityName, intlTimeFormat);
    if (astData) {
      const time = await findlocalTime(cityName);
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
            setColor({
              background: backgroundColor,
              hud: hudColor,
              buttons: hudColor,
              chart: hudColor,
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
