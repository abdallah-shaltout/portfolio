<template>
  <div class="overflow-hidden bg-white rounded-lg shadow-md">
    <div class="overflow-hidden">
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
        "
        :href="proj.liveurl"
        target="_blank"
        :style="{ 'background-image': `url(${proj.images[selectedImage]})` }"
      ></a>
    </div>
    <div class="py-2 px-5 flex flex-col gap-1">
      <a
        class="text-base capitalize block text-dark-50 hover:text-dark"
        :href="proj.liveurl"
        target="_blank"
      >
        <h4 class="mt-2">{{ proj.name }}</h4>
      </a>
      <span class="text-dark-50 flex justify-start items-center gap-1"
        ><svg
          class="w-3 h-3"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
          />
          <path
            d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"
          />
        </svg>
        {{ proj.update_at || proj.puplish_at }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedImage: 0,
      image_test_link: "https://unbounce.com/photos/zola-full.jpg",
    };
  },
  name: "TheCard",
  props: ["proj"],
  computed: {
    image() {
      return this.proj.images[this.selectedImage];
    },
  },
  methods: {
    changeiamges() {
      if (this.proj.images.length > 1) {
        if (this.selectedImage == this.proj.images.length - 1) {
          this.selectedImage = 0;
        } else {
          this.selectedImage++;
        }
      }
    },
  },
};
</script>
