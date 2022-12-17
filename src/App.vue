<template>
    <router-view />
    <Footer />
    <Transition name="fade-in">
        <button
            v-if="currentScroll >= 800"
            @click="ScrollToTop"
            class="fixed z-50 bottom-6 right-6 flex-center bg-slate-900 bg-gradient-to-b from-slate-800/40 to-indigo-500/40 p-2 rounded-lg transition-transform duration-500 ease-in-out hover:-translate-y-2">
            <arrow class="w-7 h-7 text-white" />
        </button>
    </Transition>
    <Transition name="fade-in">
        <loading v-if="store.loading" />
    </Transition>
</template>
<script setup>
import { onBeforeMount, ref } from "vue";
import { useStore } from "@/store";
import Footer from "@/components/footer.vue";
import arrow from "@/assets/icons/arrow.svg";
import loading from "@/components/loading.vue";
const store = useStore();
const ScrollToTop = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
};
const currentScroll = ref(0);
onBeforeMount(() => {
    store.getProjects();
    store.getSkills();
    store.getMessages();
});
window.addEventListener("scroll", function () {
    currentScroll.value = this.scrollY;
});

console.log("env variable ViteAppTitle =>", import.meta.env.VITE_APP_TITLE);
console.log("All env Variable =>", import.meta.env);
</script>
