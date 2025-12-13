export function useWeatherIcon() {
  function getWeatherIcon(code, isDay) {
    const day = isDay === 1; // Day / Night

    const map = {
      // 1000 — Sunny / Clear
      1000: day ? "clear-day.svg" : "clear-night.svg",

      // 1003 — Partly cloudy
      1003: day ? "partly-cloudy-day.svg" : "partly-cloudy-night.svg",

      // 1006 — Cloudy
      1006: "cloudy.svg",

      // 1009 — Overcast
      1009: day ? "overcast-day.svg" : "overcast-night.svg",

      // 1030 — Mist
      1030: "mist.svg",

      // 1063 — Patchy rain possible
      1063: day ? "partly-cloudy-day-rain.svg" : "partly-cloudy-night-rain.svg",

      // 1066 — Patchy snow possible
      1066: day ? "partly-cloudy-day-snow.svg" : "partly-cloudy-night-snow.svg",

      // 1069 — Patchy sleet possible
      1069: "sleet.svg",

      // 1072 — Patchy freezing drizzle possible
      1072: "sleet.svg",

      // 1087 — Thundery outbreaks possible
      1087: day ? "thunderstorms-day.svg" : "thunderstorms-night.svg",

      // 1114 — Blowing snow
      1114: "snow.svg",

      // 1117 — Blizzard
      1117: "snow.svg", // gada snow-wind.svg

      // 1135 — Fog
      1135: day ? "fog-day.svg" : "fog-night.svg",

      // 1147 — Freezing fog
      1147: "fog.svg",

      // 1150 — Patchy light drizzle
      1150: "drizzle.svg",

      // 1153 — Light drizzle
      1153: "drizzle.svg",

      // 1168 — Freezing drizzle
      1168: "sleet.svg",

      // 1171 — Heavy freezing drizzle
      1171: "sleet.svg",

      // 1180 — Patchy light rain
      1180: "rain.svg",

      // 1183 — Light rain
      1183: "rain.svg",

      // 1186 — Moderate rain at times
      1186: "rain.svg",

      // 1189 — Moderate rain
      1189: "rain.svg",

      // 1192 — Heavy rain at times
      1192: "rain-heavy.svg",

      // 1195 — Heavy rain
      1195: "rain-heavy.svg",

      // 1198 — Light freezing rain
      1198: "sleet.svg",

      // 1201 — Moderate or heavy freezing rain
      1201: "sleet.svg",

      // 1204 — Light sleet
      1204: "sleet.svg",

      // 1207 — Moderate or heavy sleet
      1207: "sleet.svg",

      // 1210 — Patchy light snow
      1210: "snow.svg",

      // 1213 — Light snow
      1213: "snow.svg",

      // 1216 — Patchy moderate snow
      1216: "snow.svg",

      // 1219 — Moderate snow
      1219: "snow.svg",

      // 1222 — Patchy heavy snow
      1222: "snow.svg",

      // 1225 — Heavy snow
      1225: "snow.svg",

      // 1237 — Ice pellets
      1237: "hail.svg",

      // 1240 — Light rain shower
      1240: "rain.svg",

      // 1243 — Moderate or heavy rain shower
      1243: "rain-heavy.svg",

      // 1246 — Torrential rain shower
      1246: "rain-extreme.svg",

      // 1249 — Light sleet showers
      1249: "sleet.svg",

      // 1252 — Moderate or heavy sleet showers
      1252: "sleet.svg",

      // 1255 — Light snow showers
      1255: "snow.svg",

      // 1258 — Moderate or heavy snow showers
      1258: "snow.svg",

      // 1261 — Light showers of ice pellets
      1261: "hail.svg",

      // 1264 — Moderate or heavy showers of ice pellets
      1264: "hail.svg",

      // 1273 — Patchy light rain with thunder
      1273: day ? "thunderstorms-day-rain.svg" : "thunderstorms-night-rain.svg",

      // 1276 — Moderate or heavy rain with thunder
      1276: day ? "thunderstorms-day-rain.svg" : "thunderstorms-night-rain.svg",

      // 1279 — Patchy light snow with thunder
      1279: day ? "thunderstorms-day-snow.svg" : "thunderstorms-night-snow.svg",

      // 1282 — Moderate or heavy snow with thunder
      1282: day ? "thunderstorms-day-snow.svg" : "thunderstorms-night-snow.svg",
    };

    const iconName = map[code] || "cloudy.svg";

    return new URL(`../assets/icons/weather/${iconName}`, import.meta.url).href;
  }

  return { getWeatherIcon };
}
