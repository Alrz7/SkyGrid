import { useState } from "react";
// import "./styles/Hud.css";

function DonatChart(props: any) {
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  const weatherData = [
    { name: "Humidity", value: 65, color: "#0B828D", maxValue: 100 },
    { name: "Wind Speed", value: 12, color: "#1D8790", maxValue: 50 },
    { name: "UV Index", value: 7, color: "#2E9BA5", maxValue: 11 },
    { name: "Pressure", value: 1013, color: "#3FAFBA", maxValue: 1050 },
  ];

  const centerX = 120;
  const centerY = 110;
  const baseRadius = 50;
  const strokeWidth = 15;
  const gap = 3;

  const createCirclePath = (radius: number, percentage: number) => {
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (circumference * percentage) / 100;
    return { strokeDasharray, strokeDashoffset };
  };

  return (
    <div className="radial-chart-container">
      <svg width="250" height="250" className="radial-chart">
        {weatherData.map((_, index) => {
          const radius = baseRadius + index * (strokeWidth + gap);
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
          );
        })}

        {weatherData.map((data, index) => {
          const radius = baseRadius + index * (strokeWidth + gap);
          const percentage = (data.value / data.maxValue) * 100;
          const { strokeDasharray, strokeDashoffset } = createCirclePath(
            radius,
            percentage
          );
          const gradientId = `gradient-${index}`;

          return (
            <g key={`data-${index}`}>
              <defs>
                <linearGradient
                  id={gradientId}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={data.color} stopOpacity="1" />
                  <stop
                    offset="100%"
                    stopColor={data.color}
                    stopOpacity="0.6"
                  />
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
          );
        })}

        <text
          x={centerX}
          y={centerY - 5}
          textAnchor="middle"
          className="center-value"
        >
          {hoveredLayer !== null ? weatherData[hoveredLayer]?.value : "65"}
        </text>
        <text
          x={centerX}
          y={centerY + 15}
          textAnchor="middle"
          className="center-label"
        >
          {hoveredLayer !== null ? weatherData[hoveredLayer]?.name : "Humidity"}
        </text>
      </svg>

      {hoveredLayer !== null && (
        <div className="chart-tooltip">
          <div className="tooltip-content">
            <span className="tooltip-name">
              {weatherData[hoveredLayer]?.name}
            </span>
            <span className="tooltip-value">
              {weatherData[hoveredLayer]?.value}
              {weatherData[hoveredLayer]?.name === "Humidity"
                ? "%"
                : weatherData[hoveredLayer]?.name === "Wind Speed"
                ? " km/h"
                : weatherData[hoveredLayer]?.name === "Pressure"
                ? " hPa"
                : ""}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}





// /* Radial chart styles */
// .radial-chart-container {
//   top:40%;
//   left: 10%;
//   position: relative;
//   margin-left: 40px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// .radial-chart {
//   filter: drop-shadow(0 0 10px rgba(11, 130, 141, 0.3));
// }

// .data-circle {
//   transition: all 0.3s ease;
//   cursor: pointer;
// }

// .data-circle:hover {
//   filter: brightness(1.2);
//   stroke-width: 10;
// }

// .center-value {
//   font-family: "Jua", sans-serif;
//   font-size: 1.8rem;
//   font-weight: 600;
//   fill: rgb(11, 130, 141);
//   transition: all 0.3s ease;
// }

// .center-label {
//   font-family: "Jua", sans-serif;
//   font-size: 0.9rem;
//   font-weight: 400;
//   fill: rgba(255, 255, 255, 0.8);
//   transition: all 0.3s ease;
// }

// .chart-tooltip {
//   position: absolute;
//   top: -50px;
//   left: 50%;
//   transform: translateX(-50%);
//   background: rgba(0, 0, 0, 0.8);
//   border-radius: 8px;
//   padding: 8px 12px;
//   pointer-events: none;
//   z-index: 10;
//   animation: fadeIn 0.2s ease-out;
// }

// .tooltip-content {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 2px;
// }

// .tooltip-name {
//   font-family: "Jua", sans-serif;
//   font-size: 0.8rem;
//   color: rgba(255, 255, 255, 0.8);
// }

// .tooltip-value {
//   font-family: "Jua", sans-serif;
//   font-size: 1.1rem;
//   font-weight: 600;
//   color: rgb(11, 130, 141);
// }

// @keyframes fadeIn {
//   from {
//     opacity: 0;
//     transform: translateX(-50%) translateY(10px);
//   }
//   to {
//     opacity: 1;
//     transform: translateX(-50%) translateY(0);
//   }
// }
