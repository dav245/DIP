import { storeToken } from "./tokenStore";
import { storeUserId, storeUserName } from "./userIdStore";

export const logout = () => {
  storeToken(null);
  storeUserId(null);
  storeUserName(null);
};
