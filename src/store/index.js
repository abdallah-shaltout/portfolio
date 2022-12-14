import { defineStore } from "pinia";
import { ref, computed } from "vue";
import router from "@/router";
import {
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
    firebase_ref,
    uploadBytes,
    getDownloadURL,
    projects_cols,
    skills_cols,
    messages_cols,
    profile_cols,
    storage,
    db,
    auth,
    signInWithEmailAndPassword,
    signOut,
    updatePassword,
} from "@/firebase";

export const useStore = defineStore("main", () => {
    const projects = ref([]);
    const skills = ref([]);
    const messages = ref([]);
    const loading = ref(false);
    const getProjects = async () => {
        const projectSnapshot = await getDocs(projects_cols);
        projectSnapshot.docs.forEach((doc) => projects.value.push({ id: doc.id, ...doc.data() }));
    };
    const getSkills = async () => {
        const skillSnapshot = await getDocs(skills_cols);
        skillSnapshot.docs.forEach((doc) => skills.value.push({ id: doc.id, ...doc.data() }));
    };
    const getMessages = async () => {
        const messageSnapshot = await getDocs(messages_cols);
        messageSnapshot.docs.forEach((doc) => messages.value.push({ id: doc.id, ...doc.data() }));
    };

    const caseStudyProject = computed(() => {
        return (slug) => {
            return projects.value.find((project) => project.slug === slug);
        };
    });
    const caseStudySkill = computed(() => {
        return (skill) => {
            return skills.value.find((theskill) => theskill.name === skill);
        };
    });

    // Auth Function Start
    const Login = async (payload) => {
        const { email, password } = payload;
        loading.value = true;
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => router.push({ name: "admin" }))
            .catch(() => {
                loading.value = false;
            });
    };
    const LogOut = async () => {
        await signOut(auth);
        router.push({ name: "home" });
    };
    const chnagePassword = async (newpassword) => {
        const thedoc = doc(profile_cols, auth.currentUser.uid);
        loading.value = true;
        await updatePassword(auth.currentUser, newpassword);
        await updateDoc(thedoc, {
            password: newpassword,
        });
        loading.value = false;
    };
    const changeAvatar = async (newAvatar) => {
        let new_url = "";
        const storageRef = firebase_ref(storage, `/profile-image/${newAvatar.name}`);
        const thedoc = doc(profile_cols, auth.currentUser.uid);
        loading.value = true;
        await uploadBytes(storageRef, newAvatar);
        await getDownloadURL(storageRef).then((url) => (new_url = url));
        await updateDoc(thedoc, {
            image: new_url,
        });
        loading.value = false;
    };
    // Auth Function End
    // projects Function Start
    const addProject = async (payload) => {
        const obj = payload;
        const storageRef = firebase_ref(storage, `/project-image/${obj.image.name}`);
        loading.value = true;
        await uploadBytes(storageRef, obj.image);
        await getDownloadURL(storageRef).then((url) => (obj.image = url));
        await addDoc(projects_cols, obj);
        console.log("added Success");
        router.push({ name: "AdminProjects" });
        loading.value = false;
    };
    const editProject = async (payload) => {
        let obj = payload;
        const thedoc = doc(projects_cols, obj.id);
        loading.value = true;

        if (obj.changedImage) {
            const storageRef = firebase_ref(storage, `/project-image/${obj.image.name}`);
            await uploadBytes(storageRef, obj.image);
            await getDownloadURL(storageRef).then((url) => (obj.image = url));
            delete obj.id;
            delete obj.changedImage;
            await updateDoc(thedoc, obj);
            alert("added Success With OldImage != Newimage");
        } else {
            delete obj.id;
            delete obj.changedImage;
            await updateDoc(thedoc, obj);
            alert("added Success With OldImage = Newimage");
        }
        loading.value = false;
        router.push({ name: "AdminProjects" });
    };
    const removeProject = async (id) => {
        let thedoc = doc(projects_cols, id);
        if (confirm(`Are u Sure You Want Delete This Project " ${projects.value.find((proj) => proj.id === id).title} "`)) {
            await deleteDoc(thedoc);
        }
    };
    // projects Function End
    // skills Function Start
    const addSkill = async (payload) => {
        const obj = payload;
        const storageRef = firebase_ref(storage, `/icons/${obj.image.name}`);
        loading.value = true;
        await uploadBytes(storageRef, obj.image);
        await getDownloadURL(storageRef).then((url) => (obj.image = url));
        await addDoc(skills_cols, obj);
        loading.value = false;
    };
    const editSkill = async (payload) => {
        let obj = payload;
        const thedoc = doc(skills_cols, obj.id);
        loading.value = true;
        if (obj.changedImage) {
            const storageRef = firebase_ref(storage, `/project-image/${obj.image.name}`);
            await uploadBytes(storageRef, obj.image);
            await getDownloadURL(storageRef).then((url) => (obj.image = url));
            delete obj.id;
            delete obj.changedImage;
            await updateDoc(thedoc, obj);
        } else {
            delete obj.id;
            delete obj.changedImage;
            await updateDoc(thedoc, obj);
        }
        loading.value = false;
        router.push({ name: "AdminSkills" });
    };
    const removeSkill = async (id) => {
        let thedoc = doc(skills_cols, id);
        if (confirm(`Are u Sure You Want Delete This Skill " ${skills.value.find((skill) => skill.id === id).text} "`)) {
            loading.value = true;
            await deleteDoc(thedoc);
        }
        loading.value = false;
    };
    // skills Function End
    // Messages Function Start
    const sendMessage = async (payload) => {
        loading.value = true;
        await addDoc(messages_cols, payload);
        loading.value = false;
    };
    const removeMessage = async (id) => {
        let thedoc = doc(messages_cols, id);
        if (confirm(`Are u Sure You Want Delete This Message " ${messages.value.find((mes) => mes.id === id).name} "`)) {
            loading.value = true;
            await deleteDoc(thedoc);
        }
        loading.value = false;
    };

    return {
        projects,
        skills,
        getProjects,
        getSkills,
        messages,
        getMessages,
        caseStudyProject,
        caseStudySkill,
        Login,
        LogOut,
        chnagePassword,
        changeAvatar,
        addProject,
        editProject,
        removeProject,
        addSkill,
        editSkill,
        removeSkill,
        sendMessage,
        removeMessage,
        loading,
    };
});
