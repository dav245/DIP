import { getToken } from "./tokenStore";

export type ApiCaller = <T>(call: () => T) => Promise<T>;

let currentApiCaller: ApiCaller;

export const setApiCaller = (caller: ApiCaller) => {
  currentApiCaller = caller;
};

export const apiCall = async <T>(
  url: string,
  method: string,
  data?: unknown
): Promise<T> => {
  if (!currentApiCaller) throw Error("You forgot to set api caller!");

  const call = async () => {
    const response = await fetch(import.meta.env.VITE_BACKEND_URL + url, {
      method: method,
      headers: {
        "Content-Type": "Application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    const responseData = await response.json();

    if (!response.ok) throw new ApiError(responseData);

    return responseData;
  };

  return await currentApiCaller(call);
};

export const withApiCall = async <T>(
  callback: (call: typeof apiCall) => Promise<T>
) => {
  try {
    return await callback(apiCall);
  } catch (error) {
    console.error(error);
  }
};

export class ApiError extends Error {
  public data: Record<string, unknown> & {
    message: string;
  };

  constructor(data: any) {
    super(`Api call error: ${data.message}`);

    this.data = data;
  }
}

export interface Paginator<T> {
  current_page: number;
  per_page: number;
  total: number;
  data: T[];
}
