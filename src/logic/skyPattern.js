import { dataDir } from "@tauri-apps/api/path";
import { getAstro, readData as readAstro, toNameCase } from "./ipGeoLocation";
import { skyCycle } from "./sources/skyCycle";

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
    fullhr: `${hour}:${minute}`,
    fullStr: `${year}-${month}-${day}T${hour}:${minute}`,
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

function selectTitle(item) {
  const now = getLocalTime().fullhr;
  // const now = '15:00'
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
  console.log(sorted);
  for (let time of sorted) {
    if (difrentHour(now, time["time"]) > 0) {
      console.log(time["time"], " <-> ", time["title"]);
      return time;
    }
  }
  console.log(sorted.at(-1)["time"], " <-> ", sorted.at(-1)["title"]);
  return sorted.at(-1);
}

export async function selectPattern(cityName) {
  cityName = toNameCase(cityName);
  const DataList = await readAstro();
  if (cityName in DataList) {
    const astData = DataList[cityName];
    selectTitle(astData);
  } else {
    console.log(`city ${cityName} not found in astDataList `);
  }
}

selectPattern("tehran");
