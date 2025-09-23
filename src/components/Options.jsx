import React from "react";
import Options from "../assets/options.svg?react";
import "./styles/Options.css"

export default function GetOptions() {
  return (
    <div>
      <button className="options-button">
        <Options />
      </button>
    </div>
  );
}
