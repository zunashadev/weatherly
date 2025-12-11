export default defineEventHandler(async (event) => {
  const query = event.context.params.query;
  const config = useRuntimeConfig();
  const apiKey = config.public.weatherApiKey;

  try {
    const weather = await $fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=3&aqi=no&alerts=no`,
    );
    return weather;
  } catch (err) {
    console.error("WeatherAPI fetch error:", err);
    return { error: "Failed to fetch weather" };
  }
});
