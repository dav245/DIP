import { withApiCall } from "./api";
import { routes } from "./routes";
import { SelectItem } from "./select";

export interface CreateMessagePayload {
  recipients: number[];
  subject: string;
  content: string;
  send: boolean;
}

export interface CreateMessageResponse {
  items: SelectItem[];
}

export const createMessage = (data: CreateMessagePayload) =>
  withApiCall(async (apiCall) => {
    const route = routes["message.store"];

    const response = await apiCall<CreateMessageResponse>(
      route.url(),
      route.method,
      data
    );

    return response;
  });
