<template>
  <footer class="bg-main py-6">
    <div
      class="container flex justify-between items-center sm:flex-col sm:gap-3"
    >
      <p class="text-white text-sm">
        Copyright &copy; <span class="semitbold">{{ theyear }}</span>
        <span class="mx-2 font-semibold">{{ name }}</span> All Rights Reserved.
      </p>
      <div class="flex gap-4">
        <a :href="facebook" target="_blank" class="w-5 h-5"
          ><TheIcon :icon="'facebook'" />
        </a>
        <a :href="linked_in" target="_blank" class="w-5 h-5"
          ><TheIcon :icon="'linkedin'" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
import { getDocs, settingsCol } from "@/firebase";
import TheIcon from "@/components/global/icons.vue";

export default {
  name: "TheFooter",
  data() {
    return {
      name: "Abdallha M.Shaltout",
      facebook: "",
      linked_in: "",
    };
  },
  computed: {
    theyear() {
      let d = new Date();
      return d.getFullYear();
    },
  },
  components: { TheIcon },
  async mounted() {
    const getdata = await getDocs(settingsCol);
    // get text for home page
    getdata.docs.forEach((doc) => {
      this.facebook = doc.data().facebook_link;
      this.linked_in = doc.data().linked_in;
    });
  },
};
</script>
