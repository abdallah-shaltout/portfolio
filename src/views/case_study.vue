<template>
    <Header />
    <section v-if="project" class="h-[calc(100vh-70px)] flex-center text-white text-center">
        <div class="container">
            <h1 class="text-5xl font-bold">{{ project.title }}</h1>
            <p class="mt-4 text-gray-300 w-1/2 xl:w-3/4 lg:w-5/6 md:w-nine mx-auto leading-7 font-lato">
                {{ project.description }}
            </p>
            <a class="btn-1 mt-8 mx-auto" href="#">Live Link</a>
        </div>
    </section>
    <section v-if="project">
        <div class="w-nine max-w-3xl mx-auto">
            <div
                class="w-4/6 sm:w-5/6 border-[8px] border-b-0 rounded-b-none rounded-xl border-white bg-full bg-top h-72 xs:h-48 mx-auto hover:bg-bottom transition-[background-position] duration-[5s] ease-in-out"
                :style="{ backgroundImage: `url(${project.image})` }" />
            <div class="w-full h-2 bg-white rounded-b-3xl rounded-t-sm" />
        </div>
    </section>
    <section class="py-14" v-if="project">
        <div class="container max-w-3xl md:max-w-max px-8">
            <div class="text-gray-300 leading-7 flex flex-col gap-5">
                <h2 class="text-2xl font-bold text-white">Project overview</h2>

                <p v-for="(ov, idx) in project.overview" :key="idx">{{ ov }}</p>
                <p>Feel free to check out the Project by visiting the Live Link.</p>
            </div>
            <div class="mt-14">
                <h2 class="text-2xl font-bold text-white">Tools Used</h2>
                <div class="mt-8 grid grid-cols-4 xl:grid-cols-6 lg:grid-cols-5 sm:grid-cols-3 xs:grid-cols-2 gap-5 md:gap-3 w-3/4 sm:w-full">
                    <!-- Start Skill -->
                    <div class="flex flex-col text-center cursor-default trans" v-for="(skill, i) in project.tools" :key="i" v-if="skills">
                        <div class="w-14 h-14 rounded-lg my-bg mx-auto flex-center p-3">
                            <img v-if="skills(skill)" :src="skills(skill).image" :alt="skills(skill).text" class="w-nine transition-transform duration-300 ease-in-out" />
                        </div>
                        <h4 v-if="skills(skill)" class="text-white mt-3 mb-1 font-semibold trans text-sm text-center">{{ skills(skill).text }}</h4>
                    </div>

                    <!-- End Skill -->
                </div>
            </div>

            <div class="mt-14">
                <h2 class="text-2xl font-bold text-white">See Live</h2>
                <div class="flex gap-3 items-center mt-8 xs:flex-col">
                    <a :href="project.link" class="btn-1">Live Link</a>
                    <router-link :to="{ name: 'home' }" class="btn-2">Go Back</router-link>
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
const store = useStore();
const route = useRoute();

const project = computed(() => {
    return store.caseStudyProject(route.params.slug);
});
const skills = (skill) => {
    return store.caseStudySkill(skill);
};
document.title = route.params.slug.replace("-", " ");
</script>
