import React from "react";
import "./styles/Hud.css"
export default function Hud(props) {
  return (
    <div>
      <h3 className="hud city-name">{props.hudData.cityName ?? "loading"}</h3>
      <div className="central-elements-container">
        <h1 className="hud main-temp">{props.hudData.mainTemp ? `${props.hudData.mainTemp.temperature}°` : ""}</h1>
      </div>
    </div>
  )
}
