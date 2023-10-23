import { ChatMessage } from "@/types/chat";

type Props = {
  message: ChatMessage;
};

export default function MessageBox({ message }: Props) {
  return (
    <div className="w-full">
      <p
        className={`
        inline-block min-w-[200px] border-4 rounded-md mx-5 my-3 p-5 relative
        before:absolute before:content-[''] before:-translate-y-1/2
        before:top-1/2 before:left-0 before:ml-[-20px] before:border-8
        before:border-l-transparent before:border-t-transparent before:border-b-transparent
      `}
      >
        {message.text}
      </p>
    </div>
  );
}
