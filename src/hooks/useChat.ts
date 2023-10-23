import { ChatMessage, NewMessage } from "@/types/chat";
import React from "react";

export const useChat = () => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);

  const send = (newMessage: NewMessage) => {
    setMessages((messages) => [
      ...messages,
      { id: messages.length + 1, ...newMessage },
    ]);
  };

  return { send, messages };
};
