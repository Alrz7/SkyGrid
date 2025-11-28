import { readData as readLocations } from "./GeoLocations.js";
import { toNameCase } from "./sources/dry.js";

let locations: Record<string, any> | null = null;

export async function updateLocations() {
  locations = await readLocations();
}

export async function lookingFor(searchString: string): Promise<any[] | null> {
  locations = await readLocations();
  if (locations) {
    let resList = [];
    if (searchString != "") {
      const cap = toNameCase(searchString);
      for (let cit in locations) {
        if (cit.includes(searchString) || cit.includes(cap)) {
          resList.push({ nameInFile: cit, ...locations[cit] });
        }
      }
      if (resList.length > 0) {
        console.log(resList);
        return resList;
      } else {
        return null;
      }
    } else {
      for (let cit in locations) {
        resList.push({ nameInFile: cit, ...locations[cit] });
      }
      console.log(resList);
      return resList;
    }
  } else {
    console.log(locations);
    return null;
  }
}
