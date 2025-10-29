import React, { useState } from "react";
import "./styles/Hud.css";
import { checkHourly } from "../logic/updateDatas";
export default function Hud({ hudData, updateMainCity, city, set, color }) {
  // console.log(hudData)
  // console.log(city)
  return (
    <div>
      <button
      onMouseEnter={() => {
        set.updateCity({Name:city.Name, reservedName:"Reload"})}}
      onMouseLeave={() => {
        set.updateCity({Name:city.Name, reservedName:city.Name})}}
        onClick={() => {
          const cityName = city.Name ?? false;
          if (cityName) {
            const result = checkHourly(cityName).then((r) => {
              if (r) {
                updateMainCity(
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
        className="reload-button" style={{color: `${color ? color.hud : "rgb(237, 254, 255);"}`}}
      >
        {city.reservedName}
      </button>
      <div className="central-elements-container">
        <h1 className="hud main-temp" style={{color: `${color ? color.hud : "rgb(237, 254, 255);"}`}}>
          {hudData != {} && hudData.temperature ? `${hudData.temperature}°` : ""}
        </h1>
      </div>
    </div>
  );
}
