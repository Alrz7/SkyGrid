import React, { useState } from "react";
import Default from "../assets/default.svg?react";
import UpToDate from "../assets/isUpdate.svg?react";
import Update from "../assets/update.svg?react";
import { motion } from "framer-motion";
import "./styles/Update.css";
import { checkUpdate } from "../logic/updateDatas.js";

interface GetUpdateProps {
  addNotif: any;
  city: string;
  PrimaryUpdateCity: any;

  color: {
    background: string;
    hud: string;
    buttons: string;
    chart: string;
  };
  isSearching: boolean;
}

export default function GetUpdate({
  addNotif,
  PrimaryUpdateCity,
  city,
  color,
  isSearching,
}: GetUpdateProps) {
  const [logo, setLogo] = useState("Update");
  return (
    <div>
      {
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
              const result = checkUpdate(addNotif, city, true).then((res) => {
                if (res.ok) {
                  if (res.val) {
                    PrimaryUpdateCity(true, city, res.val[0], res.val[1]);
                  }
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
