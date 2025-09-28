import React from "react";
import Addcity from "../assets/addcity.svg?react";
import "./styles/AddCity.css";
import { addLocation } from "../logic/GeoLocations";
import { checkHourly } from "../logic/updateDatas";

export default function AddCity(props) {
  async function addLoc() {
    const addingResult = await addLocation("dubai");
    if (addingResult) {
      const result = await checkHourly();
      if (result) {
        console.log(result);
        props.updateCity(result[2], result[0], result[1]);
      }
    }
  }
  return (
    <div>
      <button onClick={addLoc} className="addCity-button">
        <Addcity />
      </button>
    </div>
  );
}
