import { use, useEffect, useState } from "react";
import "./styles/clock.css";
import { findlocalTime } from "../logic/skyPattern";

export default function Clock({ color, city }) {
  const [time, setTime] = useState({ time: "", zone: "" });

  useEffect(() => {
    let mounted = true;

    async function runClock() {
      while (mounted) {
        console.log(city);
        const localtime = await findlocalTime(city, "fullTime");
        console.log(localtime);
        const secondsLeft = 60 - Number(localtime.time.slice(6));
        console.log(secondsLeft);
        console.log({ time: localtime.time.slice(0, 5), zone: localtime.zone });
        setTime({ time: localtime.time.slice(0, 5), zone: localtime.zone });
        await new Promise((r) => setTimeout(r, secondsLeft * 1000));
      }
    }

    runClock();
    return () => {
      mounted = false;
    };
  }, [city]);

  return (
    <div className="clock-container">
      <h2
        className="time-slot"
        style={{ color: `${color ? color.hud : "rgb(237, 254, 255);"}` }}
      >
        {time.time}
      </h2>
      <h5
        className="time-zone"
        style={{ color: `${color ? color.hud : "rgb(237, 254, 255);"}` }}
      >
        {time.zone}
      </h5>
    </div>
  );
}
