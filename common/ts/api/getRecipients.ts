import { withApiCall } from "./api";
import { routes } from "./routes";
import { SelectItem } from "./select";

export interface GetRecipientsResponse {
  items: SelectItem[];
}

export const getRecipients = () =>
  withApiCall(async (apiCall) => {
    const route = routes["user.recipients"];

    const response = await apiCall<GetRecipientsResponse>(
      route.url(),
      route.method
    );

    return response;
  });
