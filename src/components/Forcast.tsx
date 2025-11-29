import React from "react";
import "./styles/Forcast.css";
import { getWeatherStat } from "../logic/OpenMeteo.js";
import { getAstro } from "../logic/ipGeoLocation.js";
function sdcv() {
  getWeatherStat("berlinn");
}

export default function Forcast({
  page,
  setPage,
}: {
  page: string;
  setPage: any;
}) {
  //   color: {
  //     background: string;
  //     hud: string;
  //     buttons: string;
  //     chart: string;
  // }
  // console.log(color.color.buttons)
  return (
    <>
      {page == "main" ? (
        <div className="button-container">
          <button
            className="forcast-button main"
            // style={{
            //   background: `linear-gradient(135deg, ${
            //     color ? color.color.buttons : "rgba(255, 255, 255, 1)"
            //   } 0%, #e9e9e9ff 90%)`,
            // }}
          >
            5-day forecast
          </button>
          <button
            className="forcast-button more"
            // style={{
            //   background: `linear-gradient(135deg,  #e9e9e9ff 22%, ${
            //     color ? color.color.buttons : "rgba(255, 255, 255, 1)"
            //   } 68%`,
            // }}
            onClick={() => {
              setPage("more");
            }}
          >
            more
          </button>
        </div>
      ) : null}
    </>
  );
}
