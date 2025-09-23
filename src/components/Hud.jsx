import React from "react";
import "./styles/Hud.css";
export default function Hud() {
  return (
    <div>
      <h3 className="hud city-name">New York</h3>
      <h1 className="hud main-temp">19°</h1>
      <h3 className="hud temp-duration">clear 21°/ 14°</h3>
    </div>
  );
}