import React, { useState } from "react";
import Addcity from "../assets/addcity.svg?react";
import Search from "../assets/search.svg?react";
import CloseSearch from "../assets/closeSearch.svg?react";
import "./styles/AddCity.css";
import { motion, AnimatePresence } from "framer-motion";
import { addLocation } from "../logic/GeoLocations";
import { getWeatherStat } from "../logic/OpenMeteo";

export default function AddCity({
  updateMainCity,
  set,
  color,
  isSearching,
  Searching
}) {
  const [input, setInput] = useState("");
  async function processNewLocation(cityName) {
    if (cityName != "") {
      const newLocation = await addLocation(cityName);
      if (newLocation) {
        
        const newWeatherData = await getWeatherStat(
          newLocation[0],
          true,
          newLocation[1]
        );
        if (newWeatherData) {
          updateMainCity(
            set.updateOrder,
            set.updateCity,
            set.setPattern,
            newLocation[0],
            newWeatherData[0],
            newWeatherData[1],
          );
        }
      }
    }else{
      console.log("'nothing' can not get searched!!!")
    }
  }
  return (
    <div className="search-container">
      <motion.div
        className="search-wrapper"
        animate={{
          width: isSearching ? "250px" : "35px",
          boxShadow: isSearching
            ? "0 2px 10px rgba(0, 0, 0, 0.1)"
            : "0 2px 10px rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        {
          <motion.button
            className="icon-btn"
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
              onChange={(e) => setInput(e.target.value)}
            />
          )}
        </AnimatePresence>

        {isSearching && (
          <motion.button
            className="icon-btn close-btn"
            onClick={() => Searching(false)}
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
  );
}
