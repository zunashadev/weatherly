<script setup>
const props = defineProps({
  forecast: { type: Object, required: true },
});

// 🔹 Get Weather Icon
const { getWeatherIcon } = useWeatherIcon();
</script>

<template>
  <div class="px-4">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div
        v-for="day in forecast.forecastday"
        :key="day.date"
        class="rounded-md border border-white bg-white/20 p-4 text-center"
      >
        <p class="mb-2 font-medium">{{ day.date }}</p>

        <img
          :src="getWeatherIcon(day.day.condition.code, day.day.is_day)"
          alt="Weather icon"
          class="size-12"
        />

        <p class="mb-1">{{ day.day.condition.text }}</p>
        <p>{{ day.day.mintemp_c }}° - {{ day.day.maxtemp_c }}°</p>
      </div>
    </div>
  </div>
</template>
