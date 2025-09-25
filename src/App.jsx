import "./App.css";
import React, { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import CloseSvg from "./assets/close.svg?react";
import MinimizeSvg from "./assets/minimize.svg?react";
import MaximizeSvg from "./assets/maximize.svg?react";
import { readData as readLocations } from "./logic/GeoLocations";
// import {getWeather } from "./logic/openWeather";
// import { getAstro } from "./logic/astronomy";
// import { getGeoData } from "./logic/ipGeoLocation";
import CurvedLine from "./components/CurvedLine";
import Ball from "./components/Sun";
import SwitchButtons from "./components/SwitchCity";
import DataCard from "./components/DataCard";
import GetOptions from "./components/Options";
import AddCity from "./components/AddCity";
import Hud from "./components/Hud";

export default function App() {
  const [cityIndex, updateIndex] = useState();
  const [cityList, updateCityList] = useState();
  const [city, updateCity] = useState();
  useEffect(() => {
    setCurrentCity();
  }, []);

  async function setCurrentCity() {
    if (!cityList) {
      const locations = await readLocations();
      if (locations) {
        console.log(locations);
        const newCityList = Object.keys(locations);
        updateCityList(newCityList);
        updateIndex(0);
        updateCity(newCityList[0]);
        // console.log(cityIndex + " " + city);
      }
    }
  }

  function changeCity(forward = true) {
    console.log("chNging");
    if (forward) {
      if (cityIndex < cityList.length - 1) {
        const newindex = cityIndex + 1;
        updateIndex(newindex);
        updateCity(cityList[newindex]);
      } else {
        updateIndex(0);
        updateCity(cityList[0]);
      }
    } else {
      if (cityIndex == 0) {
        const newindex = cityList.length - 1;
        updateIndex(newindex);
        updateCity(cityList[newindex]);
      } else {
        const newindex = cityIndex - 1;
        updateIndex(newindex);
        updateCity(cityList[newindex]);
      }
    }
    // console.log(cityIndex + "" + city);
  }

  return (
    <div className="app-background">
      <div
        data-tauri-drag-region
        style={{
          width: "100%",
          height: "10%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 50,
        }}
      ></div>
      <button
        onClick={async () => await getCurrentWindow().close()}
        className="window-buttons close"
      >
        <CloseSvg />
      </button>
      <button
        onClick={async () => await getCurrentWindow().toggleMaximize()}
        className="window-buttons maximize"
      >
        <MaximizeSvg />
      </button>
      <button
        onClick={async () => await getCurrentWindow().minimize()}
        className="window-buttons minimize"
      >
        <MinimizeSvg />
      </button>
      <CurvedLine />
      <Ball />
      <SwitchButtons
        onSwitchClick={(forward) => {
          changeCity(forward);
        }}
      />
      <DataCard />
      <GetOptions />
      <AddCity />
      <Hud huddata={city} />
    </div>
  );
}
