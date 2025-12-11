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

// 🔹 Sticky
const isStuck = ref(false);
const sentinel = ref(null);

let observer = null;

onMounted(() => {
  if (!sentinel.value) return;

  // Saat threshold 1 -> entry.isIntersecting true ketika sentinel seluruhnya terlihat.
  // Kita ingin detect saat sentinel tidak terlihat sama sekali -> sticky menempel.
  observer = new IntersectionObserver(
    ([entry]) => {
      // Jika sentinel tidak intersect (tidak terlihat), maka sticky menempel ke top
      isStuck.value = !entry.isIntersecting;
      // Alternatif logika:
      // isStuck.value = entry.boundingClientRect.top < 0 || !entry.isIntersecting;
    },
    {
      root: null, // viewport
      threshold: 0, // berubah segera ketika sentinel hilang/masuk
      rootMargin: "0px", // bisa disesuaikan seperti '-1px 0px 0px 0px'
    },
  );

  observer.observe(sentinel.value);
});

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});
</script>

<template>
  <div ref="sentinel" class="h-px"></div>

  <div
    class="sticky -top-8 left-0 right-0 z-10 -mx-8 -mt-20 px-8 py-8 transition-all duration-300"
    :class="
      isStuck
        ? 'bg-white/50 text-white shadow-md backdrop-blur-sm'
        : 'bg-transparent text-slate-800'
    "
  >
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
