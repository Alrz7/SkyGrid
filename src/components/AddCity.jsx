import React from "react";
import Addcity from "../assets/addcity.svg?react";
import "./styles/AddCity.css";
import { addLocation } from "../logic/GeoLocations";
import { readData, getWeatherStat, toNameCase } from "../logic/OpenMeteo";

export default function AddCity({ updateMainCity, set, color }) {
  async function addLoc() {
    const newLocation = await addLocation("New York");
    if (newLocation) {
      const newWeatherData = await getWeatherStat(
        newLocation[0],
        true,
        newLocation[1]
      );
      if (newWeatherData) {
        updateMainCity(
          set.updateOrder,
          set.updateCity,
          newLocation[0],
          newWeatherData[0],
          newWeatherData[1]
        );
      }
    }
    console.log(`${newLocation[0]} has been added`);
  }
  return (
    <div>
      <button onClick={addLoc} className="addCity-button">
        <Addcity />
      </button>
      {/* <style>
        {`
      .addCity-button {
        border: 2px solid ${color.chart};
        background: ${color.chart};
      }
    `}
      </style> */}
    </div>
  );
}
