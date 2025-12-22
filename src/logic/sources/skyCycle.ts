/**
 * skyCycle
 * A 24-hour cyclical gradient object for a dynamic weather display.
 * Each top-level key represents a major solar event.
 * Each event contains an array of style objects.
 * The first object (index 0) is the "pure" style for that event.
 * Subsequent objects gradually interpolate towards the "pure" style of the *next* event in the cycle.
 *
 * Style Object Structure:
 * gradient: (string) A detailed linear-gradient with at least 6 colors.
 * hudMainColor: (string) A high-contrast hex color for primary hudMainColor (e.g., temperature).
 * foreCastbutton: (string) A harmonious hex color for UI foreCastbuttons.
 * solunaProp: (string) A harmonious hex color for solunaProp lines.
 */
export const skyCycle: Record<string, any> = {
  // 1. MIDNIGHT (Cycle Start)
  // Transitions from: night_begin
  // Transitions to: night_end
  mid_night: [
    {
      gradient:
        "linear-gradient(180deg, #02030a, #0b0e23, #16193c, #222557, #2e3172, #3b3d8e)",
      hudMainColor: "#e1e5ff",
      foreCastbutton: "#3c2f6b",
      solunaProp: "#8b7fdb",
    },
    {
      gradient:
        "linear-gradient(180deg, #030411, #101233, #1b1f4e, #262c69, #323985, #3f46a1)",
      hudMainColor: "#e3e7ff",
      foreCastbutton: "#3c2f6b",
      solunaProp: "#8b7fdb",
    },
    {
      gradient:
        "linear-gradient(180deg, #040518, #151842, #20255d, #2c3279, #384095, #455db1)",
      hudMainColor: "#e6eaff",
      foreCastbutton: "#3c2f6b",
      solunaProp: "#8b7fdb",
      chart: {
        temp: { start: "#ff5252", end: "#ff8a80" },
        apTemp: { start: "#ff6d00", end: "#ff8f00" },
        rain: { start: "#448aff", end: "#82b1ff" },
        shower: { start: "#7c4dff", end: "#b388ff" },
        snow: { start: "#e0f7fa", end: "#b2ebf2" },
        windspd: { start: "#42a5f5", end: "#81d4fa" },
        cldCover: { start: "#78909c", end: "#b0bec5" },
        humidity: { start: "#4fc3f7", end: "#81d4fa" },
        precipitation: { start: "#ab47bc", end: "#ce93d8" },
      },
    },
    {
      gradient:
        "linear-gradient(180deg, #05061f, #1a1e50, #253b6b, #314986, #3d58a2, #4a67be)",
      hudMainColor: "#e8ecff",
      foreCastbutton: "#403573",
      solunaProp: "#9187de",
    },
    {
      gradient:
        "linear-gradient(180deg, #060726, #1f2460, #2a327b, #364096, #425eb2, #4f6cce)",
      hudMainColor: "#ebeeff",
      foreCastbutton: "#403573",
      solunaProp: "#9187de",
    },
    {
      gradient:
        "linear-gradient(180deg, #07082d, #242a70, #2f388b, #3b46a6, #4764c2, #5472de)",
      hudMainColor: "#edf0ff",
      foreCastbutton: "#403573",
      solunaProp: "#9187de",
    },
    {
      gradient:
        "linear-gradient(180deg, #080934, #293080, #344e9c, #405cb7, #4c6ad3, #5978ef)",
      hudMainColor: "#eff2ff",
      foreCastbutton: "#403573",
      solunaProp: "#9187de",
    },
    {
      gradient:
        "linear-gradient(180deg, #090a3b, #2e3690, #3954ab, #4562c6, #5170e2, #5e7eff)",
      hudMainColor: "#f1f4ff",
      foreCastbutton: "#463d7e",
      solunaProp: "#9890e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #0a0b42, #333ca0, #3e5abb, #4a68d6, #5676f2, #6384ff)",
      hudMainColor: "#f3f6ff",
      foreCastbutton: "#463d7e",
      solunaProp: "#9890e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #0b0c49, #3842b0, #435fd3, #4f6dee, #5b7cff, #688aff)",
      hudMainColor: "#f5f8ff",
      foreCastbutton: "#463d7e",
      solunaProp: "#9890e0",
    },
  ],

  // 2. NIGHT END
  // Transitions to: astronomical_twilight_begin
  night_end: [
    {
      gradient:
        "linear-gradient(180deg, #05030f, #120a3a, #1d1460, #26377a, #2e4a8c, #355c9e)",
      hudMainColor: "#eaf0ff",
      foreCastbutton: "#4e458a",
      solunaProp: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #07031a, #180f45, #261a66, #303e80, #3c5a99, #4775b3)",
      hudMainColor: "#eef3ff",
      foreCastbutton: "#4e458a",
      solunaProp: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #09041e, #1c1050, #2b1e73, #37478e, #4668a8, #548ac3)",
      hudMainColor: "#f2f6ff",
      foreCastbutton: "#4e458a",
      solunaProp: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #0b0525, #20105c, #2e1f7f, #3b449d, #4d6db7, #5c95d1)",
      hudMainColor: "#f7faff",
      foreCastbutton: "#4e458a",
      solunaProp: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #0c0628, #231067, #34208e, #4554b0, #5c7fd0, #73aae7)",
      hudMainColor: "#f9fbff",
      foreCastbutton: "#4e458a",
      solunaProp: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #0a0523, #1e0f5b, #2c1e82, #3a4ba5, #5074c2, #6a9edb)",
      hudMainColor: "#f6f9ff",
      foreCastbutton: "#4e458a",
      solunaProp: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #09041f, #1a0f4e, #271f75, #34449a, #4a6fc1, #5f9ae1)",
      hudMainColor: "#f8fbff",
      foreCastbutton: "#4e458a",
      solunaProp: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #08031a, #190d47, #271d6e, #355096, #4c7cc0, #63a8e0)",
      hudMainColor: "#f9fbff",
      foreCastbutton: "#4e458a",
      solunaProp: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #060316, #160d42, #231b68, #31508f, #4982ba, #61b4e2)",
      hudMainColor: "#f9fbff",
      foreCastbutton: "#4e458a",
      solunaProp: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #050212, #140b3d, #221a63, #30608b, #4897b5, #60cddd)",
      hudMainColor: "#f9fbff",
      foreCastbutton: "#4e458a",
      solunaProp: "#9d92e0",
    },
  ],

  // 3. ASTRONOMICAL TWILIGHT BEGIN
  // Transitions to: nautical_twilight_begin
  astronomical_twilight_begin: [
    {
      gradient:
        "linear-gradient(180deg, #030314, #120a3b, #1b1258, #2a1a76, #36238c, #4331a3)",
      hudMainColor: "#d8d6ff",
      foreCastbutton: "#544aa0",
      solunaProp: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #07071e, #1a1148, #291c63, #3a2681, #4b2f96, #5b3bb1)",
      hudMainColor: "#e1ddff",
      foreCastbutton: "#544aa0",
      solunaProp: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #0b0925, #1e1450, #311e6b, #452b89, #5637a0, #6746b8)",
      hudMainColor: "#e6e2ff",
      foreCastbutton: "#544aa0",
      solunaProp: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #100c2e, #24185b, #382279, #4c2f94, #5f3dab, #704bc3)",
      hudMainColor: "#f0edff",
      foreCastbutton: "#544aa0",
      solunaProp: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #140f38, #2a1d65, #3f2882, #5434a1, #6a43b9, #7b50d1)",
      hudMainColor: "#faf9ff",
      foreCastbutton: "#544aa0",
      solunaProp: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #1b1543, #322070, #48308d, #5d3eaa, #724ec3, #865edc)",
      hudMainColor: "#ffffff",
      foreCastbutton: "#544aa0",
      solunaProp: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #231b4f, #3b2780, #5233a1, #6940bd, #7e4ed6, #935df0)",
      hudMainColor: "#fffefb",
      foreCastbutton: "#544aa0",
      solunaProp: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #2b2160, #443092, #5b3db1, #724ccd, #875be6, #9c6aff)",
      hudMainColor: "#fbf8ff",
      foreCastbutton: "#544aa0",
      solunaProp: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #332871, #4d38a1, #6446c2, #7b55dc, #9163f6, #a773ff)",
      hudMainColor: "#f8f5ff",
      foreCastbutton: "#544aa0",
      solunaProp: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #3c2e82, #5643b0, #6d51ce, #855fe7, #9c6eff, #b27eff)",
      hudMainColor: "#f9f7ff",
      foreCastbutton: "#544aa0",
      solunaProp: "#a398e2",
    },
  ],

  // 4. NAUTICAL TWILIGHT BEGIN
  // Transitions to: civil_twilight_begin
  nautical_twilight_begin: [
    {
      gradient:
        "linear-gradient(180deg, #1c0e3b, #321b5d, #48297c, #5f3699, #7744b8, #8e53d6)",
      hudMainColor: "#fff9f9",
      foreCastbutton: "#6764c0",
      solunaProp: "#b5b3e8",
    },
    {
      gradient:
        "linear-gradient(180deg, #23104a, #3b1f6e, #532d8d, #6a3cab, #814ac9, #9859e7)",
      hudMainColor: "#fff9f7",
      foreCastbutton: "#6764c0",
      solunaProp: "#b5b3e8",
    },
    {
      gradient:
        "linear-gradient(180deg, #2a1357, #422378, #593195, #7040b2, #8750d0, #9e5fee)",
      hudMainColor: "#fff8f5",
      foreCastbutton: "#6764c0",
      solunaProp: "#b5b3e8",
    },
    {
      gradient:
        "linear-gradient(180deg, #321564, #4a2889, #6235a7, #7a44c4, #9252e2, #aa61ff)",
      hudMainColor: "#fff6f5",
      foreCastbutton: "#6764c0",
      solunaProp: "#b5b3e8",
    },
    {
      gradient:
        "linear-gradient(180deg, #3a1871, #523099, #6a3eb6, #824dd3, #9a5bf1, #b26aff)",
      hudMainColor: "#fff4f3",
      foreCastbutton: "#6764c0",
      solunaProp: "#b5b3e8",
    },
    {
      gradient:
        "linear-gradient(180deg, #421b80, #5b35a5, #7343c2, #8b51df, #a35fff, #bb6eff)",
      hudMainColor: "#fff2f2",
      foreCastbutton: "#7c5ca1",
      solunaProp: "#d49bc8",
    },
    {
      gradient:
        "linear-gradient(180deg, #4a1e8d, #643bb3, #7c49cf, #9458ec, #ac67ff, #c476ff)",
      hudMainColor: "#fff1f0",
      foreCastbutton: "#7c5ca1",
      solunaProp: "#d49bc8",
    },
    {
      gradient:
        "linear-gradient(180deg, #52229a, #6c42ba, #8450d5, #9c5ef2, #b46dff, #cc7cff)",
      hudMainColor: "#fff0ef",
      foreCastbutton: "#7c5ca1",
      solunaProp: "#d49bc8",
    },
    {
      gradient:
        "linear-gradient(180deg, #5a25a8, #744ac7, #8c58e0, #a466fd, #bc75ff, #d484ff)",
      hudMainColor: "#ffefee",
      foreCastbutton: "#7c5ca1",
      solunaProp: "#d49bc8",
    },
    {
      gradient:
        "linear-gradient(180deg, #6229b5, #7c52d3, #945ff0, #ac6cff, #c47bff, #dc8aff)",
      hudMainColor: "#ffeeed",
      foreCastbutton: "#7c5ca1",
      solunaProp: "#d49bc8",
    },
  ],

  // 5. CIVIL TWILIGHT BEGIN
  // Transitions to: blue_hour_begin
  civil_twilight_begin: [
    {
      gradient:
        "linear-gradient(180deg, #2d1259, #472083, #622eaa, #7d3cd1, #994bfa, #b35aff)",
      hudMainColor: "#fffafc",
      foreCastbutton: "#9169a8",
      solunaProp: "#f080bb",
    },
    {
      gradient:
        "linear-gradient(180deg, #35166a, #512698, #6c34be, #8743e3, #a351ff, #bf60ff)",
      hudMainColor: "#fff9fb",
      foreCastbutton: "#9169a8",
      solunaProp: "#f080bb",
    },
    {
      gradient:
        "linear-gradient(180deg, #3d1a7b, #592cb0, #7439d4, #8f48f7, #aa56ff, #c665ff)",
      hudMainColor: "#fff8f9",
      foreCastbutton: "#9169a8",
      solunaProp: "#f080bb",
    },
    {
      gradient:
        "linear-gradient(180deg, #451f8d, #613bc0, #7c48e3, #9756ff, #b165ff, #cb74ff)",
      hudMainColor: "#fff7f7",
      foreCastbutton: "#9169a8",
      solunaProp: "#f080bb",
    },
    {
      gradient:
        "linear-gradient(180deg, #4d239e, #6947d0, #8453f0, #9f61ff, #b970ff, #d37fff)",
      hudMainColor: "#fff5f5",
      foreCastbutton: "#6e72ba",
      solunaProp: "#aec8e6",
    },
    {
      gradient:
        "linear-gradient(180deg, #5527af, #7153e0, #8c5ff9, #a76cff, #c17bff, #db8aff)",
      hudMainColor: "#fff3f3",
      foreCastbutton: "#6e72ba",
      solunaProp: "#aec8e6",
    },
    {
      gradient:
        "linear-gradient(180deg, #5d2bc0, #795fe9, #946bff, #af78ff, #c987ff, #e396ff)",
      hudMainColor: "#fff2f1",
      foreCastbutton: "#6e72ba",
      solunaProp: "#aec8e6",
    },
    {
      gradient:
        "linear-gradient(180deg, #6530d2, #816bfa, #9c77ff, #b785ff, #d194ff, #eba3ff)",
      hudMainColor: "#fff1ef",
      foreCastbutton: "#577ad4",
      solunaProp: "#d4e5ff",
    },
    {
      gradient:
        "linear-gradient(180deg, #6d34e3, #8977ff, #a484ff, #bf91ff, #d99fff, #f3aeff)",
      hudMainColor: "#fff0ee",
      foreCastbutton: "#577ad4",
      solunaProp: "#d4e5ff",
    },
    {
      gradient:
        "linear-gradient(180deg, #7538f4, #9183ff, #ac90ff, #c79eff, #e1adff, #fbbcff)",
      hudMainColor: "#ffefed",
      foreCastbutton: "#577ad4",
      solunaProp: "#d4e5ff",
    },
  ],

  // 6. BLUE HOUR BEGIN
  // Transitions to: sunrise
  blue_hour_begin: [
    {
      // 6.0: Pure Blue Hour
      gradient:
        "linear-gradient(180deg, #1e3a8a 0%, #2b52ac 25%, #3b6bcc 50%, #4b85eb 75%, #5ca0ff 90%, #7dc4ff 100%)",
      hudMainColor: "#ffffff",
      foreCastbutton: "#4b85eb",
      solunaProp: "#d4e5ff",
    },
    {
      // 6.1: First hint of Sunrise
      gradient:
        "linear-gradient(180deg, #2c459c 0%, #4a4c9f 25%, #7054a3 50%, #9a5ea9 75%, #c6699e 90%, #f27c88 100%)",
      hudMainColor: "#ffffff",
      foreCastbutton: "#9a5ea9",
      solunaProp: "#f27c88",
    },
    {
      // 6.2: Approaching Sunrise
      gradient:
        "linear-gradient(180deg, #354aa5 0%, #5e4e 25%, #8c52a0 50%, #ba5595 75%, #e6667d 90%, #ff8c6d 100%)",
      hudMainColor: "#ffffff",
      foreCastbutton: "#ba5595",
      solunaProp: "#ff8c6d",
    },
  ],

  // 7. SUNRISE
  // Transitions to: golden_hour_begin
  sunrise: [
    {
      gradient:
        "linear-gradient(180deg, #3a1b6e, #5c2fa1, #7e43c7, #a157e8, #c46bfd, #e680ff)",
      hudMainColor: "#fff9fb",
      foreCastbutton: "#d5508b",
      solunaProp: "#ff9e5e",
    },
    {
      gradient:
        "linear-gradient(180deg, #4b2a83, #6d3fb1, #8f53d7, #b167f3, #d47bff, #f690ff)",
      hudMainColor: "#fff8f8",
      foreCastbutton: "#d5508b",
      solunaProp: "#ff9e5e",
    },
    {
      gradient:
        "linear-gradient(180deg, #5c3998, #7e4ec1, #a063e3, #c277fa, #e48cff, #ff9fff)",
      hudMainColor: "#fff7f7",
      foreCastbutton: "#d5508b",
      solunaProp: "#ff9e5e",
    },
    {
      gradient:
        "linear-gradient(180deg, #6d47ad, #8f5cd1, #b271ef, #d486ff, #f69aff, #ffb0f3)",
      hudMainColor: "#fff6f6",
      foreCastbutton: "#a2a3c7",
      solunaProp: "#ff9e5e",
    },
    {
      gradient:
        "linear-gradient(180deg, #7e56c2, #a06ae1, #c380ff, #e595ff, #ffaaff, #ffbfe9)",
      hudMainColor: "#fff5f5",
      foreCastbutton: "#a2a3c7",
      solunaProp: "#ff9e5e",
    },
    {
      gradient:
        "linear-gradient(180deg, #9065d7, #b179f2, #d48fff, #f6a4ff, #ffb9f7, #ffcfe6)",
      hudMainColor: "#fff4f4",
      foreCastbutton: "#a2a3c7",
      solunaProp: "#ff9e5e",
    },
    {
      gradient:
        "linear-gradient(180deg, #a174ec, #c288ff, #e59eff, #ffb3ff, #ffc9f0, #ffdfde)",
      hudMainColor: "#fff3f3",
      foreCastbutton: "#a2a3c7",
      solunaProp: "#ff9e5e",
    },
    {
      gradient:
        "linear-gradient(180deg, #b383ff, #d397ff, #f5adff, #ffc2f9, #ffd8ea, #ffeedb)",
      hudMainColor: "#fff2f2",
      foreCastbutton: "#aacee9",
      solunaProp: "#3498db",
    },
    {
      gradient:
        "linear-gradient(180deg, #c592ff, #e5a6ff, #ffbcff, #ffd1f3, #ffe7e3, #fffcdb)",
      hudMainColor: "#fff1f1",
      foreCastbutton: "#aacee9",
      solunaProp: "#3498db",
    },
    {
      gradient:
        "linear-gradient(180deg, #d7a1ff, #f6b5ff, #ffcaff, #ffdfed, #fff4e0, #ffffd3)",
      hudMainColor: "#fff0f0",
      foreCastbutton: "#aacee9",
      solunaProp: "#3498db",
    },
  ],

  // 8. GOLDEN HOUR BEGIN (Post-Sunrise)
  // Transitions to: solar_noon
  golden_hour_begin: [
    {
      // 8.0: Pure Golden Hour (Morning)
      gradient:
        "linear-gradient(180deg, #5eb8ff 0%, #82c5ff 25%, #a6d2ff 50%, #c9e0ff 75%, #e8edff 90%, #fff7e8 100%)",
      hudMainColor: "#2c3e50",
      foreCastbutton: "#a6d2ff",
      solunaProp: "#3498db",
    },
    {
      // 8.1: Mid-Morning
      gradient:
        "linear-gradient(180deg, #4ba0ff 0%, #6fb0ff 25%, #93c0ff 50%, #b7d1ff 75%, #dae2ff 90%, #f5f8ff 100%)",
      hudMainColor: "#22344e",
      foreCastbutton: "#93c0ff",
      solunaProp: "#0077ff",
    },
    {
      // 8.2: Late Morning
      gradient:
        "linear-gradient(180deg, #368dff 0%, #5ca1ff 25%, #80b5ff 50%, #a4c9ff 75%, #c8ddff 90%, #e8f3ff 100%)",
      hudMainColor: "#1e2d44",
      foreCastbutton: "#80b5ff",
      solunaProp: "#0068e0",
    },
    {
      // 8.3: Approaching Solar Noon
      gradient:
        "linear-gradient(180deg, #1f7cff 0%, #4996ff 25%, #70afff 50%, #98c8ff 75%, #c0e1ff 90%, #e4f3ff 100%)",
      hudMainColor: "#1a2b4a",
      foreCastbutton: "#70afff",
      solunaProp: "#0056b3",
      chart: {
        temp: { start: "#ff6b6b", end: "#ff8e8e" }, // قرمز گرم (دما)
        apTemp: { start: "#ff9500", end: "#ffb74d" }, // نارنجی گرم (احساس دما)
        rain: { start: "#4fc3f7", end: "#81d4fa" }, // آبی روشن (باران)
        shower: { start: "#7c4dff", end: "#a78bfa" }, // بنفش نئونی (رگبار)
        snow: { start: "#e0f7fa", end: "#b2ebf2" }, // آبی-سفید یخی (برف)
        windspd: { start: "#64b5f6", end: "#90caf9" }, // آبی آسمانی (باد)
        cldCover: { start: "#b0bec5", end: "#cfd8dc" }, // خاکستری-آبی (ابر)
        humidity: { start: "#4dd0e1", end: "#80deea" }, // فیروزه‌ای (رطوبت)
        precipitation: { start: "#9575cd", end: "#b39ddb" }, // بنفش ملایم (بارش کلی)
      },
    },
  ],

  // 9. SOLAR NOON (Peak Day)
  // Transitions to: golden_hour_end
  solar_noon: [
    {
      gradient:
        "linear-gradient(190deg,#0096d7 10%,#5bcae8 48%,#7dd1e8 52%,#f2f2ff 100%)", // this one is the prime gradient made by me - Not AI
      hudMainColor: "#004466",
      foreCastbutton: "#5ba1ff",
      solunaProp: "#0056b3",
    },
    {
      gradient:
        "linear-gradient(180deg, #73d3db, #91e0ed, #aef0f5, #d4faff, #f0feff, #ffffff)",
      hudMainColor: "#004466",
      foreCastbutton: "#5ba1ff",
      solunaProp: "#0056b3",
    },
    {
      gradient:
        "linear-gradient(180deg, #66c6d0, #88dce5, #a6edf0, #cdf8fc, #eafcff, #ffffff)",
      hudMainColor: "#004466",
      foreCastbutton: "#5ba1ff",
      solunaProp: "#0056b3",
    },
    {
      gradient:
        "linear-gradient(180deg, #5abac5, #7cd1da, #9ae2e7, #c1eff6, #e0fbff, #ffffff)",
      hudMainColor: "#004466",
      foreCastbutton: "#6aa9ff",
      solunaProp: "#005fc0",
    },
    {
      gradient:
        "linear-gradient(180deg, #4dadb9, #6fc4ce, #8dd7de, #b4e5ef, #d3f3fb, #ffffff)",
      hudMainColor: "#003f5c",
      foreCastbutton: "#6aa9ff",
      solunaProp: "#005fc0",
    },
    {
      gradient:
        "linear-gradient(180deg, #40a1ae, #63b8c2, #82ccd2, #a9dbe4, #c8eaf3, #ffffff)",
      hudMainColor: "#003a55",
      foreCastbutton: "#7db3ff",
      solunaProp: "#0068d1",
    },
    {
      gradient:
        "linear-gradient(180deg, #3395a2, #57acb7, #76c0c7, #9dd0da, #bce0ea, #ffffff)",
      hudMainColor: "#00374f",
      foreCastbutton: "#93c9ff",
      solunaProp: "#2980b9",
    },
    {
      gradient:
        "linear-gradient(180deg, #268996, #4aa0ab, #69b4bc, #90c5d0, #afd6e1, #ffffff)",
      hudMainColor: "#003247",
      foreCastbutton: "#93c9ff",
      solunaProp: "#2980b9",
    },
    {
      gradient:
        "linear-gradient(180deg, #197d8a, #3e94a0, #5da9b1, #84bac6, #a3cbd8, #ffffff)",
      hudMainColor: "#002f42",
      foreCastbutton: "#93c9ff",
      solunaProp: "#2980b9",
    },
    {
      gradient:
        "linear-gradient(180deg, #0c717e, #318896, #509daa, #77b0c0, #96c2d2, #ffffff)",
      hudMainColor: "#002a3a",
      foreCastbutton: "#93c9ff",
      solunaProp: "#2980b9",
    },
    {
      gradient:
        "linear-gradient(180deg, #006572, #257c8b, #4491a0, #6ba6b7, #8ab8ca, #ffffff)",
      hudMainColor: "#002634",
      foreCastbutton: "#93c9ff",
      solunaProp: "#2980b9",
    },
  ],

  // 10. GOLDEN HOUR END (Pre-Sunset)
  // Transitions to: sunset
  golden_hour_end: [
    {
      // 10.0: Pure Golden Hour (Evening)
      gradient:
        "linear-gradient(180deg, #4da8ff 0%, #70b8ff 25%, #93c9ff 50%, #b6d9ff 75%, #d9eaff 90%, #fff5d4 100%)",
      hudMainColor: "#2c3e50",
      forecastButton: "#93c9ff",
      solunaProp: "#2980b9",
    },
    {
      // 10.1: Sky warming for Sunset
      gradient:
        "linear-gradient(180deg, #4286cc 0%, #688ab8 25%, #9090a5 50%, #b99794 75%, #e2a084 90%, #ffad76 100%)",
      hudMainColor: "#ffffff",
      forecastButton: "#b99794",
      solunaProp: "#ffad76",
      chart: {
        temp: "#000000",
        apTemp: "#000000",
        rain: "#000000",
        shower: "#000000",
        snow: "#000000",
        windspd: "#000000",
        cldCover: "#000000",
        humidity: "#000000",
        precipitation: "#000000",
      },
    },
    {
      // 10.2: Approaching Sunset
      gradient:
        "linear-gradient(180deg, #376499 0%, #605c8f 25%, #8f5686 50%, #c0537f 75%, #ec5b6b 90%, #ffa366 100%)",
      hudMainColor: "#ffffff",
      forecastButton: "#c0537f",
      solunaProp: "#ffa366",
      chart: {
        temp: "#000000",
        apTemp: "#000000",
        rain: "#000000",
        shower: "#000000",
        snow: "#000000",
        windspd: "#000000",
        cldCover: "#000000",
        humidity: "#000000",
        precipitation: "#000000",
      },
    },
  ],

  // 11. SUNSET
  // Transitions to: blue_hour_end
  sunset: [
    {
      gradient:
        "linear-gradient(180deg, #ffcd94, #ffb87c, #ffa165, #ff8b4e, #ff7538, #ff6021)",
      hudMainColor: "#381200",
      foreCastbutton: "#cc588a",
      solunaProp: "#ff9a55",
    },
    {
      gradient:
        "linear-gradient(180deg, #ffbf86, #ffaa6e, #ff9357, #ff7d40, #ff6729, #ff5212)",
      hudMainColor: "#421600",
      foreCastbutton: "#cc588a",
      solunaProp: "#ff9a55",
    },
    {
      gradient:
        "linear-gradient(180deg, #ffb178, #ff9c60, #ff8549, #ff6f32, #ff5920, #ff430a)",
      hudMainColor: "#4b1800",
      foreCastbutton: "#cc588a",
      solunaProp: "#ff9a55",
    },
    {
      gradient:
        "linear-gradient(180deg, #ffa36a, #ff8e54, #ff783e, #ff6228, #ff4b13, #ff3500)",
      hudMainColor: "#521900",
      foreCastbutton: "#905fa8",
      solunaProp: "#d883c4",
      chart: {
        temp: { start: "#ff6b6b", end: "#ff8e8e" }, // قرمز گرم (دما)
        apTemp: { start: "#ff9500", end: "#ffb74d" }, // نارنجی گرم (احساس دما)
        rain: { start: "#4fc3f7", end: "#81d4fa" }, // آبی روشن (باران)
        shower: { start: "#7c4dff", end: "#a78bfa" }, // بنفش نئونی (رگبار)
        snow: { start: "#e0f7fa", end: "#b2ebf2" }, // آبی-سفید یخی (برف)
        windspd: { start: "#64b5f6", end: "#90caf9" }, // آبی آسمانی (باد)
        cldCover: { start: "#b0bec5", end: "#cfd8dc" }, // خاکستری-آبی (ابر)
        humidity: { start: "#4dd0e1", end: "#80deea" }, // فیروزه‌ای (رطوبت)
        precipitation: { start: "#9575cd", end: "#b39ddb" }, // بنفش ملایم (بارش کلی)
      },
    },
    {
      gradient:
        "linear-gradient(180deg, #ff955c, #ff8049, #ff6a33, #ff541e, #ff3d0b, #ff2700)",
      hudMainColor: "#571800",
      foreCastbutton: "#905fa8",
      solunaProp: "#d883c4",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff874f, #ff723e, #ff5c29, #ff4615, #ff2f02, #ff1a00)",
      hudMainColor: "#5a1500",
      foreCastbutton: "#905fa8",
      solunaProp: "#d883c4",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff7a42, #ff6532, #ff4f1e, #ff390a, #ff2300, #ff0d00)",
      hudMainColor: "#5d1100",
      foreCastbutton: "#905fa8",
      solunaProp: "#d883c4",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff6c35, #ff5727, #ff4113, #ff2b00, #ff1500, #ff0000)",
      hudMainColor: "#5f0e00",
      foreCastbutton: "#685ec2",
      solunaProp: "#c5cae9",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff5f28, #ff4a1c, #ff3409, #ff1e00, #ff0800, #ff0000)",
      hudMainColor: "#600b00",
      foreCastbutton: "#685ec2",
      solunaProp: "#c5cae9",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff521b, #ff3d11, #ff2700, #ff1100, #ff0000, #ff0000)",
      hudMainColor: "#620900",
      foreCastbutton: "#685ec2",
      solunaProp: "#c5cae9",
    },
  ],

  // 12. BLUE HOUR END (Post-Sunset)
  // Transitions to: civil_twilight_end
  blue_hour_end: [
    {
      // 12.0: Pure Blue Hour (Evening)
      gradient:
        "linear-gradient(180deg, #1a237e 0%, #283593 25%, #3949ab 50%, #4e62c0 75%, #647ed4 90%, #889ff0 100%)",
      hudMainColor: "#f5f5f5",
      foreCastbutton: "#4e62c0",
      solunaProp: "#c5cae9",
    },
    {
      // 12.1: Approaching Civil Twilight End
      gradient:
        "linear-gradient(180deg, #1a237e 0%, #2a2a72 25%, #4a3a8f 50%, #6f4b9e 75%, #9b5ca8 90%, #b06cb2 100%)",
      hudMainColor: "#f0e8ff",
      foreCastbutton: "#6f4b9e",
      solunaProp: "#b06cb2",
      chart: {
        temp: { start: "#ff5252", end: "#ff8a80" }, // قرمز گرم ملایم
        apTemp: { start: "#ff4081", end: "#f06292" }, // صورتی گرم (متمایز از دما)
        rain: { start: "#448aff", end: "#82b1ff" }, // آبی روشن (باران)
        shower: { start: "#7c4dff", end: "#b388ff" }, // بنفش نئونی (رگبار)
        snow: { start: "#e0f7fa", end: "#b2ebf2" }, // آبی یخی (برف)
        windspd: { start: "#4fc3f7", end: "#81d4fa" }, // فیروزه‌ای (باد)
        cldCover: { start: "#78909c", end: "#b0bec5" }, // خاکستری-آبی (ابر)
        humidity: { start: "#26c6da", end: "#4dd0e1" }, // فیروزه‌ای تیره (رطوبت)
        precipitation: { start: "#ab47bc", end: "#ce93d8" }, // بنفش ملایم (بارش کلی)
      },
    },
  ],

  // 13. CIVIL TWILIGHT END
  // Transitions to: nautical_twilight_end
  civil_twilight_end: [
    {
      gradient:
        "linear-gradient(180deg, #ff7847, #e36b77, #b060ad, #6f57d8, #374ecf, #0f46bf)",
      hudMainColor: "#fafafa",
      foreCastbutton: "#6f4b9e",
      solunaProp: "#b06cb2",
      chart: {
        temp: { start: "#ff5252", end: "#ff8a80" }, // قرمز گرم ملایم
        apTemp: { start: "#ff4081", end: "#f06292" }, // صورتی گرم (متمایز از دما)
        rain: { start: "#448aff", end: "#82b1ff" }, // آبی روشن (باران)
        shower: { start: "#7c4dff", end: "#b388ff" }, // بنفش نئونی (رگبار)
        snow: { start: "#e0f7fa", end: "#b2ebf2" }, // آبی یخی (برف)
        windspd: { start: "#4fc3f7", end: "#81d4fa" }, // فیروزه‌ای (باد)
        cldCover: { start: "#78909c", end: "#b0bec5" }, // خاکستری-آبی (ابر)
        humidity: { start: "#26c6da", end: "#4dd0e1" }, // فیروزه‌ای تیره (رطوبت)
        precipitation: { start: "#ab47bc", end: "#ce93d8" }, // بنفش ملایم (بارش کلی)
      },
    },
    {
      gradient:
        "linear-gradient(180deg, #ff6e3f, #d36480, #9a5cb1, #5953d1, #2c4ac1, #0a41af)",
      hudMainColor: "#fefefe",
      foreCastbutton: "#6f4b9e",
      solunaProp: "#b06cb2",
      chart: {
        temp: { start: "#ff5252", end: "#ff8a80" }, // قرمز گرم ملایم
        apTemp: { start: "#ff4081", end: "#f06292" }, // صورتی گرم (متمایز از دما)
        rain: { start: "#448aff", end: "#82b1ff" }, // آبی روشن (باران)
        shower: { start: "#7c4dff", end: "#b388ff" }, // بنفش نئونی (رگبار)
        snow: { start: "#e0f7fa", end: "#b2ebf2" }, // آبی یخی (برف)
        windspd: { start: "#4fc3f7", end: "#81d4fa" }, // فیروزه‌ای (باد)
        cldCover: { start: "#78909c", end: "#b0bec5" }, // خاکستری-آبی (ابر)
        humidity: { start: "#26c6da", end: "#4dd0e1" }, // فیروزه‌ای تیره (رطوبت)
        precipitation: { start: "#ab47bc", end: "#ce93d8" }, // بنفش ملایم (بارش کلی)
      },
    },
    {
      gradient:
        "linear-gradient(180deg, #ff6438, #c65e89, #8758b5, #5050c6, #2447b5, #093ea2)",
      hudMainColor: "#ffffff",
      foreCastbutton: "#6f4b9e",
      solunaProp: "#b06cb2",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff5a31, #b75891, #7554b9, #464dba, #1c44aa, #083b99)",
      hudMainColor: "#ffffff",
      foreCastbutton: "#54449a",
      solunaProp: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff5029, #aa519a, #6450bd, #3c49b0, #143fa0, #073890)",
      hudMainColor: "#ffffff",
      foreCastbutton: "#54449a",
      solunaProp: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff4622, #9c4ba3, #544cc1, #3245a7, #0d3b96, #063482)",
      hudMainColor: "#ffffff",
      foreCastbutton: "#54449a",
      solunaProp: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff3c1b, #8e45ac, #4748c4, #28419d, #0a388d, #052f7b)",
      hudMainColor: "#ffffff",
      foreCastbutton: "#54449a",
      solunaProp: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff3214, #803fb5, #3a43c7, #1f3b92, #083282, #04296b)",
      hudMainColor: "#fdfdfd",
      foreCastbutton: "#403b9c",
      solunaProp: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff280c, #7239be, #2d3eca, #193785, #062e74, #03265f)",
      hudMainColor: "#fbfbfb",
      foreCastbutton: "#403b9c",
      solunaProp: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff1e05, #6433c7, #2039cf, #143277, #052964, #021f52)",
      hudMainColor: "#f8f8f8",
      foreCastbutton: "#403b9c",
      solunaProp: "#9fa8da",
    },
  ],
  // 14. NAUTICAL TWILIGHT END
  // Transitions to: astronomical_twilight_end
  nautical_twilight_end: [
    {
      gradient:
        "linear-gradient(180deg, #150b38, #2b1665, #3e1f8b, #5129a8, #6533c6, #783ee3)",
      hudMainColor: "#e8e3ff",
      foreCastbutton: "#3c3f9e",
      solunaProp: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #1a0f42, #321b70, #452497, #582fb5, #6b39d3, #7e43f0)",
      hudMainColor: "#eae5ff",
      foreCastbutton: "#3c3f9e",
      solunaProp: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #1f134b, #381f7a, #4c29a1, #5f33bf, #733dde, #8647fb)",
      hudMainColor: "#ebe7ff",
      foreCastbutton: "#3c3f9e",
      solunaProp: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #241755, #3f2385, #532dad, #6637cb, #7a41ea, #8d4cff)",
      hudMainColor: "#ede9ff",
      foreCastbutton: "#3c3f9e",
      solunaProp: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #291b5f, #462790, #5b31b8, #6e3bd6, #8246f5, #9551ff)",
      hudMainColor: "#efebff",
      foreCastbutton: "#3c3f9e",
      solunaProp: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #2e1f68, #4c2b9a, #6134c1, #743ee0, #8849ff, #9b54ff)",
      hudMainColor: "#f1edff",
      foreCastbutton: "#333090",
      solunaProp: "#8c9eff",
    },
    {
      gradient:
        "linear-gradient(180deg, #332372, #532fa5, #6839ca, #7b43e9, #8f4fff, #a25aff)",
      hudMainColor: "#f3efff",
      foreCastbutton: "#333090",
      solunaProp: "#8c9eff",
    },
    {
      gradient:
        "linear-gradient(180deg, #38277c, #5933b0, #6e3cd3, #8146f3, #954fff, #a85aff)",
      hudMainColor: "#f5f1ff",
      foreCastbutton: "#333090",
      solunaProp: "#8c9eff",
    },
    {
      gradient:
        "linear-gradient(180deg, #3d2b85, #5f37ba, #743fdb, #8749f8, #9b53ff, #ae5eff)",
      hudMainColor: "#f7f3ff",
      foreCastbutton: "#333090",
      solunaProp: "#8c9eff",
    },
    {
      gradient:
        "linear-gradient(180deg, #422f8f, #663bc4, #7b43e3, #8f4cff, #a355ff, #b660ff)",
      hudMainColor: "#f9f5ff",
      foreCastbutton: "#333090",
      solunaProp: "#8c9eff",
    },
  ],

  // 15. ASTRONOMICAL TWILIGHT END
  // Transitions to: night_begin
  astronomical_twilight_end: [
    {
      // 15.0: Pure Astronomical Twilight End
      gradient:
        "linear-gradient(180deg, #0f0a2e 0%, #1a144a 25%, #251e66 50%, #302882 75%, #3c339e 100%)",
      hudMainColor: "#e8eaf6",
      foreCastbutton: "#302882",
      solunaProp: "#8c9eff",
    },
    {
      // 15.1: Approaching Night
      gradient:
        "linear-gradient(180deg, #0c0829 0%, #161040 25%, #1d1754 50%, #251e68 75%, #2d267c 100%)",
      hudMainColor: "#f0e8ff",
      foreCastbutton: "#2d267c",
      solunaProp: "#8b7fdb",
    },
  ],

  // 16. NIGHT BEGIN (Cycle End)
  // Transitions to: mid_night
  night_begin: [
    {
      // 16.0: Pure Night Begin
      gradient:
        "linear-gradient(180deg, #0a0524 0%, #110c36 25%, #181348 50%, #1f1a5a 75%, #27216c 100%)",
      hudMainColor: "#f0e8ff",
      foreCastbutton: "#27216c",
      solunaProp: "#8b7fdb",
    },
    {
      // 16.1: Deepening Night
      gradient:
        "linear-gradient(180deg, #08041e 0%, #0f0b2e 20%, #16113d 40%, #1d174d 60%, #251d5c 80%, #2e2469 100%)",
      hudMainColor: "#f0e8ff",
      foreCastbutton: "#312a6f",
      solunaProp: "#8b7fdb",
    },
    {
      // 16.2: Approaching Midnight (Cycle Close)
      gradient:
        "linear-gradient(180deg, #050217 0%, #0c0925 20%, #151034 40%, #1f1644 60%, #281d52 80%, #312360 100%)",
      hudMainColor: "#f0e8ff",
      foreCastbutton: "#372c6e",
      solunaProp: "#8b7fdb",
    },
  ],

  // --- NON-CYCLICAL EVENTS ---
  // These events are not part of the 24h solar interpolation
  // and represent a single, pure state.

  moonrise: [
    {
      // Pure Moonrise
      gradient:
        "linear-gradient(180deg, #0b0f28 0%, #1a234b 25%, #2d3b70 50%, #4f6696 75%, #7b94c0 90%, #f0f4f8 100%)",
      hudMainColor: "#ffffff",
      foreCastbutton: "#4f6696",
      solunaProp: "#f0f4f8",
    },
  ],

  moonset: [
    {
      gradient:
        "linear-gradient(180deg, #0a0b25 0%, #141a40 20%, #2a3462 45%, #394c7a 65%, #4a6291 80%, #6e84a3 100%)",
      hudMainColor: "#d8e1ff",
      foreCastbutton: "#4f6696",
      solunaProp: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #0f1028 0%, #1a204a 25%, #2e3b6b 45%, #4a5c85 65%, #6b7d9d 85%, #8fa0b8 100%)",
      hudMainColor: "#e0eaff",
      foreCastbutton: "#4f6696",
      solunaProp: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #12122c 0%, #222b53 25%, #3a4d75 50%, #5b6f91 70%, #7e92ac 90%, #a1b5c7 100%)",
      hudMainColor: "#f2f6ff",
      foreCastbutton: "#4f6696",
      solunaProp: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #181736 0%, #2e3a63 25%, #4f5e88 50%, #6f82a2 70%, #92a6b9 90%, #b7c8d0 100%)",
      hudMainColor: "#ffffff",
      foreCastbutton: "#4f6696",
      solunaProp: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #202040 0%, #384670 25%, #5c6a92 50%, #7f8fac 70%, #a2b2c4 90%, #c6d4d7 100%)",
      hudMainColor: "#fdfdfd",
      foreCastbutton: "#4f6696",
      solunaProp: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #28294b 0%, #465b83 25%, #6c80a5 50%, #91a4bd 70%, #b5c8d3 90%, #d8ebea 100%)",
      hudMainColor: "#f9f9fa",
      foreCastbutton: "#4f6696",
      solunaProp: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #313257 0%, #526691 25%, #7890b2 50%, #9fb7c9 70%, #c3d9db 90%, #e7fbf7 100%)",
      hudMainColor: "#f7faff",
      foreCastbutton: "#4f6696",
      solunaProp: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #3b3d62 0%, #5f79a0 25%, #85a3bf 50%, #abcad4 70%, #d0ece0 90%, #f5fff5 100%)",
      hudMainColor: "#f0f6ff",
      foreCastbutton: "#4f6696",
      solunaProp: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #46486f 0%, #6e8bb0 25%, #94b6c9 50%, #baded6 70%, #dfffe3 90%, #ffffff 100%)",
      hudMainColor: "#eaf1ff",
      foreCastbutton: "#4f6696",
      solunaProp: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #4f527a 0%, #7a96b9 25%, #a2c0d0 50%, #c9e6d9 70%, #efffe7 90%, #ffffff 100%)",
      hudMainColor: "#e4ecff",
      foreCastbutton: "#4f6696",
      solunaProp: "#f0f4f8",
    },
  ],
};
