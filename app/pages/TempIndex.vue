<script setup>
const city = ref("");
const weather = ref(null);
const error = ref("");
const loading = ref(false);

const getWeather = async () => {
  if (!city.value) {
    error.value = "Please enter a city";
    return;
  }

  loading.value = true;
  error.value = "";
  weather.value = null;

  try {
    weather.value = await $fetch(`/api/weather/${city.value}`);
  } catch (err) {
    console.error(err);
    error.value = "Failed to fetch weather";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="mx-auto mt-10 max-w-md rounded border p-6 shadow">
    <h1 class="mb-4 text-2xl font-bold">Weather App</h1>
    <form @submit.prevent="getWeather" class="mb-4">
      <input
        v-model="city"
        type="text"
        placeholder="Enter city"
        class="w-full rounded border p-2"
      />
      <button
        class="mt-2 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
      >
        Get Weather
      </button>
    </form>

    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div v-if="weather" class="mt-4 rounded border bg-blue-50 p-4">
      <h2 class="text-xl font-bold">
        {{ weather.location.name }}, {{ weather.location.country }}
      </h2>
      <p class="text-gray-700">{{ weather.current.condition.text }}</p>
      <p class="text-gray-700">🌡️ {{ weather.current.temp_c }}°C</p>
      <p class="text-gray-700">💧 Humidity: {{ weather.current.humidity }}%</p>
      <p class="text-gray-700">💨 Wind: {{ weather.current.wind_kph }} kph</p>
    </div>
  </div>
</template>
