<template>
  <transition>
    <my-alert
      v-if="this.$store.state.message"
      :message="this.$store.state.message"
  /></transition>
  <section>
    <div class="container flex-center">
      <form
        @submit.prevent="signin"
        class="my-12 bg-white rounded-2xl p-5 flex-center flex-col gap-5"
      >
        <h3 class="text-4xl">Login</h3>
        <transition>
          <p class="bg-rose-500 text-white p-3 rounded-md" v-if="errshow">
            Usernme or Password is Empty
          </p>
        </transition>
        <input
          class="
            text-xl
            py-3
            px-5
            rounded-md
            border border-gray-400
            hover:outline-2 hover:outline-dark hover:outline
          "
          type="text"
          placeholder="Username"
          v-model="username"
        />
        <input
          class="
            text-xl
            py-3
            px-5
            rounded-md
            border border-gray-400
            hover:outline-2 hover:outline-dark hover:outline
          "
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <button type="submit" class="btn-primary py-2">Login</button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: "LogIn",
  data() {
    return {
      errshow: false,
      username: null,
      password: null,
    };
  },
  methods: {
    signin() {
      let obj = {
        username: this.username,
        password: this.password,
      };

      if (obj.username && obj.password) {
        this.$store.dispatch("LOGIN", obj);
        this.errshow = false;
        this.username = null;
        this.password = null;
      } else {
        this.errshow = true;
      }
    },
  },
};
</script>
