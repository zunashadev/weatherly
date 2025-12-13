<script setup></script>

<template>
  <div
    class="relative flex min-h-screen w-full items-center justify-center text-white"
  >
    <!-- Start : Background -->
    <div
      class="absolute inset-0 z-0"
      :style="{
        background: `
      radial-gradient(ellipse 80% 60% at 70% 20%, rgba(175, 109, 255, 0.85), transparent 68%),
        radial-gradient(ellipse 70% 60% at 20% 80%, rgba(255, 100, 180, 0.75), transparent 68%),
        radial-gradient(ellipse 60% 50% at 60% 65%, rgba(255, 235, 170, 0.98), transparent 68%),
        radial-gradient(ellipse 65% 40% at 50% 60%, rgba(120, 190, 255, 0.3), transparent 68%),
        linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
        `,
      }"
    ></div>
    <!-- End : Background -->

    <!-- Start : Content -->
    <div class="relative z-10 flex h-full w-full items-center justify-center">
      <slot></slot>
    </div>
    <!-- End : Content -->
  </div>
</template>
