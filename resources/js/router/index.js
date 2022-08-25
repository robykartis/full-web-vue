import { createWebHistory, createRouter } from "vue-router";

import home from "../pages/home.vue";
import login from "../pages/login.vue";
import register from "../pages/register.vue";
import dashboard from "../pages/dashboard.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: home,
    },
    {
        path: "/login",
        name: "Login",
        component: login,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: "/register",
        name: "Register",
        component: register,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: dashboard,
        meta: {
            requiresAuth: true,
        },
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from) => {
    // Jika belum login maka akses register dan login nyala dan dashboard mati
    if (to.meta.requiresAuth && !localStorage.getItem("token")) {
        return { name: "Login" };
    }
    // Jika sudah login form login dan register akan mati
    if (to.meta.requiresAuth == false && localStorage.getItem("token")) {
        return { name: "Dashboard" };
    }
});
export default router;
