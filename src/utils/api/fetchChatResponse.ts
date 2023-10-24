import { CHATGPT_MODEL_NAME } from "@/constants/openai";
import { ChatGPTMessage } from "@/types/openai";
import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  },
};
const url = "https://api.openai.com/v1/chat/completions";

export const fetchChatResponse = async (
  messages: ChatGPTMessage[]
): Promise<string> => {
  try {
    const data = {
      model: CHATGPT_MODEL_NAME,
      messages,
    };

    const response = await axios.post(url, data, config);
    return response.data.choices[0].message.content;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
