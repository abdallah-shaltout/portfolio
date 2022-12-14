<template>
    <article class="rounded-lg my-bg shadow-xl shadow-indigo-400/5 relative overflow-hidden">
        <div class="absolute flex gap-2 items-center right-3 top-3" v-if="adminProjects && showEdit">
            <button class="bg-zinc-600/40 p-3 rounded-lg text-slate-300 font-bold z-10 w-10 h-10 flex-center trans hover:text-white hover:bg-blue-500" @click="EditProj">
                <edit-icon class="w-6 h-6" />
            </button>
            <button class="bg-zinc-600/40 p-3 rounded-lg text-slate-300 font-bold z-10 w-10 h-10 flex-center trans hover:text-white hover:bg-rose-500" @click="DelProj">
                <trash-icon class="w-6 h-6" />
            </button>
        </div>
        <router-link :to="{ name: 'caseStudy', params: { slug: Project.slug } }" target="_blank">
            <div class="ratioParent">
                <img :src="Project.image" class="ratioSon object-cover" alt="" />
            </div>
            <div class="p-5">
                <h3 class="text-2xl font-bold capitalize text-white">{{ Project.title }}</h3>
                <p class="mt-2 text-white/60">{{ Project.description.slice(0, 60) }} <b class="text-slate-200">...More</b></p>
            </div>
        </router-link>
    </article>
</template>
<script setup>
import TrashIcon from "@/assets/icons/trash.svg";
import EditIcon from "@/assets/icons/edit.svg";

const props = defineProps({
    adminProjects: Boolean,
    showEdit: Boolean,
    Project: Object,
});
const emit = defineEmits(["EditProject", "RemoveProject"]);
const DelProj = () => {
    emit("RemoveProject", props.Project.id);
};
const EditProj = () => {
    emit("EditProject", props.Project.id);
};
</script>
