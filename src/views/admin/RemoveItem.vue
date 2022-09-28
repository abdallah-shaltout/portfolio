<template>
  <article>
    <section class="mb-12">
      <div class="container">
        <section-head :text="'Remove Item'" />
        <div class="flex-center">
          <form class="flex-center gap-3" @submit.prevent="removeitem">
            <input
              class="
                block
                w-52
                py-2
                px-5
                border-none
                outline-none
                rounded
                text-lg
                focus:outline-2 focus:outline-dark
                hover:outline-2 hover:outline-dark
              "
              type="text"
              v-model="item_id"
              placeholder="Item Id"
            />
            <button class="btn-primary py-2" type="submit">Remove</button>
          </form>
        </div>
      </div>
    </section>
    <section>
      <div class="container grid-page">
        <the-card
          v-for="item in proj"
          :key="item.id"
          :proj="item"
          :title="item.id"
          @click.prevent="getid(item)"
        />
      </div>
    </section>
  </article>
</template>

<script>
export default {
  data() {
    return {
      item_id: "",
    };
  },

  methods: {
    async removeitem() {
      if (this.item_id != "") {
        this.$store.dispatch("REMOVE_DATA", this.item_id);
      }
    },

    getid(item) {
      this.item_id = item.id;
    },
  },
  computed: {
    proj() {
      return this.$store.state.projects;
    },
  },
};
</script>
