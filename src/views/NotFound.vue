<template>
  <section>
    <div class="container py-[10vh] px-[15%] md:text-center">
      <h4 class="text-7xl text-center text-dark-50 my-8 font-bold">404</h4>
      <h5 class="text-3xl text-dark font-semibold font-roboto sm:text-2xl">
        UH OH! You're lost.
      </h5>
      <p class="w-4/5 mb-8 mt-4 leading-snug text-xl text-dark/80 md:w-full">
        The page you are looking for does not exist. How you got here is a
        mystery. But you can click the button below to go back to the homepage.
      </p>
      <router-link :to="{ name: 'home' }">
        <button class="btn-primary">Home</button>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: "NotFound",
  mounted() {
    setTimeout(() => {
      this.$router.push({ name: "home" });
    }, 10000);
  },
};
</script>

<style>
</style>