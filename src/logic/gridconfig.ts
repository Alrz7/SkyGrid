import {
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";

export async function saveConfig(data: any, target = "GridConfig") {
  console.log(data);
  const lastFile = await readConfig(target);
  if (lastFile === false) {
    const container = { Config: data };
    await writeTextFile(`SkyGrid/${target}.json`, JSON.stringify(container), {
      baseDir: BaseDirectory.Document,
    });
  } else {
    lastFile["Config"] = data;
    await writeTextFile(`SkyGrid/${target}.json`, JSON.stringify(lastFile), {
      baseDir: BaseDirectory.Document,
    });
  }
}

export async function readConfig(target = "GridConfig") {
  const file = await readTextFile(`SkyGrid/${target}.json`, {
    baseDir: BaseDirectory.Document,
  });
  if (file) {
    const data = JSON.parse(file);
    return data;
  } else {
    return null;
  }
}

export let meteoParamsBackUp = {
  daily: [
    "weather_code",
    "temperature_2m_max",
    "temperature_2m_min",
    "apparent_temperature_max",
    "apparent_temperature_min",
    "rain_sum",
    "showers_sum",
    "snowfall_sum",
    "precipitation_sum",
    "precipitation_hours",
    "precipitation_probability_max",
    "uv_index_max",
    "wind_speed_10m_max",
    "wind_gusts_10m_max",
    "wind_direction_10m_dominant",
  ],
  hourly: [
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "precipitation_probability",
    "rain",
    "showers",
    "snowfall",
    "snow_depth",
    "weather_code",
    "cloud_cover",
    "pressure_msl",
    "visibility",
    "wind_speed_10m",
    "wind_direction_10m",
    "wind_gusts_10m",
  ],
  current: [
    "snowfall",
    "showers",
    "rain",
    "temperature_2m",
    "relative_humidity_2m",
    "apparent_temperature",
    "weather_code",
    "cloud_cover",
    "pressure_msl",
    "surface_pressure",
    "precipitation",
    "wind_speed_10m",
    "wind_direction_10m",
    "wind_gusts_10m",
  ],
};
