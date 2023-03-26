const userIdKey = "api-user-id";
let userId: number | null = null;
const userIdObservers: ((userId: number | null) => void)[] = [];

export const getUserId = () => userId;

export const loadUserId = () => {
  const item = localStorage.getItem(userIdKey);

  userId = item ? Number(item) : null;
};

export const storeUserId = (newUserId: number | null) => {
  userId = newUserId;

  if (userId === null) {
    localStorage.removeItem(userIdKey);
  } else {
    localStorage.setItem(userIdKey, String(userId));
  }

  userIdObservers.forEach((observer) => observer(userId));
};

export const registerUserIdObserver = (
  observer: (userId: number | null) => void
) => {
  userIdObservers.push(observer);
};

const userNameKey = "api-user-name";
let userName: string | null = null;
const userNameObservers: ((userName: string | null) => void)[] = [];

export const getUserName = () => userName;

export const loadUserName = () => {
  userName = localStorage.getItem(userNameKey);
};

export const storeUserName = (newUserName: string | null) => {
  userName = newUserName;

  if (userName === null) {
    localStorage.removeItem(userNameKey);
  } else {
    localStorage.setItem(userNameKey, String(userName));
  }

  userNameObservers.forEach((observer) => observer(userName));
};

export const registerUserNameObserver = (
  observer: (userName: string | null) => void
) => {
  userNameObservers.push(observer);
};
