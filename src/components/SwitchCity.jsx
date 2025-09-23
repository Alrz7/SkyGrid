import React from "react";
import ArrowLeft from "../assets/arrow_left.svg?react";
import ArrowRight from "../assets/arrow_right.svg?react";
import "./styles/SwitchCity.css";

export default function SwitchButtons() {
  return (
    <div>
      <button className="switch-button left">
        <ArrowLeft />
      </button>
      <button className="switch-button right">
        <ArrowRight />
      </button>
    </div>
  );
}
