import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/Hud.css";
import Humidity from "../assets/humidity.svg?react";
import Pressure from "../assets/pressure.svg?react";
import Visibility from "../assets/visibility.svg?react";
import Wind from "../assets/wind.svg?react";
import { selectWeatherIcon } from "../logic/skyPattern.js";

interface HudPops {
  hudData: Record<string, any>;
  city: string;
  color: {
    background: string;
    hud: string;
    buttons: string;
    chart: string;
  };
  isSearching: boolean;
  page: string;
  setPage: any;
}

export default function Hud({
  hudData,
  city,
  color,
  isSearching,
  page,
  setPage,
}: HudPops) {
  const [Icon, setIcon] = useState<React.FC | null>(null);

  useEffect(() => {
    getIcon();
  }, [hudData?.weather_code]);

  async function getIcon() {
    if (hudData?.weather_code) {
      const IconName = selectWeatherIcon(hudData.weather_code);
      if (IconName) {
        const newIcon = await import(
          `../assets/weatherConditions/${IconName}.svg?react`
        );
        setIcon(() => newIcon.default);
      } else setIcon(() => null);
    } else setIcon(() => null);
  }

  return (
    <div>
      <motion.div
        className="city-container"
        animate={{
          left: isSearching ? "310px" : "0px",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <h2
          className="city"
          style={{ color: `${color ? color.hud : "rgb(237, 254, 255);"}` }}
        >
          {city}
        </h2>
      </motion.div>
      {page == "main" && hudData?.temperature ? (
        <div className="hud-container">
          <div
            className="hud-card main-temp-card"
            style={{ color: color.buttons }}
          >
            <div className="hud-temp-value">
              {hudData?.temperature ? `${hudData.temperature}°` : ""}
            </div>
            <div
              className="hud-temp-feelslike"
              style={{ color: color.buttons }}
            >
              {hudData?.apparent_temperature
                ? `Feels like ${hudData.apparent_temperature}°`
                : ""}
              <span className="hud-weather-status">
                {Icon ? <Icon /> : null}
              </span>
            </div>
          </div>

          <div className="hud-card info-card">
            {[
              {
                Icon: Humidity,
                value: `${hudData?.humidity ?? "-"}%`,
                label: "Humidity",
              },
              {
                Icon: Wind,
                value: `${hudData?.wind_speed ?? "-"} m/s`,
                label: "Wind",
              },
              {
                Icon: Visibility,
                value: `${hudData?.visibility ?? "-"} m`,
                label: "Visibility",
              },
              {
                Icon: Pressure,
                value: `${hudData?.pressure_msl ?? "-"} hPa`,
                label: "Pressure",
              },
            ].map((item, idx) => (
              <div key={idx} className="info-row" style={{color: color.buttons}}>
                <div className="icon-value-wrapper" data-tooltip={item.label}>
                  <item.Icon />
                  <span className="hud-value" style={{color: color.buttons}}>{item.value}</span>
                </div>
                {idx < 3 && <div className="separator" />}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {/* <style>
        {`
      .hud-info-item svg {
        border: 2px solid ${color.chart};
        background: ${color.chart};
      }
        .hud-weather-status svg {
        border: 2px solid ${color.chart};
        background: ${color.chart};
        }
    `}
      </style> */}
    </div>
  );
}
