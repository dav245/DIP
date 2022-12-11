import { ref } from "vue";

const createStore = <T extends Record<string, unknown>>(store: () => T) => {
  const storeInstance = store();

  return () => storeInstance;
};

export const useStore = createStore(() => {
  const isLoggedIn = ref(false);

  return { isLoggedIn };
});
