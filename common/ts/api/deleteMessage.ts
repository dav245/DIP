import { withApiCall } from "./api";
import { routes } from "./routes";

export interface DeleteMessagesResponse {
  deleted: Boolean;
}

export const deleteMessage = (messageId: string | number) =>
  withApiCall(async (apiCall) => {
    const route = routes["message.delete"];

    const response = await apiCall<DeleteMessagesResponse>(
      route.url(messageId),
      route.method
    );

    return response;
  });
