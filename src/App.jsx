import "./App.css";
import React, { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import {
  setCurrentCity,
  updateMainCity,
  changeOrders,
} from "./logic/orderFunctions";
import CloseSvg from "./assets/close.svg?react";
import MoreArrow from "./assets/arrow-right-up.svg?react";
import MinimizeSvg from "./assets/minimize.svg?react";
import MaximizeSvg from "./assets/maximize.svg?react";
// import { readData as readLocations } from "./logic/GeoLocations";
import { selectWatherItem } from "./logic/formatData";
import { selectPattern } from './logic/skyPattern';
// import {getWeather } from "./logic/openWeather";
// import { getAstro } from "./logic/astronomy";
// import { getGeoData } from "./logic/ipGeoLocation";
// import { readData as readOpmData } from "./logic/OpenMeteo";
// import { ftHourlyData } from "./logic/formatData";
import CurvedLine from "./components/CurvedLine";
import Ball from "./components/Sun";
import SwitchButtons from "./components/SwitchCity";
import DataCard from "./components/DataCard";
import GetOptions from "./components/Options";
import AddCity from "./components/AddCity";
import Hud from "./components/Hud";
// import { dataDir } from "@tauri-apps/api/path";

export default function App() {
  const [loadOrder, updateOrder] = useState({
    cityA: [],
    cityB: [],
    cityC: [],
  });
  const [city, updateCity] = useState({ Name: "", reservedName: "" });
  const [color, setColor] = useState({
    background: "",
    hud: "",
    buttons: "",
    chart: "",
  });
  useEffect(() => {
    setCurrentCity(updateOrder, updateCity, selectPattern, setColor);
  }, []);

  return (
    <div
      className="app-background"
      style={{
        background: `${color.background}`,
      }}
    >
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
      <div className="floating-ball">
        <CurvedLine />
        <Ball />
      </div>
      <SwitchButtons
        onSwitchClick={(forward) => {
          changeOrders(updateOrder, updateCity, loadOrder, selectPattern, setColor, forward);
        }}
      />
      <DataCard
        weatherData={loadOrder.cityB.length > 0 ? loadOrder.cityB[2] : null}
        color={color}
      />

      <GetOptions />
      <AddCity
        updateMainCity={updateMainCity}
        set={{ updateOrder, updateCity }}
      />
      {/* <ReloadData /> */}
      <Hud
        hudData={{
          city: city,
          mainTemp: selectWatherItem(
            loadOrder.cityB.length > 0 ? loadOrder.cityB[2] : false
          ),
          updateMainCity: updateMainCity,
        }}
        set={{ updateOrder, updateCity }}
        color={color}
      />
    </div>
  );
}
