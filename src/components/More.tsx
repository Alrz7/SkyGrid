"use client";
import "./styles/more.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ChartLineMultiple from "./LineChart.js";
import { selectWeatherIcon } from "../logic/skyPattern.js";
import ClosePage from "../assets/closePage.svg?react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const BackupData = [
  { hour: "00:00", temperature: 19, cloud_cover: 78, wind_speed: 8 },
  { hour: "03:00", temperature: 17, cloud_cover: 84, wind_speed: 10 },
  { hour: "06:00", temperature: 16, cloud_cover: 88, wind_speed: 12 },
  { hour: "09:00", temperature: 22, cloud_cover: 72, wind_speed: 15 },
  { hour: "12:00", temperature: 28, cloud_cover: 55, wind_speed: 18 },
  { hour: "15:00", temperature: 31, cloud_cover: 48, wind_speed: 22 },
  { hour: "18:00", temperature: 27, cloud_cover: 62, wind_speed: 16 },
  { hour: "21:00", temperature: 23, cloud_cover: 70, wind_speed: 11 },
];

export default function More({
  color,
  weatherData,
  page,
  setPage,
}: {
  color: any;
  weatherData:
    | never[]
    | null
    | undefined
    | {
        hour: string;
        temperature: number;
        humidity: number;
        windSpeed: number;
        weather_code: number;
      }[];
  page: string;
  setPage: any;
}) {
  const [iconList, setIconList] = useState<
    {
      hour: string;
      icon: null;
    }[]
  >([]);

  

  return (
    <motion.div
      className={"more-panel open"}
      initial={{ bottom: "-46%", opacity: 1 }}
      animate={{
        bottom: page != "more" ? "-46%" : "46%",
        visibility: page != "more" ? "hidden" : "visible",
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <button
        className="closePage-button"
        onClick={() => {
          setPage("main");
        }}
      >
        <ClosePage />
      </button>
      <div className="weather-code">
          {/* there will be  weather Icons here */}
      </div>
      {page == "more" ? (
        <>
          <ChartLineMultiple weatherData={weatherData} />
          <Chart weatherData={weatherData} color={color} />
        </>
      ) : null}
    </motion.div>
  );
}

// the Multi
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
  color: {
    background: string;
    hud: string;
    buttons: string;
    chart: string;
  };
}

const Chart = ({ weatherData, color }: DataCardProps) => {
  const activeParameters = [
    "temperature",
    "apparent_temperature",
    "rain",
    "showers",
    "snowfall",
    "wind_speed",
  ];

  const configs = {
    temperature: {
      unit: "°C",
      colors: { start: "#ff6b6b", end: "#ff8e8e" },
      opacity: 0.8,
    },
    apparent_temperature: {
      unit: "°C",
      colors: { start: "#ff9f1c", end: "#ffb84d" },
      opacity: 0.8,
    },
    rain: {
      unit: "mm",
      colors: { start: "#4ecdc4", end: "#7fe0d9" },
      opacity: 0.8,
    },
    showers: {
      unit: "mm",
      colors: { start: "#5e35b1", end: "#7c4dff" },
      opacity: 0.8,
    },
    snowfall: {
      unit: "mm",
      colors: { start: "#e0e7ff", end: "#c3dafe" },
      opacity: 0.8,
    },
    wind_speed: {
      unit: "km/h",
      colors: { start: "#64b5f6", end: "#90caf9" },
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
              <p key={index} className="tooltip-value">
                {`${entry.dataKey}: ${entry.value}${config.unit}`}
              </p>
            );
          })}
        </div>
      );
    }
  };

  return (
    <div className="chart-card" style={{ overflow: "visible" }}>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={weatherData || BackupData}
            margin={{ top: 2, right: 4, left: -28, bottom: -6 }}
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
    </div>
  );
};
