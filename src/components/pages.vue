<template>
    <ul>
        <li>
            <router-link @click="closeMenu" :to="{ name: 'home' }" class="capitalize" :class="TheClass">home</router-link>
        </li>
        <li v-for="(link, idx) in links" :key="idx">
            <a @click="closeMenu" :href="`/#${link}`" class="capitalize" :class="TheClass">{{ link }}</a>
        </li>
    </ul>
</template>
<script setup>
import { ref } from "vue";
const props = defineProps({
    TheClass: String,
    sidebar: Boolean,
});

const emit = defineEmits(["CloseSidebar"]);
const links = ref(["about", "projects", "contact"]);

const closeMenu = () => {
    if (props.sidebar) {
        emit("CloseSidebar");
    }
};
</script>
