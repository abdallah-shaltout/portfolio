<template>
  <article>
    <section class="bg-main bg-gradient py-14">
      <div
        class="
          container
          flex
          items-center
          justify-between
          sm:flex-col
          gap-8
          text-white
        "
      >
        <div
          class="flex-1 flex flex-col gap-2 sm:text-center"
          v-html="all_text.header"
        ></div>
        <div class="flex-1">
          <img src="@/assets/imgs/landing.svg" alt="" />
        </div>
      </div>
    </section>
    <section class="py-14 bg-white">
      <div class="container">
        <div class="section_head">
          <h4>about me</h4>
          <p v-text="all_text.about_me"></p>
        </div>
        <a class="btn-primary" href="#contact">Get in touch</a>
      </div>
    </section>
    <section class="pt-14 bg-slate-50" id="service">
      <div class="section_head">
        <h4>Service</h4>
        <p v-text="all_text.service"></p>
      </div>
      <div class="bg-main bg-gradient py-14 text-white">
        <div
          class="
            container
            flex
            items-center
            justify-between
            sm:flex-col sm:text-center sm:gap-8
          "
        >
          <div class="flex-1 font-roboto">
            <h4 class="text-3xl font-bold md:text-2xl">Front-End Developer</h4>
            <p
              class="
                text-lg text-slate-300
                mt-5
                md:text-base md:mt-3 md:leading-6 md:text-slate-200
              "
              v-text="all_text.front_end"
            ></p>
          </div>
          <div class="flex-1">
            <img
              src="@/assets/imgs/developer.svg"
              class="max-w-xs ml-auto md:w-[15rem]"
              alt=""
            />
          </div>
        </div>
      </div>

      <div class="py-[6.5rem] bg-gradient-to-b from-slate-100 to-slate-50">
        <div
          class="
            container
            flex flex-row-reverse
            items-center
            justify-between
            sm:flex-col sm:text-center sm:gap-8
          "
        >
          <div class="flex-1 font-roboto">
            <h4 class="text-3xl font-bold text-dark md:text-2xl">
              Vue js Framwork
            </h4>
            <p
              class="
                text-lg text-gray-500
                mt-5
                md:text-base md:mt-3 md:leading-6 md:text-gray-600
              "
              v-text="all_text.vuejs"
            ></p>
          </div>
          <div class="flex-1">
            <img
              src="@/assets/imgs/vuejs.svg"
              class="max-w-xs mr-auto md:w-[15rem]"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
    <section class="bg-white bg-gradient py-14" id="work">
      <div class="container">
        <div class="section_head">
          <h4>my work</h4>
          <p v-text="all_text.mywork"></p>
        </div>
        <div class="grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          <div
            class="bg-white rounded-xl shadow-md overflow-hidden p-1"
            v-for="(proj, idx) in projects"
            :key="proj.id"
            :style="{ order: idx + 1 }"
          >
            <a
              class="
                p-0
                w-full
                block
                bg-no-repeat bg-cover bg-top
                hover:bg-bottom
                transition-[background-position]
                duration-[2s]
                ease-in-out
                h-[300px]
                md:h-[270px]
                sm:h-[250px]
                overflow-hidden
                rounded-xl
              "
              :href="proj.liveurl"
              :title="proj.name"
              :style="{ 'background-image': `url(${proj.images[0]})` }"
              target="_blank"
            >
            </a>
          </div>
          <div
            class="
              bg-main bg-gradient
              rounded-xl
              shadow-md
              order-4
              flex
              justify-center
              items-center
              text-white text-center
              md:min-h-[14rem]
            "
          >
            <div class="flex flex-col gap-3">
              <p class="text-2xl">and more...</p>
              <router-link
                :to="{ name: 'Work' }"
                class="btn-primary reverse py-3 text-base"
                >Vist</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      class="py-14 bg-gradient-to-b from-slate-100 to-slate-50"
      id="contact"
    >
      <div class="section_head">
        <h4>get in touch</h4>
      </div>
      <a :href="all_text.mail_to" class="btn-primary px-12 py-3 mt-16"
        >Send Messagea</a
      >
    </section>
  </article>
</template>

<script>
import { getDocs, settingsCol, thequery } from "@/firebase";
export default {
  name: "HomeView",
  data() {
    return {
      all_text: {},
      projects: [],
    };
  },

  async created() {
    const getdata = await getDocs(settingsCol);
    const gethomeprojects = await getDocs(thequery);

    // get text for home page
    getdata.docs.forEach((doc) => {
      this.all_text = { id: doc.id, ...doc.data() };
    });
    // get project for home page
    gethomeprojects.docs.forEach((doc) => {
      // console.log(doc.data());
      this.projects.push({ id: doc.id, ...doc.data() });
    });
  },
};
</script>
