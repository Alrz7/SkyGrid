import React, { useEffect, useState } from "react";
import {
  readData as readLocations,
  deleteLocation,
} from "../../../logic/GeoLocations.js";
import { deleteAstroData } from "../../../logic/ipGeoLocation.js";
import { saveConfig } from "../../../logic/gridconfig.js";

//  from "@logic/GeoLocations.js";  this also works but linter says "the module is not found"  :/
import Delete from "@assets/delete.svg?react";
import Select from "@assets/select.svg?react";
import Selected from "@assets/selected.svg?react";
import * as tp from "../../commonTypes.js";
import "./general.css";
import { deleteWeatherData } from "../../../logic/OpenMeteo.js";
export default function General({
  rmb,
  srcnt,
  city,
  addNotif,
  updateCity,
  autupdt,
}: {
  rmb: tp.rmb;
  city: string | null;
  updateCity: tp.PrimaryUpdateCity;
  addNotif: tp.addNotif;
  srcnt: tp.srcnt;
  autupdt: tp.autupdt;
}) {
  const [cityList, setCitylist] = useState<string[]>();

  async function updCityList() {
    const lst = await readLocations();
    if (lst) {
      const res = Object.keys(lst);
      setCitylist(res);
      return res;
    } else return null;
  }

  async function deleteCity(cityName: string) {
    const lst = await updCityList();
    if (lst) {
      console.log(lst, lst.length > 0, lst.includes(cityName));
      if (lst && lst.length > 0 && lst.includes(cityName)) {
        const indx = lst.indexOf(cityName);
        console.log("deleting", cityName);
        const newlist = await deleteLocation(cityName);
        deleteAstroData(cityName);
        deleteWeatherData(cityName)
        if (newlist) {
          setCitylist(newlist);
          if (indx > 0 && newlist.length > 0) {
            const newCity = newlist.at(indx - 1);
            if (newCity) {
              updateCity(true, newCity, null, null);
            }
          }
        }
      }
    }
  }

  useEffect(() => {
    updCityList();
  }, []);

  return (
    <>
      {/* <div className="settings-section">
        <h2 className="section-title">Units ( not ready yet )</h2>
        <div className="setting-item grid">
          <div className="setting-row">
            <span className="setting-label">Temperature</span>
            <select className="select-input">
              <option>°C</option>
              <option>°F</option>
            </select>
          </div>

          <div className="setting-row">
            <span className="setting-label">Feels Like</span>
            <select className="select-input">
              <option>°C</option>
              <option>°F</option>
            </select>
          </div>

          <div className="setting-row">
            <span className="setting-label">Precipitation</span>
            <select className="select-input">
              <option>mm</option>
              <option>in</option>
            </select>
          </div>

          <div className="setting-row">
            <span className="setting-label">Wind Speed</span>
            <select className="select-input">
              <option>km/h</option>
              <option>m/s</option>
              <option>mph</option>
              <option>knots</option>
            </select>
          </div>

          <div className="setting-row">
            <span className="setting-label">Pressure</span>
            <select className="select-input">
              <option>hPa</option>
              <option>mb</option>
              <option>inHg</option>
            </select>
          </div>

          <div className="setting-row">
            <span className="setting-label">Visibility</span>
            <select className="select-input">
              <option>km</option>
              <option>mi</option>
            </select>
          </div>
        </div>
      </div> */}

      <div className="settings-section">
        <h2 className="section-title">Default Location</h2>
        <div className="setting-item">
          <span className="setting-label">Remember last viewed city</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={rmb.stat}
              onChange={() => {
                rmb.func("set");
              }}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <button
            className="setting-button"
            onClick={() => {
              rmb.func("save");
              addNotif([
                "info",
                `${city} has been Set as the Default Location`,
              ]);
            }}
          >
            Set current city as Default Location
          </button>
          <span className="">current-city : {rmb.city}</span>
        </div>
        {/* <div className="setting-item"> */}
        <div className="city-list">
          {cityList
            ? cityList.map((item) => (
                <div className="city-card" key={item}>
                  {item}
                  <button
                    className="card-button select"
                    onClick={() => {
                      updateCity(true, item, null, null);
                      addNotif([
                        "info",
                        `${item} has been Set as the Default Location`,
                      ]);
                    }}
                  >
                    {item == city ? <Selected /> : <Select />}
                  </button>
                  <button
                    className="card-button delete"
                    onClick={() => {
                      deleteCity(item);
                      addNotif([
                        "info",
                        `${item} has been Deleted Successfully`,
                      ]);
                    }}
                  >
                    <Delete />
                  </button>
                </div>
              ))
            : null}
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Search</h2>
        <div className="setting-item">
          <span className="setting-label">Search-Result Count</span>
          <div className="setting-item">
            <select
              className="select-input"
              value={srcnt.count}
              onChange={(e) => {
                srcnt.set(Number(e.target.value));
                addNotif([
                  "info",
                  `Search-Result-Count has been set to ${Number(
                    e.target.value
                  )}`,
                ]);
              }}
            >
              <option>2</option>
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
            </select>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">data-management</h2>
        <div className="setting-item">
          <span className="setting-label">Auto-Update</span>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={autupdt.stat}
              onChange={() => {
                autupdt.set();
                // addNotif(
                //   ["info",`Auto update has been turned ${!autupdt.stat ? "ON" : "OFF"}`]
                // );
              }}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <span className="setting-label">Saving-Directory</span>
          <select className="select-input">
            <option>Ducuments</option>
            {/* <option>AppData</option>
            <option>Downloads</option> */}
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Language & Region</h2>
        <div className="setting-item">
          <span className="setting-label">Language</span>
          <select className="select-input">
            <option>English</option>
            {/* <option>فارسی</option> */}
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Startup</h2>
        <div className="setting-item">
          <span className="setting-label">Launch at system startup</span>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </div>
      {/* <div className="setting-item">
          <span className="setting-label">Rain alerts</span>
          <label className="toggle-switch">
            <input type="checkbox" checked />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
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
    </>
  );
}
