<template>
  <the-header
    v-if="
      $route.name == 'home' || $route.name == 'Work' || $route.name == 'Login'
    "
  ></the-header>
  <router-view />
  <the-footer
    v-if="
      $route.name == 'home' || $route.name == 'Work' || $route.name == 'Login'
    "
  ></the-footer>
</template>
<script>
import TheHeader from "@/components/global/Header.vue";
import TheFooter from "@/components/global/Footer.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
  },
  created() {
    this.$store.dispatch("GET_DATA");
  },
};
</script>
