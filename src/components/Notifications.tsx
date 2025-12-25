import "./styles/Notifications.css";
import Alert from "@assets/alert.svg?react";
import Warning from "@assets/warning.svg?react";
import Check from "@assets/check.svg?react";
import Info from "@assets/info.svg?react";
import { motion, AnimatePresence, delay } from "framer-motion";
import { useEffect, useState } from "react";

export default function Notif({
  notifs,
  setNotifs,
}: {
  notifs: [string, string][];
  setNotifs: any;
}) {
  useEffect(() => {
    if (notifs.length === 0) return;

    const timer = setTimeout(() => {
      setNotifs((prev: any) => prev.slice(1));
      console.log(notifs);
    }, 1600 - notifs.length * 400);

    return () => clearTimeout(timer);
  }, [notifs]);

  return (
    <motion.div
      className="notif-container"
      animate={{
        top: notifs.length >= 1 ? "50px" : "-55px",
      }}
      transition={{ duration: 0.1, ease: "easeInOut" }}
    >
      {notifs[0] && notifs[0][0] == "success" ? (
        <div className="alert success">
          <div className="alert-icon">
            <Check />
          </div>
          <div className="alert-text">{notifs[0][1]}</div>
        </div>
      ) : notifs[0] && notifs[0][0] == "info" ? (
        <div className="alert info">
          <div className="alert-icon">
            <Info />
          </div>
          <div className="alert-text">{notifs[0][1]}</div>
        </div>
      ) : notifs[0] && notifs[0][0] == "warning" ? (
        <div className="alert warning">
          <div className="alert-icon">
            <Warning />
          </div>
          <div className="alert-text">{notifs[0][1]}</div>
        </div>
      ) : notifs[0] && notifs[0][0] == "error" ? (
        <div className="alert error">
          <div className="alert-icon">
            <Alert />
          </div>
          <div className="alert-text">{notifs[0][1]}</div>
        </div>
      ) : null}
    </motion.div>
  );
}
