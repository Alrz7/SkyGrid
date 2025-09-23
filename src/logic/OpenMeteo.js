import { fetchWeatherApi } from "openmeteo";
import { fetch } from "@tauri-apps/plugin-http";
import { readConfig } from "./gridconfig";
import { readData as readLocations } from "./GeoLocations";

function toNameCase(str) {
  if (!str) return "";
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const lastConfig = await readConfig();
const url = "https://api.open-meteo.com/v1/forecast";

export async function getDailyStat(cityName) {
  const locations = await readLocations();
  let location = undefined;

  const capname = toNameCase(cityName);
  if (locations) {
    location = capname in locations ? locations[capname] : false;
  }
  if (location) {
    const locData = {
      latitude: location["lat"] ?? location["latitude"],
      longitude: location["lon"] ?? location["longitude"],
    };

    const adrs = `${url}?latitude=${locData["latitude"]}&longitude=${locData["longitude"]}&daily=${lastConfig["Config"]["daily"]}`;
    const dt = await fetch(adrs, { method: "GET" });
    const data = await dt.json();
    console.log(data);
  } else {
    console.log("there was not any location with that name in datas");
  }
}

// const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
// const response = responses[0];

// // Attributes for timezone and location
// const latitude = response.latitude();
// const longitude = response.longitude();
// const elevation = response.elevation();
// const utcOffsetSeconds = response.utcOffsetSeconds();

// console.log(
// 	`\nCoordinates: ${latitude}°N ${longitude}°E`,
// 	`\nElevation: ${elevation}m asl`,
// 	`\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
// );

// const current = response.current()!;
// const hourly = response.hourly()!;
// const daily = response.daily()!;

// // Note: The order of weather variables in the URL query and the indices below need to match!
// const weatherData = {
// 	current: {
// 		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
// 		snowfall: current.variables(0)!.value(),
// 		showers: current.variables(1)!.value(),
// 		rain: current.variables(2)!.value(),
// 		temperature_2m: current.variables(3)!.value(),
// 		relative_humidity_2m: current.variables(4)!.value(),
// 		apparent_temperature: current.variables(5)!.value(),
// 		weather_code: current.variables(6)!.value(),
// 		cloud_cover: current.variables(7)!.value(),
// 		pressure_msl: current.variables(8)!.value(),
// 		surface_pressure: current.variables(9)!.value(),
// 		precipitation: current.variables(10)!.value(),
// 		wind_speed_10m: current.variables(11)!.value(),
// 		wind_direction_10m: current.variables(12)!.value(),
// 		wind_gusts_10m: current.variables(13)!.value(),
// 	},
// 	hourly: {
// 		time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
// 			(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
// 		),
// 		temperature_2m: hourly.variables(0)!.valuesArray(),
// 		relative_humidity_2m: hourly.variables(1)!.valuesArray(),
// 		apparent_temperature: hourly.variables(2)!.valuesArray(),
// 		precipitation_probability: hourly.variables(3)!.valuesArray(),
// 		rain: hourly.variables(4)!.valuesArray(),
// 		showers: hourly.variables(5)!.valuesArray(),
// 		snowfall: hourly.variables(6)!.valuesArray(),
// 		snow_depth: hourly.variables(7)!.valuesArray(),
// 		weather_code: hourly.variables(8)!.valuesArray(),
// 		cloud_cover: hourly.variables(9)!.valuesArray(),
// 		pressure_msl: hourly.variables(10)!.valuesArray(),
// 		visibility: hourly.variables(11)!.valuesArray(),
// 		wind_speed_10m: hourly.variables(12)!.valuesArray(),
// 		wind_direction_10m: hourly.variables(13)!.valuesArray(),
// 		wind_gusts_10m: hourly.variables(14)!.valuesArray(),
// 	},
// 	daily: {
// 		time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
// 			(_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
// 		),
// 		weather_code: daily.variables(0)!.valuesArray(),
// 		temperature_2m_max: daily.variables(1)!.valuesArray(),
// 		temperature_2m_min: daily.variables(2)!.valuesArray(),
// 		apparent_temperature_max: daily.variables(3)!.valuesArray(),
// 		apparent_temperature_min: daily.variables(4)!.valuesArray(),
// 		rain_sum: daily.variables(5)!.valuesArray(),
// 		showers_sum: daily.variables(6)!.valuesArray(),
// 		snowfall_sum: daily.variables(7)!.valuesArray(),
// 		precipitation_sum: daily.variables(8)!.valuesArray(),
// 		precipitation_hours: daily.variables(9)!.valuesArray(),
// 		precipitation_probability_max: daily.variables(10)!.valuesArray(),
// 		uv_index_max: daily.variables(11)!.valuesArray(),
// 		wind_speed_10m_max: daily.variables(12)!.valuesArray(),
// 		wind_gusts_10m_max: daily.variables(13)!.valuesArray(),
// 		wind_direction_10m_dominant: daily.variables(14)!.valuesArray(),
// 	},
// };

// // 'weatherData' now contains a simple structure with arrays with datetime and weather data
// console.log(
// 	`\nCurrent time: ${weatherData.current.time}`,
// 	`\nCurrent snowfall: ${weatherData.current.snowfall}`,
// 	`\nCurrent showers: ${weatherData.current.showers}`,
// 	`\nCurrent rain: ${weatherData.current.rain}`,
// 	`\nCurrent temperature_2m: ${weatherData.current.temperature_2m}`,
// 	`\nCurrent relative_humidity_2m: ${weatherData.current.relative_humidity_2m}`,
// 	`\nCurrent apparent_temperature: ${weatherData.current.apparent_temperature}`,
// 	`\nCurrent weather_code: ${weatherData.current.weather_code}`,
// 	`\nCurrent cloud_cover: ${weatherData.current.cloud_cover}`,
// 	`\nCurrent pressure_msl: ${weatherData.current.pressure_msl}`,
// 	`\nCurrent surface_pressure: ${weatherData.current.surface_pressure}`,
// 	`\nCurrent precipitation: ${weatherData.current.precipitation}`,
// 	`\nCurrent wind_speed_10m: ${weatherData.current.wind_speed_10m}`,
// 	`\nCurrent wind_direction_10m: ${weatherData.current.wind_direction_10m}`,
// 	`\nCurrent wind_gusts_10m: ${weatherData.current.wind_gusts_10m}`,
// );
// console.log("\nHourly data", weatherData.hourly)
// console.log("\nDaily data", weatherData.daily)
