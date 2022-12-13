<template>
    <Header />
    <section class="min-h-screen flex-center">
        <div class="container flex-center">
            <form @submit.prevent="signIn" class="flex flex-col gap-7 bg-slate-900/20 p-8 rounded-md w-[500px] relative -mt-14">
                <img src="@/assets/images/logo.png" alt="" class="absolute w-2/6 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <!-- For Error -->
                <!-- <div class="mb-2">
                    <p v-for="(err, idx) in err" :key="idx" class="text-rose-400 text-sm text-center mb-1">{{ err
                    }}
                    </p>
                </div> -->
                <label class="flex flex-col gap-3">
                    <span class="text-white font-bold text-sm">Email</span>
                    <input
                        type="text"
                        class="w-full bg-transparent border border-slate-50/20 rounded-md py-3 px-2 text-white placeholder:text-sm placeholder:text-white/40 focus:outline-none focus:border-b-secondary"
                        v-model="email"
                        autofocus />
                </label>
                <label class="flex flex-col gap-3">
                    <span class="text-white font-bold text-sm">Password</span>
                    <input
                        type="password"
                        class="w-full bg-transparent border border-slate-50/20 rounded-md py-3 px-2 text-white placeholder:text-sm placeholder:text-white/40 focus:outline-none focus:border-b-secondary"
                        v-model="password" />
                </label>
                <button
                    type="submit"
                    class="ml-auto text-slate-300 py-1 px-3 rounded-sm transition-colors duration-300 ease-in-out font-source font-semibold hover:bg-secondary hover:text-black hover:shadow-glow-md hover:shadow-secondary/50">
                    Login
                </button>
            </form>
        </div>
    </section>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "@/store";
const store = useStore();
const email = ref(null);
const password = ref(null);
const signIn = () => {
    if (email.value && password.value) {
        store.Login({ email: email.value, password: password.value });
    }
};
</script>
