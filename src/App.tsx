import "./App.css";
import React, { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { setCurrentCity, changeOrders } from "./logic/orderFunctions.js";
import CloseSvg from "./assets/close.svg?react";
import MinimizeSvg from "./assets/minimize.svg?react";
import MaximizeSvg from "./assets/maximize.svg?react";
import { selectWatherItem } from "./logic/formatData.js";
import Sky from "./components/Sky.js";
import SwitchButtons from "./components/SwitchCity.js";
import DataCard from "./components/DataCard.js";
import GetUpdate from "./components/Update.js";
import GetOptions from "./components/Options.js";
import AddCity from "./components/AddCity.js";
import Hud from "./components/Hud.js";
import Clock from "./components/Clock.js";

export default function App() {
  const [loadOrder, updateOrder] = useState({
    cityA: [],
    cityB: [],
    cityC: [],
  });
  const [city, updateCity] = useState("");
  const [Pattern, setPattern] = useState({
    background: "",
    hud: "",
    buttons: "",
    chart: "",
  });
  const [hudData, setHudData] = useState({});
  const [solarData, setsolarData] = useState({
    moonrise: "",
    moonset: "",
    sunrise: "",
    sunset: "",
    solar_noon: "",
  });
  const [isSearching, Searching] = useState(false);
  useEffect(() => {
    setCurrentCity(updateOrder, updateCity, setPattern, setsolarData);
  }, []);

  useEffect(() => {
    async function loadTemp() {
      const temp = await selectWatherItem(
        loadOrder.cityB.length > 0 ? loadOrder.cityB[2] : false,
        city
      );
      setHudData(temp);
      // console.log(temp)
    }
    if (city != "") {
      loadTemp();
    }
  }, [loadOrder]);
  return (
    <div
      className="app-background"
      style={{
        background: `${Pattern.background}`,
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
        <Sky solarData={solarData} city={city} />
      </div>
      <SwitchButtons
        onSwitchClick={(forward: boolean) => {
          changeOrders(
            updateOrder,
            updateCity,
            loadOrder,
            setPattern,
            setsolarData,
            forward
          );
        }}
      />
      <DataCard
        activeParameters={["temperature"]}
        weatherData={loadOrder.cityB.length > 0 ? loadOrder.cityB[2] : null}
        color={Pattern}
      />

      <GetOptions
      //  color={Pattern}
      />
      <AddCity
        set={{ updateOrder, updateCity, setPattern, setsolarData }}
        color={Pattern}
        isSearching={isSearching}
        Searching={Searching}
      />
      {/* <ReloadData /> */}
      <Clock color={Pattern} city={city} />
      <GetUpdate
        color={Pattern}
        city={city}
        set={{ updateOrder, updateCity, setPattern, setsolarData }}
        isSearching={isSearching}
      />
      <Hud
        hudData={hudData}
        city={city}
        color={Pattern}
        isSearching={isSearching}
      />
    </div>
  );
}
