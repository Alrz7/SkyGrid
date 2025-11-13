import React, { useState } from "react";
import Addcity from "../assets/addcity.svg?react";
import Search from "../assets/search.svg?react";
import CloseSearch from "../assets/closeSearch.svg?react";
import "./styles/AddCity.css";
import { motion, AnimatePresence } from "framer-motion";
import { addLocation } from "../logic/GeoLocations";
import { readData, getWeatherStat, toNameCase } from "../logic/OpenMeteo";
import { getAstro } from "../logic/astronomy"; // not gonna use it now

export default function AddCity({
  updateMainCity,
  set,
  color,
  isSearching,
  Searching,
}) {
  async function addLoc() {
    const newLocation = await addLocation("rasht");
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
          newLocation[0],
          newWeatherData[0],
          newWeatherData[1]
        );
      }
    }
    console.log(`${newLocation[0]} has been added`);
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
            onClick={(isSearching) => Searching(true)}
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
