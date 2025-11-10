import { readData as readOpmData } from "./OpenMeteo.js";
import { ftHourlyData } from "./formatData.js";
import { readData as readLocations } from "./GeoLocations.js";
import { saveConfig, readConfig } from "./gridconfig.js";

export async function setCurrentCity(
  updateOrder: any,
  updateCity: any,
  selectPattern: any,
  setPattern: any
) {
  const locations = await readLocations();
  if (locations) {
    const newCityList: any = Object.keys(locations);
    const configData = await readConfig();

    let newCity: string = newCityList.at(0);
    let cityA: string = newCityList.at(-1);
    let cityC: string = newCityList.at(1);
    if (configData && configData?.cityList.length > 0) {
      const cont = configData.cityList;
      cityA = cont.at(0);
      newCity = cont.at(1);
      cityC = cont.at(2);
    } else {
      newCity = newCityList.at(0);
      cityA = newCityList.at(-1);
      cityC = newCityList.at(1);
      saveConfig({ city: newCity, cityList: [cityA, newCity, cityC] });
    }
    updateCity(newCity);
    selectPattern(setPattern, newCity ? newCity : null);
    const currentWeather = await readOpmData("current");
    const hourlyWeather = await readOpmData("hourly");
    console.log(hourlyWeather[cityA]);
    // console.log(currentWeather)
    updateOrder({
      cityA: [
        cityA,
        currentWeather[cityA] ?? false,
        ftHourlyData(hourlyWeather[cityA]) ?? false,
      ],
      cityB: [
        newCity,
        currentWeather[newCity] ?? false,
        ftHourlyData(hourlyWeather[newCity]) ?? false,
      ],
      cityC: [
        cityC,
        currentWeather[cityC] ?? false,
        ftHourlyData(hourlyWeather[cityC]) ?? false,
      ],
    });
    // console.log({
    //   cityA: [
    //     cityA,
    //     currentWeather[cityA] ?? false,
    //     ftHourlyData(hourlyWeather[cityA]) ?? false,
    //   ],
    //   cityB: [
    //     newCity,
    //     currentWeather[newCity] ?? false,
    //     ftHourlyData(hourlyWeather[newCity]) ?? false,
    //   ],
    //   cityC: [
    //     cityC,
    //     currentWeather[cityC] ?? false,
    //     ftHourlyData(hourlyWeather[cityC]) ?? false,
    //   ],
    // });
  }
}

export async function updateMainCity(
  updateOrder: any,
  updateCity: any,
  cityName: string,
  current: any,
  hourly: any
) {
  const locations = await readLocations();
  if (locations) {
    // console.log("updating => ", cityName, current, hourly);
    const newCityList: any = Object.keys(locations);
    const cityA = newCityList.at(-2);
    const cityC = newCityList.at(0);
    updateCity(cityName);
    const currentWeather = await readOpmData("current");
    const hourlyWeather = await readOpmData("hourly");
    updateOrder({
      cityA: [
        cityA,
        currentWeather[cityA] ?? false,
        ftHourlyData(hourlyWeather[cityA]) ?? false,
      ],
      cityB: [cityName, current ?? false, ftHourlyData(hourly) ?? false],
      cityC: [
        cityC,
        currentWeather[cityC] ?? false,
        ftHourlyData(hourlyWeather[cityC]) ?? false,
      ],
    });
    console.log({
      cityA: [
        cityA,
        currentWeather[cityA] ?? false,
        ftHourlyData(hourlyWeather[cityA]) ?? false,
      ],
      cityB: [cityName, current ?? false, ftHourlyData(hourly) ?? false],
      cityC: [
        cityC,
        currentWeather[cityC] ?? false,
        ftHourlyData(hourlyWeather[cityC]) ?? false,
      ],
    });
  }
}

export async function changeOrders(
  updateOrder: any,
  updateCity: any,
  loadOrder: any,
  selectPattern: any,
  setPattern: any,
  forward: boolean = true
) {
  const locations = await readLocations();
  if (locations) {
    const cityList = Object.keys(locations);
    const cityIndex = cityList.indexOf(loadOrder.cityB[0]);
    const newCityA = changeCity(cityList, cityIndex - 1, forward);
    const newCity = changeCity(cityList, cityIndex, forward);
    const newCityC = changeCity(cityList, cityIndex + 1, forward);
    saveConfig({ city: newCity, cityList: [newCityA, newCity, newCityC] });
    console.log(cityList);
    console.log(newCityA + " " + newCity + " " + newCityC);
    const currentWeather = await readOpmData("current");
    const hourlyWeather = await readOpmData("hourly");
    const cityC = loadOrder.cityC;
    const cityB = loadOrder.cityB;
    updateCity(newCity);
    selectPattern(setPattern, newCity ? newCity : null);
    updateOrder({
      cityA:
        newCityA == cityB[0]
          ? cityB
          : [
              newCityA,
              currentWeather[newCityA] ?? false,
              ftHourlyData(hourlyWeather[newCityA]) ?? false,
            ],
      cityB:
        newCity == cityC[0]
          ? cityC
          : [
              newCity,
              currentWeather[newCity] ?? false,
              ftHourlyData(hourlyWeather[newCity]) ?? false,
            ],
      cityC: [
        newCityC,
        currentWeather[newCityC] ?? false,
        ftHourlyData(hourlyWeather[newCityC]) ?? false,
      ],
    });
    console.log({
      cityA:
        newCityA == cityB[0]
          ? cityB
          : [
              newCityA,
              currentWeather[newCityA] ?? false,
              ftHourlyData(hourlyWeather[newCityA]) ?? false,
            ],
      cityB:
        newCity == cityC[0]
          ? cityC
          : [
              newCity,
              currentWeather[newCity] ?? false,
              ftHourlyData(hourlyWeather[newCity]) ?? false,
            ],
      cityC: [
        newCityC,
        currentWeather[newCityC] ?? false,
        ftHourlyData(hourlyWeather[newCityC]) ?? false,
      ],
    });
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
