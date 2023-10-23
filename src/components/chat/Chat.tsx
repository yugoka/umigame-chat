"use client";
import React from "react";
import ChatLogArea from "./chatlog/ChatLogArea";
import InputArea from "./input/InputArea";
import { useChat } from "@/hooks/useChat";

export default function Chat() {
  const { messages, send } = useChat();

  return (
    <div className="flex min-h-screen flex-col">
      <ChatLogArea messages={messages} />
      <InputArea sendMessage={send} />
    </div>
  );
}
