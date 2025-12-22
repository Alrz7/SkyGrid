import "./App.css";
import React, { useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import {
  setCurrentCity,
  changeOrders,
  updateMainCity,
} from "./logic/orderFunctions.js";
import CloseSvg from "./assets/close.svg?react";
import MinimizeSvg from "./assets/minimize.svg?react";
import MaximizeSvg from "./assets/maximize.svg?react";
import { selectWatherItem } from "./logic/formatData.js";
import Sky from "./components/Sky.js";
import SwitchButtons from "./components/SwitchCity.js";
import DataCard from "./components/DataCard.js";
import GetUpdate from "./components/Update.js";
import GetOptions from "./components/Options.js";
import SearchCity from "./components/SearchCity.js";
import Hud from "./components/Hud.js";
import Forecast from "./components/Forecast.js";
import Clock from "./components/Clock.js";
import Notif from "./components/Notifications.js";
import { color } from "framer-motion";

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
    forecastButton: "",
    solunaProp: "",
    buttons: "",
    chart: {},
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
  const [page, setPage] = useState("main");
  const [notifs, setNotifs] = useState<[string, string][]>([]);

  function addNotif(newNotif: [string, string]) {
    console.log([newNotif, ...notifs]);
    setNotifs(() => [newNotif, ...notifs]);
  }

  useEffect(() => {
    setCurrentCity(updateOrder, updateCity, setPattern, addNotif, setsolarData);
  }, []);

  function PrimaryUpdateCity(
    direct: boolean,
    cityName: string,
    current: Record<string, any> | null,
    hourly: Record<string, any> | null
  ) {
    updateMainCity(
      updateOrder,
      updateCity,
      setPattern,
      addNotif,
      setsolarData,
      direct,
      cityName,
      current,
      hourly
    );
  }

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
      <div style={{ overflow: "hidden" }}>
        <Sky solarData={solarData} city={city} color={Pattern} />
      </div>
      <SearchCity
        addNotif={addNotif}
        PrimaryUpdateCity={PrimaryUpdateCity}
        color={Pattern}
        isSearching={isSearching}
        Searching={Searching}
      />
      <SwitchButtons
        onSwitchClick={(forward: boolean) => {
          changeOrders(
            updateOrder,
            updateCity,
            loadOrder,
            setPattern,
            addNotif,
            setsolarData,
            forward
          );
        }}
      />
      <DataCard
        page={page}
        setPage={setPage}
        weatherData={loadOrder.cityB.length > 0 ? loadOrder.cityB[2] : null}
        color={Pattern}
      />

      <GetOptions
        notifs={notifs}
        setNotifs={setNotifs}
        //  color={Pattern}
      />
      {/* <ReloadData /> */}
      <Clock color={Pattern} city={city} isSearching={isSearching} />
      <GetUpdate
        addNotif={addNotif}
        color={Pattern}
        city={city}
        PrimaryUpdateCity={PrimaryUpdateCity}
        isSearching={isSearching}
      />
      <Forecast
        page={page}
        dailyForecast={loadOrder.cityB.length > 0 ? loadOrder.cityB[1] : null}
        setPage={setPage}
        weatherData={loadOrder.cityB.length > 0 ? loadOrder.cityB[2] : null}
        color={Pattern}
      />
      <Hud
        page={page}
        setPage={setPage}
        hudData={hudData}
        city={city}
        color={Pattern}
        isSearching={isSearching}
      />
      <Notif notifs={notifs} setNotifs={setNotifs} />
    </div>
  );
}
