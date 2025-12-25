import "./general.css";
export default function General() {
  return (
    <>
      <div className="settings-section">
        <h2 className="section-title">Units</h2>
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
      </div>

      <div className="settings-section">
        <h2 className="section-title">Default Location</h2>
        <div className="setting-item">
          <span className="setting-label">Remember last viewed city</span>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <button className="setting-button">
            Set current city as Default Location
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Search</h2>
        <div className="setting-item">
          <span className="setting-label">Search-Result Count</span>
          <div className="setting-item">
            <select className="select-input">
              <option>2</option>
              <option>5</option>
              <option selected>10</option>
              <option>15</option>
              <option>20</option>
            </select>
          </div>
        </div>

      <div className="settings-section">
        <h2 className="section-title">data-management</h2>
        <div className="setting-item">
          <span className="setting-label">Auto-Update</span>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
        <div className="setting-item">
          <span className="setting-label">Saving-Directory</span>
          <select className="select-input">
            <option selected>Ducuments</option>
            <option>AppData</option>
            <option>Downloads</option>
          </select>
        </div>
      </div>

      <div className="settings-section">
        <h2 className="section-title">Language & Region</h2>
        <div className="setting-item">
          <span className="setting-label">Language</span>
          <select className="select-input">
            <option>English</option>
            <option>فارسی</option>
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
      </div>
    </>
  );
}
