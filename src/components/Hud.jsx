import React, { useState } from "react";
import "./styles/Hud.css";
import { checkHourly } from "../logic/updateDatas";
export default function Hud({ hudData, set, color }) {
  return (
    <div>
      <button
      onMouseEnter={() => {
        set.updateCity({Name:hudData.city.Name, reservedName:"Reload"})}}
      onMouseLeave={() => {
        set.updateCity({Name:hudData.city.Name, reservedName:hudData.city.Name})}}
        onClick={() => {
          const cityName = hudData.city.Name ?? false;
          if (cityName) {
            const result = checkHourly(cityName).then((r) => {
              if (r) {
                hudData.updateMainCity(
                  set.updateOrder,
                  set.updateCity,
                  cityName,
                  r[0],
                  r[1]
                );
              }
            });
          }
        }}
        className="reload-button"
      >
        {hudData.city.reservedName}
      </button>
      <div className="central-elements-container">
        <h1 className="hud main-temp" style={{color: `${color ? color.hud : "rgb(237, 254, 255);"}`}}>
          {hudData.mainTemp ? `${hudData.mainTemp.temperature}°` : ""}
        </h1>
      </div>
    </div>
  );
}
