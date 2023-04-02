import { createSignal } from "solid-js";

type Await<T> = T extends Promise<infer U> ? U : T;

export const withLoading = <C extends (...args: any[]) => Promise<any>>(
  callback: C,
  after?: () => void
) => {
  const [loading, setLoading] = createSignal(false);

  const run = async (...args: Parameters<C>): Promise<Await<C>> => {
    setLoading(true);

    const response = await callback(...args);

    setLoading(false);

    if (response) {
      after?.();
    }

    return response;
  };

  return { loading, run };
};
