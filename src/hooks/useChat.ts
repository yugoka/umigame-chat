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
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "question",
      type: "text",
      sender: "ai",
      text: `「タクシー運転手をしている森田さん。ある時森田さんは、一方通行の道を逆方向に走っていました。パトロール中の警察官に見られてしまいましたが、怒られませんでした。」

        なぜでしょうか？`,
      createdAt: new Date(),
    },
    {
      id: "start-message",
      type: "text",
      sender: "ai",
      text: `「はい」「いいえ」で答えられる質問で推理してください！`,
      createdAt: new Date(),
    },
  ]);
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
        question: `「タクシー運転手をしている森田さん。ある時森田さんは、一方通行の道を逆方向に走っていました。パトロール中の警察官に見られてしまいましたが、怒られませんでした。」

        なぜでしょうか？`,
        truth: `タクシー運転手さんは車に乗っておらず、一方通行の道を徒歩で逆方向に進んでいただけだったのです。車が一方通行でも、歩きならば関係ありませんよね。「タクシー運転手」というと車に乗っているとイメージしてしまいますが、歩くときだってあるはずです。`,
      },
    });

    return response.data;
  };

  return { send, messages, isWaiting };
};
