export const getUser = () => {
  return localStorage.getItem("user_name");
};
export const setUser = (name) => {
  return localStorage.setItem("user_name", name);
};
export const removeUser = () => {
  return localStorage.removeItem("user_name");
};
