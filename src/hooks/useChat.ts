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
      text: `ある男がバーに入ってきて、バーテンダーに水を一杯注文した。バーテンダーは銃を取り出し、男に狙いをつけて撃鉄を上げた。男は「ありがとう」と言って帰って行った。一体どういうことか？`,
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
        question: `ある男がバーに入ってきて、バーテンダーに水を一杯注文した。バーテンダーは銃を取り出し、男に狙いをつけて撃鉄を上げた。男は「ありがとう」と言って帰って行った。一体どういうことか？`,
        truth: `男はしゃっくりをしていて、水を注文した。バーテンダーはしゃっくりの声を聞いて状況を知り、手っ取り早い方法として、銃で男を驚かしてしゃっくりを止めた。男は驚いたが、しゃっくりが止まったので喜んだ。そして水を飲む必要も無くなった。`,
      },
    });

    return response.data;
  };

  return { send, messages, isWaiting };
};
