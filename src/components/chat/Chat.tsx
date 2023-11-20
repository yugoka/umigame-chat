"use client";
import React from "react";
import ChatLogArea from "./chatlog/ChatLogArea";
import InputArea from "./input/InputArea";
import { useChat } from "@/hooks/useChat";

export default function Chat() {
  const { start, messages, send, isWaiting } = useChat();

  return (
    <div className="flex h-screen flex-col">
      <ChatLogArea messages={messages} start={start} isWaiting={isWaiting} />
      <InputArea isWaiting={isWaiting} sendMessage={send} />
    </div>
  );
}
