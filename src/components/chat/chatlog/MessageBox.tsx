import { ChatMessage } from "@/types/chat";

type Props = {
  message: ChatMessage;
};

export default function MessageBox({ message }: Props) {
  return (
    <div
      className={`w-full flex ${message.sender === "user" && "justify-end"}`}
    >
      <div className="flex flex-col mx-5 my-1">
        <div
          className={`flex text-sm text-slate-500 mx-1 ${
            message.sender === "user" && "justify-end"
          }`}
        >
          {message.sender}
        </div>
        <p
          className={`
        inline-block min-w-[150px] border-2 rounded-xl p-3 relative break-words
      `}
        >
          {message.text}
        </p>
      </div>
    </div>
  );
}
