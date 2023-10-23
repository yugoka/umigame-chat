"use client";
import { NewMessage } from "@/types/chat";
import TextInput from "./TextInput";
import React from "react";
type Props = {
  sendMessage: (message: NewMessage) => void;
};

export default function InputArea({ sendMessage }: Props) {
  const [inputText, setInputText] = React.useState<string>("");

  const handleSubmit = () => {
    const newMessage: NewMessage = {
      text: inputText,
      createdAt: new Date(),
    };
    sendMessage(newMessage);
    setInputText("");
  };

  return (
    <div>
      <TextInput
        inputText={inputText}
        setInputText={setInputText}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
