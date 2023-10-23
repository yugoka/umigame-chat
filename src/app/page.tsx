import Chat from "@/components/chat/Chat";

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center">
      <div className="w-full h-full max-w-4xl">
        <Chat />
      </div>
    </main>
  );
}
