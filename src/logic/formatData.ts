import { findlocalTime } from "./skyPattern.js";
import { difrentHour } from "../logic/sources/dry.js";
export function ftHourlyData(data: any) {
  if (data) {
    const now = getLocalTime().fullStr;
    const timeIndex: any = [];
    data.time.forEach((item: any, index: number) => {
      if (item.slice(0, 10) == now) {
        timeIndex.push(index);
      }
    });
    if (timeIndex.length == 0) {
      for (let i of data.time) {
        // this pasrt is for situations that updated list is a head of the local time due to server and location's time difference
        if (difrentHour(now, i) > 0) {
          const lastAvalable = i;
          data.time.forEach((item: any, index: number) => {
            if (item.slice(0, 10) == lastAvalable) {
              timeIndex.push(index);
            }
          });
        }
      }
    }
    const newlist: any = [];
    timeIndex.forEach((indx: any) => {
      const newItem = {
        hour: data.time[indx].slice(11),
        temperature: data.temperature_2m[indx],
        humidity: data.relative_humidity_2m[indx],
        apparent_temperature: data.apparent_temperature[indx],
        precipitation_probability: data.precipitation_probability[indx],
        rain: data.rain[indx],
        showers: data.showers[indx],
        snowfall: data.snowfall[indx],
        snow_depth: data.snow_depth[indx],
        weather_code: data.weather_code[indx],
        cloud_cover: data.cloud_cover[indx],
        pressure_msl: data.pressure_msl[indx],
        visibility: data.visibility[indx],
        wind_speed: data.wind_speed_10m[indx],
        wind_direction: data.wind_speed_10m[indx],
        wind_gusts: data.wind_speed_10m[indx],
      };
      newlist.push(newItem);
    });
    if (newlist.length > 0) {
      return newlist;
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export async function selectWatherItem(data: any, city: string) {
  // console.log(data, city)
  if (data && city) {
    const localTime = await findlocalTime(city);
    // console.log(localTime, `${localTime.slice(0,2)}:00`)
    if (localTime) {
      for (let item of data) {
        if (item.hour == `${localTime?.time.fullTime.slice(0, 2)}:00`) {
          return item;
        }
      }
      return null;
    }
    return null;
  }
}

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
    fullStr: `${year}-${month}-${day}`,
  };
}
