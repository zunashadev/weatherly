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
  <div class="flex h-full min-h-[80dvh] w-full max-w-2xl flex-col p-2 md:p-4">
    <div
      class="flex h-full w-full flex-1 flex-col gap-12 rounded-3xl border border-white bg-gray-500 bg-opacity-10 bg-clip-padding p-4 text-slate-800 shadow-md shadow-slate-950/10 backdrop-blur backdrop-contrast-100 backdrop-saturate-100 backdrop-filter md:p-8"
    >
      <!-- Start : Form Search -->
      <form
        @submit.prevent="getWeather"
        class="flex items-center justify-center gap-2"
      >
        <input
          v-model="city"
          type="text"
          placeholder="Search Country, City, or Town"
          class="w-full rounded-full border border-white bg-white/20 px-4 py-2 placeholder:text-slate-500"
        />
      </form>
      <!-- End : Form Search -->

      <!-- Start : Loading & Error -->
      <div v-if="loading" class="text-gray-500">Loading...</div>
      <div v-if="error" class="text-red-500">{{ error }}</div>
      <!-- End : Loading & Error -->

      <!-- Start : Weather -->
      <div
        v-if="weather && weather.location && weather.current"
        class="flex flex-col gap-8 px-4 md:gap-8"
      >
        <div class="flex justify-between gap-10">
          <!-- Temp & Country -->
          <div class="flex flex-col md:gap-2">
            <p class="text-6xl text-slate-800 md:text-7xl">
              {{ weather.current.temp_c }}°C
            </p>
            <h2 class="text-lg md:text-xl">
              {{ weather.location.name }}, {{ weather.location.country }}
            </h2>
          </div>

          <!-- Icon -->
          <div>
            <i
              :class="[
                'wi',
                weatherIcons[weather.current.condition.code] || 'wi-na',
                'text-[4rem] text-slate-800 md:text-[6rem]',
              ]"
            ></i>
          </div>
        </div>

        <div>
          <p class="uppercase text-gray-700">
            {{ weather.current.condition.text }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          <div
            class="flex gap-4 rounded-md border border-white bg-white/20 px-4 py-4"
          >
            <div>
              <Icon
                name="tabler:droplet"
                size="20"
                class="inline-block flex-none"
              />
            </div>
            <div class="space-y-0">
              <p class="">Humidity</p>
              <p class="text-2xl font-medium">
                {{ weather.current.humidity }}%
              </p>
            </div>
          </div>

          <div
            class="flex gap-4 rounded-md border border-white bg-white/20 px-4 py-4"
          >
            <div>
              <Icon
                name="tabler:wind"
                size="20"
                class="inline-block flex-none"
              />
            </div>
            <div class="space-y-0">
              <p class="">Wind</p>
              <p class="text-2xl font-medium">
                {{ weather.current.wind_kph }} kph
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- End : Weather -->

      <!-- Start : Forecast -->
      <WeatherForecast />
      <!-- End : Forecast -->
    </div>
  </div>
</template>
