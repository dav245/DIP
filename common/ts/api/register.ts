import { withApiCall } from "./api";
import { routes } from "./routes";
import { storeToken } from "./tokenStore";
import { storeUserId, storeUserName } from "./userIdStore";

export interface RegisterPayload {
  nickname: string;
  password: string;
  device_name: "vue" | "solid" | "svelte" | "lit";
}

export interface RegisterResponse {
  token: string;
  userId: number;
  userName: string;
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
    storeUserId(response.userId);
    storeUserName(response.userName);

    return response;
  });
