// to save and reuse some dry codes

export function toNameCase(str: string) {
  str = str.toLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
}