"use client";
import { ChatMessage } from "@/types/chat";
import MessageBox from "./MessageBox";
import React from "react";

type Props = {
  messages: ChatMessage[];
  isWaiting: boolean;
  start: () => Promise<void>;
};

export default function ChatLogArea({ messages, isWaiting, start }: Props) {
  const bottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages]);

  return (
    <>
      <div className="grow shrink overflow-scroll">
        <div
          onClick={start}
          className={`
            mx-5 my-2 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
            ${isWaiting ? "opacity-50" : "cursor-pointer"}
          `}
        >
          問題生成(テスト版)
        </div>
        {messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>
    </>
  );
}
