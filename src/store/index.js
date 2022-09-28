import { createStore } from "vuex";
import {
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  portfolioCol,
  storage,
  db,
  auth,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
} from "@/firebase";

import router from "@/router";

function clearAlert(state, time = 10000) {
  if (state.message) {
    setTimeout(() => {
      state.message = null;
    }, time);
  }
}

export default createStore({
  state: {
    projects: [],
    loading: false,
    message: "",
  },
  mutations: {
    async LOGIN(state, info) {
      const { username, password } = info;
      await signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
          typeof userCredential;
          state.message = "success";
          clearAlert(state, 500);
          router.push({ name: "AddItem" });
        })
        .catch((error) => {
          switch (error.message) {
            case "Firebase: Error (auth/user-disabled).":
              state.message = "Email Disbled";
              break;
            case "Firebase: Error (auth/invalid-email).":
              state.message = "Email Invalid";
              break;
            case "Firebase: Error (auth/wrong-password).":
              state.message = "Wrong Password";
              break;
            default:
              state.message = "Wrong";
              break;
          }
        });
      clearAlert(state);
    },
    async CHANGE_PASSWORD(state, newpassword) {
      await updatePassword(auth.currentUser, newpassword);
      state.message = "success";
      clearAlert(state, 10000);
    },
    async CLEAR_USER(state) {
      state.message = null;
      router.push({ name: "home" });
      await signOut(auth);
    },
    async GET_DATA(state) {
      state.projects = [];
      const citySnapshot = await getDocs(portfolioCol);
      citySnapshot.docs.forEach((doc) => {
        state.projects.push({ id: doc.id, ...doc.data() });
      });
    },
    async ADD_DATA(state, payload) {
      state.loading = true;
      let obj = payload.obj;
      let images = payload.images;

      for (let i = 0; i < images.length; i++) {
        const storageRef = ref(storage, images[i].name);
        await uploadBytes(storageRef, images[i]);
        await getDownloadURL(storageRef).then((url) => obj.images.push(url));
      }

      await addDoc(portfolioCol, obj);
      state.loading = false;
      state.message = "success";
      clearAlert(state);
    },
    async EDIT_DATA(state, payload) {
      state.loading = true;

      let obj = payload.obj;
      let images = payload.images;
      let id = payload.id;

      let f = obj.images.filter((image) => {
        let reg = /^https:\/\//g;
        return reg.test(image);
      });
      obj.images = f;

      for (let i = 0; i < images.length; i++) {
        if (images[i]) {
          const storageRef = ref(storage, images[i].name);
          await uploadBytes(storageRef, images[i]);
          await getDownloadURL(storageRef).then((url) => obj.images.push(url));
        }
      }

      const docRef = doc(db, "portfolio", id);
      await updateDoc(docRef, obj);
      state.loading = false;
      state.message = "success";
    },
    async REMOVE_DATA(state, payload) {
      state.loading = true;
      const docRef = doc(db, "portfolio", payload);
      await deleteDoc(docRef);
      state.loading = false;

      state.message = "success";
      clearAlert(state);
    },
    async UPDATE_TEXT(state, payload) {
      let id = payload.id;
      delete payload.id;
      let obj = payload;

      state.loading = true;
      const docRef = doc(db, "settings", id);
      await updateDoc(docRef, obj);
      state.loading = false;
      state.message = "success";
      clearAlert(state, 2000);
    },
  },
  getters: {
    SORTED_PROJECTS(state) {
      let arr = state.projects;
      // arr.sort((a, b) => a.puplish_at.localeCompare(b.puplish_at));
      return arr;
    },
  },
  actions: {
    LOGIN({ commit }, info) {
      commit("LOGIN", info);
    },
    LOGOUT({ commit }) {
      commit("CLEAR_USER");
    },
    CHANGE_PASSWORD({ commit }, newpassword) {
      commit("CHANGE_PASSWORD", newpassword);
    },
    GET_DATA({ commit }) {
      commit("GET_DATA");
    },
    ADD_DATA({ commit }, payload) {
      commit("ADD_DATA", payload);
    },
    EDIT_DATA({ commit }, payload) {
      commit("EDIT_DATA", payload);
    },
    REMOVE_DATA({ commit }, payload) {
      commit("REMOVE_DATA", payload);
    },
    UPDATE_TEXT({ commit }, payload) {
      commit("UPDATE_TEXT", payload);
    },
  },
});
