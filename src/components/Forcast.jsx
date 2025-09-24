import React from "react";
import "./styles/Forcast.css"
import { getCurrentStat, getHourlyStat, getDailyStat } from "../logic/OpenMeteo"

function sdcv(){
  getDailyStat("Langgharud")
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
