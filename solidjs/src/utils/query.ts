import { createSignal } from "solid-js";

export interface QueryOptions<Result> {
  query: () => Promise<Result>;
}

export const useQuery = <Result, Variables = {}>(
  options: QueryOptions<Result>
) => {
  const [loading, setLoading] = createSignal(false);
  const [data, setData] = createSignal<Result | undefined>(undefined, {
    equals: false,
  });

  const refetch = async () => {
    setLoading(true);
    try {
      const result: Result = await options.query();
      setData(() => result);
    } finally {
      setLoading(false);
    }
  };

  refetch();

  return { loading, data, refetch };
};
