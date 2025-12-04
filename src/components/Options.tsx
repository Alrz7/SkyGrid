import React from "react";
import Options from "../assets/options.svg?react";
import "./styles/Options.css";

export default function GetOptions({
  notifs,
  setNotifs,
}: {
  notifs: [string, string][];
  setNotifs: any;
}) {
  //   {color}: {
  //     background: string;
  //     hud: string;
  //     buttons: string;
  //     chart: string;
  // }
  return (
    <div>
      <button
        className="options-button"
        onClick={() => {
          setNotifs(() => [["warning", "newInfo22"], ...notifs]);
        }}
      >
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
