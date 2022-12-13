import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import { createPinia } from "pinia";
import Header from "@/components/header.vue";
import "@/tailwind_style.css";
import "@/master.css";
createApp(App)
  .use(router)
  .use(createPinia())
  .component("Header", Header)
  .mount("#app");
