import LoginView from "@/views/admin/LoginView.vue";
import AdminView from "@/views/admin/AdminView.vue";
import AddProject from "@/views/admin/AddProject.vue";
import AdminProjects from "@/views/admin/AdminProjects.vue";
import AdminProfile from "@/views/admin/ProfileView.vue";
import AddSkill from "@/views/admin/AddSkill.vue";
import AdminSkills from "@/views/admin/AdminSkills.vue";
import AdminEditProjects from "@/views/admin/EditProject.vue";
import AdminEditSkills from "@/views/admin/AdminEditSkills.vue";
import MessagesView from "@/views/admin/MessagesView.vue";
export default [
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/admin",
        name: "admin",
        redirect: { name: "profile" },
        component: AdminView,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "profile",
                name: "profile",
                component: AdminProfile,
                meta: {
                    title: `${import.meta.env.VITE_APP_TITLE} | Profile`,
                },
            },
            {
                path: "add-project",
                name: "AddProject",
                component: AddProject,
                meta: {
                    title: `${import.meta.env.VITE_APP_TITLE} | Add Project`,
                },
            },
            {
                path: "add-skill",
                name: "AddSkill",
                component: AddSkill,
                meta: {
                    title: `${import.meta.env.VITE_APP_TITLE} | Add Skill`,
                },
            },
            {
                path: "projects",
                name: "AdminProjects",
                component: AdminProjects,
                meta: {
                    title: `${import.meta.env.VITE_APP_TITLE} | Projects`,
                },
            },
            {
                path: "skills",
                name: "AdminSkills",
                component: AdminSkills,
                meta: {
                    title: `${import.meta.env.VITE_APP_TITLE} | Skills`,
                },
            },
            {
                path: "edit/:id",
                name: "editproject",
                component: AdminEditProjects,
                meta: {
                    title: `${import.meta.env.VITE_APP_TITLE} | Edit Project`,
                },
            },
            {
                path: "editskill/:id",
                name: "editSkill",
                component: AdminEditSkills,
                meta: {
                    title: `${import.meta.env.VITE_APP_TITLE} | Edit Skill`,
                },
            },
            {
                path: "messages",
                name: "messages",
                component: MessagesView,
                meta: {
                    title: `${import.meta.env.VITE_APP_TITLE} | Messages`,
                },
            },
        ],
    },
];
