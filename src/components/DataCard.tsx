"use client";
import Forcast from "./Forcast.js";
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
import "./styles/DataCard.css";

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
  activeParameters: [string];
  color: {
    background: string;
    hud: string;
    buttons: string;
    chart: string;
    solarData: {};
  };
}

const DataCard = ({
  weatherData = hourlyData,
  activeParameters = ["temperature"],
  color,
}: DataCardProps) => {
  if (!weatherData) weatherData = hourlyData;
  const [activeData, setActiveData] = useState(null);

  const configs = {
    temperature: {
      unit: "°C",
      colors: { start: color.chart, end: "#909090ff" },
      opacity: 0.8,
    },
    cloud_cover: {
      unit: "%",
      colors: { start: "#0c73a3ff", end: "#3f5ec3ff" },
      opacity: 0.6,
    },
    wind_speed: {
      unit: "km/h",
      colors: { start: "#10b981", end: "#047857" },
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
    <div className="data-card">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={weatherData || hourlyData}
            margin={{ top: 0, right: 4, left: -36, bottom: 37 }}
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
              tick={{ fill: color.chart, fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: color.chart, fontSize: 12 }}
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
      <Forcast
      // color={color}
      />
    </div>
  );
};

export default DataCard;
