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
    }, 2600 - notifs.length * 400);

    return () => clearTimeout(timer);
  }, [notifs]);

  return (
    <motion.div
      className="notif-container"
      initial={{ x: "100%", opacity: 0 }}
      animate={{
        x: notifs.length > 0 ? 0 : "100%",
        opacity: notifs.length > 0 ? 1 : 0,
      }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <AnimatePresence mode="wait">
        {notifs[0] && (
          <motion.div
            key={notifs[0][1]}
            className={`alert ${notifs[0][0]}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="alert-icon">
              {notifs[0][0] === "success" && <Check />}
              {notifs[0][0] === "info" && <Info />}
              {notifs[0][0] === "warning" && <Warning />}
              {notifs[0][0] === "error" && <Alert />}
            </div>
            <div className="alert-text">{notifs[0][1]}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
