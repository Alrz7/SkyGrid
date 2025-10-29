import Sun from "../assets/sun.svg?react";
import Moon from "../assets/moon.svg?react";
import "./styles/BigBall.css";

export default function SunComp(solarData) {
  console.log(solarData);
  if (solarData.solarData.isSunTime) {
    return <Sun className="Sun" />;
  } else {
    return <Moon className="Moon" />;
  }
}
