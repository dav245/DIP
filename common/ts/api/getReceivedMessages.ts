import { withApiCall } from "./api";
import { Message } from "./message";
import { routes } from "./routes";

export interface GetReceivedMessagesResponse {
  messages: Message[];
}

export const getReceivedMessages = () =>
  withApiCall(async (apiCall) => {
    const route = routes["message.received"];

    const response = await apiCall<GetReceivedMessagesResponse>(
      route.url(),
      route.method
    );

    return response;
  });
