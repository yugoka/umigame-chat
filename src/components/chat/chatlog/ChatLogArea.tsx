"use client";
import { ChatMessage } from "@/types/chat";
import MessageBox from "./MessageBox";
import React from "react";

type Props = {
  messages: ChatMessage[];
};

export default function ChatLogArea({ messages }: Props) {
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
        {messages.map((message) => (
          <MessageBox key={message.id} message={message} />
        ))}
        <div ref={bottomRef} />
      </div>
    </>
  );
}
