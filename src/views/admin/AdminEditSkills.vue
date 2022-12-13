<template>
    <section>
        <h2 class="section-title">Edit Skill</h2>

        <form @submit.prevent="EditSkill" class="flex flex-col gap-5 bg-slate-900/20 p-4 rounded-md font-lato w-3/4 mx-auto my-8">
            <label class="flex flex-col gap-2">
                <span class="label-title">Skill Name</span>
                <input
                    type="text"
                    v-model="skill.name"
                    class="w-full bg-transparent border border-slate-50/20 rounded-md py-3 px-2 text-white placeholder:text-sm placeholder:text-white/40 focus:outline-none focus:border-b-secondary"
                    placeholder="HTML"
                    autofocus />
            </label>
            <label class="flex flex-col gap-2">
                <span class="label-title">Skill Text</span>
                <input
                    type="text"
                    v-model="skill.text"
                    class="w-full bg-transparent border border-slate-50/20 rounded-md py-3 px-2 text-white placeholder:text-sm placeholder:text-white/40 focus:outline-none focus:border-b-secondary"
                    placeholder="HTML"
                    autofocus />
            </label>
            <label class="flex flex-col gap-2">
                <span class="label-title">Skill Image</span>
                <input type="file" accept="image/*" class="hidden" @change="makeImage($event)" />
                <div class="w-64 h-64 rounded border-2 mx-auto flex-center cursor-pointer trans hover:bg-indigo-500/10 mt-4 relative">
                    <span v-if="!skill_image_preview" class="font-bold text-white uppercase font-source text-3xl tracking-wider">Skill Image</span>
                    <img v-if="skill_image_preview" class="w-full h-full object-cover object-top absolute left-0 top-0" :src="skill_image_preview" />
                </div>
            </label>
            <button
                type="submit"
                class="text-slate-300 py-2 px-12 rounded-sm trans font-semibold outline-1 outline-secondary/30 outline hover:outline-0 hover:bg-secondary hover:text-black hover:shadow-glow-md hover:shadow-secondary/50 w-fit">
                Update
            </button>
        </form>
    </section>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";
import { doc, getDoc, skills_cols } from "@/firebase";
const route = useRoute(),
    router = useRouter(),
    store = useStore(),
    skill_image_preview = ref(null);

const skill = reactive({
    id: route.params.id,
    name: null,
    text: null,
    image: null,
    changedImage: false,
});
const makeImage = (e) => {
    const file = e.target.files[0];
    skill.image = file;
    skill_image_preview.value = URL.createObjectURL(file);
    skill.changedImage = true;
};

const EditSkill = async () => {
    if (skill.name && skill.image && skill.text) {
        store.editSkill(skill);
    }
};
onMounted(async () => {
    let thedoc = doc(skills_cols, route.params.id);
    const currentProject = await getDoc(thedoc);
    const result = currentProject.data();
    if (currentProject.exists()) {
        skill.name = result.name;
        skill.text = result.text;
        skill.image = result.image;
        skill_image_preview.value = result.image;
    } else {
        alert("Error Not Found");
        router.push({ name: "AdminSkills" });
    }
});
</script>
