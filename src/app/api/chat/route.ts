import * as dotenv from "dotenv";
dotenv.config();
import { NewMessage } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { slug: string };
  }
) {
  const messageText = request.nextUrl.searchParams.get("text");
  const questionText = request.nextUrl.searchParams.get("question");
  const truthText = request.nextUrl.searchParams.get("truth");

  const responseMessage: NewMessage = {
    type: "text",
    sender: "ai",
    text: messageText ? messageText : "",
    createdAt: new Date(),
  };
  return NextResponse.json(responseMessage);
}
