import { findLocalTime } from "./skyPattern.js";
import { isInRange, toMinutes, duration, elapsed } from "./sources/dry.js";
export async function setSphere(
  cityName: string,
  data: {
    moonrise: string;
    moonset: string;
    sunrise: string;
    sunset: string;
    solar_noon: string;
  },
  setCondition: any
) {
  const nowData = await findLocalTime(cityName);
  if (!nowData) return;

  const nowMin = toMinutes(nowData.time.time);

  const moonRise = toMinutes(data.moonrise);
  const moonSet = toMinutes(data.moonset);
  const sunRise = toMinutes(data.sunrise);
  const sunSet = toMinutes(data.sunset);

  const isMoonTime = isInRange(nowMin, moonRise, moonSet);
  const isSunTime = isInRange(nowMin, sunRise, sunSet);

  let moonRatio = -1;
  if (isMoonTime) {
    moonRatio = elapsed(nowMin, moonRise) / duration(moonRise, moonSet);
  }

  let sunRatio = -1;
  if (isSunTime) {
    sunRatio = elapsed(nowMin, sunRise) / duration(sunRise, sunSet);
  }
  console.log(sunRatio, moonRatio);
  setCondition({
    sun: { isVisible: isSunTime, ratio: sunRatio },
    moon: { isVisible: isMoonTime, ratio: moonRatio },
  });
}
