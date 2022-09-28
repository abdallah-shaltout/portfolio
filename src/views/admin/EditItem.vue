<template>
  <article>
    <section class="mb-20">
      <div class="container">
        <section-head :text="'Edit Item'" />
      </div>
    </section>
    <section v-if="edit_item_show">
      <div class="overlay" @click="edit_item_show = !edit_item_show"></div>
      <form class="theform" @submit.prevent="update_project">
        <label class="text-white text-2xl block mb-8 text-center"
          >Edit Item</label
        >
        <p
          class="
            bg-rose-500
            text-white text-xl
            block
            mb-4
            text-center
            py-3
            rounded-xl
          "
          v-if="errshow"
        >
          There Are Field is Empty
        </p>
        <div class="flex items-center gap-4 mb-5">
          <label class="switch w-20 h-6 text-white">
            <input type="checkbox" v-model="show_in_homepage" />
            <span class="before:w-6 before:h-6 small_icon"></span>
          </label>
          <span class="text-white block font-semibold">Show In Home Page</span>
        </div>
        <input
          class="
            block
            border-0
            outline-none
            py-3
            px-5
            w-full
            rounded-2xl
            text-base
            shadow-md
            mb-5
          "
          type="text"
          placeholder="Project Name"
          v-model="proj_name"
        />
        <input
          class="
            block
            border-0
            outline-none
            py-3
            px-5
            w-full
            rounded-2xl
            text-base
            shadow-md
            mb-5
          "
          type="text"
          placeholder="Live Demo"
          v-model="Proj_liveurl"
        />
        <input
          class="
            block
            border-0
            outline-none
            py-3
            px-5
            w-full
            rounded-2xl
            text-base
            shadow-md
            mb-5
          "
          type="text"
          placeholder="Category"
          v-model="proj_category"
        />
        <button
          class="btn-primary reverse text-sm px-8 py-2 ml-0"
          @click.prevent="addimage"
        >
          Add Image
        </button>
        <div class="grid grid-cols-auto-fill gap-3 overflow-y-auto h-24">
          <label
            v-for="(image, idx) in proj_images"
            :key="idx"
            class="
              relative
              overflow-hidden
              p-5
              mt-4
              flex-center
              rounded-2xl
              border-2 border-dashed border-white
              text-white
              cursor-pointer
              min-h-[75px]
            "
          >
            <span v-if="image == ''">upload</span>
            <input
              class="hidden"
              type="file"
              @change="update_image($event, idx)"
            />
            <img
              class="z-[-1] w-[99%] center-abs object-cover"
              :src="proj_images[idx]"
            />
            <button
              class="
                absolute
                top-0
                right-0
                bg-second
                transition-[background-color,width,height]
                duration-300
                hover:w-full hover:h-full hover:rounded-none hover:bg-second/60
                w-6
                h-6
                p-1
                rounded-full
                flex-center
              "
              @click.prevent="removeimage(idx)"
            >
              X
            </button>
          </label>
        </div>
        <div class="flex justify-between items-center flex-wrap sm:gap-4 mt-5">
          <button class="btn-primary reverse py-2" type="submit">
            Edit Item
          </button>
          <button
            class="btn-primary reverse py-2"
            @click.prevent="edit_item_show = !edit_item_show"
          >
            close
          </button>
        </div>
      </form>
    </section>

    <section v-if="projects.length">
      <div class="container grid-page">
        <the-card
          v-for="item in projects"
          :key="item"
          :proj="item"
          @click.prevent="edit_project(item)"
        >
        </the-card>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  data() {
    return {
      edit_item_show: false,
      proj_id: "",
      proj_images: [],
      proj_name: "",
      Proj_liveurl: "",
      proj_category: "",
      show_in_homepage: false,
      errshow: false,
      newimages: [],
    };
  },
  computed: {
    projects() {
      return this.$store.state.projects;
    },
  },
  methods: {
    edit_project(item) {
      this.proj_id = item.id;
      this.proj_name = item.name;
      this.Proj_liveurl = item.liveurl;
      this.proj_category = item.category;
      this.proj_images = item.images;
      (this.show_in_homepage = item.show_in_homepage),
        (this.edit_item_show = true);
    },

    async update_project() {
      let d = new Date();
      let m = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let obj = {
        name: this.proj_name,
        category: this.proj_category,
        liveurl: this.Proj_liveurl,
        images: this.proj_images,
        show_in_homepage: this.show_in_homepage,
        puplish_at: `${m[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`,
      };

      let payload = { obj: obj, images: this.newimages, id: this.proj_id };
      if (confirm(`Are You Sure You Want To Update Data!  (  ${obj.name}  )`)) {
        this.$store.dispatch("EDIT_DATA", payload);
        this.edit_item_show = false;
      }
    },
    update_image(e, idx) {
      const file = e.target.files[0];
      this.newimages[idx] = file;
      this.proj_images[idx] = URL.createObjectURL(this.newimages[idx]);
    },
    addimage() {
      this.proj_images.push("");
    },
    removeimage(idx) {
      if (idx != -1) {
        if (confirm("Are You Sure You Want To Delete This Photo!")) {
          this.proj_images.splice(idx, 1);
        }
      }
    },
  },
};
</script>

<style>
</style>
