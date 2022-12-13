<template>
    <ul>
        <li>
            <router-link @click="closeMenu" :to="{ name: 'profile' }" class="capitalize" :class="TheClass"> Profile</router-link>
        </li>
        <li>
            <router-link @click="closeMenu" :to="{ name: 'AddProject' }" class="capitalize" :class="TheClass">add project</router-link>
        </li>
        <li>
            <router-link @click="closeMenu" :to="{ name: 'AddSkill' }" class="capitalize" :class="TheClass">add Skill</router-link>
        </li>
        <li>
            <router-link @click="closeMenu" :to="{ name: 'AdminProjects' }" class="capitalize" :class="TheClass"> Projects</router-link>
        </li>
        <li>
            <router-link @click="closeMenu" :to="{ name: 'AdminSkills' }" class="capitalize" :class="TheClass"> Skills</router-link>
        </li>
        <li>
            <router-link @click="closeMenu" :to="{ name: 'messages' }" class="capitalize" :class="TheClass"> Messages</router-link>
        </li>
        <li>
            <button @click="logout" :class="TheClass" class="capitalize">Logout</button>
        </li>
    </ul>
</template>
<script setup>
import { useStore } from "@/store";
const store = useStore();
const props = defineProps({
    TheClass: String,
    sidebar: Boolean,
});

const emit = defineEmits(["CloseSidebar"]);

const closeMenu = () => {
    if (props.sidebar) {
        emit("CloseSidebar");
    }
};
const logout = () => {
    closeMenu();
    store.LogOut();
};
</script>
