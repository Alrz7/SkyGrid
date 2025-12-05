import React, { useEffect, useState } from "react";
import Addcity from "../assets/addcity.svg?react";
import Search from "../assets/search.svg?react";
import CloseSearch from "../assets/closeSearch.svg?react";
import "./styles/SearchCity.css";
import { motion, AnimatePresence, circIn } from "framer-motion";
import {
  apiSearch,
  saveData as saveToLocations,
} from "../logic/GeoLocations.js";
import { getWeatherStat } from "../logic/OpenMeteo.js";
import { lookingFor, updateLocations } from "../logic/useCities.js";
import { toNameCase } from "../logic/sources/dry.js";
interface addcityProps {
  addNotif: any;
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
  addNotif,
  PrimaryUpdateCity,
  color,
  isSearching,
  Searching,
}: addcityProps) {
  const [input, setInput] = useState("");
  const [searchContent, setContent] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    // console.log(input);
  }, [input]);

  async function processNewLocation(cityName: string) {
    if (cityName !== "") {
      const newLocation = await apiSearch(addNotif, cityName);
      if (newLocation.ok && newLocation.list.length > 0) {
        const resultCItyList = newLocation.list.map(
          (cit: Record<string, any>) => {
            return {
              apiResult: true,
              ...cit,
            };
          }
        );
        console.log(resultCItyList);
        setContent((searchContent) => [...resultCItyList, ...searchContent]);
      }
    }
  }

  async function acceptSelectedResult(data: Record<string, any>) {
    if (data) {
      data.srcName = toNameCase(input);
      saveToLocations(data.name, data);
      updateLocations();
      console.log("api-req2");
      const newWeatherData = await getWeatherStat(
        addNotif,
        data.name,
        true,
        data
      );
      if (newWeatherData) {
        PrimaryUpdateCity(
          false,
          data.name,
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
                      key={item.nameInFile}
                      className="city-item"
                      onClick={() => {
                        if (item.apiResult) {
                          acceptSelectedResult(item);
                        } else {
                          PrimaryUpdateCity(
                            false,
                            item.nameInFile ?? item.name
                          );
                        }
                        // Searching(false);
                        // setInput("");
                        // setContent([])
                      }}
                    >
                      {item.name}/{item.admin1}/{item.country_code}
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
                  const allCities = lookingFor("").then((rs) => {
                    console.log(rs);
                    if (rs) {
                      setContent(rs as any);
                    }
                  });
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
                  const sContent = lookingFor(str).then((sc) => {
                    if (sc) {
                      // console.log(sc);
                      const resultCitylist = sc.map(
                        (cit: Record<string, any>) => {
                          return cit;
                        }
                      );
                      setContent(resultCitylist);
                      console.log(resultCitylist);
                    } else {
                      setContent([]);
                    }
                  });
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
                setContent([]);
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
