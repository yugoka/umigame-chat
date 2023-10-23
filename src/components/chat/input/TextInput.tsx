"use client";

import React, { FormEvent, SetStateAction } from "react";

type Props = {
  inputText: string;
  setInputText: React.Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
  isWaiting: boolean;
};

export default function TextInput({
  inputText,
  setInputText,
  onSubmit,
  isWaiting,
}: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className={`
            shadow-lg appearance-none rounded-md w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline transition-all
            ${isWaiting ? "bg-gray-200" : "border"}
          `}
          disabled={isWaiting}
          id="username"
          type="text"
          placeholder={isWaiting ? "少々お待ちください..." : "ここに質問を入力"}
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
      </form>
    </div>
  );
}
