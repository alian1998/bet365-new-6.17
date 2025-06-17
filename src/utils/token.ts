export const getGameToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("gameToken");
  }
  return null;
};

export const setGameToken = (token: string) => {
  localStorage.setItem("gameToken", token);
};

export const removeGameToken = () => {
  localStorage.removeItem("gameToken");
};
