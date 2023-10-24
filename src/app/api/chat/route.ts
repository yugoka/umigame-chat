import * as dotenv from "dotenv";
dotenv.config();
import { NewMessage } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";
import { fetchChatResponse } from "@/utils/api/fetchChatResponse";

export async function GET(request: NextRequest) {
  const messageText = request.nextUrl.searchParams.get("text");
  const questionText = request.nextUrl.searchParams.get("question");
  const truthText = request.nextUrl.searchParams.get("truth");

  if (!messageText) throw new Error("メッセージがありません");

  // ChatGPTにリクエストを投げる
  const responseText = await fetchChatResponse([
    {
      role: "user",
      content: messageText,
    },
  ]);

  const responseMessage: NewMessage = {
    type: "text",
    sender: "ai",
    text: responseText,
    createdAt: new Date(),
  };
  return NextResponse.json(responseMessage);
}
