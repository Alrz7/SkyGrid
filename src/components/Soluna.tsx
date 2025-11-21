import { useRef, useEffect, useState } from "react";
import Sun from "../assets/sun.svg?react";
import Moon from "../assets/moon.svg?react";
import "./styles/BigBall.css";

export default function SunComp({
  solarCondition,
  location,
}: {
  solarCondition: {
    sun: { isVisible: boolean; ratio: number };
    moon: { isVisible: boolean; ratio: number };
  };
  location: { sun: number[]; moon: number[] };
}) {

  // console.log(solarCondition)
  // console.log(location)
  return (
    <>
      {solarCondition.sun.isVisible ? <div style={{ overflow: "hidden", opacity: "100%" }}>
        <Sun
          className="Sun"
          style={{
            top: `${location.sun[1] ? location.sun[1] - 75 : location.sun[1]}`,
            left: `${location.sun[0] ? location.sun[0] - 75 : location.sun[0]}`,
          }}
        />
      </div>: null}
      {solarCondition.moon.isVisible ? <div style={{ overflow: "hidden", opacity: "100%" }}>
        <Moon
          className="Moon"
          style={{
            top: `${location.moon[1] ? location.moon[1] - 30 : location.moon[1]}`,
            left: `${location.moon[0] ? location.moon[0] - 30 : location.moon[0]}`,
          }}
        />
      </div>: null}
    </>
  );
}
