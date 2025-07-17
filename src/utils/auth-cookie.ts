import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setAuthCookie = (token: string, user: any) => {
  Cookies.set(TOKEN_KEY, token, { expires: 7 }); // 7 days
  Cookies.set(USER_KEY, JSON.stringify(user), { expires: 7 });
};

export const getAuthCookie = () => {
  const token = Cookies.get(TOKEN_KEY);
  const userStr = Cookies.get(USER_KEY);
  const user = userStr ? JSON.parse(userStr) : null;
  return { token, user };
};

export const removeAuthCookie = () => {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(USER_KEY);
};
