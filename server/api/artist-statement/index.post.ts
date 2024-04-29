// import { OpenAIStream, StreamingTextResponse } from "ai";
import { OpenAIStream } from "ai";
import OpenAI from "openai";
import { prompts } from "~/utils/prompts";

export default defineEventHandler(async (event) => {
  const openai = new OpenAI({
    apiKey: useRuntimeConfig().openaiApiKey,
  });

  const { image } = await readBody(event);

  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    stream: false,
    max_tokens: 1000,
    temperature: 0.9,
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompts.user,
          },
          {
            type: "image_url",
            image_url: image,
          },
        ],
      },
    ],
  });

  return {
    response,
  };
});
