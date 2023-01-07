import { storeToken } from "./tokenStore";

export const logout = () => {
  storeToken(null);
};
