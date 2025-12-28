import { readData, getWeatherStat } from "./OpenMeteo.js";
import { updateData as updateAstro, updateData } from "./ipGeoLocation.js";
import { findLocalTime } from "./skyPattern.js";
import { dateDiferenceToHour as difrentHour } from "../logic/sources/dry.js";
import * as tp from "../components/commonTypes.js";

function getLocalTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const minute = String(now.getMinutes()).padStart(2, "0");
  return {
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    fullStr: `${year}-${month}-${day}T${hour}:${minute}`,
  };
}

/**
 *  this should  manage the time of updating the current datas
 */
export async function checkCurrent(cityName: string, data: { time: string }) {
  const now = getLocalTime().fullStr;
  const locations = await readData("current");
  if (locations && cityName && cityName in locations) {
    const time_difference = difrentHour(now, data.time);
    if (time_difference >= 2) {
    }
  }
}

export async function checkUpdate(
  addNotif: tp.addNotif,
  cityName: string,
  engage: boolean,
  auto: boolean
) {
  const now = getLocalTime().fullStr;
  const locations = await readData("hourly");
  console.log("engaging in weather update");
  if (locations && cityName && cityName in locations) {
    const lastDate = locations[cityName].time;
    const time_difference = difrentHour(now, lastDate.at(-1));
    if (engage) {
      const astroUpdResponse = await updateAstro(
        cityName,
        findLocalTime,
        true,
        addNotif
      );
      const wethUpd = auto ? time_difference >= 0 : true;
      const astroUpd = !astroUpdResponse?.isUpdate;

      // const ntfText = `Updating ${wethUpd ? "Weather" : ""} ${
      //   wethUpd && astroUpd ? "&" : ""
      // } ${astroUpd ? "Astronomic" : ""} ${
      //   wethUpd && astroUpd ? "Datas" : "Data"
      // } `;
      // addNotif([
      //   "info",
      //   `${wethUpd || astroUpd ? ntfText : "Datas are Up To Date"}`,
      // ]);

      // console.log(
      //   `need to update?  => ${
      //     wethUpd || astroUpd ? ntfText : "Datas are Up To Date"
      //   }`
      // );
      if (wethUpd) {
        addNotif(["info", "Updating Weather-Datas"]);
        const newWeatherData = await getWeatherStat(addNotif, cityName);
        return { ok: true, val: newWeatherData };
      } else {
        console.log("weather is up to date.");
        return { ok: false, val: null };
      }
    } else {
      // console.log("no engage in weather update");
      const astroUpdResponse = await updateAstro(
        cityName,
        findLocalTime,
        false,
        addNotif
      );
      const wethUpd = time_difference >= 0;
      const astroUpd = !astroUpdResponse?.isUpdate;

      const ntfText = `Updating ${wethUpd ? "Weather" : ""} ${
        wethUpd && astroUpd ? "&" : ""
      } ${astroUpd ? "Astronomic" : ""} ${
        wethUpd && astroUpd ? "Datas" : "Data"
      } `;
      addNotif([
        "info",
        `${wethUpd || astroUpd ? ntfText : "Datas are already Up To Date"}`,
      ]);

      console.log(
        `need to update?  => ${
          wethUpd || astroUpd ? ntfText : "Datas are already Up To Date"
        }`
      );
      return { ok: false, val: null };
    }
  } else {
    return { ok: false, val: null };
  }
}
