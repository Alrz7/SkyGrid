import React, { useState } from "react";
import "./styles/Hud.css";
import Humidity from "../assets/humidity.svg?react";
import Pressure from "../assets/pressure.svg?react";
import Visibility from "../assets/visibility.svg?react";
import Wind from "../assets/wind.svg?react";

export default function Hud({
  hudData,
  city,
  color,
}) {
  // console.log(city)
  // console.log(hudTime)
  return (
    <div>
      <h2
        className="city"
        style={{ color: `${color ? color.hud : "rgb(237, 254, 255);"}` }}
      >
        {city}
      </h2>
      <div className="hud-container">
        <div
          className="hud-card main-temp-card"
          style={{color: color.buttons }}
        >
          <div className="hud-temp-value">
            {hudData?.temperature ? `${hudData.temperature}°` : "--"}
          </div>
          <div className="hud-temp-feelslike" style={{color: color.temperature}}>
            {hudData?.apparent_temperature
              ? `Feels like ${hudData.apparent_temperature}°`
              : ""}
          </div>
          <div className="hud-weather-status" style={{color: color.buttons}}>
            {hudData?.weather_code ? `${hudData.weather_code}` : ""}
          </div>
        </div>

        <div
          className="hud-card info-card"
        >
          <div className="hud-info-item">
            <Humidity />
            <span className="hud-label" style={{color: color.buttons}}>Humidity:</span>
            <span className="hud-value" style={{color: color.buttons}}>{hudData?.humidity ?? "--"}%</span>
          </div>
          <div className="hud-info-item">
            <Wind />
            <span className="hud-label" style={{color: color.buttons}}>Wind:</span>
            <span className="hud-value" style={{color: color.buttons}}>
              {hudData?.wind_speed ?? "--"} m/s (
              {hudData?.wind_direction ?? "--"}
              °)
            </span>
          </div>
          <div className="hud-info-item">
            <Visibility />
            <span className="hud-label" style={{color: color.buttons}}>Visibility:</span>
            <span className="hud-value" style={{color: color.buttons}}>{hudData?.visibility ?? "--"} m</span>
          </div>
          <div className="hud-info-item">
            <Pressure />
            <span className="hud-label" style={{color: color.buttons}}>Pressure:</span>
            <span className="hud-value" style={{color: color.buttons}}>
              {hudData?.pressure_msl ?? "--"} hPa
            </span>
          </div>
        </div>
      </div>
      <style>
    {`
      .hud-info-item svg {
        border: 2px solid ${color.chart};
        background: ${color.chart};
      }
    `}
  </style>
    </div>
  );
}
