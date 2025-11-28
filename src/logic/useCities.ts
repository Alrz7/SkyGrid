import { readData as readLocations } from "./GeoLocations.js";
import {toNameCase} from './sources/dry.js';

let locations: Record<string, any> | null = null;

export async function updateLocations() {
  locations = await readLocations();
}

export async function lookingFor(searchString: string) {
  locations == null ? updateLocations() : null;
  const cap = toNameCase(searchString)
  let resList = [];
  for (let cit in locations) {
    if (cit.includes(searchString) || cit.includes(cap)) {
      resList.push({nameInFile: cit, ...locations[cit]});
    }
  }
  if(resList.length > 0){
    console.log(resList)
    return resList
  }else{
    return null
  }
}
