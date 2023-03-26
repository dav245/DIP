import CGuestLayout from "@c/CGuestLayout.vue";
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
      layout: () => CGuestLayout,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@p/Register.vue"),
    meta: {
      guest: true,
      layout: () => CGuestLayout,
    },
  },
  {
    path: "/new-message/:from?",
    name: "newMessage",
    component: () => import("@p/NewMessage.vue"),
    props: true,
  },
  {
    path: "/message/:messageId/detail",
    name: "messageDetail",
    component: () => import("@p/MessageDetail.vue"),
    props: true,
  },
  {
    path: "/inbox",
    name: "inbox",
    component: () => import("@p/Inbox.vue"),
  },
  {
    path: "/outbox",
    name: "outbox",
    component: () => import("@p/Outbox.vue"),
  },
  {
    path: "/trash",
    name: "trash",
    component: () => import("@p/Trash.vue"),
  },
  ...getDesignerRoutes(),
  {
    path: "/:pathMatch(.*)*",
    component: () => import("@p/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { isLoggedIn } = useStore();

  if (to.meta.any) {
    next();
  } else if (isLoggedIn.value && to.meta.guest) {
    next({ name: "newMessage" });
  } else if (!isLoggedIn.value && !to.meta.guest) {
    next({ name: "login" });
  } else {
    next();
  }
});

export const registerRouter = (app: App) => {
  app.use(router);
};
