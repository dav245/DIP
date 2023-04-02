import { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("@p/Login")),
  },
  {
    path: "/register",
    component: lazy(() => import("@p/Register")),
  },
  {
    path: "/inbox",
    component: lazy(() => import("@p/Inbox")),
  },
  {
    path: "/new-message/:from?",
    component: lazy(() => import("@p/NewMessage")),
  },
  {
    path: "/message/:messageId/detail",
    component: lazy(() => import("@p/MessageDetail")),
  },
  {
    path: "/outbox",
    component: lazy(() => import("@p/Outbox")),
  },
  {
    path: "/trash",
    component: lazy(() => import("@p/Trash")),
  },
  {
    path: "/*all",
    component: lazy(() => import("@p/NotFound")),
  },
];

/*
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
});*/
