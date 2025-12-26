import { updateData as updateAstro } from "./ipGeoLocation.js";
import { difrentHour } from "../logic/sources/dry.js";
import { skyCycle } from "./sources/skyCycle.js";
import { readData as readLocations } from "./GeoLocations.js";

export async function findlocalTime(cityName: string) {
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

function selectTitle(addNotif: any, item: any, time: string) {
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
    const completion = difrentHour(time, val.time);
    let left =
      indx < sorted.length - 1
        ? difrentHour(sorted[indx + 1].time, time)
        : null;
    const fullTimeDiff = difrentHour(
      indx < sorted.length - 1 ? sorted[indx + 1].time : sorted[0].time,
      val.time
    );
    const completionPersent = completion / fullTimeDiff;
    let palletIndex: number = Math.trunc(
      completionPersent * skyCycle[val.title].length
    );
    palletIndex =
      palletIndex < 0
        ? 0
        : palletIndex >= skyCycle[val.title].length
        ? skyCycle[val.title].length - 1
        : palletIndex;

    if (completion > 0 && (left ? left > 0 : true)) {
      // console.log(val.title, palletIndex);
      return { title: val.title, palletIndex: palletIndex };
    } else if (completion < 0 && (left ? left < 0 : true)) {
      return { title: sorted.at(-1).title, palletIndex: palletIndex };
    }
  }
  // console.log(time, item);
  addNotif("error", "skyPattern: Title not found");
  console.log(sorted.at(-1)["time"], " <not found> ", sorted.at(-1)["title"]);
  return sorted.at(-1);
}

export async function selectPattern(
  addNotif: any,
  setPattern: any,
  setsolarData: any,
  cityName: string
) {
  if (cityName) {
    const astData = await updateAstro(cityName, findlocalTime, true);
    // console.log(astData);
    if (astData.ok) {
      const time: any = await findlocalTime(cityName);
      if (time) {
        const pallet = selectTitle(addNotif, astData.val, time.time.fullTime);
        // console.log(pallet);
        setsolarData(astData.val.astronomy);
        const ttl = pallet.title;
        const indx = pallet.palletIndex;
        setPattern({
          background: skyCycle[ttl][indx].gradient,
          hud: skyCycle[ttl][indx].hudMainColor,
          forecastButton: skyCycle[ttl][indx].forecastButton,
          solunaProp: skyCycle[ttl][indx].solunaProp,
          buttons: skyCycle[ttl][indx].solunaProp,
          chart: skyCycle[ttl][indx].chart,
        });
        return;
      }
      // console.log(`${selectedTitle.title} is not existing in source-List`);
    } else {
      addNotif(["error", `city "${cityName}" not found in astDataList `]);
      console.log(`city "${cityName}" not found in astDataList `);
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
  // console.log(`code: ${code} res : ${result}`);

  return result;
}
