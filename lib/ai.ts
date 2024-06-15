"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || ""
);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "Write a story about a magic backpack.";

export const generate = async (message: string) => {
  const result = await model.generateContent(message);
  console.log(result.response.text());
  return result.response.text();
};
