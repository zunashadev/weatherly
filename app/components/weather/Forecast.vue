<script setup>
defineProps({
  forecast: { type: Object, required: true },
});
</script>

<template>
  <div class="flex flex-col gap-3 px-4">
    <h3 class="mb-2 text-lg font-bold">Forecast</h3>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div
        v-for="day in forecast.forecastday"
        :key="day.date"
        class="rounded-md border border-white bg-white/20 p-4 text-center"
      >
        <p class="mb-2 font-medium">{{ day.date }}</p>
        <i
          :class="[
            'wi',
            weatherIcons[day.day.condition.code] || 'wi-na',
            'mb-2 text-3xl',
          ]"
        ></i>
        <p class="mb-1">{{ day.day.condition.text }}</p>
        <p>🌡️ {{ day.day.mintemp_c }}°C - {{ day.day.maxtemp_c }}°C</p>
      </div>
    </div>
  </div>
</template>
