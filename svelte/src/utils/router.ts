import Login from "@/pages/Login.svelte";
import CGuestLayout from "@/components/CGuestLayout.svelte";
import Register from "@p/Register.svelte";
import type { RouteProps } from "svelte-router-spa/types/components/route";
import CAppLayout from "@c/CAppLayout.svelte";
import NotFound from "@p/NotFound.svelte";
import Inbox from "@p/Inbox.svelte";
import Outbox from "@p/Outbox.svelte";
import MessageDetail from "@p/MessageDetail.svelte";
import Trash from "@p/Trash.svelte";
import NewMessage from "@p/NewMessage.svelte";
import { useStore } from "./store";

export const ignoreUnusedRouteInfo = (
  currentRoute: RouteProps["currentRoute"],
  params: RouteProps["params"]
) => {};

const getIsLoggedInValue = () => {
  const { isLoggedIn } = useStore();

  let value: boolean;

  isLoggedIn.subscribe((val) => {
    value = val;
  })();

  return value;
};

const isNotLoggedId = () => {
  return !getIsLoggedInValue();
};

const isLoggedIn = () => {
  return getIsLoggedInValue();
};

export const routes = [
  {
    name: "login",
    component: Login,
    layout: CGuestLayout,
    onlyIf: { guard: isNotLoggedId, redirect: "/new-message" },
  },
  {
    name: "register",
    component: Register,
    layout: CGuestLayout,
    onlyIf: { guard: isNotLoggedId, redirect: "/new-message" },
  },

  {
    name: "/new-message/:from",
    layout: CAppLayout,
    component: NewMessage,
    onlyIf: { guard: isLoggedIn, redirect: "/login" },
  },
  {
    name: "message/:messageId/detail",
    layout: CAppLayout,
    component: MessageDetail,
    onlyIf: { guard: isLoggedIn, redirect: "/login" },
  },
  {
    name: "inbox",
    layout: CAppLayout,
    component: Inbox,
    onlyIf: { guard: isLoggedIn, redirect: "/login" },
  },
  {
    name: "outbox",
    layout: CAppLayout,
    component: Outbox,
    onlyIf: { guard: isLoggedIn, redirect: "/login" },
  },
  {
    name: "trash",
    layout: CAppLayout,
    component: Trash,
    onlyIf: { guard: isLoggedIn, redirect: "/login" },
  },
  {
    name: "404",
    layout: CAppLayout,
    component: NotFound,
    onlyIf: { guard: isLoggedIn, redirect: "/login" },
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
});
*/
