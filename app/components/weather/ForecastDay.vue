<script setup>
const props = defineProps({
  forecast: { type: Object, required: true },
});

// 🔹 Get Weather Icon
const { getWeatherIcon } = useWeatherIcon();
</script>

<template>
  <div class="px-4">
    <div
      class="grid grid-cols-1 divide-y divide-white rounded-md border border-white bg-pink-500 bg-white/20 p-2 md:grid-cols-3 md:divide-x md:divide-y-0"
    >
      <div
        v-for="day in forecast.forecastday"
        :key="day.date"
        class="flex flex-col items-center justify-center p-4 text-center"
      >
        <p class="mb-2 font-medium text-slate-900/50">{{ day.date }}</p>

        <img
          :src="getWeatherIcon(day.day.condition.code, day.day.is_day)"
          alt="Weather icon"
          class="size-12"
        />

        <p class="hidden text-center text-xs capitalize md:block">
          {{ day.day.condition.text }}
        </p>
        <p class="text-sm font-medium">
          {{ day.day.mintemp_c }}° - {{ day.day.maxtemp_c }}°
        </p>
      </div>
    </div>
  </div>
</template>
