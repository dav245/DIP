import { getToken, registerTokenObserver } from "@common/ts/api/tokenStore";
import {
  getUserId,
  getUserName,
  registerUserNameObserver,
  registerUserIdObserver,
} from "@common/ts/api/userIdStore";
import { writable } from "svelte/store";

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
  const userId = writable(getUserId());
  const userName = writable(getUserName());
  const isLoggedIn = writable(getToken() !== null);
  const menuNewMessages = writable(0);

  registerUserNameObserver(userName.set);
  registerUserIdObserver(userId.set);
  registerTokenObserver((token) => isLoggedIn.set(token !== null));

  menuNewMessages.subscribe((value) => {
    document.title =
      document.title.match(/^[^(]+/)?.[0] + (value ? ` (${value})` : "");
  });

  return { isLoggedIn, menuNewMessages, userId, userName };
});
