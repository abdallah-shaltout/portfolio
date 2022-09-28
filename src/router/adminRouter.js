import LoginView from "@/views/admin/Login.vue";
import AdminView from "@/views/admin/AdminView.vue";
import AddItem from "@/views/admin/AddItem.vue";
import EditItem from "@/views/admin/EditItem.vue";
import RemoveItem from "@/views/admin/RemoveItem.vue";
import SettingsView from "@/views/admin/settings.vue";

export default [
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: {
      title: process.env.VUE_APP_TITLE,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminView,
    meta: {
      requiresAuth: true,
    },

    children: [
      {
        path: "additem",
        name: "AddItem",
        component: AddItem,
      },
      {
        path: "edititem",
        name: "EditItem",
        component: EditItem,
      },
      {
        path: "removeitem",
        name: "RemoveItem",
        component: RemoveItem,
      },
      {
        path: "settings",
        name: "settings",
        component: SettingsView,
      },
    ],
  },
];
