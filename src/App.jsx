import "./App.css";
import { getCurrentWindow } from "@tauri-apps/api/window";
import CloseSvg from "./assets/close.svg?react";
import MinimizeSvg from "./assets/minimize.svg?react";
import MaximizeSvg from "./assets/maximize.svg?react";

import { create, writeTextFile, BaseDirectory } from "@tauri-apps/plugin-fs";
// import {getWeather } from "./logic/openWeather";
// import { getAstro } from "./logic/astronomy";
// import { getGeoData } from "./logic/ipGeoLocation";
import CurvedLine from "./components/CurvedLine";
import Ball from "./components/Sun";
import SwitchButtons from "./components/SwitchCity";
import DataCard from "./components/DataCard";
import GetOptions from "./components/Options";
import AddCity from "./components/AddCity";
import Forcast from "./components/Forcast";
import Hud from "./components/Hud";

// function requestWeather() {
//   getWeather("tehran").then();
// }

// async function getCityList() {
//   const lastfile = await readData();
//   if (lastfile) {
//     const list = Object.keys(lastfile);
//     console.log(list);
//   }
// }

// async function getDt() {
//   getGeoData("yazd");
// }

// async function astronomy() {
//   getAstro("yazd");
// }

export default function App() {
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
      <SwitchButtons />
      <DataCard />
      <GetOptions />
      <AddCity />
      <Forcast />
      <Hud />
    </div>
  );
}
