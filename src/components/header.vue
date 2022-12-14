<template>
    <header class="h-[70px] flex-between">
        <div class="container">
            <nav class="flex-between">
                <router-link :to="{ name: 'home' }"><img src="@/assets/images/logo.png" alt="Abdallah Shaltout" class="w-52 sm:w-40" /></router-link>
                <pages class="flex gap-5 md:hidden" TheClass="page-link-1" />
                <button class="menu hidden md:flex" :class="{ active: menuToggle }" @click="menuToggle = !menuToggle">
                    <MenuIcon class="w-full" />
                </button>
            </nav>
        </div>
    </header>
    <Transition name="fade">
        <aside v-if="menuToggle" class="my-bg w-full py-4 shadow-lg shadow-indigo-500/10 hidden md:block transition-[left] ease-in-out duration-300 absolute z-20 top-[70px]">
            <pages TheClass="page-link-2" class="flex flex-col gap-3" sidebar @CloseSidebar="closeSidebar" />
        </aside>
    </Transition>
</template>
<script setup>
import { ref } from "vue";
import pages from "@/components/pages.vue";
import MenuIcon from "@/assets/icons/menu.svg";
const menuToggle = ref(false);
const closeSidebar = () => {
    menuToggle.value = false;
};
</script>
