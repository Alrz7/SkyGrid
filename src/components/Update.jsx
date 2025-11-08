import React, { useState } from "react";
import Default from "../assets/default.svg?react";
import UpToDate from "../assets/isUpdate.svg?react";
import Update from "../assets/update.svg?react";
import "./styles/Update.css";
import { checkUpdate } from "../logic/updateDatas";

export default function GetUpdate({ updateMainCity, city, set, color }) {
  const [logo, setLogo] = useState("Default");
  return (
    <div>
      <button
        className="update-button"
        onMouseEnter={() => {
          if (city) {
            const result = checkUpdate(city, false).then((res) => {
              if (res) {
                setLogo("Update");
              } else {
                setLogo("UpToDate");
              }
            });
          }
        }}
        onMouseLeave={() => {
          console.log("leaaavveeeee")
            setLogo("Default");
        }}
        onClick={() => {
          if (city) {
            const result = checkUpdate(city, true).then((res) => {
              if (res.ok) {
                updateMainCity(
                  set.updateOrder,
                  set.updateCity,
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
      </button>
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
