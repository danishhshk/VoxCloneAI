import api from "./api";

export const generateVoice = async (text: string, personId: string) => {
  const res = await api.post("/clone", { text, personId });
  return res.data.audioUrl;
};
