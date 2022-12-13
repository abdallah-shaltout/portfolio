<template>
    <section>
        <h2 class="section-title">About Me</h2>
        <p class="section-des">Here you will find more information about me, what I do, and my current skills mostly in terms of programming and technology</p>
        <div class="container mt-8 flex justify-between gap-8 items-start md:flex-col">
            <div class="flex-1 sm:text-center">
                <h3 class="font-bold text-2xl mb-6 text-white">Get to Know me!</h3>
                <div class="flex flex-col gap-5 text-gray-300 leading-6 font-lato w-5/6 sm:mx-auto">
                    <p class="xs:text-sm">
                        I'm a Frontend Web Developer building the Front-end of Websites and Web Applications that leads to the success of the overall product. Check out some of my work in the Projects
                        section.
                    </p>
                    <p class="xs:text-sm">
                        I'm a Frontend Web Developer building the Front-end of Websites and Web Applications that leads to the success of the overall product. Check out some of my work in the Projects
                        section.
                    </p>
                    <p class="xs:text-sm">
                        I'm open to Job opportunities where I can contribute, learn and grow. If you have a good opportunity that matches my skills and experience then don't hesitate to contact me.
                    </p>
                </div>
                <a href="#contact" class="btn-1 mt-8 sm:mx-auto">Get in touch</a>
            </div>
            <div class="flex-1 md:w-full">
                <h3 class="font-bold text-2xl mb-6 text-white">My Skills</h3>
                <div class="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-3 gap-5 capitalize">
                    <!-- Start Skill -->
                    <div class="skill" v-for="skill in store.skills" :key="skill.id">
                        <div class="skill-image-box">
                            <img :src="skill.image" class="skill-image" :alt="skill.text" />
                        </div>
                        <h4 class="skill-title">{{ skill.text }}</h4>
                    </div>
                    <!-- End Skill -->
                </div>
            </div>
        </div>
    </section>
</template>
<script setup>
import { useStore } from "@/store";
const store = useStore();
</script>
