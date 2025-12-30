import axios from "axios";
import FormData from "form-data";
import fs from "fs";

export default async (text, voicePath) => {
  const form = new FormData();
  form.append("text", text);
  form.append("voice", fs.createReadStream(voicePath));

  const res = await axios.post(`${process.env.AI_URL}/clone`, form, {
    responseType: "arraybuffer",
    headers: form.getHeaders()
  });

  return res.data;
};
