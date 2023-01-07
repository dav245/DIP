import { type Paginator, withApiCall } from "./api";
import { type Message } from "./message";
import { routes } from "./routes";

export type ReceivedMessagesResponse = Paginator<Message>;

export const getReceivedMessages = () =>
  withApiCall(async (apiCall) => {
    const route = routes["message.received"];

    const response = await apiCall<ReceivedMessagesResponse>(
      route.url(),
      route.method
    );

    return response;
  });
