<template>
  <Header />
  <main>
    <landing class="py-14" />
    <about class="py-14" id="about" />
    <projects class="py-14" id="projects" />
    <contact class="py-14" id="contact" />
  </main>
</template>
<script setup>
import landing from "@/components/Home/landing.vue";
import about from "@/components/Home/about.vue";
import projects from "@/components/Home/projects.vue";
import contact from "@/components/Home/contact.vue";

</script>
