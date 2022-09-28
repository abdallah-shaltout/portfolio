<template>
  <main class="fixed top-0 left-0 w-full h-screen z-[9999] bg-dark/60">
    <div class="text-center flex-center flex-col center-abs">
      <div class="flex-center">
        <svg
          class="w-20 max-w[10rem] loading-animation"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="46" class="stroke-white" />
        </svg>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "TheLoading",
};
</script>

<style>
</style>