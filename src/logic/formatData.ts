import { findlocalTime } from "./skyPattern.js";
import { difrentHour } from "../logic/sources/dry.js";
export function ftHourlyData(data: any, addNotif: any | null = null) {
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
      if (addNotif) {
        console.log("weather Data is not up to Date");
        addNotif(["error", "weather Data is not up to Date"]);
      }
      return null;
    }
  } else {
    return null;
  }
}

export async function selectWatherItem(data: any, city: string) {
  // console.log(data, city)
  if (data && city) {
    console.log(city);
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
  const spl = now.toLocaleString("en-US", { weekday: "short" });
  const dayCoutn = now.getDay();
  // console.log(dayCoutn);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  return {
    spl: spl,
    cnt: dayCoutn,
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    fullStr: `${year}-${month}-${day}`,
  };
}

export function ftForecastData(data: Record<string, any>) {
  let res = [];
  const today = getLocalTime();
  for (let i = 0; i < 7; i++) {
    const today = getLocalTime();
    const date = new Date(data.time[i]);
    let dateSpl = date.toLocaleString("en-US", { weekday: "short" });
    if (data.time[i] == today.fullStr) {
      dateSpl = "Today";
    } else if (
      data.time[i] == `${today.year}-${today.month}-${Number(today.day) + 1}`
    ) {
      dateSpl = "Tomarrow";
    } else if (
      data.time[i] == `${today.year}-${today.month}-${Number(today.day) - 1}`
    ) {
      dateSpl = "Yesterday";
    }
    // console.log(data)
    const newItem = {
      date: dateSpl,
      code: data.weather_code[i],
      tempMax: data.temperature_2m_max[i],
      tempMin: data.temperature_2m_min[i],
      apparentTempMax: data.apparent_temperature_max[i],
      apparentTempMin: data.apparent_temperature_min[i],
      rainSum: data.rain_sum[i],
      showersSum: data.showers_sum[i],
      snowfallSum: data.snowfall_sum[i],
      precipitationSum: data.precipitation_sum[i],
      precipitationHours: data.precipitation_hours[i],
      precipitationProbabilityMax: data.precipitation_probability_max[i],
      uvIndexMax: data.uv_index_max[i],
      windSpeedMax: data.wind_speed_10m_max[i],
      windGustsMax: data.wind_gusts_10m_max[i],
      windDirectionDominant: data.wind_direction_10m_dominant[i],
    };
    res.push(newItem);
  }
  return res;
}
