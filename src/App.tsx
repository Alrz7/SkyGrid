import "./App.css";
import React, { use, useEffect, useState } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import {
  setCurrentCity,
  changeOrders,
  updateMainCity,
} from "./logic/orderFunctions.js";
import CloseSvg from "@assets/close.svg?react";
import MinimizeSvg from "@assets/minimize.svg?react";
import MaximizeSvg from "@assets/maximize.svg?react";
import { selectWatherItem } from "./logic/formatData.js";
import Sky from "./components/pages/Sky.js";
import SwitchButtons from "./components/SwitchCity.js";
import DataCard from "./components/DataCard.js";
import GetUpdate from "./components/Update.js";
import GetOptions from "./components/pages/Options.js";
import SearchCity from "./components/SearchCity.js";
import Hud from "./components/Hud.js";
import Forecast from "./components/pages/Forecast.js";
import Clock from "./components/Clock.js";
import Notif from "./components/Notifications.js";
import { checkUpdate } from "./logic/updateDatas.js";
import { saveConfig, readConfig } from "./logic/gridconfig.js";
import { svg } from "framer-motion/client";
export default function App() {
  const [loadOrder, updateOrder] = useState({
    cityA: [],
    cityB: [],
    cityC: [],
  });
  const [city, updateCity] = useState<string | null>(null);
  const [Pattern, setPattern] = useState({
    background: "",
    hud: "",
    forecastButton: "",
    solunaProp: "",
    buttons: "",
    chart: {},
  });
  const [hudData, setHudData] = useState({});
  const [solarData, setsolarData] = useState<{
    moonrise: string;
    moonset: string;
    sunrise: string;
    sunset: string;
    solar_noon: string;
  } | null>(null);
  const [isSearching, Searching] = useState(false);
  const [page, setPage] = useState<"main" | "forecast" | "options">("main");
  const [notifs, setNotifs] = useState<[string, string][]>([]);
  const [rememberCity, setRmbCity] = useState<boolean>(false);
  const [searchCount, setSearchCount] = useState<number>(20);
  const [autoUpdate, setAutoUpdate] = useState<boolean>(false);

  function updAutoUpdate() {
    const trgt = !autoUpdate;
    setAutoUpdate(trgt);
    saveConfig({ autoUpdate: trgt });
  }
  function updSearchCount(count: number) {
    setSearchCount(count);
    saveConfig({ searchCount: count });
  }
  function rmbCity(op: "set" | "save" = "save") {
    if (op == "save") {
      saveConfig({
        city: city,
        cityList: [loadOrder.cityA[0], loadOrder.cityB[0], loadOrder.cityC[0]],
      });
    } else {
      const crnt = !rememberCity;
      setRmbCity(crnt);
      saveConfig({ rememberCity: crnt });
    }
  }

  function addNotif(newNotif: [string, string]) {
    // console.log([newNotif, ...notifs]);
    setNotifs(() => [newNotif, ...notifs]);
  }

  async function restoreConfigs() {
    const config = await readConfig();
    setRmbCity(config.rememberCity);
    setSearchCount(config.searchCount);
    setAutoUpdate(config.autoUpdate);
  }

  async function doAutoUpdate() {
    if (city && autoUpdate) {
      const upd = await checkUpdate(addNotif, city, true, true);
      if (upd.ok && upd.val) {
        PrimaryUpdateCity(true, city, upd.val.daily, upd.val.hourly);
      }
    }
  }

  useEffect(() => {
    doAutoUpdate();
  }, [city]);

  useEffect(() => {
    setCurrentCity(
      updateOrder,
      updateCity,
      rememberCity,
      setPattern,
      addNotif,
      setsolarData
    );
    restoreConfigs();
  }, []);

  function PrimaryUpdateCity(
    save: boolean,
    cityName: string,
    current: Record<string, any> | null,
    hourly: Record<string, any> | null
  ) {
    console.log(rememberCity);
    updateMainCity(
      updateOrder,
      updateCity,
      setPattern,
      addNotif,
      setsolarData,
      save || rememberCity,
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
        <Sky solarData={solarData} city={city} page={page} color={Pattern} />
      </div>
      <SearchCity
        addNotif={addNotif}
        PrimaryUpdateCity={PrimaryUpdateCity}
        page={page}
        searchCount={searchCount}
        color={Pattern}
        isSearching={isSearching}
        Searching={Searching}
      />
      <SwitchButtons
        page={page}
        onSwitchClick={(forward: boolean) => {
          changeOrders(
            updateOrder,
            updateCity,
            rememberCity,
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
        page={page}
        city={city}
        updateCity={PrimaryUpdateCity}
        autupdt={{ stat: autoUpdate, set: updAutoUpdate }}
        srcnt={{ count: searchCount, set: updSearchCount }}
        rmb={{ stat: rememberCity, func: rmbCity, city: city }}
        setPage={setPage}
        addNotif={addNotif}
        //  color={Pattern}
      />
      {/* <ReloadData /> */}
      <Clock
        color={Pattern}
        city={city}
        page={page}
        isSearching={isSearching}
      />
      <GetUpdate
        addNotif={addNotif}
        color={Pattern}
        city={city}
        page={page}
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
