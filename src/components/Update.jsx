import React, { useState } from "react";
import Default from "../assets/default.svg?react";
import UpToDate from "../assets/isUpdate.svg?react";
import Update from "../assets/update.svg?react";
import { motion, AnimatePresence } from "framer-motion";
import "./styles/Update.css";
import { checkUpdate } from "../logic/updateDatas";
export default function GetUpdate({
  updateMainCity,
  city,
  set,
  color,
  isSearching,
}) {
  const [logo, setLogo] = useState("Update");
  return (
    <div>
      {
        <motion.button
          className="update-button"
          animate={{
            left: isSearching ? "315px" : "105px",
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          // onMouseEnter={() => {
          //   setLogo("Update")
          //   if (city) {
          //     const result = checkUpdate(city, false).then((res) => {
          //       if (res) {
          //         setLogo("Update");
          //       } else {
          //         setLogo("UpToDate");
          //       }
          //     });
          //   }
          // }}
          // onMouseLeave={() => {
          //     setLogo("Default");
          // }}
          onClick={() => {
            if (city) {
              const result = checkUpdate(city, true).then((res) => {
                if (res.ok) {
                  updateMainCity(
                    set.updateOrder,
                    set.updateCity,
                    set.setPattern,
                    city,
                    res.val[0],
                    res.val[1]
                  );
                }
              });
            }
          }}
        >
          {logo == "Update" ? (
            <Update />
          ) : logo == "UpToDate" ? (
            <UpToDate />
          ) : (
            <Default />
          )}
        </motion.button>
      }
      {/* <style>
        {`
      .update-button {
        border: 2px solid ${color.chart};
        background: ${color.chart};
      }
    `}
      </style> */}
    </div>
  );
}
