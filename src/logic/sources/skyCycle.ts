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
 * tempColor: (string) A high-contrast hex color for primary tempColor (e.g., temperature).
 * buttons: (string) A harmonious hex color for UI buttonss.
 * chart: (string) A harmonious hex color for chart lines.
 */
export const skyCycle:(Record<string, any>)= {
  // 1. MIDNIGHT (Cycle Start)
  // Transitions from: night_begin
  // Transitions to: night_end
  mid_night: [
    {
      gradient:
        "linear-gradient(180deg, #02030a, #0b0e23, #16193c, #222557, #2e3172, #3b3d8e)",
      tempColor: "#e1e5ff",
      buttons: "#3c2f6b",
      chart: "#8b7fdb",
    },
    {
      gradient:
        "linear-gradient(180deg, #030411, #101233, #1b1f4e, #262c69, #323985, #3f46a1)",
      tempColor: "#e3e7ff",
      buttons: "#3c2f6b",
      chart: "#8b7fdb",
    },
    {
      gradient:
        "linear-gradient(180deg, #040518, #151842, #20255d, #2c3279, #384095, #455db1)",
      tempColor: "#e6eaff",
      buttons: "#3c2f6b",
      chart: "#8b7fdb",
    },
    {
      gradient:
        "linear-gradient(180deg, #05061f, #1a1e50, #253b6b, #314986, #3d58a2, #4a67be)",
      tempColor: "#e8ecff",
      buttons: "#403573",
      chart: "#9187de",
    },
    {
      gradient:
        "linear-gradient(180deg, #060726, #1f2460, #2a327b, #364096, #425eb2, #4f6cce)",
      tempColor: "#ebeeff",
      buttons: "#403573",
      chart: "#9187de",
    },
    {
      gradient:
        "linear-gradient(180deg, #07082d, #242a70, #2f388b, #3b46a6, #4764c2, #5472de)",
      tempColor: "#edf0ff",
      buttons: "#403573",
      chart: "#9187de",
    },
    {
      gradient:
        "linear-gradient(180deg, #080934, #293080, #344e9c, #405cb7, #4c6ad3, #5978ef)",
      tempColor: "#eff2ff",
      buttons: "#403573",
      chart: "#9187de",
    },
    {
      gradient:
        "linear-gradient(180deg, #090a3b, #2e3690, #3954ab, #4562c6, #5170e2, #5e7eff)",
      tempColor: "#f1f4ff",
      buttons: "#463d7e",
      chart: "#9890e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #0a0b42, #333ca0, #3e5abb, #4a68d6, #5676f2, #6384ff)",
      tempColor: "#f3f6ff",
      buttons: "#463d7e",
      chart: "#9890e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #0b0c49, #3842b0, #435fd3, #4f6dee, #5b7cff, #688aff)",
      tempColor: "#f5f8ff",
      buttons: "#463d7e",
      chart: "#9890e0",
    },
  ],

  // 2. NIGHT END
  // Transitions to: astronomical_twilight_begin
  night_end: [
    {
      gradient:
        "linear-gradient(180deg, #05030f, #120a3a, #1d1460, #26377a, #2e4a8c, #355c9e)",
      tempColor: "#eaf0ff",
      buttons: "#4e458a",
      chart: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #07031a, #180f45, #261a66, #303e80, #3c5a99, #4775b3)",
      tempColor: "#eef3ff",
      buttons: "#4e458a",
      chart: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #09041e, #1c1050, #2b1e73, #37478e, #4668a8, #548ac3)",
      tempColor: "#f2f6ff",
      buttons: "#4e458a",
      chart: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #0b0525, #20105c, #2e1f7f, #3b449d, #4d6db7, #5c95d1)",
      tempColor: "#f7faff",
      buttons: "#4e458a",
      chart: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #0c0628, #231067, #34208e, #4554b0, #5c7fd0, #73aae7)",
      tempColor: "#f9fbff",
      buttons: "#4e458a",
      chart: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #0a0523, #1e0f5b, #2c1e82, #3a4ba5, #5074c2, #6a9edb)",
      tempColor: "#f6f9ff",
      buttons: "#4e458a",
      chart: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #09041f, #1a0f4e, #271f75, #34449a, #4a6fc1, #5f9ae1)",
      tempColor: "#f8fbff",
      buttons: "#4e458a",
      chart: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #08031a, #190d47, #271d6e, #355096, #4c7cc0, #63a8e0)",
      tempColor: "#f9fbff",
      buttons: "#4e458a",
      chart: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #060316, #160d42, #231b68, #31508f, #4982ba, #61b4e2)",
      tempColor: "#f9fbff",
      buttons: "#4e458a",
      chart: "#9d92e0",
    },
    {
      gradient:
        "linear-gradient(180deg, #050212, #140b3d, #221a63, #30608b, #4897b5, #60cddd)",
      tempColor: "#f9fbff",
      buttons: "#4e458a",
      chart: "#9d92e0",
    },
  ],

  // 3. ASTRONOMICAL TWILIGHT BEGIN
  // Transitions to: nautical_twilight_begin
  astronomical_twilight_begin: [
    {
      gradient:
        "linear-gradient(180deg, #030314, #120a3b, #1b1258, #2a1a76, #36238c, #4331a3)",
      tempColor: "#d8d6ff",
      buttons: "#544aa0",
      chart: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #07071e, #1a1148, #291c63, #3a2681, #4b2f96, #5b3bb1)",
      tempColor: "#e1ddff",
      buttons: "#544aa0",
      chart: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #0b0925, #1e1450, #311e6b, #452b89, #5637a0, #6746b8)",
      tempColor: "#e6e2ff",
      buttons: "#544aa0",
      chart: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #100c2e, #24185b, #382279, #4c2f94, #5f3dab, #704bc3)",
      tempColor: "#f0edff",
      buttons: "#544aa0",
      chart: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #140f38, #2a1d65, #3f2882, #5434a1, #6a43b9, #7b50d1)",
      tempColor: "#faf9ff",
      buttons: "#544aa0",
      chart: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #1b1543, #322070, #48308d, #5d3eaa, #724ec3, #865edc)",
      tempColor: "#ffffff",
      buttons: "#544aa0",
      chart: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #231b4f, #3b2780, #5233a1, #6940bd, #7e4ed6, #935df0)",
      tempColor: "#fffefb",
      buttons: "#544aa0",
      chart: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #2b2160, #443092, #5b3db1, #724ccd, #875be6, #9c6aff)",
      tempColor: "#fbf8ff",
      buttons: "#544aa0",
      chart: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #332871, #4d38a1, #6446c2, #7b55dc, #9163f6, #a773ff)",
      tempColor: "#f8f5ff",
      buttons: "#544aa0",
      chart: "#a398e2",
    },
    {
      gradient:
        "linear-gradient(180deg, #3c2e82, #5643b0, #6d51ce, #855fe7, #9c6eff, #b27eff)",
      tempColor: "#f9f7ff",
      buttons: "#544aa0",
      chart: "#a398e2",
    },
  ],

  // 4. NAUTICAL TWILIGHT BEGIN
  // Transitions to: civil_twilight_begin
  nautical_twilight_begin: [
    {
      gradient:
        "linear-gradient(180deg, #1c0e3b, #321b5d, #48297c, #5f3699, #7744b8, #8e53d6)",
      tempColor: "#fff9f9",
      buttons: "#6764c0",
      chart: "#b5b3e8",
    },
    {
      gradient:
        "linear-gradient(180deg, #23104a, #3b1f6e, #532d8d, #6a3cab, #814ac9, #9859e7)",
      tempColor: "#fff9f7",
      buttons: "#6764c0",
      chart: "#b5b3e8",
    },
    {
      gradient:
        "linear-gradient(180deg, #2a1357, #422378, #593195, #7040b2, #8750d0, #9e5fee)",
      tempColor: "#fff8f5",
      buttons: "#6764c0",
      chart: "#b5b3e8",
    },
    {
      gradient:
        "linear-gradient(180deg, #321564, #4a2889, #6235a7, #7a44c4, #9252e2, #aa61ff)",
      tempColor: "#fff6f5",
      buttons: "#6764c0",
      chart: "#b5b3e8",
    },
    {
      gradient:
        "linear-gradient(180deg, #3a1871, #523099, #6a3eb6, #824dd3, #9a5bf1, #b26aff)",
      tempColor: "#fff4f3",
      buttons: "#6764c0",
      chart: "#b5b3e8",
    },
    {
      gradient:
        "linear-gradient(180deg, #421b80, #5b35a5, #7343c2, #8b51df, #a35fff, #bb6eff)",
      tempColor: "#fff2f2",
      buttons: "#7c5ca1",
      chart: "#d49bc8",
    },
    {
      gradient:
        "linear-gradient(180deg, #4a1e8d, #643bb3, #7c49cf, #9458ec, #ac67ff, #c476ff)",
      tempColor: "#fff1f0",
      buttons: "#7c5ca1",
      chart: "#d49bc8",
    },
    {
      gradient:
        "linear-gradient(180deg, #52229a, #6c42ba, #8450d5, #9c5ef2, #b46dff, #cc7cff)",
      tempColor: "#fff0ef",
      buttons: "#7c5ca1",
      chart: "#d49bc8",
    },
    {
      gradient:
        "linear-gradient(180deg, #5a25a8, #744ac7, #8c58e0, #a466fd, #bc75ff, #d484ff)",
      tempColor: "#ffefee",
      buttons: "#7c5ca1",
      chart: "#d49bc8",
    },
    {
      gradient:
        "linear-gradient(180deg, #6229b5, #7c52d3, #945ff0, #ac6cff, #c47bff, #dc8aff)",
      tempColor: "#ffeeed",
      buttons: "#7c5ca1",
      chart: "#d49bc8",
    },
  ],

  // 5. CIVIL TWILIGHT BEGIN
  // Transitions to: blue_hour_begin
  civil_twilight_begin: [
    {
      gradient:
        "linear-gradient(180deg, #2d1259, #472083, #622eaa, #7d3cd1, #994bfa, #b35aff)",
      tempColor: "#fffafc",
      buttons: "#9169a8",
      chart: "#f080bb",
    },
    {
      gradient:
        "linear-gradient(180deg, #35166a, #512698, #6c34be, #8743e3, #a351ff, #bf60ff)",
      tempColor: "#fff9fb",
      buttons: "#9169a8",
      chart: "#f080bb",
    },
    {
      gradient:
        "linear-gradient(180deg, #3d1a7b, #592cb0, #7439d4, #8f48f7, #aa56ff, #c665ff)",
      tempColor: "#fff8f9",
      buttons: "#9169a8",
      chart: "#f080bb",
    },
    {
      gradient:
        "linear-gradient(180deg, #451f8d, #613bc0, #7c48e3, #9756ff, #b165ff, #cb74ff)",
      tempColor: "#fff7f7",
      buttons: "#9169a8",
      chart: "#f080bb",
    },
    {
      gradient:
        "linear-gradient(180deg, #4d239e, #6947d0, #8453f0, #9f61ff, #b970ff, #d37fff)",
      tempColor: "#fff5f5",
      buttons: "#6e72ba",
      chart: "#aec8e6",
    },
    {
      gradient:
        "linear-gradient(180deg, #5527af, #7153e0, #8c5ff9, #a76cff, #c17bff, #db8aff)",
      tempColor: "#fff3f3",
      buttons: "#6e72ba",
      chart: "#aec8e6",
    },
    {
      gradient:
        "linear-gradient(180deg, #5d2bc0, #795fe9, #946bff, #af78ff, #c987ff, #e396ff)",
      tempColor: "#fff2f1",
      buttons: "#6e72ba",
      chart: "#aec8e6",
    },
    {
      gradient:
        "linear-gradient(180deg, #6530d2, #816bfa, #9c77ff, #b785ff, #d194ff, #eba3ff)",
      tempColor: "#fff1ef",
      buttons: "#577ad4",
      chart: "#d4e5ff",
    },
    {
      gradient:
        "linear-gradient(180deg, #6d34e3, #8977ff, #a484ff, #bf91ff, #d99fff, #f3aeff)",
      tempColor: "#fff0ee",
      buttons: "#577ad4",
      chart: "#d4e5ff",
    },
    {
      gradient:
        "linear-gradient(180deg, #7538f4, #9183ff, #ac90ff, #c79eff, #e1adff, #fbbcff)",
      tempColor: "#ffefed",
      buttons: "#577ad4",
      chart: "#d4e5ff",
    },
  ],

  // 6. BLUE HOUR BEGIN
  // Transitions to: sunrise
  blue_hour_begin: [
    {
      // 6.0: Pure Blue Hour
      gradient:
        "linear-gradient(180deg, #1e3a8a 0%, #2b52ac 25%, #3b6bcc 50%, #4b85eb 75%, #5ca0ff 90%, #7dc4ff 100%)",
      tempColor: "#ffffff",
      buttons: "#4b85eb",
      chart: "#d4e5ff",
    },
    {
      // 6.1: First hint of Sunrise
      gradient:
        "linear-gradient(180deg, #2c459c 0%, #4a4c9f 25%, #7054a3 50%, #9a5ea9 75%, #c6699e 90%, #f27c88 100%)",
      tempColor: "#ffffff",
      buttons: "#9a5ea9",
      chart: "#f27c88",
    },
    {
      // 6.2: Approaching Sunrise
      gradient:
        "linear-gradient(180deg, #354aa5 0%, #5e4e 25%, #8c52a0 50%, #ba5595 75%, #e6667d 90%, #ff8c6d 100%)",
      tempColor: "#ffffff",
      buttons: "#ba5595",
      chart: "#ff8c6d",
    },
  ],

  // 7. SUNRISE
  // Transitions to: golden_hour_begin
  sunrise: [
    {
      gradient:
        "linear-gradient(180deg, #3a1b6e, #5c2fa1, #7e43c7, #a157e8, #c46bfd, #e680ff)",
      tempColor: "#fff9fb",
      buttons: "#d5508b",
      chart: "#ff9e5e",
    },
    {
      gradient:
        "linear-gradient(180deg, #4b2a83, #6d3fb1, #8f53d7, #b167f3, #d47bff, #f690ff)",
      tempColor: "#fff8f8",
      buttons: "#d5508b",
      chart: "#ff9e5e",
    },
    {
      gradient:
        "linear-gradient(180deg, #5c3998, #7e4ec1, #a063e3, #c277fa, #e48cff, #ff9fff)",
      tempColor: "#fff7f7",
      buttons: "#d5508b",
      chart: "#ff9e5e",
    },
    {
      gradient:
        "linear-gradient(180deg, #6d47ad, #8f5cd1, #b271ef, #d486ff, #f69aff, #ffb0f3)",
      tempColor: "#fff6f6",
      buttons: "#a2a3c7",
      chart: "#ff9e5e",
    },
    {
      gradient:
        "linear-gradient(180deg, #7e56c2, #a06ae1, #c380ff, #e595ff, #ffaaff, #ffbfe9)",
      tempColor: "#fff5f5",
      buttons: "#a2a3c7",
      chart: "#ff9e5e",
    },
    {
      gradient:
        "linear-gradient(180deg, #9065d7, #b179f2, #d48fff, #f6a4ff, #ffb9f7, #ffcfe6)",
      tempColor: "#fff4f4",
      buttons: "#a2a3c7",
      chart: "#ff9e5e",
    },
    {
      gradient:
        "linear-gradient(180deg, #a174ec, #c288ff, #e59eff, #ffb3ff, #ffc9f0, #ffdfde)",
      tempColor: "#fff3f3",
      buttons: "#a2a3c7",
      chart: "#ff9e5e",
    },
    {
      gradient:
        "linear-gradient(180deg, #b383ff, #d397ff, #f5adff, #ffc2f9, #ffd8ea, #ffeedb)",
      tempColor: "#fff2f2",
      buttons: "#aacee9",
      chart: "#3498db",
    },
    {
      gradient:
        "linear-gradient(180deg, #c592ff, #e5a6ff, #ffbcff, #ffd1f3, #ffe7e3, #fffcdb)",
      tempColor: "#fff1f1",
      buttons: "#aacee9",
      chart: "#3498db",
    },
    {
      gradient:
        "linear-gradient(180deg, #d7a1ff, #f6b5ff, #ffcaff, #ffdfed, #fff4e0, #ffffd3)",
      tempColor: "#fff0f0",
      buttons: "#aacee9",
      chart: "#3498db",
    },
  ],

  // 8. GOLDEN HOUR BEGIN (Post-Sunrise)
  // Transitions to: solar_noon
  golden_hour_begin: [
    {
      // 8.0: Pure Golden Hour (Morning)
      gradient:
        "linear-gradient(180deg, #5eb8ff 0%, #82c5ff 25%, #a6d2ff 50%, #c9e0ff 75%, #e8edff 90%, #fff7e8 100%)",
      tempColor: "#2c3e50",
      buttons: "#a6d2ff",
      chart: "#3498db",
    },
    {
      // 8.1: Mid-Morning
      gradient:
        "linear-gradient(180deg, #4ba0ff 0%, #6fb0ff 25%, #93c0ff 50%, #b7d1ff 75%, #dae2ff 90%, #f5f8ff 100%)",
      tempColor: "#22344e",
      buttons: "#93c0ff",
      chart: "#0077ff",
    },
    {
      // 8.2: Late Morning
      gradient:
        "linear-gradient(180deg, #368dff 0%, #5ca1ff 25%, #80b5ff 50%, #a4c9ff 75%, #c8ddff 90%, #e8f3ff 100%)",
      tempColor: "#1e2d44",
      buttons: "#80b5ff",
      chart: "#0068e0",
    },
    {
      // 8.3: Approaching Solar Noon
      gradient:
        "linear-gradient(180deg, #1f7cff 0%, #4996ff 25%, #70afff 50%, #98c8ff 75%, #c0e1ff 90%, #e4f3ff 100%)",
      tempColor: "#1a2b4a",
      buttons: "#70afff",
      chart: "#0056b3",
    },
  ],

  // 9. SOLAR NOON (Peak Day)
  // Transitions to: golden_hour_end
  solar_noon: [
    {
      gradient:
        "linear-gradient(180deg, #73d3db, #91e0ed, #aef0f5, #d4faff, #f0feff, #ffffff)",
      tempColor: "#004466",
      buttons: "#5ba1ff",
      chart: "#0056b3",
    },
    {
      gradient:
        "linear-gradient(180deg, #66c6d0, #88dce5, #a6edf0, #cdf8fc, #eafcff, #ffffff)",
      tempColor: "#004466",
      buttons: "#5ba1ff",
      chart: "#0056b3",
    },
    {
      gradient:
        "linear-gradient(180deg, #5abac5, #7cd1da, #9ae2e7, #c1eff6, #e0fbff, #ffffff)",
      tempColor: "#004466",
      buttons: "#6aa9ff",
      chart: "#005fc0",
    },
    {
      gradient:
        "linear-gradient(180deg, #4dadb9, #6fc4ce, #8dd7de, #b4e5ef, #d3f3fb, #ffffff)",
      tempColor: "#003f5c",
      buttons: "#6aa9ff",
      chart: "#005fc0",
    },
    {
      gradient:
        "linear-gradient(180deg, #40a1ae, #63b8c2, #82ccd2, #a9dbe4, #c8eaf3, #ffffff)",
      tempColor: "#003a55",
      buttons: "#7db3ff",
      chart: "#0068d1",
    },
    {
      gradient:
        "linear-gradient(180deg, #3395a2, #57acb7, #76c0c7, #9dd0da, #bce0ea, #ffffff)",
      tempColor: "#00374f",
      buttons: "#93c9ff",
      chart: "#2980b9",
    },
    {
      gradient:
        "linear-gradient(180deg, #268996, #4aa0ab, #69b4bc, #90c5d0, #afd6e1, #ffffff)",
      tempColor: "#003247",
      buttons: "#93c9ff",
      chart: "#2980b9",
    },
    {
      gradient:
        "linear-gradient(180deg, #197d8a, #3e94a0, #5da9b1, #84bac6, #a3cbd8, #ffffff)",
      tempColor: "#002f42",
      buttons: "#93c9ff",
      chart: "#2980b9",
    },
    {
      gradient:
        "linear-gradient(180deg, #0c717e, #318896, #509daa, #77b0c0, #96c2d2, #ffffff)",
      tempColor: "#002a3a",
      buttons: "#93c9ff",
      chart: "#2980b9",
    },
    {
      gradient:
        "linear-gradient(180deg, #006572, #257c8b, #4491a0, #6ba6b7, #8ab8ca, #ffffff)",
      tempColor: "#002634",
      buttons: "#93c9ff",
      chart: "#2980b9",
    },
  ],

  // 10. GOLDEN HOUR END (Pre-Sunset)
  // Transitions to: sunset
  golden_hour_end: [
    {
      // 10.0: Pure Golden Hour (Evening)
      gradient:
        "linear-gradient(180deg, #4da8ff 0%, #70b8ff 25%, #93c9ff 50%, #b6d9ff 75%, #d9eaff 90%, #fff5d4 100%)",
      tempColor: "#2c3e50",
      buttons: "#93c9ff",
      chart: "#2980b9",
    },
    {
      // 10.1: Sky warming for Sunset
      gradient:
        "linear-gradient(180deg, #4286cc 0%, #688ab8 25%, #9090a5 50%, #b99794 75%, #e2a084 90%, #ffad76 100%)",
      tempColor: "#ffffff",
      buttons: "#b99794",
      chart: "#ffad76",
    },
    {
      // 10.2: Approaching Sunset
      gradient:
        "linear-gradient(180deg, #376499 0%, #605c8f 25%, #8f5686 50%, #c0537f 75%, #ec5b6b 90%, #ffa366 100%)",
      tempColor: "#ffffff",
      buttons: "#c0537f",
      chart: "#ffa366",
    },
  ],

  // 11. SUNSET
  // Transitions to: blue_hour_end
  sunset: [
    {
      gradient:
        "linear-gradient(180deg, #ffcd94, #ffb87c, #ffa165, #ff8b4e, #ff7538, #ff6021)",
      tempColor: "#381200",
      buttons: "#cc588a",
      chart: "#ff9a55",
    },
    {
      gradient:
        "linear-gradient(180deg, #ffbf86, #ffaa6e, #ff9357, #ff7d40, #ff6729, #ff5212)",
      tempColor: "#421600",
      buttons: "#cc588a",
      chart: "#ff9a55",
    },
    {
      gradient:
        "linear-gradient(180deg, #ffb178, #ff9c60, #ff8549, #ff6f32, #ff5920, #ff430a)",
      tempColor: "#4b1800",
      buttons: "#cc588a",
      chart: "#ff9a55",
    },
    {
      gradient:
        "linear-gradient(180deg, #ffa36a, #ff8e54, #ff783e, #ff6228, #ff4b13, #ff3500)",
      tempColor: "#521900",
      buttons: "#905fa8",
      chart: "#d883c4",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff955c, #ff8049, #ff6a33, #ff541e, #ff3d0b, #ff2700)",
      tempColor: "#571800",
      buttons: "#905fa8",
      chart: "#d883c4",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff874f, #ff723e, #ff5c29, #ff4615, #ff2f02, #ff1a00)",
      tempColor: "#5a1500",
      buttons: "#905fa8",
      chart: "#d883c4",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff7a42, #ff6532, #ff4f1e, #ff390a, #ff2300, #ff0d00)",
      tempColor: "#5d1100",
      buttons: "#905fa8",
      chart: "#d883c4",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff6c35, #ff5727, #ff4113, #ff2b00, #ff1500, #ff0000)",
      tempColor: "#5f0e00",
      buttons: "#685ec2",
      chart: "#c5cae9",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff5f28, #ff4a1c, #ff3409, #ff1e00, #ff0800, #ff0000)",
      tempColor: "#600b00",
      buttons: "#685ec2",
      chart: "#c5cae9",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff521b, #ff3d11, #ff2700, #ff1100, #ff0000, #ff0000)",
      tempColor: "#620900",
      buttons: "#685ec2",
      chart: "#c5cae9",
    },
  ],

  // 12. BLUE HOUR END (Post-Sunset)
  // Transitions to: civil_twilight_end
  blue_hour_end: [
    {
      // 12.0: Pure Blue Hour (Evening)
      gradient:
        "linear-gradient(180deg, #1a237e 0%, #283593 25%, #3949ab 50%, #4e62c0 75%, #647ed4 90%, #889ff0 100%)",
      tempColor: "#f5f5f5",
      buttons: "#4e62c0",
      chart: "#c5cae9",
    },
    {
      // 12.1: Approaching Civil Twilight End
      gradient:
        "linear-gradient(180deg, #1a237e 0%, #2a2a72 25%, #4a3a8f 50%, #6f4b9e 75%, #9b5ca8 90%, #b06cb2 100%)",
      tempColor: "#f0e8ff",
      buttons: "#6f4b9e",
      chart: "#b06cb2",
    },
  ],

  // 13. CIVIL TWILIGHT END
  // Transitions to: nautical_twilight_end
  civil_twilight_end: [
    {
      gradient:
        "linear-gradient(180deg, #ff7847, #e36b77, #b060ad, #6f57d8, #374ecf, #0f46bf)",
      tempColor: "#fafafa",
      buttons: "#6f4b9e",
      chart: "#b06cb2",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff6e3f, #d36480, #9a5cb1, #5953d1, #2c4ac1, #0a41af)",
      tempColor: "#fefefe",
      buttons: "#6f4b9e",
      chart: "#b06cb2",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff6438, #c65e89, #8758b5, #5050c6, #2447b5, #093ea2)",
      tempColor: "#ffffff",
      buttons: "#6f4b9e",
      chart: "#b06cb2",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff5a31, #b75891, #7554b9, #464dba, #1c44aa, #083b99)",
      tempColor: "#ffffff",
      buttons: "#54449a",
      chart: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff5029, #aa519a, #6450bd, #3c49b0, #143fa0, #073890)",
      tempColor: "#ffffff",
      buttons: "#54449a",
      chart: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff4622, #9c4ba3, #544cc1, #3245a7, #0d3b96, #063482)",
      tempColor: "#ffffff",
      buttons: "#54449a",
      chart: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff3c1b, #8e45ac, #4748c4, #28419d, #0a388d, #052f7b)",
      tempColor: "#ffffff",
      buttons: "#54449a",
      chart: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff3214, #803fb5, #3a43c7, #1f3b92, #083282, #04296b)",
      tempColor: "#fdfdfd",
      buttons: "#403b9c",
      chart: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff280c, #7239be, #2d3eca, #193785, #062e74, #03265f)",
      tempColor: "#fbfbfb",
      buttons: "#403b9c",
      chart: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #ff1e05, #6433c7, #2039cf, #143277, #052964, #021f52)",
      tempColor: "#f8f8f8",
      buttons: "#403b9c",
      chart: "#9fa8da",
    },
  ],
  // 14. NAUTICAL TWILIGHT END
  // Transitions to: astronomical_twilight_end
  nautical_twilight_end: [
    {
      gradient:
        "linear-gradient(180deg, #150b38, #2b1665, #3e1f8b, #5129a8, #6533c6, #783ee3)",
      tempColor: "#e8e3ff",
      buttons: "#3c3f9e",
      chart: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #1a0f42, #321b70, #452497, #582fb5, #6b39d3, #7e43f0)",
      tempColor: "#eae5ff",
      buttons: "#3c3f9e",
      chart: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #1f134b, #381f7a, #4c29a1, #5f33bf, #733dde, #8647fb)",
      tempColor: "#ebe7ff",
      buttons: "#3c3f9e",
      chart: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #241755, #3f2385, #532dad, #6637cb, #7a41ea, #8d4cff)",
      tempColor: "#ede9ff",
      buttons: "#3c3f9e",
      chart: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #291b5f, #462790, #5b31b8, #6e3bd6, #8246f5, #9551ff)",
      tempColor: "#efebff",
      buttons: "#3c3f9e",
      chart: "#9fa8da",
    },
    {
      gradient:
        "linear-gradient(180deg, #2e1f68, #4c2b9a, #6134c1, #743ee0, #8849ff, #9b54ff)",
      tempColor: "#f1edff",
      buttons: "#333090",
      chart: "#8c9eff",
    },
    {
      gradient:
        "linear-gradient(180deg, #332372, #532fa5, #6839ca, #7b43e9, #8f4fff, #a25aff)",
      tempColor: "#f3efff",
      buttons: "#333090",
      chart: "#8c9eff",
    },
    {
      gradient:
        "linear-gradient(180deg, #38277c, #5933b0, #6e3cd3, #8146f3, #954fff, #a85aff)",
      tempColor: "#f5f1ff",
      buttons: "#333090",
      chart: "#8c9eff",
    },
    {
      gradient:
        "linear-gradient(180deg, #3d2b85, #5f37ba, #743fdb, #8749f8, #9b53ff, #ae5eff)",
      tempColor: "#f7f3ff",
      buttons: "#333090",
      chart: "#8c9eff",
    },
    {
      gradient:
        "linear-gradient(180deg, #422f8f, #663bc4, #7b43e3, #8f4cff, #a355ff, #b660ff)",
      tempColor: "#f9f5ff",
      buttons: "#333090",
      chart: "#8c9eff",
    },
  ],

  // 15. ASTRONOMICAL TWILIGHT END
  // Transitions to: night_begin
  astronomical_twilight_end: [
    {
      // 15.0: Pure Astronomical Twilight End
      gradient:
        "linear-gradient(180deg, #0f0a2e 0%, #1a144a 25%, #251e66 50%, #302882 75%, #3c339e 100%)",
      tempColor: "#e8eaf6",
      buttons: "#302882",
      chart: "#8c9eff",
    },
    {
      // 15.1: Approaching Night
      gradient:
        "linear-gradient(180deg, #0c0829 0%, #161040 25%, #1d1754 50%, #251e68 75%, #2d267c 100%)",
      tempColor: "#f0e8ff",
      buttons: "#2d267c",
      chart: "#8b7fdb",
    },
  ],

  // 16. NIGHT BEGIN (Cycle End)
  // Transitions to: mid_night
  night_begin: [
    {
      // 16.0: Pure Night Begin
      gradient:
        "linear-gradient(180deg, #0a0524 0%, #110c36 25%, #181348 50%, #1f1a5a 75%, #27216c 100%)",
      tempColor: "#f0e8ff",
      buttons: "#27216c",
      chart: "#8b7fdb",
    },
    {
      // 16.1: Deepening Night
      gradient:
        "linear-gradient(180deg, #08041e 0%, #0f0b2e 20%, #16113d 40%, #1d174d 60%, #251d5c 80%, #2e2469 100%)",
      tempColor: "#f0e8ff",
      buttons: "#312a6f",
      chart: "#8b7fdb",
    },
    {
      // 16.2: Approaching Midnight (Cycle Close)
      gradient:
        "linear-gradient(180deg, #050217 0%, #0c0925 20%, #151034 40%, #1f1644 60%, #281d52 80%, #312360 100%)",
      tempColor: "#f0e8ff",
      buttons: "#372c6e",
      chart: "#8b7fdb",
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
      tempColor: "#ffffff",
      buttons: "#4f6696",
      chart: "#f0f4f8",
    },
  ],

  moonset: [
    {
      gradient:
        "linear-gradient(180deg, #0a0b25 0%, #141a40 20%, #2a3462 45%, #394c7a 65%, #4a6291 80%, #6e84a3 100%)",
      tempColor: "#d8e1ff",
      buttons: "#4f6696",
      chart: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #0f1028 0%, #1a204a 25%, #2e3b6b 45%, #4a5c85 65%, #6b7d9d 85%, #8fa0b8 100%)",
      tempColor: "#e0eaff",
      buttons: "#4f6696",
      chart: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #12122c 0%, #222b53 25%, #3a4d75 50%, #5b6f91 70%, #7e92ac 90%, #a1b5c7 100%)",
      tempColor: "#f2f6ff",
      buttons: "#4f6696",
      chart: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #181736 0%, #2e3a63 25%, #4f5e88 50%, #6f82a2 70%, #92a6b9 90%, #b7c8d0 100%)",
      tempColor: "#ffffff",
      buttons: "#4f6696",
      chart: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #202040 0%, #384670 25%, #5c6a92 50%, #7f8fac 70%, #a2b2c4 90%, #c6d4d7 100%)",
      tempColor: "#fdfdfd",
      buttons: "#4f6696",
      chart: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #28294b 0%, #465b83 25%, #6c80a5 50%, #91a4bd 70%, #b5c8d3 90%, #d8ebea 100%)",
      tempColor: "#f9f9fa",
      buttons: "#4f6696",
      chart: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #313257 0%, #526691 25%, #7890b2 50%, #9fb7c9 70%, #c3d9db 90%, #e7fbf7 100%)",
      tempColor: "#f7faff",
      buttons: "#4f6696",
      chart: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #3b3d62 0%, #5f79a0 25%, #85a3bf 50%, #abcad4 70%, #d0ece0 90%, #f5fff5 100%)",
      tempColor: "#f0f6ff",
      buttons: "#4f6696",
      chart: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #46486f 0%, #6e8bb0 25%, #94b6c9 50%, #baded6 70%, #dfffe3 90%, #ffffff 100%)",
      tempColor: "#eaf1ff",
      buttons: "#4f6696",
      chart: "#f0f4f8",
    },
    {
      gradient:
        "linear-gradient(180deg, #4f527a 0%, #7a96b9 25%, #a2c0d0 50%, #c9e6d9 70%, #efffe7 90%, #ffffff 100%)",
      tempColor: "#e4ecff",
      buttons: "#4f6696",
      chart: "#f0f4f8",
    },
  ],
};
