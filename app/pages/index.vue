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
  <div class="relative flex min-h-screen w-full items-center justify-center">
    <!-- Start : Background -->
    <div
      class="absolute inset-0 z-0"
      :style="{
        background: `
          radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
          radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
          radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
          radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
          linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
        `,
      }"
    ></div>
    <!-- End : Background -->

    <!-- Start : Content -->
    <div
      class="relative z-10 flex h-full min-h-[80dvh] w-full max-w-2xl flex-col p-4"
    >
      <div
        class="flex h-full w-full flex-1 flex-col gap-8 rounded border border-white bg-gray-500 bg-opacity-10 bg-clip-padding p-6 text-slate-800 shadow-md shadow-slate-950/10 backdrop-blur backdrop-contrast-100 backdrop-saturate-100 backdrop-filter"
      >
        <h1 class="mb-4 text-center text-2xl font-bold">Weatherly</h1>

        <!-- Start : Form Search -->
        <form
          @submit.prevent="getWeather"
          class="flex items-center justify-center gap-2"
        >
          <input
            v-model="city"
            type="text"
            placeholder="Enter city"
            class="w-full rounded-full border border-white bg-white/50 px-4 py-2 shadow-md shadow-slate-950/10"
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
          class="flex flex-col gap-8 px-4"
        >
          <div class="flex justify-between">
            <!-- Temp & Country -->
            <div class="flex flex-col gap-2">
              <p class="text-5xl text-slate-800">
                {{ weather.current.temp_c }}°C
              </p>
              <h2 class="text-xl">
                {{ weather.location.name }}, {{ weather.location.country }}
              </h2>
            </div>

            <!-- Icon -->
            <div>
              <img
                :src="
                  weather.current.condition.icon.startsWith('//')
                    ? 'https:' + weather.current.condition.icon
                    : weather.current.condition.icon
                "
                :alt="weather.current.condition.text"
                class="inline-block size-24 flex-none"
              />
            </div>
          </div>

          <div>
            <p class="text-gray-700">{{ weather.current.condition.text }}</p>
            <p class="text-gray-700">
              💧 Humidity: {{ weather.current.humidity }}%
            </p>
            <p class="text-gray-700">
              💨 Wind: {{ weather.current.wind_kph }} kph
            </p>
          </div>
        </div>
        <!-- End : Weather -->
      </div>
    </div>
    <!-- End : Content -->
  </div>
</template>
