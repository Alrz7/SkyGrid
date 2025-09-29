import "./App.css";
import React, { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import CloseSvg from "./assets/close.svg?react";
import MinimizeSvg from "./assets/minimize.svg?react";
import MaximizeSvg from "./assets/maximize.svg?react";
import { readData as readLocations } from "./logic/GeoLocations";
import { ftHourlyData, selectWatherItem } from "./logic/formatData";
// import {getWeather } from "./logic/openWeather";
// import { getAstro } from "./logic/astronomy";
// import { getGeoData } from "./logic/ipGeoLocation";
import { readData, getWeatherStat } from "./logic/OpenMeteo";
import CurvedLine from "./components/CurvedLine";
import Ball from "./components/Sun";
import SwitchButtons from "./components/SwitchCity";
import DataCard from "./components/DataCard";
import GetOptions from "./components/Options";
import AddCity from "./components/AddCity";
import Hud from "./components/Hud";
import { dataDir } from "@tauri-apps/api/path";

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
      const currentWeather = await readData("current");
      const hourlyWeather = await readData("hourly");
      // console.log(currentWeather)
      updateOrder({
        cityA: [
          cityA,
          currentWeather[cityA] ?? false,
          ftHourlyData(hourlyWeather[cityA]) ?? false,
        ],
        cityB: [
          newCity,
          currentWeather[newCity] ?? false,
          ftHourlyData(hourlyWeather[newCity]) ?? false,
        ],
        cityC: [
          cityC,
          currentWeather[cityC] ?? false,
          ftHourlyData(hourlyWeather[cityC]) ?? false,
        ],
      });
      console.log({
        cityA: [
          cityA,
          currentWeather[cityA] ?? false,
          ftHourlyData(hourlyWeather[cityA]) ?? false,
        ],
        cityB: [
          newCity,
          currentWeather[newCity] ?? false,
          ftHourlyData(hourlyWeather[newCity]) ?? false,
        ],
        cityC: [
          cityC,
          currentWeather[cityC] ?? false,
          ftHourlyData(hourlyWeather[cityC]) ?? false,
        ],
      });
    }
  }

  async function updateMainCity(cityName, current, hourly) {
    const locations = await readLocations();
    if (locations) {
      // console.log("updating => ", cityName, current, hourly);
      const newCityList = Object.keys(locations);
      const cityA = newCityList.at(-2);
      const cityC = newCityList.at(0);
      updateCity(cityName);
      const currentWeather = await readData("current");
      const hourlyWeather = await readData("hourly");
      updateOrder({
        cityA: [
          cityA,
          currentWeather[cityA] ?? false,
          ftHourlyData(hourlyWeather[cityA]) ?? false,
        ],
        cityB: [cityName, current ?? false, ftHourlyData(hourly) ?? false],
        cityC: [
          cityC,
          currentWeather[cityC] ?? false,
          ftHourlyData(hourlyWeather[cityC]) ?? false,
        ],
      });
      console.log(({
        cityA: [
          cityA,
          currentWeather[cityA] ?? false,
          ftHourlyData(hourlyWeather[cityA]) ?? false,
        ],
        cityB: [cityName, current ?? false, ftHourlyData(hourly) ?? false],
        cityC: [
          cityC,
          currentWeather[cityC] ?? false,
          ftHourlyData(hourlyWeather[cityC]) ?? false,
        ],
      }))
    }
  }

  async function changeOrders(forward = true) {
    const locations = await readLocations();
    if (locations) {
      const cityList = Object.keys(locations);
      const cityIndex = cityList.indexOf(loadOrder.cityB[0]);
      const newCityA = changeCity(cityList, cityIndex - 1, forward);
      const newCity = changeCity(cityList, cityIndex, forward);
      const newCityC = changeCity(cityList, cityIndex + 1, forward);
      console.log(cityList);
      console.log(newCityA + " " + newCity + " " + newCityC);
      const currentWeather = await readData("current");
      const hourlyWeather = await readData("hourly");
      const cityC = loadOrder.cityC;
      const cityB = loadOrder.cityB;
      updateCity(newCity);
      updateOrder({
        cityA:
          newCityA == cityB[0]
            ? cityB
            : [
                newCityA,
                currentWeather[newCityA] ?? false,
                ftHourlyData(hourlyWeather[newCityA]) ?? false,
              ],
        cityB:
          newCity == cityC[0]
            ? cityC
            : [
                newCity,
                currentWeather[newCity] ?? false,
                ftHourlyData(hourlyWeather[newCity]) ?? false,
              ],
        cityC: [
          newCityC,
          currentWeather[newCityC] ?? false,
          ftHourlyData(hourlyWeather[newCityC]) ?? false,
        ],
      });
      console.log({
        cityA:
          newCityA == cityB[0]
            ? cityB
            : [
                newCityA,
                currentWeather[newCityA] ?? false,
                ftHourlyData(hourlyWeather[newCityA]) ?? false,
              ],
        cityB:
          newCity == cityC[0]
            ? cityC
            : [
                newCity,
                currentWeather[newCity] ?? false,
                ftHourlyData(hourlyWeather[newCity]) ?? false,
              ],
        cityC: [
          newCityC,
          currentWeather[newCityC] ?? false,
          ftHourlyData(hourlyWeather[newCityC]) ?? false,
        ],
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
      <DataCard weatherData={loadOrder.cityB[2] ?? false} />
      <GetOptions />
      <AddCity updateCity={updateMainCity} />
      {/* <ReloadData /> */}
      <Hud
        hudData={{
          cityName: city,
          mainTemp: selectWatherItem(loadOrder.cityB[2]),
          updateMainCity: updateMainCity,
        }}
      />
    </div>
  );
}