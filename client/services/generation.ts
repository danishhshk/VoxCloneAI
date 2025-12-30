import api from "./api";

export const getRecentGenerations = async () => {
  const res = await api.get("/generation/recent");
  return res.data;
};
