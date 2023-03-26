import { getToken } from "@common/ts/api/tokenStore";
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
  const isLoggedIn = ref(getToken() !== null);
  const menuNewMessages = ref(0);

  watch(menuNewMessages, (value) => {
    document.title =
      document.title.match(/^[^(]+/)?.[0] + (value ? ` (${value})` : "");
  });

  return { isLoggedIn, menuNewMessages };
});
