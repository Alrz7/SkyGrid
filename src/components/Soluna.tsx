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
  const ballRef = useRef<SVGSVGElement>(null);
  const [location, setLocation] = useState([540, 184]);

  // function getSolunaLocation() {
  //   const pageWidth = window.innerWidth;
  //   const pageHeight = window.innerHeight;

  //   const entPoint = 0.5;
  //   const x = pageWidth * entPoint - pageWidth / 2;
  //   const y = curvature * (x + 90) ** 2 + pageHeight * 0.01;

  //   setLocation([pageWidth * entPoint, y]);
  // }
  // useEffect(() => {
  //   const observer = new ResizeObserver(() => {
  //     // getSolunaLocation();
  //   });
  //   observer.observe(document.body);
  //   return () => observer.disconnect();
  // }, []);

  if (solarData?.isSunTime) {
    return (
      <>
        <CurvedLine setLocation={setLocation} />
        <Sun
          className="Sun"
          ref={ballRef}
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
          ref={ballRef}
          style={{ left: `${location[0]}`, top: `${location[1]}` }}
        />
      </div>
    );
  }
}
