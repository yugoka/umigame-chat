import { CHATGPT_MODEL_NAME } from "@/constants/openai";
import { ChatGPTMessage } from "@/types/openai";

const url = "https://api.openai.com/v1/chat/completions";

export const fetchChatResponse = async (
  messages: ChatGPTMessage[]
): Promise<string> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: CHATGPT_MODEL_NAME,
        messages,
      }),
      cache: "no-store",
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (e) {
    throw new Error(`${e}`);
  }
};
