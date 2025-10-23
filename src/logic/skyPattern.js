// 48-step clear sky gradients (00:00 -> 23:30, هر گام نیم‌ساعته)
// index 0 => "00:00", index 1 => "00:30", ..., index 13 => "06:30" (گرادینت شما قرار دارد)
export const clearSkyGradients = [
  /* 00:00 */ "linear-gradient(180deg, #00020a 0%, #02071d 25%, #031430 60%, #071b3c 100%)",
  /* 00:30 */ "linear-gradient(180deg, #000612 0%, #021029 30%, #042042 65%, #08305a 100%)",
  /* 01:00 */ "linear-gradient(180deg, #000a17 0%, #05203b 30%, #073e5f 65%, #0b5478 100%)",
  /* 01:30 */ "linear-gradient(180deg, #001024 0%, #08304f 32%, #124d76 70%, #165f8f 100%)",
  /* 02:00 */ "linear-gradient(180deg, #00182c 0%, #0b405f 30%, #155f89 66%, #1c78a9 100%)",
  /* 02:30 */ "linear-gradient(180deg, #002033 0%, #114a6e 28%, #1a6f97 64%, #2390bb 100%)",
  /* 03:00 */ "linear-gradient(180deg, #00283a 0%, #165074 30%, #2487a3 66%, #2a9fc0 100%)",
  /* 03:30 */ "linear-gradient(180deg, #003046 0%, #1b6585 30%, #2a96ae 66%, #36b7c9 100%)",
  /* 04:00 */ "linear-gradient(180deg, #003a55 0%, #227b96 28%, #33a7b5 64%, #44cfd6 100%)",
  /* 04:30 */ "linear-gradient(180deg, #004565 0%, #2a94ad 28%, #45c0cf 62%, #8fe3ec 100%)",
  /* 05:00 */ "linear-gradient(180deg, #1b6b83 0%, #47aecd 30%, #8ddfe6 65%, #f0d9b0 100%)",
  /* 05:30 */ "linear-gradient(180deg, #2a7f92 0%, #6fbfd3 28%, #cdeef6 66%, #f7d9a8 100%)",
  /* 06:00 */ "linear-gradient(180deg, #66c8dc 0%, #bceff6 40%, #ffe9c5 70%, #fffaf6 100%)",
  /* 06:30 */ "linear-gradient(190deg, #0096d7 10%, #5bcae8 48%, #7dd1e8 52%, #f2f2ff 100%)",
  /* 07:00 */ "linear-gradient(180deg, #7fd6e6 0%, #c6f0f6 35%, #fffbee 70%, #fffefc 100%)",
  /* 07:30 */ "linear-gradient(180deg, #8be0ea 0%, #dff8fb 35%, #fff9ea 70%, #fffefc 100%)",
  /* 08:00 */ "linear-gradient(180deg, #9be9f0 0%, #e9fbff 40%, #fffdf0 75%, #ffffff 100%)",
  /* 08:30 */ "linear-gradient(180deg, #b2f0f6 0%, #f0fdff 40%, #fffef5 75%, #ffffff 100%)",
  /* 09:00 */ "linear-gradient(180deg, #c8f6fb 0%, #f9ffff 45%, #fffdf8 80%, #ffffff 100%)",
  /* 09:30 */ "linear-gradient(180deg, #dffafe 0%, #ffffff 45%, #fffefc 85%, #ffffff 100%)",
  /* 10:00 */ "linear-gradient(180deg, #e8fbff 0%, #ffffff 45%, #fffefc 85%, #ffffff 100%)",
  /* 10:30 */ "linear-gradient(180deg, #eafcff 0%, #f8ffff 45%, #ffffff 85%, #ffffff 100%)",
  /* 11:00 */ "linear-gradient(180deg, #e6fbff 0%, #f1feff 45%, #ffffff 80%, #ffffff 100%)",
  /* 11:30 */ "linear-gradient(180deg, #dbf9ff 0%, #e9fdff 45%, #ffffff 80%, #ffffff 100%)",
  /* 12:00 */ "linear-gradient(180deg, #c6f2ff 0%, #e6fbff 40%, #ffffff 78%, #ffffff 100%)",
  /* 12:30 */ "linear-gradient(180deg, #aee8ff 0%, #dff7ff 40%, #ffffff 78%, #ffffff 100%)",
  /* 13:00 */ "linear-gradient(180deg, #93ddff 0%, #cdeffb 38%, #f7fcff 75%, #ffffff 100%)",
  /* 13:30 */ "linear-gradient(180deg, #7fd3ff 0%, #bfeefb 38%, #f2fbff 75%, #ffffff 100%)",
  /* 14:00 */ "linear-gradient(180deg, #66c7f8 0%, #a7e6fb 35%, #eafcff 70%, #ffffff 100%)",
  /* 14:30 */ "linear-gradient(180deg, #4dbaf0 0%, #89dcf6 35%, #e6fbff 70%, #ffffff 100%)",
  /* 15:00 */ "linear-gradient(180deg, #3aaee8 0%, #74d8ef 35%, #dff9ff 70%, #ffffff 100%)",
  /* 15:30 */ "linear-gradient(180deg, #2aa3de 0%, #63d1ea 35%, #d6f6ff 70%, #ffffff 100%)",
  /* 16:00 */ "linear-gradient(180deg, #1a96d2 0%, #4fc9e6 35%, #cdeefb 70%, #ffffff 100%)",
  /* 16:30 */ "linear-gradient(180deg, #1686c3 0%, #47c4e6 35%, #bfe9f7 70%, #fffef8 100%)",
  /* 17:00 */ "linear-gradient(180deg, #1276b3 0%, #3db7e0 32%, #b2e3f6 66%, #fff5e6 100%)",
  /* 17:30 */ "linear-gradient(200deg, #0f6096 0%, #2f9fd1 35%, #ffd9a6 70%, #ffb88a 100%)",
  /* 18:00 */ "linear-gradient(200deg, #0e4f7f 0%, #2b8cc9 30%, #f49f6b 66%, #ff7c4a 100%)",
  /* 18:30 */ "linear-gradient(200deg, #0b3a61 0%, #2a7fbf 30%, #ff9b5a 62%, #ff5a36 100%)",
  /* 19:00 */ "linear-gradient(200deg, #09284f 0%, #2569b4 28%, #ff7f4a 60%, #d85a6a 100%)", // بنفش-غروب
  /* 19:30 */ "linear-gradient(200deg, #071f44 0%, #1f5aa0 28%, #f25b6a 58%, #9b3f7a 100%)", // غروب-بنفش
  /* 20:00 */ "linear-gradient(210deg, #051733 0%, #174a7c 30%, #c33f66 62%, #6f2a5a 100%)",
  /* 20:30 */ "linear-gradient(210deg, #04122b 0%, #123b74 30%, #9b2b54 60%, #3b1b3b 100%)",
  /* 21:00 */ "linear-gradient(210deg, #030e23 0%, #0f2b5a 30%, #6b2448 60%, #220e24 100%)",
  /* 21:30 */ "linear-gradient(220deg, #020a1b 0%, #092043 30%, #45203c 60%, #130816 100%)",
  /* 22:00 */ "linear-gradient(220deg, #010718 0%, #061330 35%, #2b2136 65%, #08050d 100%)",
  /* 22:30 */ "linear-gradient(220deg, #000512 0%, #041029 35%, #18203b 70%, #03030a 100%)",
  /* 23:00 */ "linear-gradient(220deg, #00030c 0%, #03102a 35%, #0b1a34 70%, #000712 100%)",
  /* 23:30 */ "linear-gradient(220deg, #00020a 0%, #02071d 25%, #031430 60%, #071b3c 100%)"
];




