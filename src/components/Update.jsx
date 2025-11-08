import React from "react";
import Update from "../assets/update.svg?react";
import "./styles/Update.css";

export default function GetUpdate({color}) {
  return (
    <div>
      <button className="update-button">
        <Update />
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
