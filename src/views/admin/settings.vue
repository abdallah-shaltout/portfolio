<template>
  <article>
    <section class="mb-12">
      <div class="container">
        <section-head :text="'Settings'" />
      </div>
    </section>
    <section>
      <div
        class="
          container
          grid grid-cols-3
          xl:grid-cols-2
          md:grid-cols-1
          gap-4
          font-roboto
        "
      >
        <div class="card">
          <p class="card-title">Update Password</p>
          <form @submit.prevent="ChangePassword" class="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Email"
              class="card-input"
              v-model="updatePassword.email"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              class="card-input"
              v-model="updatePassword.newpassword"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              class="card-input"
              v-model="updatePassword.confirmpassword"
              required
            />
            <button class="card-btn mx-auto" type="submit">Change</button>
          </form>
        </div>
        <div class="card col-span-3 xl-c">
          <p class="card-title">Website Text</p>
          <form @submit.prevent="UpdateText">
            <ul class="flex flex-col gap-4">
              <li
                class="flex flex-col gap-2"
                v-for="(value, key, idx) in all_text"
                :key="idx"
              >
                <span
                  class="text-sm text-dark-50 font-bold capitalize"
                  v-if="key != 'id'"
                  >{{ key.replace("_", " ") }}</span
                >
                <input
                  type="text"
                  class="card-input"
                  placeholder="name of feild"
                  v-model="all_text[key]"
                  v-if="key != 'id'"
                  required
                />
              </li>
              <button type="submit" class="card-btn w-full">Change</button>
            </ul>
          </form>
        </div>
      </div>
    </section>
  </article>
</template>

<script>
import { auth, getDocs, settingsCol } from "@/firebase";

export default {
  name: "ProfileView",
  data() {
    return {
      updatePassword: {
        email: null,
        newpassword: null,
        confirmpassword: null,
      },
      all_text: {},
    };
  },

  methods: {
    ChangePassword() {
      if (
        this.updatePassword.newpassword ===
          this.updatePassword.confirmpassword &&
        this.updatePassword.email === auth.currentUser.email
      ) {
        this.$store.dispatch(
          "CHANGE_PASSWORD",
          this.updatePassword.confirmpassword
        );
      } else {
        console.log("bad");
      }
    },
    UpdateText() {
      if (confirm("Are You Sure You Want To Update Data!")) {
        this.$store.dispatch("UPDATE_TEXT", this.all_text);
      }
    },
  },
  async created() {
    const getdata = await getDocs(settingsCol);
    getdata.docs.forEach((doc) => {
      this.all_text = { id: doc.id, ...doc.data() };
    });
  },
};
</script>

