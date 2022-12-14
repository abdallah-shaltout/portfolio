<template>
    <section>
        <div class="container flex justify-between items-center flex-row-reverse md:flex-col md:gap-12">
            <div class="flex-1">
                <h2 class="section-title">Get in touch</h2>
                <p class="text-gray-400 text-center w-3/4 mx-auto mt-4 leading-7 sm:w-nine">Feel free to Contact me by submitting the form below and will get back to you as soon as possible</p>
            </div>
            <div class="flex-1 md:w-full">
                <form @submit.prevent="send_message" class="flex flex-col gap-5 bg-slate-900/20 px-4 py-6 rounded font-lato shadow-xl shadow-black/20">
                    <Transition name="fade-in">
                        <div class="mb-2">
                            <p v-for="(err, idx) in err" :key="idx" class="text-rose-400 text-sm text-center mb-1">{{ err }}</p>
                            <p v-if="send_successfully" class="text-green-400 text-base text-center mb-1">Sent Successfully</p>
                        </div>
                    </Transition>
                    <label class="flex flex-col gap-2">
                        <span class="text-white font-bold text-sm">Name</span>
                        <input
                            type="text"
                            class="w-full bg-transparent border border-slate-50/20 rounded-md py-3 px-2 text-white placeholder:text-sm placeholder:text-white/40 focus:outline-none focus:border-b-secondary capitalize"
                            placeholder="John Doe"
                            v-model="user.name" />
                    </label>
                    <label class="flex flex-col gap-2">
                        <span class="text-white font-bold text-sm">Email</span>
                        <input
                            type="text"
                            class="w-full bg-transparent border border-slate-50/20 rounded-md py-3 px-2 text-white placeholder:text-sm placeholder:text-white/40 focus:outline-none focus:border-b-secondary tracking-wide"
                            placeholder="example@gmail.com"
                            v-model="user.email" />
                    </label>
                    <label class="flex flex-col gap-2">
                        <span class="text-white font-bold text-sm">message</span>
                        <textarea
                            class="w-full bg-transparent border border-slate-50/20 rounded-md py-3 px-2 text-white placeholder:text-sm placeholder:text-white/40 focus:outline-none focus:border-b-secondary h-40 resize-none"
                            placeholder="Your message Here."
                            v-model="user.message"></textarea>
                    </label>
                    <button
                        type="submit"
                        class="ml-auto text-slate-300 py-1 px-3 rounded-sm transition-colors duration-300 ease-in-out font-source font-semibold hover:bg-secondary hover:text-black hover:shadow-glow-md hover:shadow-secondary/50">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useStore } from "@/store";
const store = useStore();

const user = reactive({
    name: null,
    email: null,
    message: null,
    info: {},
});
const err = ref([]);
const send_successfully = ref(false);

const send_message = async () => {
    err.value = [];
    let reg = /\w+@\w+\.\w+/gi;
    let email_valid = reg.test(user.email);
    if (!user.name) {
        err.value.push("you must Write your name");
    } else if (user.name.trim().length <= 3) {
        err.value.push("You Name Must Be More Then 3 Character");
    }
    if (!user.email) {
        err.value.push("you must Write your email Address");
    }
    if (user.email && !email_valid) {
        err.value.push("Your Email Not Valid");
    }
    if (!user.message) {
        err.value.push("You must Write your message");
    }
    if (user.message && user.message.length < 10) {
        err.value.push("your Message must be more then 10 Character");
    }
    if (user.name.trim().length > 3 && user.message.length >= 10 && email_valid) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://ipapi.co/json", false);
        xhr.onreadystatechange = function () {
            let result = JSON.parse(this.responseText);
            user.info = { ip: result.ip, network: result.network, country: result.country_name, city: result.city };
        };
        xhr.send();
        store.sendMessage(user);
        send_successfully.value = true;
        err.value = [];
        user.name = null;
        user.email = null;
        user.message = null;
        setTimeout(() => {
            send_successfully.value = false;
        }, 3000);
    }
};
</script>
