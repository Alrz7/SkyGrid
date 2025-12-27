import { readData as readOpmData } from "./OpenMeteo.js";
import { ftHourlyData } from "./formatData.js";
import { readData as readLocations } from "./GeoLocations.js";
import { saveConfig, readConfig } from "./gridconfig.js";
import { selectPattern } from "./skyPattern.js";

// this file needs to get dry soon... it's so messy

export async function setCurrentCity(
  updateOrder: any,
  updateCity: any,
  rmb: boolean,
  setPattern: any,
  addNotif: any,
  setsolarData: any
) {
  const locations = await readLocations();
  if (locations) {
    const newCityList: any = Object.keys(locations);
    const configData = await readConfig();
    let newCity: string = newCityList.at(0);
    let cityA: string = newCityList.at(-1);
    let cityC: string = newCityList.at(1);
    if (configData && configData?.cityList) {
      if (configData?.cityList?.length > 0) {
        const cont = configData.cityList;
        cityA = cont.at(0);
        newCity = cont.at(1);
        cityC = cont.at(2);
      } else {
        if (rmb) {
          saveConfig({ city: newCity, cityList: [cityA, newCity, cityC] });
        }
      }
    }
    updateCity(newCity);
    selectPattern(addNotif, setPattern, setsolarData, newCity);
    const dailyWeather = await readOpmData("daily");
    const hourlyWeather = await readOpmData("hourly");
    // console.log(dailyWeather[newCity]);
    // console.log(dailyWeather)
    if (dailyWeather && hourlyWeather) {
      updateOrder({
        cityA: [
          cityA,
          dailyWeather[cityA] ?? false,
          ftHourlyData(hourlyWeather[cityA]) ?? false,
        ],
        cityB: [
          newCity,
          dailyWeather[newCity] ?? false,
          ftHourlyData(hourlyWeather[newCity], addNotif) ?? false,
        ],
        cityC: [
          cityC,
          dailyWeather[cityC] ?? false,
          ftHourlyData(hourlyWeather[cityC]) ?? false,
        ],
      });
    }
  }
}

export async function updateMainCity(
  updateOrder: any,
  updateCity: any,
  setPattern: any,
  addNotif: any,
  setsolarData: any,
  save: boolean = false,
  cityName: string,
  daily: Record<string, any> | null,
  hourly: Record<string, any> | null
) {
  const locations = await readLocations();
  if (locations) {
    // console.log("updating => ", cityName, daily, hourly);
    const newCityList: any = Object.keys(locations);
    const cityA = newCityList.at(-2);
    const cityC = newCityList.at(0);
    updateCity(cityName);
    selectPattern(addNotif, setPattern, setsolarData, cityName);
    const dailyWeather = await readOpmData("daily");
    if (save) {
      saveConfig({
        city: cityName,
        cityList: [cityA, cityName, cityC],
      });
    }
    const hourlyWeather = await readOpmData("hourly");
    if ((dailyWeather || daily) && (hourlyWeather || hourly)) {
      updateOrder({
        cityA: [
          cityA,
          dailyWeather[cityA] ?? false,
          ftHourlyData(hourlyWeather[cityA]) ?? false,
        ],
        cityB: [
          cityName,
          daily ?? dailyWeather[cityName] ?? false,
          hourly
            ? ftHourlyData(hourly, addNotif)
            : ftHourlyData(hourlyWeather[cityName], addNotif) ?? false,
        ],
        cityC: [
          cityC,
          dailyWeather[cityC] ?? false,
          ftHourlyData(hourlyWeather[cityC]) ?? false,
        ],
      });
      console.log({
        cityA: [
          cityA,
          dailyWeather[cityA] ?? false,
          ftHourlyData(hourlyWeather[cityA]) ?? false,
        ],
        cityB: [
          cityName,
          daily ?? dailyWeather[cityName] ?? false,
          hourly
            ? ftHourlyData(hourly, addNotif)
            : ftHourlyData(hourlyWeather[cityName], addNotif) ?? false,
        ],
        cityC: [
          cityC,
          dailyWeather[cityC] ?? false,
          ftHourlyData(hourlyWeather[cityC]) ?? false,
        ],
      });
    }
  }
}

export async function changeOrders(
  updateOrder: any,
  updateCity: any,
  rmb: boolean,
  loadOrder: any,
  setPattern: any,
  addNotif: any,
  setsolarData: any,
  forward: boolean = true
) {
  const locations = await readLocations();
  if (locations) {
    const cityList = Object.keys(locations);
    const cityIndex = cityList.indexOf(loadOrder.cityB[0]);
    const newCityA = changeCity(cityList, cityIndex - 1, forward);
    const newCity = changeCity(cityList, cityIndex, forward);
    const newCityC = changeCity(cityList, cityIndex + 1, forward);
    if (rmb) {
      console.log("ssss22");
      saveConfig({ city: newCity, cityList: [newCityA, newCity, newCityC] });
    }
    console.log(cityList);
    console.log(newCityA + " " + newCity + " " + newCityC);
    const dailyWeather = await readOpmData("daily");
    const hourlyWeather = await readOpmData("hourly");
    const cityC = loadOrder.cityC;
    const cityB = loadOrder.cityB;
    updateCity(newCity);
    selectPattern(addNotif, setPattern, setsolarData, newCity);
    if (newCity == cityC[0] && cityC[2] == false) {
      addNotif(["error", "weather Data is not up to Date"]);
    }
    if (dailyWeather && hourlyWeather) {
      updateOrder({
        cityA:
          newCityA == cityB[0]
            ? cityB
            : [
                newCityA,
                dailyWeather[newCityA] ?? false,
                ftHourlyData(hourlyWeather[newCityA]) ?? false,
              ],
        cityB:
          newCity == cityC[0]
            ? cityC
            : [
                newCity,
                dailyWeather[newCity] ?? false,
                ftHourlyData(hourlyWeather[newCity], addNotif) ?? false,
              ],
        cityC: [
          newCityC,
          dailyWeather[newCityC] ?? false,
          ftHourlyData(hourlyWeather[newCityC]) ?? false,
        ],
      });
      // console.log(newCity);
      // console.log(ftHourlyData(addNotif, hourlyWeather[newCity]));
      console.log({
        cityA:
          newCityA == cityB[0]
            ? cityB
            : [
                newCityA,
                dailyWeather[newCityA] ?? false,
                ftHourlyData(hourlyWeather[newCityA]) ?? false,
              ],
        cityB:
          newCity == cityC[0]
            ? cityC
            : [
                newCity,
                dailyWeather[newCity] ?? false,
                ftHourlyData(hourlyWeather[newCity], addNotif) ?? false,
              ],
        cityC: [
          newCityC,
          dailyWeather[newCityC] ?? false,
          ftHourlyData(hourlyWeather[newCityC]) ?? false,
        ],
      });
    }
  }
  // console.log(cityIndex + "" + city);
}

export function changeCity(cityList: any, cityIndex: number, forward: boolean) {
  if (forward) {
    if (cityIndex == cityList.length - 1) {
      return cityList.at(0);
    }
    if (cityIndex > cityList.length - 1) {
      return cityList.at(cityIndex - (cityList.length - 1));
    } else {
      const newindex = cityIndex + 1;
      return cityList.at(newindex);
    }
  } else {
    if (cityIndex < 0) {
      const newindex = cityList.length - 2;
      return cityList.at(newindex);
    } else if (cityIndex == 0) {
      return cityList.at(-1);
    } else {
      const newindex = cityIndex - 1;
      return cityList.at(newindex);
    }
  }
}
