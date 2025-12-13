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

  // helper: parse hour int dari string "YYYY-MM-DD HH:MM"
  const toHourInt = (timeStr) => parseInt(timeStr.split(" ")[1].split(":")[0]);

  // array semua hour ints (terurut sama seperti hours array)
  const hoursInts = hours.map((h) => toHourInt(h.time));

  // target default: now-1, now, now+1, now+2, now+3
  let targetHours = [
    nowHour - 1,
    nowHour,
    nowHour + 1,
    nowHour + 2,
    nowHour + 3,
  ].map((h) => Math.min(Math.max(h, 0), 23)); // clamp 0..23

  // ambil jam yang match target dan ada di data
  const selectedMap = new Map();
  for (const h of hours) {
    const hi = toHourInt(h.time);
    if (targetHours.includes(hi)) selectedMap.set(hi, h);
  }

  // selected ints terurut
  let selectedInts = Array.from(selectedMap.keys()).sort((a, b) => a - b);

  // jika kosong: pilih sekitar nowHour (fallback)
  if (selectedInts.length === 0) {
    // cari index pertama >= nowHour
    let startIdx = hoursInts.findIndex((hi) => hi >= nowHour);
    if (startIdx === -1) startIdx = hours.length - 1; // ambil yang terakhir kalau tidak ada >= now
    // ambil slice mulai startIdx sepanjang 5 (bungkus jika perlu)
    const slice = hours.slice(startIdx, startIdx + 5);
    return slice.slice(0, 5);
  }

  // fungsi untuk menambahkan hour ke selectedMap (jika ada dan belum ada)
  const addHourIfExists = (hourInt) => {
    if (!selectedMap.has(hourInt)) {
      const found = hours.find((h) => toHourInt(h.time) === hourInt);
      if (found) {
        selectedMap.set(hourInt, found);
        selectedInts.push(hourInt);
      }
    }
  };

  // helper: dapatkan min & max current selected ints
  const minSelected = () => Math.min(...selectedInts);
  const maxSelected = () => Math.max(...selectedInts);

  // jika nowHour termasuk dan nowHour adalah jam pertama (min) dalam selected,
  // berarti tidak ada jam sebelumnya yang bisa dipakai -> kita harus menambah jam setelahnya.
  const nowIsFirst =
    selectedInts.includes(nowHour) && minSelected() === nowHour;

  // loop untuk menambah hingga total 5
  while (selectedInts.length < 5) {
    if (nowIsFirst) {
      // tambahkan jam setelah maxSelected
      const next = maxSelected() + 1;
      if (next > 23) break; // tidak ada lagi
      addHourIfExists(next);
    } else {
      // coba tambahkan jam sebelum minSelected dulu
      const prev = minSelected() - 1;
      if (prev >= 0) {
        const prevExists = hoursInts.includes(prev);
        if (prevExists) {
          addHourIfExists(prev);
          continue;
        }
      }
      // kalau tidak ada prev, tambahkan next setelah maxSelected
      const next = maxSelected() + 1;
      if (next > 23) break;
      addHourIfExists(next);
    }

    // update selectedInts terurut
    selectedInts = Array.from(selectedMap.keys()).sort((a, b) => a - b);

    // recompute nowIsFirst — karena setelah penambahan posisi bisa berubah
    // jika nowHour tidak ada di selectedInts, keep trying to add nearest hours
    // but preserve priority logic for subsequent iterations
  }

  // hasil: ambil objek hour sesuai selectedInts terurut
  const result = selectedInts
    .sort((a, b) => a - b)
    .map((hi) => selectedMap.get(hi))
    .slice(0, 5);

  return result;
});

const isCurrentHour = (timeStr) => {
  const hour = parseInt(timeStr.split(" ")[1].split(":")[0]);
  return hour === new Date().getHours();
};

// 🔹 Get Weather Icon
const { getWeatherIcon } = useWeatherIcon();
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

            <img
              :src="getWeatherIcon(hour.condition.code, hour.is_day)"
              alt="Weather icon"
              class="size-12"
            />

            <p class="text-center text-xs">{{ hour.condition.text }}</p>
            <p class="text-sm">{{ hour.temp_c }}°</p>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>
