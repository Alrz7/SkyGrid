"use client";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import "./styles/AreaChart.css";

const hourlyData = [
  { hour: "00:00", temperature: 0, humidity: 0, windSpeed: 0 },
  { hour: "03:00", temperature: 0, humidity: 0, windSpeed: 0 },
  { hour: "06:00", temperature: 0, humidity: 0, windSpeed: 0 },
  { hour: "09:00", temperature: 0, humidity: 0, windSpeed: 0 },
  { hour: "12:00", temperature: 0, humidity: 0, windSpeed: 0 },
  { hour: "15:00", temperature: 0, humidity: 0, windSpeed: 0 },
  { hour: "18:00", temperature: 0, humidity: 0, windSpeed: 0 },
  { hour: "21:00", temperature: 0, humidity: 0, windSpeed: 0 },
];

interface DataCardProps {
  weatherData:
    | never[]
    | null
    | undefined
    | {
        hour: string;
        temperature: number;
        humidity: number;
        windSpeed: number;
      }[];
  activeParameters: string[];
  color: {
    background: any;
    hud: any;
    forecastButton: any;
    solunaProp: any;
    buttons: any;
    chart: any;
  };
  page: string;
  setPage: any;
}

export default function ({
  weatherData = hourlyData,
  activeParameters = [
    "temperature",
    "apparent_temperature",
    "rain",
    "showers",
    "snowfall",
    "wind_speed",
  ],
  color,
}: DataCardProps) {
  if (!weatherData) weatherData = hourlyData;

  function tipColor(name: string) {
    for (let [title, val] of Object.entries(configs)) {
      if (title == name) {
        return val.colors.start;
      }
    }
    return "#ffffff";
  }
  // console.log(color.chart);
  const configs = {
    temperature: {
      unit: "°C",
      colors: {
        start: color?.chart?.temp?.start ?? "#ff6b6b",
        end: color?.chart?.temp?.start ?? "#ff8e8e",
      },
      opacity: 0.8,
    },
    apparent_temperature: {
      unit: "°C",
      colors: {
        start: color?.chart?.apTemp?.start ?? "#ff9f1c",
        end: color?.chart?.apTemp?.end ?? "#ffb84d",
      },
      opacity: 0.8,
    },
    rain: {
      unit: "mm",
      colors: {
        start: color?.chart?.rain?.start ?? "#4ecdc4",
        end: color?.chart?.rain?.start ?? "#7fe0d9",
      },
      opacity: 0.8,
    },
    showers: {
      unit: "mm",
      colors: {
        start: color?.chart?.shower?.start ?? "#5e35b1",
        end: color?.chart?.shower?.start ?? "#7c4dff",
      },
      opacity: 0.8,
    },
    snowfall: {
      unit: "mm",
      colors: {
        start: color?.chart?.snow?.start ?? "#e0e7ff",
        end: color?.chart?.snow?.start ?? "#c3dafe",
      },
      opacity: 0.8,
    },
    wind_speed: {
      unit: "km/h",
      colors: {
        start: color?.chart?.windspd?.start ?? "#64b5f6",
        end: color?.chart?.windspd?.start ?? "#90caf9",
      },
      opacity: 0.4,
    },
  } as const;
  type ConfigKey = keyof typeof configs;

  const getParameterConfig = (param: ConfigKey) => {
    return configs[param] || configs.temperature;
  };

  type CustomTooltipProps = {
    active?: boolean;
    payload?: any[];
    label?: any;
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: any[];
    label?: any;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry: any, index: any) => {
            const config = getParameterConfig(entry.dataKey);
            return (
              <p
                key={index}
                className="tooltip-value"
                style={{ background: tipColor(entry.dataKey) }}
              >
                {`${entry.dataKey}: ${entry.value}${config.unit}`}
              </p>
            );
          })}
        </div>
      );
    }
  };
  return (
    <>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={weatherData || hourlyData}
            margin={{ top: 8, right: 2, left: -32, bottom: 37 }}
          >
            <defs>
              {activeParameters.map((param: any) => {
                const config = getParameterConfig(param);
                return (
                  <linearGradient
                    key={param}
                    id={`gradient-${param}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={config.colors.start}
                      stopOpacity={config.opacity}
                    />
                    <stop
                      offset="95%"
                      stopColor={config.colors.end}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                );
              })}
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255, 255, 255, 0.15)"
            />
            <XAxis
              dataKey="hour"
              // interval={0}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#ffffffff", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#ffffffff", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            {activeParameters.map((param: any) => {
              const config = getParameterConfig(param);
              return (
                <Area
                  key={param}
                  type="monotone"
                  dataKey={param}
                  stroke={config.colors.start}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#gradient-${param})`}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
