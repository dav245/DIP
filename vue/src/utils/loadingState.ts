import { ref } from "vue";

type Await<T> = T extends Promise<infer U> ? U : T;

export const withLoading = <C extends (...args: any[]) => Promise<any>>(
  callback: C,
  after?: () => void
) => {
  const loading = ref(false);

  const run = async (...args: Parameters<C>): Promise<Await<C>> => {
    loading.value = true;

    const response = await callback(...args);

    loading.value = false;

    if (response) {
      after?.();
    }

    return response;
  };

  return { loading, run };
};
