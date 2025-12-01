"use client";
import "./styles/Forecast.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudDrizzle,
  Zap,
} from "lucide-react";
import ClosePage from "../assets/closePage.svg?react";


export default function More({
  color,
  weatherData,
  page,
  setPage,
}: {
  color: any;
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

  useEffect(() => {
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
    if (weatherData) {
      const newIconList = weatherData.map((e) => {
        return { hour: e.hour, icon: getWeatherIcon(e.weather_code) };
      });
      setIconList(newIconList);
      console.log(iconList);
    }
  }, [weatherData]);

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
