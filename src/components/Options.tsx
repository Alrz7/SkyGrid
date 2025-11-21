import React from "react";
import Options from "../assets/options.svg?react";
import "./styles/Options.css"

export default function GetOptions(
//   {color}: {
//     background: string;
//     hud: string;
//     buttons: string;
//     chart: string;
// }
) {
  return (
    <div>
      
      <button className="options-button">
        <Options />
      </button>
      {/* <style>
        {`
      .options-button {
        border: 2px solid ${color.chart};
        background: ${color.chart};
      }
    `}
      </style> */}
    </div>
  );
}
