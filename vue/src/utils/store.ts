import { getToken } from "@common/ts/api/tokenStore";
import { ref } from "vue";

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

  return { isLoggedIn };
});
