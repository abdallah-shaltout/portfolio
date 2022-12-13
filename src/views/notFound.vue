<template>
    <section class="h-[calc(100vh-150px)] flex-center flex-col">
        <h1 class="text-9xl text-slate-300 font-bold relative sm:text-8xl">
            404
            <p class="text-base sm:text-xs text-white font-bold mt-4 absolute rotate-[22deg] left-1/2 top-1/2 sm:top-1/2 -translate-y-1/2 -translate-x-1/2 whitespace-nowrap bg-blue-400/60 px-4">
                Page Not Found
            </p>
        </h1>

        <router-link :to="{ name: 'home' }" class="capitalize mt-14 btn-2">Go Home</router-link>

        <p class="mt-6 text-sm text-slate-400 sm:text-xs">{{ countDown }} seconds to redirect to Homepage</p>
    </section>
</template>
<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const countDown = ref(500);
setInterval(() => {
    if (countDown.value > 0) {
        countDown.value--;
    }
}, 1000);

watch(countDown, (newvalue) => {
    if (newvalue <= 0) {
        clearInterval();
        router.push({ name: "home" });
    }
});
</script>
