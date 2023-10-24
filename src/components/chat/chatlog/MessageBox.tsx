import { ChatMessage } from "@/types/chat";

type Props = {
  message: ChatMessage;
};

export default function MessageBox({ message }: Props) {
  return (
    <div
      className={`w-full flex ${message.sender === "user" && "justify-end"}`}
    >
      <p
        className={`
        inline-block min-w-[150px] border-4 rounded-xl mx-5 my-3 p-3 relative break-words
        ${
          message.sender === "ai"
            ? `
            before:absolute before:content-[''] before:-translate-y-1/2
            before:top-1/2 before:left-0 before:ml-[-20px] before:border-8
            before:border-l-transparent before:border-t-transparent before:border-b-transparent
          `
            : `
            before:absolute before:content-[''] before:-translate-y-1/2
            before:top-1/2 before:right-0 before:mr-[-20px] before:border-8
            before:border-r-transparent before:border-t-transparent before:border-b-transparent
          `
        }
      `}
      >
        {message.text}
      </p>
    </div>
  );
}
