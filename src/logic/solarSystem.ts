import { findLocalTime } from "./skyPattern.js";

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

  setCondition({
    sun: { isVisible: isSunTime, ratio: sunRatio },
    moon: { isVisible: isMoonTime, ratio: moonRatio },
  });
}

function toMinutes(t: string) {
  const [h = 0, m = 0] = t.split(":").map(Number);
  return h * 60 + m;
}

function isInRange(now: number, rise: number, set: number) {
  if (rise <= set) {
    return now >= rise && now < set;
  } else {
    return now >= rise || now < set;
  }
}

function duration(rise: number, set: number) {
  return rise <= set ? set - rise : 1440 - rise + set;
}

function elapsed(now: number, rise: number) {
  return now >= rise ? now - rise : 1440 - rise + now;
}
