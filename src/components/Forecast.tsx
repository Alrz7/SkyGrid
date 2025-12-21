"use client";
import "./styles/Forecast.css";
import Wind from "../assets/wind.svg?react";
import Rain from "../assets/rain.svg?react";
import Snow from "../assets/snow.svg?react";
import UvIndex from "../assets/uvIndex.svg?react";
import Weather from "../assets/weather.svg?react";
import Precipitation from "../assets/precipitation.svg?react";
import Showers from "../assets/showers.svg?react";
import Temp from "../assets/temp.svg?react";
import Date from "../assets/date.svg?react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ftForecastData } from "../logic/formatData.js";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  Zap,
} from "lucide-react";
import ClosePage from "../assets/closePage.svg?react";
import { ensuredForwardRef } from "react-use";

export default function Forecast({
  color,
  dailyForecast,
  weatherData,
  page,
  setPage,
}: {
  color: any;
  dailyForecast: any;
  weatherData:
    | never[]
    | null
    | undefined
    | {
        hour: string;
        temperature: number;
        humidity: number;
        windSpeed: number;
        weather_code: number;
      }[];
  page: string;
  setPage: any;
}) {
  const [iconList, setIconList] = useState<
    {
      hour: string;
      icon: any;
    }[]
  >([]);

  const [forecastData, setForecastData] = useState<Record<string, any>[]>([]);
  // const [hoverIndex, setHoverIndex] = useState(null);
  useEffect(() => {
    if (!dailyForecast) return;
    const newForecastData = ftForecastData(dailyForecast);
    setForecastData(newForecastData);
    console.log(newForecastData);
  }, [dailyForecast]);

  return (
    <motion.div
      className={"more-panel open"}
      initial={{ bottom: "-46%", opacity: 1 }}
      animate={{
        bottom: page != "forecast" ? "-46%" : "46%",
        visibility: page != "forecast" ? "hidden" : "visible",
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="DataColm">
        <div className="container info">
          <div>
            <Date />
          </div>
          <div>
            <Weather />
          </div>
          <div>
            <Temp />
          </div>
          <div>
            <Rain />
          </div>
          <div>
            <Showers />
          </div>
          <div>
            <Snow />
          </div>
          <div>
            <Precipitation />
          </div>
          <div>
            <Wind />
          </div>
          <div>
            <UvIndex />
          </div>
        </div>
        {forecastData?.length == 7
          ? forecastData.map((item, id) => {
              return (
                <DataColm
                  data={item}
                  // index={hoverIndex}
                  // setIndex={setHoverIndex}
                  // id={id}
                />
              );
            })
          : null}
      </div>
      <button
        className="closePage-button"
        onClick={() => {
          setPage("main");
        }}
      >
        <ClosePage />
      </button>
      {page == "forecast" ? <></> : null}
    </motion.div>
  );
}

function DataColm({
  data,
  // index,
  // setIndex,
  // id,
}: {
  data: Record<string, any>;
  // index: number | null;
  // setIndex: any;
  // id: number;
}) {
  const getWeatherIcon = (code: number) => {
    const iconProps = { size: 35, strokeWidth: 2.4, color: "white" };

    if (code === 0) return <Sun {...iconProps} />;
    if (code === 1 || code === 2)
      return <Sun {...iconProps} className="opacity-80" />;
    if (code === 3) return <Cloud {...iconProps} />;
    if (code >= 45 && code <= 48)
      return <Cloud {...iconProps} className="opacity-70" />;
    if (code >= 51 && code <= 57) return <CloudDrizzle {...iconProps} />;
    if (code >= 61 && code <= 67) return <CloudRain {...iconProps} />;
    if (code >= 71 && code <= 86) return <CloudSnow {...iconProps} />;
    if (code >= 95 && code <= 99) return <Zap {...iconProps} />;
    return <Cloud {...iconProps} />;
  };

  // const info = (inx: number | null) => {
  //   if (inx == null) return null;
  //   if (inx > 0) {
  //     return inx - 1;
  //   } else {
  //     return inx + 1;
  //   }
  // };

  return (
    <>
      <div
        className="container"
        // onMouseMove={() => {
        //   setIndex(id);
        // }}
        // onMouseLeave={() => {
        //   setIndex(null);
        // }}
      >
        <div className="date">{data.date}</div>
        <div className="code">{getWeatherIcon(data.code)}</div>
        <div className="temperature">
          <span>
            {data.tempMin}/{data.tempMax}
          </span>
        </div>
        <div className="rain element">
          {data.rainSum}
          <span className="parameter">mm</span>
        </div>
        <div className="shower element">
          {data.showersSum}
          <span className="parameter">mm</span>
        </div>
        <div className="snow element">
          {data.snowfallSum}
          <span className="parameter">mm</span>
        </div>
        <div className="precipitation element">
          {data.precipitationSum}
          <span className="parameter">%</span>
        </div>
        <div className="wind-speed element">
          {data.windSpeedMax}
          <span className="parameter">km/h</span>
        </div>
        <div className="uv-index element">
          {data.uvIndexMax}
          <span className="parameter">%</span>
        </div>
      </div>
    </>
  );
}
