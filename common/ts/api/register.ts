import { withApiCall } from "./api";
import { routes } from "./routes";
import { storeToken } from "./tokenStore";

export interface RegisterPayload {
  nickname: string;
  password: string;
  device_name: "vue" | "solid" | "svelte" | "lit";
}

export interface RegisterResponse {
  token: string;
}

export const register = (data: RegisterPayload) =>
  withApiCall(async (apiCall) => {
    const route = routes["auth.register"];

    const response = await apiCall<RegisterResponse>(
      route.url(),
      route.method,
      data
    );

    storeToken(response.token);

    return response;
  });
