import { QuestionContext } from "./../../../types/question";
import * as dotenv from "dotenv";
dotenv.config();
import { NextRequest, NextResponse } from "next/server";
import { fetchChatResponse } from "@/utils/api/fetchChatResponse";
import {
  getQuestionGenerationPrompt,
  getAnswerGenerationPrompt,
} from "@/prompts/rule";

export async function GET(request: NextRequest) {
  try {
    // ChatGPTにリクエストを投げる
    const questionText = await fetchChatResponse([
      {
        role: "user",
        content: getQuestionGenerationPrompt(),
      },
    ]);

    const truthText = await fetchChatResponse([
      {
        role: "user",
        content: getQuestionGenerationPrompt(),
      },
      {
        role: "assistant",
        content: questionText,
      },
      {
        role: "user",
        content: getAnswerGenerationPrompt(),
      },
    ]);

    const response: QuestionContext = {
      question: questionText,
      truth: truthText,
    };

    return NextResponse.json(response);
  } catch (e) {
    throw new Error(`${e}`);
  }
}
