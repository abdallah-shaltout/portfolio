<template>
  <article>
    <section class="mb-12">
      <div class="container">
        <section-head :text="'Add Item'" />

        <button class="btn-primary" @click="additem_show = !additem_show">
          Add Item
        </button>
      </div>
    </section>
    <section v-if="additem_show">
      <div class="overlay" @click="additem_show = !additem_show"></div>
      <form @submit.prevent="upload_data" class="theform">
        <label class="text-white text-2xl block mb-8 text-center"
          >Add Item</label
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
          v-model="name"
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
            mb-4
          "
          type="text"
          placeholder="Live Demo"
          v-model="liveurl"
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
            mb-4
          "
          type="text"
          placeholder="Category"
          v-model="category"
        />
        <button
          class="btn-primary reverse text-sm px-8 py-2 ml-0"
          @click.prevent="addimage"
        >
          Add Image
        </button>
        <div class="grid grid-cols-auto-fill gap-3 overflow-y-auto h-24">
          <label
            v-for="(image, idx) in images"
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
              :src="imageperview[idx]"
              class="z-[-1] w-[99%] center-abs object-cover"
            />
            <button
              class="
                absolute
                top-0
                right-0
                bg-rose-500
                w-5
                h-5
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
            Add Item
          </button>
          <button
            class="btn-primary reverse py-2"
            @click.prevent="additem_show = !additem_show"
          >
            close
          </button>
        </div>
      </form>
    </section>
    <section class="content" v-if="projects.length">
      <div class="container admin-pad grid-page">
        <the-card
          v-for="item in projects"
          :key="item"
          :proj="item"
          @click.prevent=""
        >
        </the-card>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  methods: {
    async upload_data() {
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
        name: this.name,
        category: this.category,
        liveurl: this.liveurl,
        images: [],
        show_in_homepage: this.show_in_homepage,
        creadte_at: `${d.getFullYear()}-${
          d.getMonth() + 1
        }-${d.getDate()}T${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`,
        puplish_at: `${m[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`,
      };

      if (
        obj.name !== "" &&
        obj.category !== "" &&
        obj.liveurl !== "" &&
        this.images[0] !== "" &&
        this.images.length
      ) {
        this.errshow = false;

        let payload = { obj: obj, images: this.images };

        this.$store.dispatch("ADD_DATA", payload);
        // reset
        this.additem_show = false;
        this.name = "";
        this.liveurl = "https=//";
        this.category = "";
        this.images = [];
        this.imageperview = [];
        this.show_in_homepage = false;
        this.errshow = false;
      } else {
        this.errshow = true;
      }
    },

    addimage() {
      this.images.push("");
    },
    removeimage(idx) {
      if (idx != -1) {
        this.images.splice(idx, 1);
        this.imageperview.splice(idx, 1);
      }
    },
    update_image(e, idx) {
      const file = e.target.files[0];
      this.images[idx] = file;
      this.imageperview[idx] = URL.createObjectURL(this.images[idx]);
    },
  },
  data() {
    return {
      additem_show: false,
      name: "",
      liveurl: "https://",
      category: "",
      images: [],
      show_in_homepage: false,
      imageperview: [],
      errshow: false,
    };
  },
  computed: {
    projects() {
      return this.$store.state.projects;
    },
  },
};
</script>

