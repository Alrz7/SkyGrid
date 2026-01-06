import { updateData as updateAstro } from "./ipGeoLocation.js";
import { isInRange, toMinutes, duration, elapsed } from "./sources/dry.js";
import { skyCycle } from "./sources/skyCycle.js";
import { readData as readLocations } from "./GeoLocations.js";
import * as tp from "../components/commonTypes.js";

export async function findLocalTime(cityName: string) {
  if (cityName == "") {
    console.log("bug");
  }
  const locations = await readLocations();
  if (cityName && cityName in locations) {
    const location = locations[cityName];
    const timeZone = location["timezone"];
    if (timeZone) {
      const time = intlTimeFormat(timeZone);
      return { time: time, zone: timeZone };
    } else {
      return null;
    }
  } else {
    // console.log(locations)
    console.log(`city ${cityName} doesn't exist in location list`);
    return null;
  }
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
  const pivot = lst.at(0);
  const beef = [];
  const aft = [];
  console.log(pivot);
  for (let i = 1; i < lst.length; i++) {
    if (lst[i].min - pivot.min > 0) {
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

function selectTitle(addNotif: tp.addNotif, data: any, now: string) {
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
    data.astronomy.mid_night,
    data.astronomy.night_end,
    ...Object.values(data.astronomy.morning),
    data.astronomy.sunrise,
    data.astronomy.sunset,
    ...Object.values(data.astronomy.evening),
    data.astronomy.night_begin,
    data.astronomy.solar_noon,
    // item.astronomy.moonrise,
    // item.astronomy.moonset,
  ];
  const mergedList = timelist.map((val, indx) => ({
    time: val,
    min: toMinutes(val),
    title: titlelist[indx],
  }));
  const sorted = sortHours(mergedList);
  const Mnow = toMinutes(now);
  console.log(sorted);
  for (let [indx, val] of sorted.entries()) {
    if (indx != sorted.length - 1) {
      console.log(Mnow, val.min, sorted.at(indx + 1).min);
      const isIncluded = isInRange(Mnow, val.min, sorted.at(indx + 1).min);
      if (isIncluded) {
        console.log(val.title);
        const index = Math.trunc(
          (elapsed(Mnow, val.min) /
            duration(sorted.at(indx + 1).min, val.min)) *
            10 *
            skyCycle[val.title].length
        );
        console.log(
          (elapsed(Mnow, val.min) /
            duration(sorted.at(indx + 1).min, val.min)) *
            10,
          index
        );
        // addNotif(["info", `pattern: ${val.title}`]);
        return { title: val.title, index: index };
      }
    }
  }
  return { title: sorted.at(-1).title, index: 0 };
}

export async function selectPattern(
  addNotif: tp.addNotif,
  setPattern: any,
  setsolarData: any,
  cityName: string
) {
  if (cityName) {
    const astData = await updateAstro(cityName, findLocalTime, true, addNotif);
    if (astData && astData.ok && astData.val) {
      const time: any = await findLocalTime(cityName);
      if (time) {
        const pallet = selectTitle(addNotif, astData.val, time.time.fullTime);
        setsolarData(astData.val.astronomy);
        const ttl = pallet.title;
        const indx = pallet.index;
        console.log(pallet);
        // addNotif(["info", `++ ${cityName}`]);
        setPattern({
          background: skyCycle[ttl][indx].gradient,
          hud: skyCycle[ttl][indx].hudMainColor,
          forecastButton: skyCycle[ttl][indx].forecastButton,
          solunaProp: skyCycle[ttl][indx].solunaProp,
          buttons: skyCycle[ttl][indx].solunaProp,
          chart: skyCycle[ttl][indx].chart,
        });
        return null;
      }
    }
  }
}

export function selectWeatherIcon(code: number) {
  const dataArray = [
    "c0-d",
    "c0-n",
    "c1-d",
    "c1-n",
    "c2-d",
    "c2-n",
    "c3",
    "c4",
    "c5",
    "c5-d",
    "c5-n",
    "c6",
    "c6-d",
    "c6-n",
    "c7",
    "c7-d",
    "c7-n",
    "c8",
    "c9",
    "c10",
    "c11",
    "c12",
    "c13",
    "c14",
  ];
  const temps = [`c${code}`, `c${code}-n`, `c${code}-d`];
  let result = null;
  // console.log(temps);
  for (let item of dataArray) {
    temps.forEach((i) => {
      if (i == item) {
        result = item;
      }
    });
  }
  return result;
}
