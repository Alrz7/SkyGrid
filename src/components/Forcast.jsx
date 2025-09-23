import React from "react";
import "./styles/Forcast.css"
import { getDailyStat } from "../logic/OpenMeteo"

function sdcv(){
  getDailyStat("Langarud")
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
