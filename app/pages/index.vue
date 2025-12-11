<script setup>
const city = ref("");
const weather = ref(null);
const error = ref("");
const loading = ref(false);

// Function untuk fetch weather berdasarkan nama kota atau koordinat
const fetchWeather = async (query) => {
  loading.value = true;
  error.value = "";
  weather.value = null;

  try {
    weather.value = await $fetch(`/api/weather/${query}`);
  } catch (err) {
    console.error(err);
    error.value = "Failed to fetch weather";
  } finally {
    loading.value = false;
  }
};

// Function dipanggil saat klik search
const getWeather = async () => {
  if (!city.value) {
    error.value = "Please enter a city";
    return;
  }
  await fetchWeather(city.value);
};

// Gunakan GPS untuk default city
onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Lat:", position.coords.latitude);
        console.log("Lon:", position.coords.longitude);
        await fetchWeather(`${latitude},${longitude}`);
      },
      async () => {
        // fallback jika user menolak izin
        console.log("Fallback");
        await fetchWeather("Yogyakarta");
      },
    );
  } else {
    // fallback jika browser tidak support GPS
    fetchWeather("Yogyakarta");
  }
});
</script>

<template>
  <div class="mx-auto mt-10 max-w-md rounded border p-6 shadow">
    <h1 class="mb-4 text-2xl font-bold">Weather App</h1>

    <!-- Form Search -->
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

    <!-- Loading & Error -->
    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <!-- Weather Card -->
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
