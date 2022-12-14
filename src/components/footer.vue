<template>
    <footer class="border-t border-light/10">
        <div class="container">
            <div class="flex-between py-4 sm:flex-col sm:gap-4">
                <router-link :to="{ name: 'home' }"><img src="@/assets/images/logo.png" alt="Abdallah Shaltout" class="w-52 sm:w-36" /></router-link>
                <pages class="flex gap-5" TheClass="page-link-1" />
            </div>
            <p class="text-center border-t border-light/10 py-4 text-gray-400 font-lato sm:text-sm sm:py-3">
                All Copyrights &copy; {{ new Date().getFullYear() }}&nbsp; for
                <a href="https://www.facebook.com/abdullahshaltout/" target="_blank" class="text-blue-400 trans hover:text-blue-500">@Abdallah Shaltout</a>
            </p>
        </div>
    </footer>
</template>
<script setup>
import pages from "@/components/pages.vue";
</script>
