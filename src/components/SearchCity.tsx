import React, { useEffect, useState } from "react";
import Addcity from "../assets/addcity.svg?react";
import Search from "../assets/search.svg?react";
import CloseSearch from "../assets/closeSearch.svg?react";
import "./styles/SearchCity.css";
import { motion, AnimatePresence } from "framer-motion";
import { addLocation } from "../logic/GeoLocations.js";
import { getWeatherStat } from "../logic/OpenMeteo.js";
import { lookingFor } from "../logic/useCities.js";

interface addcityProps {
  PrimaryUpdateCity: any;
  color: {
    background: string;
    hud: string;
    buttons: string;
    chart: string;
  };
  isSearching: boolean;
  Searching: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SearchCity({
  PrimaryUpdateCity,
  color,
  isSearching,
  Searching,
}: addcityProps) {
  const [input, setInput] = useState("");
  const [searchContent, setContent] = useState<string[]>([]);
  useEffect(() => {
    console.log(input);
  }, [input]);
  async function processNewLocation(cityName: string) {
    const newLocation = await addLocation(cityName);
    if (newLocation) {
      const newWeatherData = await getWeatherStat(
        newLocation[0],
        true,
        newLocation[1]
      );
      if (newWeatherData) {
        PrimaryUpdateCity(
          true,
          newLocation[0],
          newWeatherData[0],
          newWeatherData[1]
        );
      }
    } else {
      console.log("'nothing' can not get searched!!!");
    }
  }
  return (
    <div>
      {isSearching && searchContent.length > 0 ? (
        <div className="floating-panel">
          <div className="panel-content">
            {searchContent.length > 0
              ? searchContent.map((item) => {
                  return (
                    <button
                      className="city-item"
                      onClick={() => {
                        Searching(false);
                        setInput("");
                        PrimaryUpdateCity(false, item);
                      }}
                    >
                      {item}
                    </button>
                  );
                })
              : null}
          </div>
        </div>
      ) : null}
      <div className="search-container">
        <motion.div
          className="search-wrapper"
          style={{
            background: `${
              isSearching ? "rgba(255, 255, 255, 0.15)" : "#00000000"
            }`,
          }}
          animate={{
            width: isSearching ? "350px" : "35px",
            boxShadow: isSearching
              ? "0 2px 10px rgba(0, 0, 0, 0.1)"
              : "0 2px 10px rgba(0, 0, 0, 0)",
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {
            <motion.button
              className={`icon-btn ${
                isSearching && searchContent.length <= 0 && input.length > 0
                  ? "search-btn"
                  : ""
              }`}
              onClick={() => {
                if (isSearching === false) {
                  Searching(true);
                } else {
                  processNewLocation(input);
                }
              }}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {isSearching ? <Search /> : <Addcity />}
            </motion.button>
          }

          <AnimatePresence>
            {isSearching && (
              <motion.input
                key="input"
                type="text"
                placeholder="search"
                className="search-input"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                onChange={(e) => {
                  const str = e.target.value;
                  setInput(str);
                  if (str !== "") {
                    const sContent = lookingFor(str).then((sc) => {
                      if (sc) {
                        setContent(sc);
                        console.log(sc);
                      } else {
                        setContent([]);
                      }
                    });
                  } else {
                    setContent([]);
                  }
                }}
              />
            )}
          </AnimatePresence>

          {isSearching && (
            <motion.button
              className="icon-btn close-btn"
              onClick={() => {
                Searching(false);
                setInput("");
                setContent([])
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CloseSearch />
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
