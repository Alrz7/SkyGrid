import { useRef, useEffect, useState } from "react";
import Sun from "@assets/sun.svg?react";
import Moon from "@assets/moon.svg?react";
import IcSun from "@assets/IcSun.svg?react";
import IcMoon from "@assets/IcMoon.svg?react";
import "./styles/Soluna.css";

export default function SunComp({
  solarCondition,
  color,
  page,
  location,
  solarData,
}: {
  page: any;
  solarCondition: {
    sun: { isVisible: boolean; ratio: number };
    moon: { isVisible: boolean; ratio: number };
  };
  color: {
    background: any;
    hud: any;
    forecastButton: any;
    solunaProp: any;
    buttons: any;
    chart: any;
  };
  location: { sun: number[]; moon: number[] };
  solarData: {
    moonrise: string;
    moonset: string;
    sunrise: string;
    sunset: string;
  };
}) {
  const [showSun, setShowSun] = useState(false);
  const [showMoon, setShowMoon] = useState(false);

  useEffect(() => {
    const isSun = solarCondition.sun.isVisible;
    setShowSun(isSun);
    if (isSun) {
      setShowMoon(false);
    } else {
      setShowMoon(solarCondition.moon.isVisible);
    }
  }, [solarCondition]);
  // console.log(solarCondition);
  // console.log(location)
  return (
    <>
      {solarCondition.sun.isVisible && showSun ? (
        <div style={{ overflow: "hidden", opacity: "100%" }}>
          <Sun
            className="Sun"
            style={{
              top: `${
                location.sun[1] ? location.sun[1] - 75 : location.sun[1]
              }`,
              left: `${
                location.sun[0] ? location.sun[0] - 75 : location.sun[0]
              }`,
            }}
          />
        </div>
      ) : null}
      {solarCondition.moon.isVisible && showMoon ? (
        <div style={{ overflow: "hidden", opacity: "100%" }}>
          <Moon
            className="Moon"
            style={{
              top: `${
                location.moon[1] ? location.moon[1] - 30 : location.moon[1]
              }`,
              left: `${
                location.moon[0] ? location.moon[0] - 30 : location.moon[0]
              }`,
            }}
          />
        </div>
      ) : null}

      {page == "main" ? (
        <div className="toggle-buttons">
          <div className="tooltip-wrapper">
            <button
              className={`toggle-btn ${showSun ? "on" : ""}`}
              style={{
                background: showSun
                  ? color.solunaProp
                  : "rgba(255, 255, 255, 0.08)",

                boxShadow: showSun ? `0 0 20px ${color.forecastButton}` : "",
              }}
              onClick={() => {
                if (!showSun) {
                  setShowSun(true);
                  setShowMoon(false);
                }
              }}
            >
              <IcSun />
            </button>
            <span className="tooltip">
              sunrise: {solarData.sunrise}, sunset: {solarData.sunset}
            </span>
          </div>
          <div className="tooltip-wrapper">
            <button
              className={`toggle-btn ${showMoon ? "on" : ""}`}
              style={{
                background: showMoon
                  ? color.solunaProp
                  : "rgba(255, 255, 255, 0.08)",
                boxShadow: showMoon ? `0 0 20px ${color.forecastButton}` : "",
              }}
              onClick={() => {
                if (!showMoon) {
                  setShowMoon(true);
                  setShowSun(false);
                }
              }}
            >
              <IcMoon />
            </button>
            <span className="tooltip">
              moonrise: {solarData.moonrise}, moonset: {solarData.moonset}
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
}
