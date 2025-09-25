import React from "react";
import "./styles/Forcast.css"
import {getWeatherStat } from "../logic/OpenMeteo"

function sdcv(){
  getWeatherStat("paris")
}

export default function Forcast() {
  return (
    <div>
      <button onClick={sdcv}  className="forcast-button">
        5-day forcast
      </button>
    </div>
  );
}
