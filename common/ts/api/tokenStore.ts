const tokenKey = "api-token";

let token: string | null = null;

export const getToken = () => token;

export const loadToken = () => {
  token = localStorage.getItem(tokenKey);
};

export const storeToken = (newToken: string) => {
  token = newToken;
  localStorage.setItem(tokenKey, token);
};
