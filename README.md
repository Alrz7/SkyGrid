<div align="center">
  <a href="[https://github.com/othneildrew/Best-README-Template](https://github.com/Alrz7/SkyGrid/blob/main/public/SkyGridlogo.svg)">
    <img src="/public/SkyGridlogo.svg" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center">SkyGrid</h3>

  <p align="center">
    An open-source desktop weather app with real-time sky
              simulation.
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#key-highlights">Key Highlights</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#step-by-step">Step-by-Step</a></li>
      </ul>
    </li>
    <li>
      <a href="#author--contact">Author</a>
      <ul>
        <li><a href="#author--contact">Author & Contact</a></li>
      </ul>
    </li>
  </ol>
</details>


## About The Project

<div align="center">
  <video 
    src="https://github.com/user-attachments/assets/42a81460-08b6-410c-9bde-d401fcada270"
    autoplay 
    loop 
    muted 
    playsinline 
    width="100%" 
    style="border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);"
  >
  </video>
</div>


**SkyGrid** is an open-source desktop weather application built with   **TypeScript** and powered by  **React** + **Tauri**.

Beyond displaying real-time weather data & a ususal weekly forecast, SkyGrid has a beautiful, dynamic interface that simulates the actual appearance of the sky — sun & moon positions, gradient colors shifting with time of day, all automatically adapted to the local sunrise, sunset, and atmospheric state of the chosen location.
<!-- Key Highlights -->

### Key Highlights
- Fetches hourly and 7-day forecasts from accurate APIs
- Stores data locally for fast access and offline capabilities
- Shows current temperature, feels-like, humidity, wind, pressure, visibility, precipitation, UV index, and more
- Features elegant, animated hourly & weekly charts
- Automatically changes the entire app theme (background gradient, lighting, mood, positions, elements) to match the real sky of your city
-Lightweight (~6 MB), cross-platform (Windows, macOS, Linux), fully portable, Ad-free, and open-source under the Apache 2.0 License.

### Built With

* [![TypeScript][Ts-url]][Ts]
* [![React][React.js]][React-url]
* [![Tauri][Tauri]][Tauri-url]



### Getting started

To quickly test SkyGrid without setup, download the ready-to-use sample data folder from the [Releases](https://github.com/Alrz7/SkyGrid/releases) page.  
Just extract and copy it into your Documents directory (SkyGrid will detect it automatically).

For full functionality :

1. Get a **free API key** from:  
   [IpGeoLocation-API](https://ipgeolocation.io/astronomy-api.html)

2. Open SkyGrid → go to **Settings** → **API Keys** section  
   Paste the key into the **IpGeoLocation** field and save.

That's it!  

### Prerequisites
- Node.js 18+ and npm (or pnpm/yarn)
- Rust (installed automatically by Tauri on first build)

### Step-by-Step

1. **Clone the repository**
   ```bash
   git clone https://github.com/Alrz7/SkyGrid.git
   cd SkyGrid
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or with pnpm (recommended for faster installs)
   pnpm install
   ```

3. **Run in development mode**
   ```bash
   npm run tauri dev
   ```

4. **Build for production** (creates installers/executables)
   ```bash
   npm run tauri build
   ```
   - Output will be in `src-tauri/target/release/bundle`
   - You’ll get `.exe` (Windows), `.app` (macOS), `.deb`/`.AppImage` (Linux)




## Author & Contact
**Alireza Arz**  

[![GitHub](https://img.shields.io/badge/GitHub-Alrz7-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Alrz7)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Alireza%20Arz-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/alireza-arz/)  
[![Email](https://img.shields.io/badge/Gmail-Contact%20Me-red?style=for-the-badge&logo=gmail&logoColor=white)](mailto:alirezaarzcom7@gmail.com)


<div align="center">
  <p>Made with <span style="color: #FF6B6B;">☕</span> in the ☁️ </p>
  <p>Licensed under the <strong>Apache License, Version 2.0</strong><br>
  © 2025 Alireza Arz (Alrz7) · See <a href="LICENSE">LICENSE</a></p>
</div>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Tauri-url]: https://v2.tauri.app/
[Tauri]: https://img.shields.io/badge/tauri-%2324C8DB.svg?style=for-the-badge&logo=tauri&logoColor=%23FFFFFF
[Ts]: https://www.typescriptlang.org/
[Ts-url]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
