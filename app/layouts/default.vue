<script setup>
const backgroundStyle = {
  background:
    "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(120, 180, 255, 0.25), transparent 70%), #000000",
};
</script>

<template>
  <div
    class="relative flex min-h-screen w-full items-center justify-center text-white"
  >
    <!-- Start : Background -->
    <div class="absolute inset-0 z-0" :style="backgroundStyle" />
    <!-- End : Background -->

    <!-- Start : Content -->
    <div class="relative z-10 flex h-full w-full items-center justify-center">
      <slot></slot>
    </div>
    <!-- End : Content -->
  </div>
</template>
