import { ref, UnwrapRef } from "vue";

export interface QueryOptions<Result> {
  query: () => Promise<Result>;
}

export const useQuery = <Result, Variables = {}>(
  options: QueryOptions<Result>
) => {
  const loading = ref(false);
  const data = ref<Result | undefined>(undefined);

  const refetch = async () => {
    loading.value = true;
    try {
      data.value = (await options.query()) as UnwrapRef<Result>;
    } finally {
      loading.value = false;
    }
  };

  refetch();

  return { loading, data, refetch };
};
