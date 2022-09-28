// firebase start
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  updatePassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBWD4JxZn1WGhvBY2ThQu01xUnqfnyhuOk",
  authDomain: "portfolio-cdaa1.firebaseapp.com",
  projectId: "portfolio-cdaa1",
  storageBucket: "portfolio-cdaa1.appspot.com",
  messagingSenderId: "240144317045",
  appId: "1:240144317045:web:f63ef8433ebf574b6b963c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const portfolioCol = collection(db, "portfolio");
const settingsCol = collection(db, "settings");
const storage = getStorage(app);
const thequery = query(portfolioCol, where("show_in_homepage", "==", true));

export {
  getDocs,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  ref,
  uploadBytes,
  getDownloadURL,
  portfolioCol,
  settingsCol,
  storage,
  db,
  auth,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  onAuthStateChanged,
  thequery,
};
