<script setup>
const weather = ref(null);
const loading = ref(false);
const error = ref("");

const fetchWeather = async (query) => {
  loading.value = true;
  error.value = "";
  weather.value = null;

  try {
    weather.value = await $fetch(`/api/weather/${query}`);
  } catch (err) {
    error.value = "Failed to fetch weather";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div v-if="weather && weather.forecast">
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="day in weather.forecast.forecastday"
        :key="day.date"
        class="rounded border p-4"
      >
        <p class="font-medium">{{ day.date }}</p>
        <i
          :class="[
            'wi',
            weatherIcons[day.day.condition.code] || 'wi-na',
            'text-3xl',
          ]"
        ></i>
        <p>{{ day.day.condition.text }}</p>
        <p>🌡️ {{ day.day.mintemp_c }}°C - {{ day.day.maxtemp_c }}°C</p>
      </div>
    </div>
  </div>
</template>
