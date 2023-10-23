"use client";
import { ChatMessage } from "@/types/chat";
import MessageBox from "./MessageBox";

type Props = {
  messages: ChatMessage[];
};

export default function ChatLogArea({ messages }: Props) {
  return (
    <div className="grow shrink overflow-scroll">
      {messages.map((message) => (
        <MessageBox key={message.id} message={message} />
      ))}
    </div>
  );
}
