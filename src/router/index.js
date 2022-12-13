import { createRouter, createWebHistory } from "vue-router";
import homeView from "@/views/home.vue";
import caseStudy from "@/views/case_study.vue";
import NotFound from "@/views/notFound.vue";
import AdminRouter from "./AdminRouter";
import { auth, onAuthStateChanged } from "@/firebase";

const routes = [
    {
        path: "/",
        name: "home",
        component: homeView,
        meta: {
            title: import.meta.env.VITE_APP_TITLE,
        },
    },
    {
        path: "/project/:slug",
        name: "caseStudy",
        component: caseStudy,
    },
    {
        path: "/404",
        name: "NotFound",
        component: NotFound,
        meta: {
            title: "Not Found",
        },
    },

    { path: "/:pathMatch(.*)", redirect: { name: "NotFound" } },
].concat(AdminRouter);

const router = createRouter({
    history: createWebHistory(),
    routes,

    scrollBehavior() {
        return { top: 0 };
    },
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
    if (to.name === "login" && (await getCurrentUser())) {
        router.push({ name: "admin" });
    }
    if (to.matched.some((rec) => rec.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            if (to.name === "login") {
            } else {
                next();
            }
        } else {
            next({ name: "NotFound" });
        }
    } else {
        next();
    }
    document.title = to.meta.title || `${to.name.charAt(0).toUpperCase()}${to.name.slice(1).toLowerCase()}`;
});

export default router;
