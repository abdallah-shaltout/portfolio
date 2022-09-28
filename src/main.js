import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Card from "@/components/global/Card.vue";
import MyAlert from "@/components/admin/myalert.vue";
import TheLoading from "@/components/admin/loading.vue";
import SectionHead from "@/components/admin/SectionHead.vue";
import "@/master.css";
import "@/assets/scss/main.scss";
createApp(App)
  .use(store)
  .use(router)
  .component("TheCard", Card)
  .component("MyAlert", MyAlert)
  .component("TheLoading", TheLoading)
  .component("SectionHead", SectionHead)
  .mount("#app");
