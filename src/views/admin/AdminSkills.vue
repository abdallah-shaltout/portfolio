<template>
    <section>
        <h2 class="section-title">Skills</h2>
        <div class="container">
            <label class="toggle">
                <input type="checkbox" v-model="showEditBtns" />
                <span></span>
            </label>
        </div>
        <div class="container grid grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 py-14">
            <div class="flex flex-col p-5 text-center cursor-default trans my-bg hover:bg-slate-900/40 rounded-lg relative" v-for="skill in skills" :key="skill.id">
                <Transition name="fade-in">
                    <div class="absolute flex gap-2 items-center right-2 top-2" v-if="showEditBtns">
                        <button class="bg-zinc-600/40 p-2 rounded-lg text-slate-300 font-bold z-10 w-8 h-8 flex-center trans hover:text-white hover:bg-blue-500" @click="EditSkill(skill.id)">
                            <edit-icon class="w-4 h-4" />
                        </button>
                        <button class="bg-zinc-600/40 p-2 rounded-lg text-slate-300 font-bold z-10 w-8 h-8 flex-center trans hover:text-white hover:bg-rose-500" @click="DelSkill(skill.id)">
                            <trash-icon class="w-4 h-4" />
                        </button>
                    </div>
                </Transition>
                <div class="w-1/2 mx-auto flex-center">
                    <img :src="skill.image" :alt="skill.text" class="w-1/2 transition-transform duration-300 ease-in-out" />
                </div>
                <h4 class="text-white mt-5 mb-1 font-semibold trans text-2xl text-center capitalize">{{ skill.text }}</h4>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref, computed } from "vue";
import { useStore } from "@/store/";
import { useRouter } from "vue-router";
import TrashIcon from "@/assets/icons/trash.svg";
import EditIcon from "@/assets/icons/edit.svg";
const router = useRouter();
const store = useStore();
const showEditBtns = ref(false);
const EditSkill = (id) => {
    router.push({ name: "editSkill", params: { id: id } });
};
const DelSkill = (id) => {
    store.removeSkill(id);
};
const skills = computed(() => {
    return store.skills.slice().sort((a, b) => a.name.localeCompare(b.name));
});
</script>
