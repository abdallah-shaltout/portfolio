<template>
    <article class="my-bg p-5 rounded-xl text-white flex flex-col gap-2 relative">
        <div class="absolute flex gap-2 items-center right-3 top-3" v-if="showRemove">
            <button class="bg-zinc-600/40 p-3 rounded-lg text-slate-300 font-bold z-10 w-10 h-10 flex-center trans hover:text-white hover:bg-rose-500" @click="removeTheMessage">
                <trash-icon class="w-6 h-6" />
            </button>
        </div>
        <div class="mb-6">
            <EmailIcon class="w-12 h-12 mx-auto cursor-pointer trans hover:text-white" :class="{ 'text-white': show.email, 'text-slate-300': !show.email }" @click="email_func" />
            <Transition name="fade-in">
                <span v-if="show.email" class="text-center text-base mt-4 block">{{ message.email }}</span>
            </Transition>
        </div>
        <label class="flex items-center gap-2">
            <span class="text-slate-300 text-lg">Name : </span>
            <h3 class="text-white font-bold text-lg capitalize">{{ message.name }}</h3>
        </label>
        <label class="flex flex-col gap-2">
            <span class="text-slate-300 text-lg">Message :</span>
            <p v-if="!show.message" class="text-white text-sm leading-6 overflow-hidden">
                {{ message.message.slice(0, MessageCharCount)
                }}<b
                    v-if="!show.message"
                    @click="
                        MessageCharCount = message.length;
                        show.message = true;
                    "
                    class="text-white font-bold cursor-pointer"
                    >...More</b
                >
            </p>
            <Transition name="fade-in">
                <p v-if="show.message" class="text-white text-sm leading-6 overflow-hidden whitespace-pre" v-text="message.message"></p>
            </Transition>
        </label>
        <label class="flex flex-col gap-2">
            <span class="text-slate-300 text-lg hover:text-slate-50 cursor-pointer" @click="show.info = !show.info">Info :</span>
            <Transition name="fade-in">
                <ul v-if="show.info">
                    <li class="capitalize" v-for="(value, key) in message.info" :key="key">
                        <b>{{ key }}</b
                        >: {{ value }}
                    </li>
                </ul>
            </Transition>
        </label>
    </article>
</template>
<script setup>
import { ref, reactive } from "vue";
import EmailIcon from "@/assets/icons/email.svg";
import TrashIcon from "@/assets/icons/trash.svg";

const MessageCharCount = ref(30);
const show = reactive({
    email: false,
    message: false,
    info: false,
});

const props = defineProps({
    message: Object,
    showRemove: Boolean,
});
const emit = defineEmits(["remove-message"]);
const removeTheMessage = () => {
    emit("remove-message", props.message.id);
};

const email_func = () => {
    show.email = true;
    navigator.clipboard.writeText(props.message.email);
};
</script>
