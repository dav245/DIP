import { withApiCall } from "./api";
import { Message } from "./message";
import { routes } from "./routes";

export interface GetMessageResponse {
  message: Message;
}

export const getMessage = (messageId: string) =>
  withApiCall(async (apiCall) => {
    const route = routes["message.message"];

    const response = await apiCall<GetMessageResponse>(
      route.url(messageId),
      route.method
    );

    return response;
  });
