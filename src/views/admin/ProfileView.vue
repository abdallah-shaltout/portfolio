<template>
    <section>
        <h2 class="section-title">Profile</h2>
        <div class="container">
            <form class="flex flex-col gap-5 bg-slate-900/20 p-4 rounded-md font-lato w-3/4 sm:w-full mx-auto my-8" @submit.prevent="updateAvatar">
                <label class="flex flex-col gap-2 w-fit mx-auto">
                    <input type="file" class="hidden" accept="images/*" @change="makeImage($event)" />
                    <div class="w-40 h-40 my-bg shadow mx-auto cursor-pointer relative overflow-hidden rounded-full">
                        <img v-if="profile.image" :src="profile.image" class="w-full h-full object-cover object-left absolute left-0 top-0" alt="Avatar Image" />
                        <p v-if="!profile.image" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-light">Profile</p>
                    </div>
                </label>
                <button
                    v-if="saveBtn"
                    type="submit"
                    class="mt-4 mx-auto text-slate-300 py-1 px-3 rounded-sm trans font-source font-semibold hover:bg-secondary hover:text-black hover:shadow-glow-md hover:shadow-secondary/50">
                    Save
                </button>
            </form>
            <form class="flex flex-col gap-5 bg-slate-900/20 p-4 rounded-md font-lato w-3/4 sm:w-full mx-auto my-8" @submit.prevent="changePassword">
                <label class="flex flex-col gap-2">
                    <span class="text-white font-bold text-sm">Email</span>
                    <input
                        type="text"
                        class="w-full bg-transparent border border-slate-50/20 rounded-md py-3 px-2 text-white placeholder:text-sm placeholder:text-white/40 focus:outline-none focus:border-b-secondary tracking-wide disabled:text-slate-400"
                        placeholder="example@gmail.com"
                        disabled
                        :value="profile.email" />
                </label>
                <label class="flex flex-col gap-2">
                    <span class="text-white font-bold text-sm">Old Password</span>
                    <input
                        type="password"
                        v-model="profile.oldPassword"
                        class="w-full bg-transparent border border-slate-50/20 rounded-md py-3 px-2 text-white placeholder:text-sm placeholder:text-white/40 focus:outline-none focus:border-b-secondary tracking-wide" />
                </label>
                <label class="flex flex-col gap-2">
                    <span class="text-white font-bold text-sm">New Password</span>
                    <input
                        type="password"
                        v-model="profile.newPassword"
                        class="w-full bg-transparent border border-slate-50/20 rounded-md py-3 px-2 text-white placeholder:text-sm placeholder:text-white/40 focus:outline-none focus:border-b-secondary tracking-wide" />
                </label>
                <button
                    type="submit"
                    class="ml-auto text-slate-300 py-1 px-3 rounded-sm trans font-source font-semibold hover:bg-secondary hover:text-black hover:shadow-glow-md hover:shadow-secondary/50">
                    Change Pasword
                </button>
            </form>
        </div>
    </section>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { auth, getDoc, doc, profile_cols } from "@/firebase";
import { useStore } from "@/store";
const store = useStore();
const saveBtn = ref(false);
const theoldPasword = ref(null);
const newimage = ref(null);
const profile = reactive({
    email: null,
    oldPassword: null,
    newPassword: null,
    image: null,
});
const makeImage = (e) => {
    const file = e.target.files[0];
    newimage.value = file;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        profile.image = reader.result;
        saveBtn.value = true;
    });
    reader.readAsDataURL(file);
};
const updateAvatar = async () => {
    if (profile.image) {
        store.changeAvatar(newimage.value);
    }
};
const changePassword = async () => {
    if (profile.oldPassword && profile.newPassword) {
        if (profile.oldPassword === theoldPasword.value) {
            store.chnagePassword(profile.newPassword);
        } else {
            console.log("wrong password");
        }
    }
};
onMounted(async () => {
    const collection = doc(profile_cols, auth.currentUser.uid);
    const currentProfile = await getDoc(collection);
    const result = currentProfile.data();
    profile.email = result.email;
    profile.image = result.image;
    theoldPasword.value = result.password;
});
</script>
