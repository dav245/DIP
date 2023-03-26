import { withApiCall } from "./api";
import { routes } from "./routes";

export interface GetNewMessagesResponse {
  numberOfNewMessages: number;
}

export const checkNewMessages = (from: number | null = null) =>
  withApiCall(async (apiCall) => {
    const route = routes["message.new"];

    const response = await apiCall<GetNewMessagesResponse>(
      route.url(from),
      route.method
    );

    return response;
  });
