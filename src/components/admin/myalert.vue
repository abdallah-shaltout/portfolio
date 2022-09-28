<template>
  <div
    class="
      flex
      justify-between
      items-center
      bg-rose-500
      text-white text-xl
      py-3
      px-4
      text-center
      .success:
    "
    :class="{ success: message == 'success' }"
  >
    <p class="ml-auto text-center">{{ message }}</p>
    <span
      class="
        flex-center
        cursor-pointer
        ml-auto
        w-7
        h-7
        text-dark
        rounded
        bg-white/80
        shadow shadow-dark/20
        transition-colors
        hover:bg-white
      "
      @click="close_alert"
      >x</span
    >
  </div>
</template>

<script>
export default {
  name: "MyAlert",
  props: {
    message: String,
  },
  methods: {
    close_alert() {
      this.$store.state.message = null;
      this.$emit("clearMessage");
    },
  },
};
</script>
