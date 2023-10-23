export type NewMessage = {
  type: "text";
  text: string;
  sender: "user" | "ai";
  createdAt: Date;
};

export type ChatMessage = NewMessage & {
  id: string;
};
