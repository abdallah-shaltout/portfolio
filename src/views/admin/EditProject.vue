<template>
    <section>
        <h1 class="section-title">Edit Project</h1>
        <div class="container">
            <form @submit.prevent="UpdateProject" class="flex flex-col gap-5 bg-slate-900/20 p-4 rounded-md font-lato w-3/4 mx-auto my-8">
                <div class="mb-2">
                    <p v-for="(Error, idx) in err" :key="idx" class="text-rose-400 text-sm text-center mb-1" v-text="Error"></p>
                </div>
                <label class="flex flex-col gap-2">
                    <span class="label-title">Project Name</span>
                    <input
                        type="text"
                        class="w-full bg-transparent border border-slate-50/20 rounded-md py-3 px-2 text-white placeholder:text-sm placeholder:text-white/40 focus:outline-none focus:border-b-secondary"
                        placeholder="Landing Page"
                        autofocus
                        v-model="Project_name" />
                </label>
                <label class="flex flex-col gap-2">
                    <span class="label-title">Description</span>
                    <textarea
                        class="w-full bg-transparent border border-slate-50/20 rounded-md py-3 px-2 text-white placeholder:text-sm placeholder:text-white/40 focus:outline-none focus:border-b-secondary h-40 resize-none"
                        placeholder="Your Description Here."
                        v-model="Project_des"></textarea>
                </label>

                <label class="flex flex-col gap-2">
                    <span class="label-title">Image Cover</span>
                    <input type="file" class="hidden" @change="makeImage($event)" />
                    <div class="w-3/4 h-64 rounded border-2 mx-auto flex-center cursor-pointer trans hover:bg-secondary/20 mt-4 relative">
                        <span v-if="!project_image_preview" class="font-bold text-white uppercase font-source text-3xl tracking-wider">Image Cover</span>
                        <img v-if="project_image_preview" class="w-full h-full object-cover object-top absolute left-0 top-0" :src="project_image_preview" />
                    </div>
                </label>

                <div class="flex flex-col gap-2">
                    <div class="flex gap-4 items-center">
                        <span class="label-title">overview</span>
                        <button
                            @click.prevent="addoverview"
                            class="p-2 trans outline outline-1 outline-secondary/40 rounded-full hover:bg-secondary hover:shadow-glow-md hover:shadow-secondary/50 hover:outline-0">
                            <plus-icon class="text-white w-5 h-5" />
                        </button>
                    </div>
                    <ul class="list-none flex flex-col gap-6">
                        <li class="flex gap-3 items-center" v-for="(item, idx) in Project_overview" :key="idx">
                            <input
                                type="text"
                                class="w-full bg-transparent border border-slate-50/20 rounded-md py-3 px-2 text-white placeholder:text-sm placeholder:text-white/40 focus:outline-none focus:border-b-secondary"
                                :placeholder="`overview: ${idx + 1}`"
                                v-model="Project_overview[idx]" />
                            <button @click.prevent="Deleteoverview(idx)" class="cursor-pointer trans hover:bg-white text-white hover:text-secondary rounded-sm p-1">
                                <minus-icon class="w-6" />
                            </button>
                        </li>
                    </ul>
                </div>

                <div class="flex flex-col gap-2">
                    <span class="label-title">Tool Used</span>

                    <div class="grid grid-cols-8 xl-grid-cols-7 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-2 gap-4 my-14">
                        <label class="select-skill" v-for="skill in store.skills" :key="skill.id">
                            <input type="checkbox" :value="skill.name" v-model="Project_usedTools" />
                            <span class="select-skill-content">
                                <img :src="skill.image" :alt="skill.text" />
                                <span>{{ skill.text }}</span>
                            </span>
                        </label>
                    </div>
                    <div class="flex flex-wrap gap-4 items-center my-4">
                        <span class="px-4 py-1 bg-white text-black rounded" v-for="(lang, index) in Project_usedTools" :key="index" v-text="lang"></span>
                    </div>
                </div>

                <label class="flex flex-col gap-2">
                    <span class="label-title">Live Link</span>
                    <input
                        type="text"
                        class="w-full bg-transparent border border-slate-50/20 rounded-md py-3 px-2 text-white placeholder:text-sm placeholder:text-white/40 focus:outline-none focus:border-b-secondary tracking-wide font-lato"
                        v-model="Project_live_link" />
                </label>

                <!-- For Buttons -->
                <div class="flex-between">
                    <button type="reset" class="text-slate-300 py-1 px-3 rounded-sm trans font-semibold hover:bg-secondary hover:text-black hover:shadow-glow-md hover:shadow-secondary/50">
                        reset
                    </button>
                    <button type="submit" class="text-slate-300 py-1 px-3 rounded-sm trans font-semibold hover:bg-secondary hover:text-black hover:shadow-glow-md hover:shadow-secondary/50">
                        Puplish
                    </button>
                </div>
            </form>
        </div>
    </section>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";
import { doc, getDoc, projects_cols } from "@/firebase";
import PlusIcon from "@/assets/icons/plus.svg";
import MinusIcon from "@/assets/icons/minus.svg";
const route = useRoute();
const router = useRouter();
const store = useStore();

const project_image_preview = ref(null);
const err = ref([]);
const Project_name = ref(null);
const Project_des = ref(null);
const Project_image = ref(null);
const Project_overview = ref([null]);
const Project_usedTools = ref([]);
const Project_live_link = ref("https://");
const image_changed = ref(false);

const oldimage = ref(null);

const addoverview = () => {
    Project_overview.value.push(null);
};
const Deleteoverview = (idx) => {
    Project_overview.value.splice(idx, 1);
};

const makeImage = (e) => {
    const file = e.target.files[0];
    Project_image.value = file;
    project_image_preview.value = URL.createObjectURL(file);
    image_changed.value = true;
};

const UpdateProject = () => {
    let obj = {
        id: route.params.id,
        title: Project_name.value,
        description: Project_des.value,
        image: Project_image.value,
        tools: Project_usedTools.value,
        overview: Project_overview.value,
        link: Project_live_link.value,
        changedImage: image_changed.value,
    };
    store.editProject(obj);
};

onMounted(async () => {
    let thedoc = doc(projects_cols, route.params.id);
    const currentProject = await getDoc(thedoc);
    const result = currentProject.data();
    if (currentProject.exists()) {
        Project_name.value = result.title;
        Project_des.value = result.description;
        Project_image.value = result.image;
        project_image_preview.value = result.image;
        oldimage.value = result.image;
        Project_overview.value = result.overview;
        Project_usedTools.value = result.tools;
        Project_live_link.value = result.link;
    } else {
        alert("Error Not Found");
        router.push({ name: "AdminProjects" });
    }
});
</script>
