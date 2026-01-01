// to save and reuse some dry codes

export function toNameCase(str: string) {
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function difrentHour(t1: string, t2: string) {
  const [h1 = 0, m1 = 0] = t1.split(":").map(Number);
  const [h2 = 0, m2 = 0] = t2.split(":").map(Number);
  let diffMinutes = h1 * 60 + m1 - (h2 * 60 + m2);
  if (diffMinutes < 0) {
    diffMinutes += 1440;
  }
  return diffMinutes * 60;
}


export function dateDiferenceToHour(timeString1: string, timeString2: string) {
  // console.log(timeString1);
  const date1 = new Date(timeString1 + "Z");
  const date2 = new Date(timeString2 + "Z");
  const differenceInMilliseconds = date1.getTime() - date2.getTime();
  return differenceInMilliseconds / (1000 * 3600);
}
