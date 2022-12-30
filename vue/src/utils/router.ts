import GuestLayout from "@/components/GuestLayout.vue";
import { getDesignerRoutes } from "@/designer/routes";
import { useStore } from "@/utils/store";
import { App } from "vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "login",
    component: () => import("@p/Login.vue"),
    meta: {
      guest: true,
      layout: () => GuestLayout,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@p/Register.vue"),
    meta: {
      guest: true,
      layout: () => GuestLayout,
    },
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@p/Home.vue"),
  },
  ...getDesignerRoutes(),
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useStore();

  if (isLoggedIn.value && to.meta.guest) {
    next({ name: "home" });
  } else if (!isLoggedIn.value && !to.meta.guest) {
    next({ name: "login" });
  } else {
    next();
  }
});

export const registerRouter = (app: App) => {
  app.use(router);
};
