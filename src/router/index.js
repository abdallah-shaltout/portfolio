import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import WorkView from "@/views/WorkView.vue";
import NotFound from "@/views/NotFound.vue";
import AdminRouter from "./adminRouter";
import { auth, onAuthStateChanged } from "@/firebase";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: process.env.VUE_APP_TITLE,
    },
  },
  {
    path: "/work",
    name: "Work",
    component: WorkView,
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "Not Found",
    },
  },
  { path: "/:pathMatch(.*)", redirect: "/404" },
].concat(AdminRouter);

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const getCurrentUser = () => {
  return new Promise((res, rej) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        res(user);
      },
      rej
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      next({ name: "NotFound" });
    }
  } else {
    next();
  }
  document.title = to.meta.title || to.name;
});

export default router;
