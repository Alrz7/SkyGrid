import React from "react";
import "./styles/Hud.css";
import { checkHourly } from "../logic/updateDatas";
export default function Hud(props) {
  return (
    <div>
      <button
        onClick={() => {
          const cityName = props.hudData.cityName ?? false;
          if (cityName) {
            const result = checkHourly(cityName).then((r) => {
              if (r) {
                props.hudData.updateMainCity(cityName, r[0], r[1]);
              }
            });
          }
        }}
        className="reload-button"
      >
        {props.hudData.cityName ?? "loading"}
      </button>
      <div className="central-elements-container">
        <h1 className="hud main-temp">
          {props.hudData.mainTemp
            ? `${props.hudData.mainTemp.temperature}°`
            : ""}
        </h1>
      </div>
    </div>
  );
}
