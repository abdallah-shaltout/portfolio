<template>
  <header>
    <div class="container">
      <router-link
        :to="{ name: 'home' }"
        class="logo flex items-center justify-start"
      >
        <img
          src="@/assets/imgs/logo.png"
          class="w-3/5 sm:w-2/5"
          alt="Portfolio"
        />
      </router-link>
      <button
        class="navbar-toggler hidden sm:block"
        :class="{ active: navbarshow }"
        @click="navbarshow = !navbarshow"
      >
        <span class="navbar-toggler-icon"></span>
        <span class="navbar-toggler-icon"></span>
        <span class="navbar-toggler-icon"></span>
      </button>
      <ul class="nav" :class="{ active: navbarshow }">
        <li>
          <router-link @click="navbarshow = false" :to="{ name: 'home' }"
            >Home</router-link
          >
        </li>
        <li>
          <a @click="navbarshow = false" href="#service">Service</a>
        </li>
        <li>
          <a @click="navbarshow = false" href="#work">Our Work</a>
        </li>
        <li>
          <a @click="navbarshow = false" href="#contact">Contact</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      navbarshow: false,
    };
  },
};
</script>
