import { getToken, registerTokenObserver } from "@common/ts/api/tokenStore";
import {
  getUserId,
  getUserName,
  registerUserNameObserver,
  registerUserIdObserver,
} from "@common/ts/api/userIdStore";
import { ref, watch } from "vue";

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
  const userId = ref(getUserId());
  const userName = ref(getUserName());
  const isLoggedIn = ref(getToken() !== null);
  const menuNewMessages = ref(0);

  registerUserNameObserver((name) => (userName.value = name));
  registerUserIdObserver((id) => (userId.value = id));
  registerTokenObserver((token) => (isLoggedIn.value = token !== null));

  watch(menuNewMessages, (value) => {
    document.title =
      document.title.match(/^[^(]+/)?.[0] + (value ? ` (${value})` : "");
  });

  return { isLoggedIn, menuNewMessages, userId, userName };
});
