export default defineEventHandler(async (event) => {
  const city = event.context.params.city; // bisa berupa nama kota atau "lat,lon"
  const config = useRuntimeConfig();
  const apiKey = config.public.weatherApiKey;

  try {
    const weather = await $fetch(
      // Current
      // `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`,
      // Forecast (+ Current)
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`,
    );
    return weather;
  } catch (err) {
    console.error("WeatherAPI fetch error:", err);
    return { error: "Failed to fetch weather" };
  }
});
