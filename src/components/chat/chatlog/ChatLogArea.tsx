"use client";
import { ChatMessage } from "@/types/chat";

type Props = {
  messages: ChatMessage[];
};

export default function ChatLogArea({ messages }: Props) {
  return (
    <div className="grow">
      {messages.map((message) => (
        <div key={message.id} className="m-5 shadow">
          {message.text}
        </div>
      ))}
    </div>
  );
}
