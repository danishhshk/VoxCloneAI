// import api from "./api";

// export const getVoices = async () => {
//   const res = await api.get("/person");
//   return res.data;
// };

import api from "./api";

// GET all voice profiles of logged-in user
export const getVoices = async () => {
  const res = await api.get("/person");
  return res.data;
};

// UPLOAD a new voice profile
export const uploadVoice = async (name: string, file: File) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("voice", file);

  const res = await api.post("/person/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return res.data;
};
