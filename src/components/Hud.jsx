import React from "react";
import "./styles/Hud.css"
export default function Hud(props) {

  return (
    <div>
      <h3 className="hud city-name">{props.huddata.city ?? ""}</h3>
      <div className="central-elements-container">
        <h1 className="hud main-temp">{props.huddata.cityData[1] ? `${props.huddata.cityData[1]["temperature_2m"]}°` : ""}</h1>
      </div>
    </div>
  )
}
