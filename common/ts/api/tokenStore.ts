const tokenKey = "api-token";

let token: string | null = null;

export const getToken = () => token;

export const loadToken = () => {
  token = localStorage.getItem(tokenKey);
};

export const storeToken = (newToken: string | null) => {
  token = newToken;

  if (token === null) {
    localStorage.removeItem(tokenKey);
  } else {
    localStorage.setItem(tokenKey, token);
  }
};
