import React from "react";
import "./styles/Forcast.css"
import { getWeatherStat } from "../logic/OpenMeteo"
import { getAstro } from '../logic/ipGeoLocation';

function sdcv(){
  getWeatherStat("berlinn")
}

export default function Forcast() {
  return (
    <div className="button-container">
      <button className="forcast-button main">5-day forecast</button>
      <button className="forcast-button more" onClick={() => {getAstro("Langarud")}}>More</button>
    </div>
  );
}
