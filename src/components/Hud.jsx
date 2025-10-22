import React from "react";
import "./styles/Hud.css";
import { checkHourly } from "../logic/updateDatas";
export default function Hud({hudData, set}) {
  return (
    <div>
      <button
        onClick={() => {
          const cityName = hudData.cityName ?? false;
          if (cityName) {
            const result = checkHourly(cityName).then((r) => {
              if (r) {
                hudData.updateMainCity(set.updateOrder, set.updateCity, cityName, r[0], r[1]);
              }
            });
          }
        }}
        className="reload-button"
      >
        {hudData.cityName ?? "loading"}
      </button>
      <div className="central-elements-container">
        <h1 className="hud main-temp">
          {hudData.mainTemp
            ? `${hudData.mainTemp.temperature}°`
            : ""}
        </h1>
      </div>
    </div>
  );
}
