import { writable } from "svelte/store";

type Await<T> = T extends Promise<infer U> ? U : T;

export const withLoading = <C extends (...args: any[]) => Promise<any>>(
  callback: C,
  after?: () => void
) => {
  const loading = writable(false);

  const run = async (...args: Parameters<C>): Promise<Await<C>> => {
    loading.set(true);

    const response = await callback(...args);

    loading.set(false);

    if (response) {
      after?.();
    }

    return response;
  };

  return { loading, run };
};
