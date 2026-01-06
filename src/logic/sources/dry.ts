// to save and reuse some dry codes

export function toNameCase(str: string) {
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function difrentHour(t1: string, t2: string) {
  const [h1 = 0, m1 = 0] = t1.split(":").map(Number);
  const [h2 = 0, m2 = 0] = t2.split(":").map(Number);
  let diffMinutes = h1 * 60 + m1 - (h2 * 60 + m2);
  // if (diffMinutes < 0) {
  //   diffMinutes += 1440;
  // }
  return diffMinutes * 60;
}

export function toMinutes(t: string) {
  const [h = 0, m = 0] = t.split(":").map(Number);
  return h * 60 + m;
}
export function isInRange(now: number, rise: number, set: number) {
  if (rise <= set) {
    return now >= rise && now < set;
  } else {
    return now >= rise || now < set;
  }
}
export function duration(rise: number, set: number) {
  return rise <= set ? set - rise : 1440 - rise + set;
}
export function elapsed(now: number, rise: number) {
  return now >= rise ? now - rise : 1440 - rise + now;
}

export function dateDiferenceToHour(timeString1: string, timeString2: string) {
  // console.log(timeString1);
  const date1 = new Date(timeString1 + "Z");
  const date2 = new Date(timeString2 + "Z");
  const differenceInMilliseconds = date1.getTime() - date2.getTime();
  return differenceInMilliseconds / (1000 * 3600);
}
