import { readData, getWeatherStat, toNameCase } from "./OpenMeteo";

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

function difrentHour(timeString1, timeString2) {
  const date1 = new Date(timeString1 + "Z");
  const date2 = new Date(timeString2 + "Z");
  const differenceInMilliseconds = date1.getTime() - date2.getTime();
  return differenceInMilliseconds / (1000 * 3600);
}


/**
 *  this should  manage the time of updating the current datas
 */
export async function checkCurrent(cityName) {
  const now = getLocalTime().fullStr;
  const locations = await readData("current");
  if (toNameCase(cityName) in locations) {
    const time_difference = difrentHour(now, data.time);
    if (time_difference >= 2) {
    }
  }
}

export async function checkHourly(cityName) {
  const now = getLocalTime().fullStr;
  const locations = await readData("hourly");
  const capname = toNameCase(cityName);
  if (toNameCase(capname) in locations) {
    const lastDate = locations[capname]["time"];
    const time_difference = difrentHour(now, lastDate.at(-1));
    if (time_difference >= 0) {
      const newWeatherData = await getWeatherStat(capname);
      return newWeatherData
    } else {
    }
  }else{
    const newWeatherData = await getWeatherStat(capname);
    return newWeatherData
  }
}
