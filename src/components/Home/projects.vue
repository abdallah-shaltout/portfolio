<template>
    <section>
        <h2 class="section-title">Projects</h2>
        <p class="section-des">Here you will find some of the personal and clients projects that I created with each project containing its own case study</p>

        <div class="container py-14">
            <ul class="list-none flex flex-col gap-20">
                <TransitionGroup name="list">
                    <li class="flex justify-between gap-16 pb-8 md:flex-col md:text-center" v-for="(project, index) in projects" :key="index">
                        <a :href="project.live" class="laptop">
                            <div class="screen" :style="{ backgroundImage: `url(${project.image})` }"></div>
                            <div class="base"></div>
                        </a>
                        <div class="flex-1 text-white">
                            <h3 class="text-2xl font-bold mb-4">{{ project.title }}</h3>
                            <p class="text-base leading-7 font-lato text-white/70 w-5/6 capitalize md:mx-auto">
                                {{ project.description.slice(0, 120) }}
                            </p>
                            <router-link :to="`/project/${project.slug}`" class="btn-1 mt-8 md:mx-auto">Case Study </router-link>
                        </div>
                    </li>
                </TransitionGroup>
            </ul>
            <button v-if="projectsToShow < store.projects.length" type="button" @click="loadMore" class="btn-2 mt-10 mx-auto">More</button>
        </div>
    </section>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "@/store";
const store = useStore();
const projectsToShow = ref(3);
const projects = computed(() => {
    return store.projects.slice(0, projectsToShow.value);
});
const loadMore = () => {
    if (projectsToShow.value + 3 < store.projects.length) {
        projectsToShow.value += 3;
    } else if (projectsToShow.value + 2 < store.projects.length) {
        projectsToShow.value += 2;
    } else {
        projectsToShow.value++;
    }
    projectsToShow.value++;
};
</script>
