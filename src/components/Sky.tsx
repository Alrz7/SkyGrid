import { useEffect, useRef, useState } from "react";
import Sky from "../assets/roadLine.svg?react";
import Soluna from "./Soluna.js";
import BackGroundStars from "./BackGroundStars.js";
import { setSphere } from "../logic/solarSystem.js";
import "./styles/Sky.css";

export default function CurvedLineComp({
  solarData,
  city,
  page,
  color,
}: {
  page: any;
  solarData: {
    moonrise: string;
    moonset: string;
    sunrise: string;
    sunset: string;
    solar_noon: string;
  };
  city: string;
  color: {
    background: any;
    hud: any;
    forecastButton: any;
    solunaProp: any;
    buttons: any;
    chart: any;
  };
}) {
  // console.log(solarData);
  const svgRef = useRef<SVGSVGElement>(null);
  const [location, setLocation] = useState({
    sun: [540, 184],
    moon: [540, 184],
  });
  const [solarCondition, setCondition] = useState({
    sun: { isVisible: false, ratio: -1 },
    moon: { isVisible: false, ratio: -1 },
  });

  useEffect(() => {
    if (!city || city == "") return;
    setSphere(city, solarData, setCondition);
  }, [city, solarData]);

  const getSVGCorners = () => {
    if (!svgRef.current) return null;
    let newLocationData = { ...location };
    for (let [key, val] of Object.entries(solarCondition)) {
      if (val.isVisible && val.ratio !== -1) {
        const svg = svgRef.current;
        const rect = svg.getBoundingClientRect();
        const locDatas = getDynamicParabola(rect.width, rect.top);

        let entPoint = 1 - val.ratio; // the algorithem counts the curved line's details UPSIDE DOWN  so we need to rotate those sides to make it usual.
        let calPoint = 0;
        if (entPoint < 0.5) {
          calPoint = 1 - entPoint + 0.08;
          entPoint = entPoint - 0.09;
        } else if (entPoint > 0.5) {
          calPoint = 1 - entPoint;
        } else {
          calPoint = entPoint;
        }
        const x = window.innerWidth * calPoint - window.innerWidth / 2;
        const y = locDatas.a * (x + locDatas.h) ** 2 + locDatas.k;
        // console.log(window.innerWidth * entPoint, y);
        newLocationData[key as "sun" | "moon"] = [
          window.innerWidth * entPoint,
          y,
        ];
      }
      setLocation(newLocationData);
    }
  };

  useEffect(() => {
    if (solarCondition.sun.isVisible || solarCondition.moon.isVisible) {
      const handleResize = () => {
        getSVGCorners();
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, [solarCondition]);

  return (
    <>
      <Soluna
        location={location}
        color={color}
        page={page}
        solarCondition={solarCondition}
        solarData={solarData}
      />
      {solarCondition.sun.isVisible ? null : <BackGroundStars />}
      {solarCondition.sun.isVisible || solarCondition.moon.isVisible ? (
        <Sky className="Sky-line" ref={svgRef} />
      ) : null}
    </>
  );
}

const getDynamicParabola = (svgWidth: number, svgTop: number) => {
  const scale = svgWidth / 874;
  const a = 0.001 * (1 / scale);
  const h = -40 * scale;
  const k = svgTop - 12 * scale - 45;
  return { a, h, k };
};
