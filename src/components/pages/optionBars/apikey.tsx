import React, { useEffect, useState } from "react";
import "./apikey.css";
import { checkApiKeys } from "../../../logic/DataManagement.js";
import { data } from "framer-motion/client";
import Copy from "@assets/copy.svg?react";
//  from "@logic/GeoLocations.js";  this also works but linter says "the module is not found"  :/
export default function ApiKeyBar({ addNotif }: { addNotif: any }) {
  const [KeyStat, setStat] = useState<{
    openwKey: {
      stat: boolean;
      val: null | string;
    };
    ipGeoKey: {
      stat: boolean;
      val: null | string;
    };
  }>({
    openwKey: { stat: false, val: null },
    ipGeoKey: { stat: false, val: null },
  });
  const [newKey, setNewKey] = useState<{
    openwKey: string | null;
    ipGeoKey: string | null;
  }>();

  async function updAPIkeys(
    target: "ipGeoKey" | "openwKey" | null = null,
    newVal: string | boolean | null = null
  ) {
    const newKeyStat = await checkApiKeys(target, newVal);
    setStat(newKeyStat);
  }
  useEffect(() => {
    updAPIkeys();
  }, []);
  return (
    <>
      <div className="settings-section">
        <div className="section-title">API KEYS</div>

        <div className="setting-item apikey">
          <span className="setting-label">OpenWeather</span>
          <div
            className="status-circle"
            data-status={KeyStat.openwKey.stat ? "active" : "inactive"}
          >
            <div className="glow"></div>
          </div>
          <button
            className="setting-button copy"
            onClick={() => {
              if (KeyStat.openwKey.stat && KeyStat.openwKey.val) {
                navigator.clipboard.writeText(KeyStat.openwKey.val);
                addNotif(["info", "ApiKey has been copied in Clipboard!"]);
              }
            }}
          >
            <Copy />
          </button>
          <button
            className="setting-button"
            onClick={() => {
              const lastKey = newKey?.openwKey;
              if (lastKey && lastKey != "" && lastKey != " ") {
                updAPIkeys("openwKey", lastKey);
                addNotif([
                  "info",
                  `API Key ${
                    KeyStat.openwKey.stat ? "updated" : "added"
                  } successfully!`,
                ]);
              }
            }}
          >
            {KeyStat.openwKey.stat ? "Update" : "Submit"}
          </button>
          <input
            type="text"
            className="select-input text"
            placeholder="New ApiKey"
            onChange={(e) => {
              const newText = e.target.value;
              setNewKey((last) => {
                return {
                  openwKey: newText,
                  ipGeoKey: last ? last.ipGeoKey : null,
                };
              });
            }}
          />
        </div>

        <div className="setting-item apikey">
          <span className="setting-label">IpGeoLocation</span>
          <div
            className="status-circle"
            data-status={KeyStat.ipGeoKey.stat ? "active" : "inactive"}
          >
            <div className="glow"></div>
          </div>
          <button
            className="setting-button copy"
            onClick={() => {
              if (KeyStat.ipGeoKey.stat && KeyStat.ipGeoKey.val) {
                navigator.clipboard.writeText(KeyStat.ipGeoKey.val);
                addNotif(["info", "ApiKey has been copied in Clipboard!"]);
              }
            }}
          >
            <Copy />
          </button>
          <button
            className="setting-button"
            onClick={() => {
              const lastKey = newKey?.ipGeoKey;
              if (lastKey && lastKey != "" && lastKey != " ") {
                updAPIkeys("ipGeoKey", lastKey);
                addNotif([
                  "info",
                  `API Key ${
                    KeyStat.ipGeoKey.stat ? "updated" : "added"
                  } successfully!`,
                ]);
              }
            }}
          >
            {KeyStat.ipGeoKey.stat ? "Update" : "Submit"}
          </button>
          <input
            type="text"
            className="select-input text"
            placeholder="New ApiKey"
            onChange={(e) => {
              const newText = e.target.value;
              setNewKey((last) => {
                return {
                  openwKey: last ? last.openwKey : null,
                  ipGeoKey: newText,
                };
              });
            }}
          />
        </div>
        <div className="setting-item"></div>
        {/* <div className="setting-item">
        <span className="setting-label">Severe weather</span>
        <label className="toggle-switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>
      <div className="setting-item">
        <span className="setting-label">Temperature alerts</span>
        <label className="toggle-switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
      </div> */}
      </div>
    </>
  );
}
