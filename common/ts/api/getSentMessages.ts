import { withApiCall } from "./api";
import { Message } from "./message";
import { routes } from "./routes";

export interface GetSentMessagesResponse {
  messages: Message[];
}

export const getSentMessages = () =>
  withApiCall(async (apiCall) => {
    const route = routes["message.sent"];

    const response = await apiCall<GetSentMessagesResponse>(
      route.url(),
      route.method
    );

    return response;
  });
