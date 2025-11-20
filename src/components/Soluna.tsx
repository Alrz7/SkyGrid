import { useRef, useEffect, useState } from "react";
import Sun from "../assets/sun.svg?react";
import Moon from "../assets/moon.svg?react";
import CurvedLine from "./CurvedLine.js";
import "./styles/BigBall.css";

export default function SunComp({
  solarData,
}: {
  solarData: Record<string, any>;
}) {
  const [location, setLocation] = useState([540, 184]);

  if (solarData?.isSunTime) {
    return (
      <>
        <CurvedLine setLocation={setLocation} />
        <Sun
          className="Sun"
          style={{
            top: `${location[1] ? location[1] - 75 : location[1]}`,
            left: `${location[0] ? location[0] - 75 : location[0]}`,
          }}
        />
      </>
    );
  } else {
    return (
      <div style={{overflow: "hidden"}}>
        <CurvedLine setLocation={setLocation} />

        <Moon
          className="Moon"
          style={{top: `${location[1] ? location[1] - 30 : location[1]}`,
            left: `${location[0] ? location[0] - 30 : location[0]}`}}
        />
      </div>
    );
  }
}
