const sampleCurrentWeatherData = {
  coord: {
    lon: 10.99,
    lat: 44.34,
  },
  weather: [
    {
      id: 501,
      main: "Rain",
      description: "moderate rain",
      icon: "10d",
    },
  ],
  base: "stations",
  main: {
    temp: 298.48,
    feels_like: 298.74,
    temp_min: 297.56,
    temp_max: 300.05,
    pressure: 1015,
    humidity: 64,
    sea_level: 1015,
    grnd_level: 933,
  },
  visibility: 10000,
  wind: {
    speed: 0.62,
    deg: 349,
    gust: 1.18,
  },
  rain: {
    "1h": 3.16,
  },
  clouds: {
    all: 100,
  },
  dt: 1661870592,
  sys: {
    type: 2,
    id: 2075663,
    country: "IT",
    sunrise: 1661834187,
    sunset: 1661882248,
  },
  timezone: 7200,
  id: 3163858,
  name: "Zocca",
  cod: 200,
};

const sampleSearchResults = [
  {
    name: "London",
    local_names: {
      af: "Londen",
      ar: "لندن",
      ascii: "London",
      az: "London",
      bg: "Лондон",
      ca: "Londres",
      da: "London",
      de: "London",
      el: "Λονδίνο",
      en: "London",
      eu: "Londres",
      fa: "لندن",
      feature_name: "London",
      fi: "Lontoo",
      fr: "Londres",
      gl: "Londres",
      he: "לונדון",
      hi: "लंदन",
      hr: "London",
      hu: "London",
      id: "London",
      it: "Londra",
      ja: "ロンドン",
      la: "Londinium",
      lt: "Londonas",
      mk: "Лондон",
      nl: "Londen",
      no: "London",
      pl: "Londyn",
      pt: "Londres",
      ro: "Londra",
      ru: "Лондон",
      sk: "Londýn",
      sl: "London",
      sr: "Лондон",
      th: "ลอนดอน",
      tr: "Londra",
      vi: "Luân Đôn",
      zu: "ILondon",
    },
    lat: 51.5085,
    lon: -0.1257,
    country: "GB",
  },
  {
    name: "London",
    local_names: {
      ar: "لندن",
      ascii: "London",
      bg: "Лондон",
      de: "London",
      en: "London",
      fa: "لندن، انتاریو",
      feature_name: "London",
      fi: "London",
      fr: "London",
      he: "לונדון",
      ja: "ロンドン",
      lt: "Londonas",
      nl: "London",
      pl: "London",
      pt: "London",
      ru: "Лондон",
      sr: "Лондон",
    },
    lat: 42.9834,
    lon: -81.233,
    country: "CA",
  },
  {
    name: "London",
    local_names: {
      ar: "لندن",
      ascii: "London",
      en: "London",
      fa: "لندن، اوهایو",
      feature_name: "London",
      sr: "Ландон",
    },
    lat: 39.8865,
    lon: -83.4483,
    country: "US",
    state: "OH",
  },
];

export { sampleCurrentWeatherData, sampleSearchResults };
