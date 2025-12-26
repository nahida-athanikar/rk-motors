"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { sendMessageToAI } from "./UserChatbot";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      from: "ai", 
      text: "Hi 👋 I am Rajnikant. I will help you find the perfect car based on your needs." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setLoading(true);

    const reply = await sendMessageToAI(userMessage);

    setMessages((prev) => [...prev, { from: "ai", text: reply }]);
    setLoading(false);
  }

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-25 right-6 w-15 h-15 rounded-full bg-black text-white flex items-center justify-center shadow-xl hover:scale-110 transition z-50">
            <img src="./AI_logo.png" alt="Rajnikant AI" className="w-13 h-13 object-cover rounded-full"/>
        </button>
      )}

      {/* Chat Box */}
      {open && (
        <div className="animate-chat  fixed bottom-15 right-6 w-80 h-[420px] bg-white rounded-2xl shadow-2xl flex flex-col z-50">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <img src="./AI_logo.png" 
                alt="Rajnikant AI"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="font-semibold text-sm">
                Rajnikant - AI Car Advisor
              </span>
            </div>

            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded-lg max-w-[80%] ${
                  msg.from === "user"
                    ? "ml-auto bg-black text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-gray-100 p-2 rounded-lg w-fit typing-dots">
               Rajnikant is typing
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about cars..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-black text-white px-4 rounded-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
