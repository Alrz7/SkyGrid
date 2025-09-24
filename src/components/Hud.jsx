import React from "react";
import "./styles/Hud.css";
export default function Hud() {
  return (
    <div>
      <h3 className="city-name">New York</h3>
      <div className="central-elements-container">
        <h1 className="main-temp">19°</h1>
        <h3 className="temp-duration">clear 21°/ 14°</h3>
      </div>
    </div>
  );
}