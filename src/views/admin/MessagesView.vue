<template>
    <section>
        <h2 class="section-title">Messages</h2>
        <div class="container my-14">
            <label class="toggle">
                <input type="checkbox" v-model="showRemoveBtns" />
                <span></span>
            </label>
            <div class="grid grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 my-14">
                <message-card v-for="item in store.messages" :key="item.id" :message="item" :showRemove="showRemoveBtns" @remove-message="RemoveTheMessage" />
            </div>
        </div>
    </section>
</template>
<script setup>
import { ref } from "vue";
import { useStore } from "@/store";
import MessageCard from "@/components/MessageCard.vue";
const store = useStore();
const showRemoveBtns = ref(false);
const RemoveTheMessage = (id) => {
    store.removeMessage(id);
};
</script>
