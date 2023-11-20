import { ChatMessage, NewMessage } from "@/types/chat";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { QuestionContext } from "@/types/question";

const ERROR_MESSAGE: NewMessage = {
  sender: "ai",
  type: "text",
  text: "エラーが発生しました。もう一度お試し下さい。",
  createdAt: new Date(),
};

export const useChat = () => {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      id: "first-message",
      sender: "ai",
      type: "text",
      text: "上のボタンをクリックして問題を生成してください",
      createdAt: new Date(),
    },
  ]);
  const [isWaiting, setIsWaiting] = React.useState<boolean>(false);
  const [questionContext, setQuestionContext] = React.useState<QuestionContext>(
    {
      question: "",
      truth: "",
    }
  );

  // メッセージ送信 ＆ 返答を待つ
  const send = async (newMessage: NewMessage) => {
    try {
      // ネタバレ機能
      if (newMessage.text.includes("ギブアップ")) {
        addMessage(newMessage);
        addMessage({
          sender: "ai",
          type: "text",
          text: questionContext.truth,
          createdAt: new Date(),
        });
      } else if (!isWaiting) {
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
    const query_params = new URLSearchParams({
      text: message.text,
      question: questionContext.question,
      truth: questionContext.truth,
    });
    const response = await fetch("/api/chat?" + query_params);
    const data = await response.json();
    return data;
  };

  const getQuestionContext = async (): Promise<QuestionContext> => {
    const response = await fetch("/api/new-question", {
      cache: "no-store",
    });
    const data = await response.json();
    console.log(data);
    return data;
  };

  const start = async () => {
    try {
      setMessages([]);
      setIsWaiting(true);

      const questionContext = await getQuestionContext();
      setQuestionContext(questionContext);
      addMessage({
        type: "text",
        sender: "ai",
        text: questionContext.question,
        createdAt: new Date(),
      });
      setIsWaiting(false);
    } catch (e) {
      console.error(e);
      addMessage(ERROR_MESSAGE);
      setIsWaiting(false);
    }
  };

  return { start, send, messages, isWaiting };
};
