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
      <div class="relative w-full">
        <input
          v-model="city"
          type="text"
          class="peer block w-full border-b-2 border-x-transparent border-b-gray-200 border-t-transparent bg-transparent py-2.5 pe-0 ps-8 focus:border-x-transparent focus:border-b-blue-500 focus:border-t-transparent focus:ring-0 disabled:pointer-events-none disabled:opacity-50 sm:py-3 sm:text-sm dark:border-b-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:border-b-neutral-600 dark:focus:ring-neutral-600"
          placeholder="Search city"
        />
        <div
          class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-2 peer-disabled:pointer-events-none peer-disabled:opacity-50"
        >
          <Icon
            name="tabler:search"
            size="20"
            class="inline-block flex-none text-white/50"
          />
        </div>
      </div>
    </form>
  </div>
</template>
