import React, { useState } from "react";
import Default from "@assets/default.svg?react";
import UpToDate from "@assets/isUpdate.svg?react";
import Update from "@assets/update.svg?react";
import { motion } from "framer-motion";
import "./styles/Update.css";
import { checkUpdate } from "../logic/updateDatas.js";
import * as tp from "./commonTypes.js";

interface GetUpdateProps {
  addNotif: tp.addNotif;
  city: string | null;
  PrimaryUpdateCity: tp.PrimaryUpdateCity;
  page: tp.page;
  color: tp.color;
  isSearching: boolean;
}

export default function GetUpdate({
  addNotif,
  PrimaryUpdateCity,
  page,
  city,
  color,
  isSearching,
}: GetUpdateProps) {
  const [logo, setLogo] = useState("Update");
  return (
    <div>
      {page == "main" ? (
        <motion.button
          className="update-button"
          animate={{
            left: isSearching ? "415px" : "105px",
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
              const result = checkUpdate(addNotif, city, true, false).then(
                (res) => {
                  if (res.ok) {
                    if (res.val) {
                      PrimaryUpdateCity(
                        true,
                        city,
                        res.val.daily,
                        res.val.hourly
                      );
                    }
                  }
                }
              );
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
      ) : null}
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
