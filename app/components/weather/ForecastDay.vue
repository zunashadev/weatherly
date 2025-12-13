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
      class="grid grid-cols-1 divide-y divide-white rounded-md border border-white bg-pink-500 bg-white/10 p-2 md:grid-cols-3 md:divide-x md:divide-y-0"
    >
      <div
        v-for="day in forecast.forecastday"
        :key="day.date"
        class="flex items-center justify-center p-4 text-center md:flex-col"
      >
        <p class="mb-2 w-full font-medium text-slate-900/50">{{ day.date }}</p>

        <div class="flex w-full flex-col items-center justify-center">
          <img
            :src="getWeatherIcon(day.day.condition.code, day.day.is_day)"
            alt="Weather icon"
            class="size-16"
          />
          <p class="hidden text-center text-xs capitalize md:block">
            {{ day.day.condition.text }}
          </p>
          <p class="text-sm font-medium md:text-base">
            {{ day.day.mintemp_c }}° - {{ day.day.maxtemp_c }}°
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
