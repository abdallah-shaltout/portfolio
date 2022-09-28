<template>
  <transition>
    <my-alert
      v-if="this.$store.state.message"
      :message="this.$store.state.message"
    />
  </transition>
  <side-bar></side-bar>
  <router-view></router-view>
  <the-loading v-if="this.$store.state.loading" />
</template>

<script>
import SideBar from "@/components/admin/Sidebar.vue";
export default {
  name: "AdminView",
  components: {
    SideBar,
  },
};
</script>
