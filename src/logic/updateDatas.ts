import { readData, getWeatherStat } from "./OpenMeteo.js";
import { updateData as updateAstro } from "./ipGeoLocation.js";
import { findlocalTime } from "./skyPattern.js";
import {dateDiferenceToHour as difrentHour} from '../logic/sources/dry.js';

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
    fullStr: `${year}-${month}-${day}T${hour}:${minute}`,
  };
}


/**
 *  this should  manage the time of updating the current datas
 */
export async function checkCurrent(cityName: string, data: { time: string }) {
  const now = getLocalTime().fullStr;
  const locations = await readData("current");
  if (cityName && cityName in locations) {
    const time_difference = difrentHour(now, data.time);
    if (time_difference >= 2) {
    }
  }
}

export async function checkUpdate(cityName: string, engage: boolean) {
  const now = getLocalTime().fullStr;
  const locations = await readData("hourly");
  if (cityName && cityName in locations) {
    const lastDate = locations[cityName].time;
    const time_difference = difrentHour(now, lastDate.at(-1));
    if (engage) {
      // console.log("engaging in weather update");
      updateAstro(cityName, findlocalTime, true);
      if (time_difference >= 0) {
        const newWeatherData = await getWeatherStat(cityName);
        return { ok: true, val: newWeatherData };
      } else {
        console.log("no need to Update the data...");
        return { ok: false, val: null };
      }
    } else {
      // console.log("no engage in weather update");
      const astroUpdResponse = await updateAstro(
        cityName,
        findlocalTime,
        false
      );
      console.log(
        `need to update?  => ${time_difference >= 0 || astroUpdResponse.val}`
      );
      return time_difference >= 0 || astroUpdResponse.val;
    }
  } else {
    return { ok: false, val: null };
  }
}
