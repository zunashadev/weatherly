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

  const hours = props.forecast.forecastday[0].hour;
  const nowHour = new Date().getHours();

  // Mulai dengan jam target: -1, 0, +1, +2, +3
  let targetHours = [
    nowHour - 1,
    nowHour,
    nowHour + 1,
    nowHour + 2,
    nowHour + 3,
  ];

  // Pastikan jam valid 0-23
  targetHours = targetHours.map((h) => Math.min(Math.max(h, 0), 23));

  // Filter jam yang tersedia
  let selected = hours.filter((hour) => {
    const hourInt = parseInt(hour.time.split(" ")[1].split(":")[0]);
    return targetHours.includes(hourInt);
  });

  // Jika hasil kurang dari 5, tambahkan jam sebelumnya agar total = 5
  while (selected.length < 5) {
    const firstHourInt = parseInt(selected[0].time.split(" ")[1].split(":")[0]);
    const prevHour = hours.find(
      (hour) =>
        parseInt(hour.time.split(" ")[1].split(":")[0]) === firstHourInt - 1,
    );
    if (prevHour) {
      selected.unshift(prevHour);
    } else {
      break; // tidak ada jam sebelumnya
    }
  }

  return selected;
});

const isCurrentHour = (timeStr) => {
  const hour = parseInt(timeStr.split(" ")[1].split(":")[0]);
  return hour === new Date().getHours();
};
</script>

<template>
  <div class="flex flex-col gap-8 px-4">
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
  </div>
</template>
