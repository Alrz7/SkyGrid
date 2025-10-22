import React from "react";
import Addcity from "../assets/addcity.svg?react";
import "./styles/AddCity.css";
import { addLocation } from "../logic/GeoLocations";
import { readData, getWeatherStat, toNameCase } from "../logic/OpenMeteo";

export default function AddCity({updateMainCity, set}) {
  async function addLoc() {
    const newLocation = await addLocation("vajargah");
    if (newLocation) {
      const newWeatherData = await getWeatherStat(
        newLocation[0],
        true,
        newLocation[1]
      );
      if (newWeatherData) {
        updateMainCity(set.updateOrder, set.updateCity, newLocation[0], newWeatherData[0], newWeatherData[1]);
      }
    }
    console.log(`${newLocation[0]} has been added`)
  }
  return (
    <div>
      <button onClick={addLoc} className="addCity-button">
        <Addcity />
      </button>
    </div>
  );
}
