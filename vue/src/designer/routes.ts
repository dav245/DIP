import GuestLayout from "@/components/GuestLayout.vue";
import { RouteRecordRaw } from "vue-router";

export const getDesignerRoutes = (): RouteRecordRaw[] => [
  {
    path: "/designer",
    name: "designer",
    component: () => import("./Main.vue"),
    meta: {
      any: true,
      layout: () => GuestLayout,
    },
  },

  {
    path: "/designer/card",
    name: "designerCard",
    component: () => import("./Card.vue"),
    meta: {
      any: true,
      layout: () => GuestLayout,
    },
  },

  {
    path: "/designer/input",
    name: "designerInput",
    component: () => import("./Input.vue"),
    meta: {
      any: true,
      layout: () => GuestLayout,
    },
  },

  {
    path: "/designer/button",
    name: "designerButton",
    component: () => import("./Button.vue"),
    meta: {
      any: true,
      layout: () => GuestLayout,
    },
  },

  {
    path: "/designer/messages",
    name: "designerMessages",
    component: () => import("./Messages.vue"),
    meta: {
      any: true,
      layout: () => GuestLayout,
    },
  },

  {
    path: "/designer/input-select",
    name: "designerInputSelect",
    component: () => import("./InputSelect.vue"),
    meta: {
      any: true,
      layout: () => GuestLayout,
    },
  },
];
