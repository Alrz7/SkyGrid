import React from "react";
import { useEffect, useState } from "react";
import { motion, noop } from "framer-motion";
import Options from "../assets/options.svg?react";
import ClosePage from "../assets/closePage.svg?react";
import "./styles/Options.css";

export default function GetOptions({
  notifs,
  page,
  setPage,
  setNotifs,
}: {
  notifs: [string, string][];
  page: any;
  setPage: any;
  setNotifs: any;
}) {
  const [nav, setNav] = useState<"general" | "appearance" | "apikey" | "about">(
    "general"
  );
  return (
    <div>
      {page == "main" ? (
        <button
          className="options-button"
          onClick={() => {
            if (page != "options") {
              setPage("options");
            } else {
              setPage("main");
            }
          }}
        >
          <Options />
        </button>
      ) : null}
      <motion.div
        className={"options-panel open"}
        initial={{
          left: "33px",
          top: "0px",
          width: "35px",
          height: "34px",
          opacity: 0,
        }}
        animate={{
          left: page == "options" ? "50%" : "33px",
          top: page == "options" ? "-36%" : "0px",
          width: page == "options" ? "99%" : "35px",
          height: page == "options" ? "90%" : "34px",
          opacity: page == "options" ? "1" : "0",
          visibility: page == "options" ? "visible" : "hidden",
        }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
      >
        <button
          className="closePage-button"
          style={{ background: "#ffffff22" }}
          onClick={() => {
            setPage("main");
          }}
        >
          <ClosePage />
        </button>

        <nav className="settings-nav">
          <div className="nav-container">
            <ul className="nav-list">
              <li className="nav-item">
                <a
                  href="#general"
                  className={`nav-link ${nav == "general" ? "active" : null}`}
                  onClick={() => {
                    if (nav != "general") {
                      setNav("general");
                    }
                  }}
                >
                  General
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#appearance"
                  className={`nav-link ${
                    nav == "appearance" ? "active" : null
                  }`}
                  onClick={() => {
                    if (nav != "appearance") {
                      setNav("appearance");
                    }
                  }}
                >
                  Appearance
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#api"
                  className={`nav-link ${nav == "apikey" ? "active" : null}`}
                  onClick={() => {
                    if (nav != "apikey") {
                      setNav("apikey");
                    }
                  }}
                >
                  API Keys
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#about"
                  className={`nav-link ${nav == "about" ? "active" : null}`}
                  onClick={() => {
                    if (nav != "about") {
                      setNav("about");
                    }
                  }}
                >
                  About
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </motion.div>
    </div>
  );
}
