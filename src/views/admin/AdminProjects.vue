<template>
    <section>
        <h2 class="section-title">Projects</h2>
        <div class="container py-14">
            <label class="toggle">
                <input type="checkbox" v-model="showEditBtns" />
                <span></span>
            </label>
            <div class="grid grid-cols-3 gap-6 lg:grid-cols-2 md:grid-cols-1 md:gap-14">
                <project-card adminProjects :showEdit="showEditBtns" v-for="project in store.projects" :key="project.id" :Project="project" @EditProject="EditProj" @RemoveProject="DelProj" />
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "@/store/";
import { useRouter } from "vue-router";
import ProjectCard from "@/components/ProjectCard.vue";
const router = useRouter();
const showEditBtns = ref(false);
const store = useStore();
const EditProj = (id) => {
    router.push({ name: "editproject", params: { id: id } });
};
const DelProj = async (id) => {
    store.removeProject(id)
};
</script>
