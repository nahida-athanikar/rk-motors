"use client";

import { userChatbotAction } from "@/actions/chatbot";

export async function sendMessageToAI(message) {
  try {
    const reply = await userChatbotAction(message);
    return reply;
  } catch (error) {
    return "Sorry, something went wrong.";
  }
}
