import { getToken, registerTokenObserver } from "@common/ts/api/tokenStore";
import {
  getUserId,
  getUserName,
  registerUserNameObserver,
  registerUserIdObserver,
} from "@common/ts/api/userIdStore";
import { createEffect, createSignal } from "solid-js";

const createStore = <T extends Record<string, unknown>>(store: () => T) => {
  let storeInstance: T | null = null;

  return () => {
    if (storeInstance === null) {
      storeInstance = store();
    }

    return storeInstance;
  };
};

export const useStore = createStore(() => {
  const [userId, setUserId] = createSignal(getUserId());
  const [userName, setUserName] = createSignal(getUserName());
  const [isLoggedIn, setIsLoggedIn] = createSignal(getToken() !== null);
  const [menuNewMessages, setMenuNewMessages] = createSignal(0);

  registerUserNameObserver(setUserName);
  registerUserIdObserver(setUserId);
  registerTokenObserver((token) => setIsLoggedIn(token !== null));

  createEffect(() => {
    const value = menuNewMessages();
    document.title =
      document.title.match(/^[^(]+/)?.[0] + (value ? ` (${value})` : "");
  });

  return {
    isLoggedIn,
    setIsLoggedIn,
    menuNewMessages,
    setMenuNewMessages,
    userId,
    userName,
  };
});
