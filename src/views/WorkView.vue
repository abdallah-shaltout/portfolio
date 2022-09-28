<template>
  <article>
    <section class="py-5">
      <div class="container">
        <div class="w-full overflow-x-auto whitespace-nowrap p-3 rounded-xl">
          <button
            class="
              inline-block
              py-3
              px-6
              bg-white
              mr-5
              rounded-md
              cursor-pointer
              font-semibold font-roboto
              text-base
              transition-transform
              hover:scale-105
              duration-300
            "
            @click="add_filter('')"
          >
            All
          </button>
          <button
            class="
              inline-block
              py-3
              px-6
              bg-white
              mr-5
              rounded-md
              cursor-pointer
              font-semibold font-roboto
              text-base
              transition-transform
              hover:scale-110
              duration-300
            "
            v-for="(cat, idx) in category_list"
            :key="idx"
            @click="add_filter(cat)"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </section>
    <section class="py-5">
      <div class="container grid-page">
        <the-card
          v-for="item in filterprojects"
          :key="item.id"
          :proj="item"
          :title="item.name"
        />
      </div>
    </section>
  </article>
</template>

<script>
export default {
  name: "AllWork",
  data() {
    return {
      category_btn: "",
    };
  },
  computed: {
    projects() {
      return this.$store.getters.SORTED_PROJECTS;
    },
    filterprojects() {
      let reg = new RegExp(this.category_btn, "ig");
      let result = this.projects.filter((proj) => proj.category.match(reg));

      return result;
    },
    category_list() {
      let list = this.projects.map((ele) => ele.category);
      return [...new Set(list)];
    },
  },
  methods: {
    add_filter(item) {
      return (this.category_btn = item);
    },
  },
};
</script>
