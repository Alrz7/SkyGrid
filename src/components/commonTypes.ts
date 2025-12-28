// src/types/hooks.ts

import type { Dispatch, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type Nullable<T> = T | null;

export type ChangeHandler<T = string> = (
  e: React.ChangeEvent<HTMLInputElement>
) => void;

export type AsyncCallback = () => Promise<void>;

export type color = {
  background: string;
  hud: string;
  forecastButton: string;
  solunaProp: string;
  buttons: string;
  chart: Record<string, string | Record<string, string>>;
};

export type datas = string | number | boolean;

export type PrimaryUpdateCity = (
  save: boolean,
  cityName: string,
  current: Record<string, datas> | null,
  hourly: hourlyData | null
) => void;

export type page = "main" | "forecast" | "options";

export type solarData = {
  moonrise: string;
  moonset: string;
  sunrise: string;
  sunset: string;
  solar_noon: string;
} | null;
export type addNotif = (newNotif: [string, string]) => void;
export type autupdt = { stat: boolean; set: () => void };
export type srcnt = { count: number; set: (couny: number) => void };
export type rmb = {
  stat: boolean;
  func: (op?: "set" | "save") => void;
  city: string | null;
};
export type setPage = SetState<page>;
export type hourlyData = {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  apparent_temperature: number[];
  precipitation_probability: number[];
  rain: number[];
  showers: number[];
  snowfall: number[];
  snow_depth: number[];
  weather_code: number[];
  cloud_cover: number[];
  pressure_msl: number[];
  visibility: number[];
  wind_speed_10m: number[];
  wind_direction_10m: number[];
  wind_gusts_10m: number[];
};
