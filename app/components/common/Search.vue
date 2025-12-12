<script setup>
const emit = defineEmits(["search"]);

// input state
const city = ref("");

// search submit
function getWeather() {
  if (!city.value.trim()) return;
  emit("search", city.value);
  city.value = "";
}
</script>

<template>
  <div class="">
    <form
      @submit.prevent="getWeather"
      class="flex items-center justify-center gap-2"
    >
      <input
        v-model="city"
        type="text"
        placeholder="Search Country, City, or Town"
        class="w-full rounded-full border border-white bg-white/20 px-4 py-2 placeholder:text-slate-500"
      />
    </form>
  </div>
</template>
