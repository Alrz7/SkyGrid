import { use, useEffect, useState } from "react";
import "./styles/clock.css";
import { findlocalTime } from "../logic/skyPattern.js";

export default function Clock({
  color,
  city,
  isSearching,
}: {
  color: {
    background: string;
    hud: string;
    buttons: string;
    chart: string;
  };
  city: string;
  isSearching: boolean;
}) {
  const [time, setTime] = useState({ time: "", zone: "" });

  useEffect(() => {
    let mounted = true;

    async function runClock() {
      while (mounted && city) {
        const localtime = await findlocalTime(city);
        if (localtime) {
          const secondsLeft = 60 - Number(localtime.time.fullTime.slice(6));
          setTime({
            time: localtime.time.fullTime.slice(0, 5),
            zone: localtime.zone,
          });
          await new Promise((r) => setTimeout(r, secondsLeft * 1000));
        }
      }
    }

    runClock();
    return () => {
      mounted = false;
    };
  }, [city]);

  return (
    <>{!isSearching ? 
      <div className="clock-container">
        <h2
          className="time-slot"
          style={{ color: color ? color.hud : "rgb(237, 254, 255)" }}
        >
          {time.time}
        </h2>
        <h5
          className="time-zone"
          style={{ color: color ? color.hud : "rgb(237, 254, 255)" }}
        >
          {time.zone}
        </h5>
      </div>: null}
    </>
  );
}
