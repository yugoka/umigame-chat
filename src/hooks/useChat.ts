import { ChatMessage, NewMessage } from "@/types/chat";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import React from "react";

const ERROR_MESSAGE: NewMessage = {
  sender: "ai",
  type: "text",
  text: "エラーが発生しました。もう一度お試し下さい。",
  createdAt: new Date(),
};

export const useChat = () => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isWaiting, setIsWaiting] = React.useState<boolean>(false);

  // メッセージ送信 ＆ 返答を待つ
  const send = async (newMessage: NewMessage) => {
    try {
      if (!isWaiting) {
        const message = addMessage(newMessage);
        setIsWaiting(true);
        const responseMessage = await getResponse(message);
        addMessage(responseMessage);
        setIsWaiting(false);
      }
    } catch (e) {
      console.error(e);
      addMessage(ERROR_MESSAGE);
      setIsWaiting(false);
    }
  };

  // リストにメッセージ追加
  const addMessage = (newMessage: NewMessage): ChatMessage => {
    const chatMessage: ChatMessage = {
      id: uuidv4(),
      ...newMessage,
    };
    setMessages((messages) => [...messages, chatMessage]);
    return chatMessage;
  };

  const getResponse = async (message: ChatMessage) => {
    const response = await axios.get("/api/chat", {
      params: {
        text: message.text,
      },
    });

    return response.data;
  };

  return { send, messages, isWaiting };
};
