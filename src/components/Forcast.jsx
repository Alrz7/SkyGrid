import React from "react";
import "./styles/Forcast.css";
import { getWeatherStat } from "../logic/OpenMeteo";
import { getAstro } from "../logic/ipGeoLocation";

function sdcv() {
  getWeatherStat("berlinn");
}

export default function Forcast(color) {
  // console.log(color.color.buttons)
  return (
    <div className="button-container">
      <button
        className="forcast-button main"
        style={{
          background: `linear-gradient(135deg, ${
            color ? color.color.buttons : "rgb(28, 102, 131)"
          } 0%, #e9e9e9ff 90%)`,
        }}
      >
        5-day forecast
      </button>
      <button
        className="forcast-button more"
        style={{
          background: `linear-gradient(135deg,  #e9e9e9ff 15%, ${
            color ? color.color.buttons : "rgb(28, 102, 131)"
          } 68%`,
        }}
        onClick={() => {
          getAstro("Vajargah");
        }}
      >
        vajargah
      </button>
    </div>
  );
}
