<template>
    <section>
        <h2 class="section-title">Add Skill</h2>

        <div class="container">
            <form @submit.prevent="addSkill" class="flex flex-col gap-5 bg-slate-900/20 p-4 rounded-md font-lato w-3/4 md:w-full mx-auto my-8">
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
                    <div class="w-64 h-64 sm:w-full rounded border-2 mx-auto flex-center cursor-pointer trans hover:bg-indigo-500/10 mt-4 relative">
                        <span v-if="!skill_image_preview" class="font-bold text-white uppercase font-source text-3xl tracking-wider">Skill Image</span>
                        <img v-if="skill_image_preview" class="w-full h-full object-cover object-top absolute left-0 top-0" :src="skill_image_preview" />
                    </div>
                </label>
                <button
                    type="submit"
                    class="text-slate-300 py-2 px-12 rounded-sm trans font-semibold outline-1 outline-secondary/30 outline hover:outline-0 hover:bg-secondary hover:text-black hover:shadow-glow-md hover:shadow-secondary/50 w-fit ml-auto">
                    Add
                </button>
            </form>
        </div>
    </section>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useStore } from "@/store";
const store = useStore();
const skill = reactive({
    name: null,
    text: null,
    image: null,
});
const skill_image_preview = ref(null);
const makeImage = (e) => {
    const file = e.target.files[0];
    skill.image = file;
    skill_image_preview.value = URL.createObjectURL(file);
};
const addSkill = async () => {
    if (skill.name && skill.image && skill.text) {
        store.addSkill(skill);
    }
};
</script>
