import React, { useEffect, useState } from "react";
import {
  readData as readLocations,
  deleteLocation,
} from "../../../logic/GeoLocations.js";
import Delete from "../../../assets/delete.svg?react";
import Select from "../../../assets/select.svg?react";
import Selected from "../../../assets/selected.svg?react";
import "./general.css";
export default function General({
  rmb,
  srcnt,
  city,
  updateCity,
  autupdt,
}: {
  rmb: any;
  city: string;
  updateCity: any;
  srcnt: any;
  autupdt: any;
}) {
  const [cityList, setCitylist] = useState<string[]>();

  async function updCityList() {
    const lst = await readLocations();
    const res = Object.keys(lst);
    setCitylist(res);
    return res;
  }

  async function deleteCity(cityName: string) {
    const lst = await updCityList();
    console.log(lst, lst.length > 0, lst.includes(cityName));
    if (lst && lst.length > 0 && lst.includes(cityName)) {
      const indx = lst.indexOf(cityName);
      console.log("deleting",cityName);
      const newlist = await deleteLocation(cityName);
      console.log(newlist)
      setCitylist(newlist);
      if (indx > 0) {
        updateCity(true, newlist?.at(indx - 1), null, null);
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
                    }}
                  >
                    {item == city ? <Selected /> : <Select />}
                  </button>
                  <button
                    className="card-button delete"
                    onClick={() => {
                      deleteCity(item);
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
