"use client";
import "./styles/more.css";

interface WeatherData {
  name: string;
  value: number;
  color: string;
  maxValue: number;
}

export default function More() {
  return (
    <div className="more-panel open">
      <DonatChart />
    </div>
  );
}

export function DonatChart() {
  const weatherData: WeatherData[] = [
    { name: "Humidity", value: 65, color: "#039fbeff", maxValue: 100 },
    { name: "Wind Speed", value: 12, color: "#066ce0ff", maxValue: 50 },
    { name: "UV Index", value: 35, color: "#a213daff", maxValue: 80 },
    { name: "Pressure", value: 512, color: "#d6880cff", maxValue: 1050 },
  ];

  const centerX = 120;
  const centerY = 120;
  const baseRadius = 35;
  const strokeWidth = 16;
  const gap = 2;

  const createSemiCirclePath = (radius: number, percentage: number) => {
    const circumference = Math.PI * radius;
    return {
      strokeDasharray: circumference,
      strokeDashoffset: circumference - (circumference * percentage) / 100,
    };
  };

  return (
    <div className="radial-chart-container">
      <svg
        width="350"
        height="350"
        viewBox="0 0 200 240"
        className="radial-chart"
      >
        <defs>
          {weatherData.map((data, index) => (
            <linearGradient key={`grad-${index}`} id={`gradient-${index}`}>
              <stop offset="0%" stopColor={data.color} />
              <stop offset="100%" stopColor={data.color} stopOpacity="0.6" />
            </linearGradient>
          ))}
        </defs>

        {weatherData.map((data, index) => {
          const radius = baseRadius + index * (strokeWidth + gap);
          const percentage = (data.value / data.maxValue) * 100;
          const { strokeDasharray, strokeDashoffset } = createSemiCirclePath(
            radius,
            percentage
          );

          const textRadius = radius - 2;
          const unit =
            data.name === "Humidity"
              ? "%"
              : data.name === "Wind Speed"
              ? " km/h"
              : data.name === "Pressure"
              ? " hPa"
              : "";

          return (
            <g key={index}>
              <path
                d={`M ${
                  centerX - radius
                } ${centerY} A ${radius} ${radius} 0 0 1 ${
                  centerX + radius
                } ${centerY}`}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
              />

              <path
                d={`M ${
                  centerX - radius
                } ${centerY} A ${radius} ${radius} 0 0 1 ${
                  centerX + radius
                } ${centerY}`}
                fill="none"
                stroke={`url(#gradient-${index})`}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
              />
              <path
                id={`text-path-${index}`}
                d={`M ${
                  centerX - textRadius
                } ${centerY} A ${textRadius} ${textRadius} 0 0 1 ${
                  centerX + textRadius
                } ${centerY}`}
                fill="none"
                stroke="none"
              />

              <text className="curved-label" fill="white">
                <textPath
                  href={`#text-path-${index}`}
                  startOffset="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {data.name.toUpperCase()} {data.value}
                  {unit}
                </textPath>
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
