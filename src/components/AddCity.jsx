import React from "react";
import Addcity from "../assets/addcity.svg?react";
import "./styles/AddCity.css"
import {addLocation} from '../logic/GeoLocations';


function addLoc() {
  addLocation("Tabriz");
}


export default function AddCity() {
  return (
    <div>
      <button onClick={addLoc} className="addCity-button">
        <Addcity />
      </button>
    </div>
  );
}
