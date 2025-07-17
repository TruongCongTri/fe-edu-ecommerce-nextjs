// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveAuth = (token: string, user: any) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
};

export const getAuth = () => {
  const token = sessionStorage.getItem('token');
  const user = sessionStorage.getItem('user');
  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
};

export const clearAuth = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
};
