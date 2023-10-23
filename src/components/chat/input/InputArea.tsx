"use client";
import { NewMessage } from "@/types/chat";
import TextInput from "./TextInput";
import React from "react";
type Props = {
  sendMessage: (message: NewMessage) => void;
  isWaiting: boolean;
};

export default function InputArea({ sendMessage, isWaiting }: Props) {
  const [inputText, setInputText] = React.useState<string>("");

  const handleSubmit = () => {
    const newMessage: NewMessage = {
      type: "text",
      text: inputText,
      sender: "user",
      createdAt: new Date(),
    };
    sendMessage(newMessage);
    setInputText("");
  };

  return (
    <div className="shrink-0 m-3">
      <TextInput
        inputText={inputText}
        setInputText={setInputText}
        onSubmit={handleSubmit}
        isWaiting={isWaiting}
      />
    </div>
  );
}
