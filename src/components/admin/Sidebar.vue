<template>
  <div
    class="overflow fixed w-full min-h-screen left-0 top-0 z-30 backdrop-blur-[2px]"
    @click="overlay_close"
    v-if="sidebar_show"
  ></div>
  <aside :class="{ show: sidebar_show }">
    <h2>Dashroom</h2>
    <button
      @click="handler"
      class="navbar-toggler"
      :class="{ active: sidebar_show }"
    >
      <span class="navbar-toggler-icon"></span>
      <span class="navbar-toggler-icon"></span>
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul>
      <li>
        <router-link :to="{ name: 'home' }">Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'settings' }">Settings</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'AddItem' }">AddItem</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'EditItem' }">Edit Item</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'RemoveItem' }">remove Item</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Logout</a>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      sidebar_show: true,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT");
    },
    handler() {
      this.sidebar_show = !this.sidebar_show;
      localStorage.setItem("sidebar", this.sidebar_show);
    },
    overlay_close() {
      this.sidebar_show = false;
      localStorage.setItem("sidebar", this.sidebar_show);
    },
  },
  mounted() {
    if (
      !JSON.parse(localStorage.getItem("sidebar")) ||
      localStorage.getItem("sidebar") == "false"
    ) {
      this.sidebar_show = false;
    }
  },
};
</script>
