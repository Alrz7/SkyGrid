import {
  exists,
  mkdir,
  readTextFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";

export async function create(adrs: string) {
  await mkdir(adrs, {
    baseDir: BaseDirectory.Document,
  });
}
export async function doesExist(adrs: string) {
  const res = await exists(adrs, {
    baseDir: BaseDirectory.Document,
  });
  return res;
}

export async function checkDir() {
  const files = [
    { adrs: "SkyGrid" },
    { adrs: "SkyGrid/apiKey" },
    { adrs: "SkyGrid/astroData" },
    { adrs: "SkyGrid/locationData" },
    { adrs: "SkyGrid/weatherData" },
    { adrs: "SkyGrid/weatherData/openMeteo" },
    { adrs: "SkyGrid/config" },
  ];
  for (let dir of files) {
    const res = await doesExist(dir.adrs);
    if (!res) {
      create(dir.adrs);
    }
  }
}

export async function readKey(
  dir: string
): Promise<Record<string, any> | null> {
  const adrs = `SkyGrid/apiKey/${dir}.json`;
  const ext = await doesExist(adrs);
  if (ext) {
    const key = await readTextFile(adrs, {
      baseDir: BaseDirectory.Document,
    });
    return JSON.parse(key);
  } else {
    checkApiKeys();
    return null;
  }
}

export async function writeKey(dir: string, data: Record<string, any>) {
  await writeTextFile(`SkyGrid/apiKey/${dir}.json`, JSON.stringify(data), {
    baseDir: BaseDirectory.Document,
  });
}

export async function checkApiKeys(
  target: "ipGeoKey" | "openwKey" | null = null,
  newVal: string | boolean | null = null
) {
  const Res: {
    openwKey: {
      stat: boolean;
      val: null | string;
    };
    ipGeoKey: {
      stat: boolean;
      val: null | string;
    };
  } = {
    openwKey: { stat: false, val: null },
    ipGeoKey: { stat: false, val: null },
  };
  checkDir();
  for (let dir of ["ipGeoKey", "openwKey"]) {
    const exst = await doesExist(`SkyGrid/apiKey/${dir}.json`);
    if (exst) {
      const lastFile = await readKey(dir);
      if (lastFile != null) {
        if (newVal && target == dir) {
          lastFile.key = newVal;
          writeKey(dir, lastFile);
          Res[dir as keyof typeof Res] = {
            stat: true,
            val: newVal != true ? newVal : null,
          };
        } else {
          Res[dir as keyof typeof Res] = {
            stat: lastFile.key ? true : false,
            val: lastFile.key,
          };
        }
      } else {
        console.log(1244777);
        console.log(lastFile);

        Res[dir as keyof typeof Res] = {
          stat: false,
          val: null,
        };
      }
    } else {
      const newKey = newVal && target == dir ? newVal : false;
      const container = { key: newKey };
      writeKey(dir, container);
      if (newKey) {
        Res[dir as keyof typeof Res] = {
          stat: true,
          val: typeof newVal != "boolean" ? newVal : null,
        };
      }
    }
  }
  return Res;
}
// await writeTextFile(
//     `SkyGrid/apiKey/${target}.json`,
//     JSON.stringify(),
//     {
//       baseDir: BaseDirectory.Document,
//     }
//   );
