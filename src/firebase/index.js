import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, addDoc, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, updatePassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDBRKhM5DRstBRcEWjtNry_KfDKa8-1ecE",
    authDomain: "shaltout-portfolio.firebaseapp.com",
    projectId: "shaltout-portfolio",
    storageBucket: "shaltout-portfolio.appspot.com",
    messagingSenderId: "846308256321",
    appId: "1:846308256321:web:bb5bc3f37f7d15eb7134c0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const projects_cols = collection(db, "projects");
const skills_cols = collection(db, "skills");
const messages_cols = collection(db, "messages");
const profile_cols = collection(db, "profile");
const storage = getStorage(app);

export {
    getDocs,
    addDoc,
    getDoc,
    doc,
    deleteDoc,
    updateDoc,
    ref as firebase_ref,
    uploadBytes,
    getDownloadURL,
    auth,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
    onAuthStateChanged,
    query,
    where,
    db,
    storage,
    projects_cols,
    skills_cols,
    messages_cols,
    profile_cols,
};
