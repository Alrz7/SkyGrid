import React from "react";
import "./about.css";
import SkyGrid from "@assets/SkyGrid.svg?react";
import Github from "@assets/github.svg?react";
export default function AboutBar() {
  return (
    <>
      <div className="about-container">
        <div className="about-content">
          <div className="about-header">
            <div className="AppLogo">
              <SkyGrid />
            </div>
            <div className="SkyGrid">SkyGrid</div>
            <p className="cprt">© 2025 Alireza Arz</p>
          </div>
          <section className="about-section">
            <p>
              SkyGrid is an open-source desktop weather app with real-time sky
              simulation. Powered by{" "}
              <a
                href="https://v2.tauri.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "white" }}
              >
                Tauri
              </a>
            </p>
          </section>

          <section className="about-section">
            <h3>Author</h3>
            <ul className="content-list">
              <li>
                <a
                  href="https://github.com/Alrz7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button"
                  style={{ gap: "10px" }}
                >
                  <span>@Alrz7</span>
                  <Github />
                </a>
              </li>
            </ul>
          </section>
          <section className="about-section">
            <h3>Project</h3>
            <ul className="content-list">
              <li>
                <a
                  href="https://github.com/Alrz7/SkyGrid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button"
                  style={{ gap: "10px" }}
                >
                  <span>Main-Page</span>
                  <Github />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Alrz7/SkyGrid/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button"
                  style={{ gap: "10px" }}
                >
                  <span>Releases</span>
                  <Github />
                </a>
              </li>
              <li>
                <a
                  href="https://www.apache.org/licenses/LICENSE-2.0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-button"
                  style={{ gap: "10px" }}
                >
                  <span>License Notices</span>
                </a>
              </li>
            </ul>
          </section>
          <footer className="about-footer">
            <p>Made with ☕ in the Sky</p>
          </footer>
        </div>
      </div>
    </>
  );
}
