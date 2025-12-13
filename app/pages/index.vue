<script setup>
const weather = ref(null);
const error = ref("");
const loading = ref(false);

// Function - fetch weather berdasarkan nama kota/koordinat
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

// Function - search
const getWeather = async (query) => {
  if (!query) {
    error.value = "Please enter a city";
    return;
  }
  await fetchWeather(query);
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

// computed Date object berdasarkan epoch + timezone
const localDateObj = computed(() => {
  const epoch = weather.value?.location?.localtime_epoch;
  if (!epoch) return null;
  return new Date(epoch * 1000);
});

// timezone id dari API
const tz = computed(() => weather.value?.location?.tz_id || undefined);

// formatted time (HH:mm) menggunakan Intl dengan timezone dari API
const formattedTime = computed(() => {
  if (!localDateObj.value || !tz.value) {
    // fallback: pakai raw string dari API jika ada
    return weather.value?.location?.localtime ?? "";
  }
  try {
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: tz.value,
    }).format(localDateObj.value);
  } catch (e) {
    // jika timezone tidak didukung, fallback ke localtime string
    console.warn("Intl format failed, fallback to raw localtime", e);
    return weather.value?.location?.localtime ?? "";
  }
});

// formatted day (e.g. "Kamis, 11 Desember 2025")
const formattedDay = computed(() => {
  if (!localDateObj.value || !tz.value) return "";
  try {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: tz.value,
    }).format(localDateObj.value);
  } catch (e) {
    return "";
  }
});

// 🔹 Get Weather Icon
const { getWeatherIcon } = useWeatherIcon();
</script>

<template>
  <div class="flex h-[80dvh] w-full max-w-2xl flex-col p-2 md:p-4">
    <div
      class="flex w-full flex-1 flex-col gap-12 overflow-auto rounded-3xl border border-white bg-white/20 bg-clip-padding p-4 text-slate-800 shadow-md shadow-slate-950/10 backdrop-blur backdrop-contrast-100 backdrop-saturate-100 backdrop-filter scrollbar-hide md:p-8"
    >
      <!-- Start : Form Search -->
      <CommonSearch @search="getWeather" />
      <!-- End : Form Search -->

      <div class="flex flex-1 flex-col gap-8">
        <!-- Start : Current Weather -->
        <!-- Start : Loading & Error -->
        <template v-if="loading">
          <div class="flex flex-1 items-center justify-center">
            <Icon
              name="line-md:loading-twotone-loop"
              size="32"
              class="inline-block flex-none text-slate-800"
            />
          </div>
        </template>

        <template v-if="error">
          <div class="flex flex-1 items-center justify-center">
            <div class="flex flex-col items-center justify-center gap-2">
              <Icon
                name="line-md:brake-alert-twotone"
                size="56"
                class="inline-block flex-none text-red-600"
              />
              <p class="text-red-600">{{ error }}</p>
            </div>
          </div>
        </template>
        <!-- End : Loading & Error -->

        <!-- Start : Weather -->
        <div
          v-if="weather && weather.location && weather.current"
          class="flex flex-col gap-8 px-4 md:gap-8"
        >
          <div class="flex w-full flex-col gap-8 md:gap-8">
            <div class="flex items-center gap-2">
              <Icon
                name="tabler:map-pin"
                size="20"
                class="inline-block flex-none"
              />
              <h2 class="text-lg">
                {{ weather.location.name }}, {{ weather.location.country }}
              </h2>
            </div>
            <div class="flex w-full items-center justify-between">
              <div
                class="flex w-full flex-col items-center justify-center gap-4 md:items-start"
              >
                <p class="text-lg font-medium">{{ formattedDay }}</p>
                <img
                  :src="
                    getWeatherIcon(
                      weather.current.condition.code,
                      weather.current.is_day,
                    )
                  "
                  alt="Weather icon"
                  class="size-44 md:hidden"
                />
                <p class="text-6xl font-semibold text-slate-800 md:text-7xl">
                  {{ weather.current.temp_c }}°C
                </p>

                <p class="uppercase text-gray-700">
                  {{ weather.current.condition.text }}
                </p>
              </div>
              <img
                :src="
                  getWeatherIcon(
                    weather.current.condition.code,
                    weather.current.is_day,
                  )
                "
                alt="Weather icon"
                class="hidden size-44 md:inline-block"
              />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-1 md:grid-cols-2 md:gap-1">
            <div
              class="flex items-center gap-2 rounded-md border border-white bg-white/20 px-4 py-4"
            >
              <Icon
                name="tabler:droplet"
                size="20"
                class="inline-block flex-none"
              />
              <div class="space-y-0">
                <p class="text-slate-900/50">Humidity</p>
                <p class="text-xl font-medium">
                  {{ weather.current.humidity }}%
                </p>
              </div>
            </div>

            <div
              class="flex items-center gap-2 rounded-md border border-white bg-white/20 px-4 py-4"
            >
              <Icon
                name="tabler:wind"
                size="20"
                class="inline-block flex-none"
              />
              <div class="space-y-0">
                <p class="text-slate-900/50">Wind</p>
                <p class="text-xl font-medium">
                  {{ weather.current.wind_kph }} kph
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- End : Weather -->
        <!-- Start : Current Weather -->

        <!-- Start : Forecast Today -->
        <template v-if="weather && weather.forecast">
          <WeatherForecastHour :forecast="weather.forecast" />
        </template>
        <!-- End : Forecast Today -->

        <!-- Start : Forecast 3 Days -->
        <template v-if="weather && weather.forecast">
          <WeatherForecastDay :forecast="weather.forecast" />
        </template>
        <!-- End : Forecast 3 Days -->
      </div>
    </div>
  </div>
</template>
