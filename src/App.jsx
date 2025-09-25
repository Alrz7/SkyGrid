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
import { readData as getWeatherData } from "./logic/OpenMeteo";
import CurvedLine from "./components/CurvedLine";
import Ball from "./components/Sun";
import SwitchButtons from "./components/SwitchCity";
import DataCard from "./components/DataCard";
import GetOptions from "./components/Options";
import AddCity from "./components/AddCity";
import Hud from "./components/Hud";

export default function App() {
  const [loadOrder, updateOrder] = useState({
    cityA: [],
    cityB: [],
    cityC: [],
  });
  const [city, updateCity] = useState();
  useEffect(() => {
    setCurrentCity();
  }, []);

  async function setCurrentCity() {
    const locations = await readLocations();
    if (locations) {
      // console.log(locations);
      const newCityList = Object.keys(locations);
      const newCity = newCityList[0];
      updateCity(newCity);
      const cityA = newCityList.at(-1);
      const cityC = newCityList.at(1);
      // console.log(cityA + " " + cityA)
      const currentWeather = await getWeatherData("current");
      // console.log(currentWeather)
      updateOrder({
        cityA: [cityA, currentWeather[cityA] ?? false],
        cityB: [newCity, currentWeather[newCity] ?? false],
        cityC: [cityC, currentWeather[cityC] ?? false],
      });
      // console.log({
      //   cityA: [cityA, currentWeather[cityA] ?? false],
      //   cityB: [newCity, currentWeather[newCity] ?? false],
      //   cityC: [cityC, currentWeather[cityC] ?? false],
      // });
    }
  }

  async function changeOrders(forward = true) {
    const locations = await readLocations();
    if (locations) {
      const cityList = Object.keys(locations);
      const cityIndex = cityList.indexOf(loadOrder.cityB[0]);
      const newCityA = changeCity(cityList, cityIndex - 1, forward);
      const city = changeCity(cityList, cityIndex, forward);
      const newCityC = changeCity(cityList, cityIndex + 1, forward);
      console.log(cityList)
      console.log(newCityA + " "+ city + ' '+ newCityC)
      const currentWeather = await getWeatherData("current");
      const cityC = loadOrder.cityC;
      const cityB = loadOrder.cityB;
      updateCity(city)
      updateOrder({
        cityA:
          newCityA == cityB[0]
            ? cityB
            : [newCityA, currentWeather[newCityA] ?? false],
        cityB: city == cityC[0] ? cityC : [city, currentWeather[city] ?? false],
        cityC: [newCityC, currentWeather[newCityC] ?? false],
      });
      console.log({
        cityA:
          newCityA == cityB[0]
            ? cityB
            : [newCityA, currentWeather[newCityA] ?? false],
        cityB: city == cityC[0] ? cityC : [city, currentWeather[city] ?? false],
        cityC: [newCityC, currentWeather[newCityC] ?? false],
      });
    }
    // console.log(cityIndex + "" + city);
  }

  function changeCity(cityList, cityIndex, forward) {
    if (forward) {
      if (cityIndex < cityList.length - 1) {
        const newindex = cityIndex + 1;
        return cityList[newindex];
      } else {
        return cityList[0];
      }
    } else {
      if (cityIndex <= 0) {
        const newindex = cityList.length - 1;
        return cityList[newindex];
      } else {
        const newindex = cityIndex - 1;
        return cityList[newindex];
      }
    }
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
          changeOrders(forward);
        }}
      />
      <DataCard />
      <GetOptions />
      <AddCity />
      <Hud huddata={{ city: city, cityData: loadOrder.cityB }} />
    </div>
  );
}
