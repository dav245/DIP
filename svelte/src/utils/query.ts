import { writable } from "svelte/store";

export interface QueryOptions<Result> {
  query: () => Promise<Result>;
}

export const useQuery = <Result, Variables = {}>(
  options: QueryOptions<Result>
) => {
  const loading = writable(false);
  const data = writable<Result | undefined>(undefined);

  const refetch = async () => {
    loading.set(true);
    try {
      data.set(await options.query());
    } finally {
      loading.set(false);
    }
  };

  refetch();

  return { loading, data, refetch };
};
