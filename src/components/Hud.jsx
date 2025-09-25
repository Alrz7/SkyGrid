
import { useState } from "react"
import "./styles/Hud.css"




export default function Hud(props) {
  const [hoveredLayer, setHoveredLayer] = useState(null)

  const weatherData = [
    { name: "Humidity", value: 65, color: "#0B828D", maxValue: 100 },
    { name: "Wind Speed", value: 12, color: "#1D8790", maxValue: 50 },
    { name: "UV Index", value: 7, color: "#2E9BA5", maxValue: 11 },
    { name: "Pressure", value: 1013, color: "#3FAFBA", maxValue: 1050 },
  ]

  const centerX = 120
  const centerY = 110
  const baseRadius = 50
  const strokeWidth = 15
  const gap = 3

  const createCirclePath = (radius, percentage) => {
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (circumference * percentage) / 100
    return { strokeDasharray, strokeDashoffset }
  }

  return (
    <div>
      <h3 className="hud city-name">{props.huddata}</h3>
      <div className="central-elements-container">
        <h1 className="hud main-temp">19°</h1>

        <div className="radial-chart-container">
          <svg width="250" height="250" className="radial-chart">
            {weatherData.map((_, index) => {
              const radius = baseRadius + index * (strokeWidth + gap)
              return (
                <circle
                  key={`bg-${index}`}
                  cx={centerX}
                  cy={centerY}
                  r={radius}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth={strokeWidth}
                />
              )
            })}

            {weatherData.map((data, index) => {
              const radius = baseRadius + index * (strokeWidth + gap)
              const percentage = (data.value / data.maxValue) * 100
              const { strokeDasharray, strokeDashoffset } = createCirclePath(radius, percentage)
              const gradientId = `gradient-${index}`

              return (
                <g key={`data-${index}`}>
                  <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={data.color} stopOpacity="1" />
                      <stop offset="100%" stopColor={data.color} stopOpacity="0.6" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius}
                    fill="none"
                    stroke={`url(#${gradientId})`}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(-90 ${centerX} ${centerY})`}
                    className="data-circle"
                    onMouseEnter={() => setHoveredLayer(index)}
                    onMouseLeave={() => setHoveredLayer(null)}
                  />
                </g>
              )
            })}

            <text x={centerX} y={centerY - 5} textAnchor="middle" className="center-value">
              {hoveredLayer !== null ? weatherData[hoveredLayer].value : "65"}
            </text>
            <text x={centerX} y={centerY + 15} textAnchor="middle" className="center-label">
              {hoveredLayer !== null ? weatherData[hoveredLayer].name : "Humidity"}
            </text>
          </svg>

          {hoveredLayer !== null && (
            <div className="chart-tooltip">
              <div className="tooltip-content">
                <span className="tooltip-name">{weatherData[hoveredLayer].name}</span>
                <span className="tooltip-value">
                  {weatherData[hoveredLayer].value}
                  {weatherData[hoveredLayer].name === "Humidity"
                    ? "%"
                    : weatherData[hoveredLayer].name === "Wind Speed"
                      ? " km/h"
                      : weatherData[hoveredLayer].name === "Pressure"
                        ? " hPa"
                        : ""}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
