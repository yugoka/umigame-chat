export type NewMessage = {
  text: string;
  createdAt: Date;
};

export type ChatMessage = NewMessage & {
  id: number;
};
