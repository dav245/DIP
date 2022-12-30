import { withApiCall } from "./api";
import { routes } from "./routes";
import { storeToken } from "./tokenStore";

export interface LoginPayload {
  nickname: string;
  password: string;
  device_name: "vue" | "solid" | "svelte" | "lit";
}

export interface LoginResponse {
  token: string;
}

export const login = (data: LoginPayload) =>
  withApiCall(async (apiCall) => {
    const route = routes["auth.login"];

    const response = await apiCall<LoginResponse>(
      route.url(),
      route.method,
      data
    );

    storeToken(response.token);

    return response;
  });
