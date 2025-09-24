"use client"
import Forcast from "./Forcast"
import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts"
import "./styles/DataCard.css"

const hourlyData = [
  { hour: "00:00", temperature: 18, humidity: 65, windSpeed: 12 },
  { hour: "03:00", temperature: 16, humidity: 70, windSpeed: 10 },
  { hour: "06:00", temperature: 15, humidity: 75, windSpeed: 8 },
  { hour: "09:00", temperature: 22, humidity: 60, windSpeed: 15 },
  { hour: "12:00", temperature: 28, humidity: 45, windSpeed: 18 },
  { hour: "15:00", temperature: 32, humidity: 40, windSpeed: 20 },
  { hour: "18:00", temperature: 29, humidity: 50, windSpeed: 16 },
  { hour: "21:00", temperature: 24, humidity: 55, windSpeed: 14 },
]

const DataCard = ({ weatherData = hourlyData, activeParameters = ["temperature"] }) => {
  const [activeData, setActiveData] = useState(null)

  const getParameterConfig = (param) => {
    const configs = {
      temperature: {
        unit: "°C",
        colors: { start: "#16a0a7ff", end: "#06d9ceff" },
        opacity: 0.8,
      },
      humidity: {
        unit: "%",
        colors: { start: "#3b82f6", end: "#1e40af" },
        opacity: 0.6,
      },
      windSpeed: {
        unit: "km/h",
        colors: { start: "#10b981", end: "#047857" },
        opacity: 0.4,
      },
    }
    return configs[param] || configs.temperature
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          {payload.map((entry, index) => {
            const config = getParameterConfig(entry.dataKey)
            return (
              <p key={index} className="tooltip-value">
                {`${entry.dataKey}: ${entry.value}${config.unit}`}
              </p>
            )
          })}
        </div>
      )
    }
    return null
  }

  return (
    <div className="data-card">
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weatherData} margin={{ top: 14, right: 4, left: -36, bottom: 37 }}>
            <defs>
              {activeParameters.map((param) => {
                const config = getParameterConfig(param)
                return (
                  <linearGradient key={param} id={`gradient-${param}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={config.colors.start} stopOpacity={config.opacity} />
                    <stop offset="95%" stopColor={config.colors.end} stopOpacity={0.1} />
                  </linearGradient>
                )
              })}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.15)" />
            <XAxis
              dataKey="hour"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "rgba(13, 119, 102, 0.8)", fontSize: 12 }}
            />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(13, 119, 102, 0.8)", fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            {activeParameters.map((param) => {
              const config = getParameterConfig(param)
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
              )
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <Forcast />
    </div>
  )
}

export default DataCard
