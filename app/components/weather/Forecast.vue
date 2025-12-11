<script setup>
const props = defineProps({
  forecast: { type: Object, required: true },
});

const nowHour = new Date().getHours(); // jam sekarang 0-23

const displayHours = [
  Math.max(nowHour - 1, 0),
  nowHour,
  Math.min(nowHour + 1, 23),
  Math.min(nowHour + 2, 23),
  Math.min(nowHour + 3, 23),
];

const filteredHours = computed(() => {
  if (!props.forecast?.forecastday?.length) return [];
  return props.forecast.forecastday[0].hour.filter((hour) => {
    const hourInt = parseInt(hour.time.split(" ")[1].split(":")[0]);
    return displayHours.includes(hourInt);
  });
});

const isCurrentHour = (timeStr) => {
  const hour = parseInt(timeStr.split(" ")[1].split(":")[0]);
  return hour === new Date().getHours();
};
</script>

<template>
  <div class="flex flex-col gap-8 px-4">
    <!-- Start : Forecast Today -->
    <template v-if="forecast && forecast.forecastday.length">
      <div class="grid grid-cols-5 gap-1">
        <template v-for="hour in filteredHours" :key="hour.time">
          <div
            class="flex flex-none flex-col items-center justify-center gap-3 rounded-md border border-white p-2"
            :class="[isCurrentHour(hour.time) ? 'bg-white/75' : 'bg-white/20']"
          >
            <p class="text-sm">
              {{ hour.time ? hour.time.split(" ")[1] : "--:--" }}
            </p>
            <i
              :class="[
                'wi',
                weatherIcons[hour.condition.code] || 'wi-na',
                'text-2xl',
              ]"
            ></i>
            <p class="text-center text-xs">{{ hour.condition.text }}</p>
            <p class="text-sm">🌡️ {{ hour.temp_c }}°C</p>
          </div>
        </template>
      </div>
    </template>
    <!-- End : Forecast Today -->

    <!-- Start : Forecast 3 Days -->
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
    <!-- End : Forecast 3 Days -->
  </div>
</template>
