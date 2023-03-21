import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, addDoc, doc, deleteDoc, updateDoc, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, updatePassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_API_KEY,
    authDomain: import.meta.env.VITE_APP_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_PROJECT_ID,
    storageBucket: import.meta.env.VITE_APP_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_APP_ID,
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
