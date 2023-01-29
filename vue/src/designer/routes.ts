import CGuestLayout from "@c/CGuestLayout.vue";
import { RouteRecordRaw } from "vue-router";

export const getDesignerRoutes = (): RouteRecordRaw[] => [
  {
    path: "/designer",
    name: "designer",
    component: () => import("./Main.vue"),
    meta: {
      any: true,
      layout: () => CGuestLayout,
    },
  },

  {
    path: "/designer/card",
    name: "designerCard",
    component: () => import("./Card.vue"),
    meta: {
      any: true,
      layout: () => CGuestLayout,
    },
  },

  {
    path: "/designer/input",
    name: "designerInput",
    component: () => import("./Input.vue"),
    meta: {
      any: true,
      layout: () => CGuestLayout,
    },
  },

  {
    path: "/designer/button",
    name: "designerButton",
    component: () => import("./Button.vue"),
    meta: {
      any: true,
      layout: () => CGuestLayout,
    },
  },

  {
    path: "/designer/messages",
    name: "designerMessages",
    component: () => import("./Messages.vue"),
    meta: {
      any: true,
      layout: () => CGuestLayout,
    },
  },

  {
    path: "/designer/input-select",
    name: "designerInputSelect",
    component: () => import("./InputSelect.vue"),
    meta: {
      any: true,
      layout: () => CGuestLayout,
    },
  },
];
