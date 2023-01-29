import { withApiCall } from "./api";
import { Message } from "./message";
import { routes } from "./routes";

export interface GetDeletedMessagesResponse {
  messages: Message[];
}

export const getDeletedMessages = () =>
  withApiCall(async (apiCall) => {
    const route = routes["message.deleted"];

    const response = await apiCall<GetDeletedMessagesResponse>(
      route.url(),
      route.method
    );

    return response;
  });
