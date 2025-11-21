import { difrentHour } from "./sources/dry.js";
import { findlocalTime } from "./skyPattern.js";

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
   console.log(cityName)
  const now = await findlocalTime(cityName);
  console.log(data)
  if (now) {
    const moonCompletion = difrentHour(now.time.time, data.moonrise);
    const isMoonTime =
      moonCompletion >= 0 && difrentHour(now.time.time, data.moonset) < 0;
    let moonRatio = -1;
    if (isMoonTime) {
      moonRatio =
        (moonCompletion / difrentHour(data.moonset, data.moonrise));
    }

    const sunCompletion = difrentHour(now.time.time, data.sunrise);
    const isSunTime =
      sunCompletion >= 0 && difrentHour(now.time.time, data.sunset) < 0;
    let sunRatio = -1;
    if (isSunTime) {
      sunRatio = (sunCompletion / difrentHour(data.sunset, data.sunrise));
    }
    setCondition({
      sun: { isVisible: isSunTime, ratio: sunRatio },
      moon: { isVisible: isMoonTime, ratio: moonRatio },
      
    });
    // console.log({
    //   sun: { isVisible: isSunTime, ratio: sunRatio },
    //   moon: { isVisible: isMoonTime, ratio: moonRatio },
    // });
  }
}
