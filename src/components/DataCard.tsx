import { useState } from "react";
import AreaIcon from "@assets/areaChart.svg?react";
import LineIcon from "@assets/lineChart.svg?react";
import AreaChart from "./charts/AreaChart.js";
import LineChart from "./charts/LineChart.js";
import "./styles/DataCard.css";
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
interface DataCardProps {
  weatherData:
    | never[]
    | null
    | undefined
    | {
        hour: string;
        temperature: number;
        humidity: number;
        windSpeed: number;
      }[];
  color: {
    background: string;
    hud: string;
    forecastButton: string;
    solunaProp: string;
    buttons: string;
    chart: Record<string, Record<string, string>>;
  };
  page: string;
  setPage: SetState<"main" | "forecast" | "options">;
}

export default function DataCard({
  weatherData,
  color,
  page,
  setPage,
}: DataCardProps) {
  const [chartType, setType] = useState("area");
  return (
    <>
      {page == "main" ? (
        <div className="data-card" style={{ overflow: "visible" }}>
          {chartType == "area" ? (
            <AreaChart
              page={page}
              setPage={setPage}
              activeParameters={[
                "temperature",
                "apparent_temperature",
                "rain",
                "showers",
                "snowfall",
                "wind_speed",
              ]}
              weatherData={weatherData}
              color={color}
            />
          ) : (
            <LineChart weatherData={weatherData} />
          )}
          <div>
            <div className="button-container">
              <button
                className="forcast-button main"
                onClick={() => {
                  setPage("forecast");
                }}
              >
                7-day forecast
              </button>
            </div>

            <button
              className={`single-btn ${chartType == "area" ? "area" : "line"}`}
              onClick={() => {
                if (chartType == "area") {
                  setType("line");
                } else {
                  setType("area");
                }
              }}
            >
              {chartType == "area" ? <LineIcon /> : <AreaIcon />}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
