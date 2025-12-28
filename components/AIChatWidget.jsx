"use client";

import { useState, useRef, useEffect } from "react";
import { X, Mic } from "lucide-react";
import { sendMessageToAI } from "./UserChatbot";
import Image from "next/image";


// Voice Recognition setup
const SpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

export default function AIChatWidget() {

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hello 👋 I’m Rajnikant. Tell me what kind of car you’re looking for.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const greetedRef = useRef(true); // 👈 greeting control
  
  useEffect(() => {
  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
  }
}, []);

  function removeEmojis(text) {
  return text.replace(
    /[\p{Extended_Pictographic}]/gu,
    ""
  ).trim();
}


  // 🔊 Speak AI Reply
  function speakReply(text) {
    if (!window.speechSynthesis) return;

    // Remove emojis & symbols safely
    const cleanText = text
      .replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "")
      .replace(/[^\p{L}\p{N}\s.,₹]/gu, "")
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const lang = detectLanguage(cleanText);

    utterance.lang = lang === "hi" ? "hi-IN" : "en-IN";

    const voices = window.speechSynthesis.getVoices();
    utterance.voice =
      voices.find(v => v.lang === utterance.lang) ||
      voices.find(v => v.lang.startsWith(lang)) ||
      voices.find(v => v.lang.startsWith("en"));

    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }




  // 🌐 Language detection (simple + effective)
  function detectLanguage(text) {
  // Hindi (Devanagari script)
    if (/[ऀ-ॿ]/.test(text)) {
      return "hi";
    }
    return "en";
  }

  // Voice Selector (Smart fallback)
  function getBestVoice(lang) {
    const voices = window.speechSynthesis.getVoices();

    if (lang === "mr") {
      // Marathi → try Marathi → else Hindi
      return (
        voices.find(v => v.lang === "mr-IN") ||
        voices.find(v => v.lang === "hi-IN") ||
        voices.find(v => v.lang.startsWith("hi"))
      );
    }

    if (lang === "hi") {
      return (
        voices.find(v => v.lang === "hi-IN") ||
        voices.find(v => v.lang.startsWith("hi"))
      );
    }

    // English fallback
    return (
      voices.find(v => v.lang === "en-IN") ||
      voices.find(v => v.lang.startsWith("en"))
    );
  }


  // 💬 Text Send
  async function handleSend() {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");

    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    setLoading(true);

    const reply = await sendMessageToAI(userMessage);

    setMessages((prev) => [...prev, { from: "ai", text: reply }]);
    speakReply(reply);
    setLoading(false);
  }

  // 🎙️ Start Voice Listening
  function startListening() {
    if (!SpeechRecognition) {
      alert("Voice input not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN"; // Auto handles Hinglish/Marathi
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      handleVoiceSend(voiceText);
    };

    recognition.onend = () => setListening(false);

    recognition.start();
  }

  // 🧠 Voice → AI → Voice
  async function handleVoiceSend(text) {
    setMessages((prev) => [...prev, { from: "user", text }]);
    setLoading(true);

    const reply = await sendMessageToAI(text);

    setMessages((prev) => [...prev, { from: "ai", text: reply }]);
    speakReply(reply);
    setLoading(false);
  }

  return (
    <>
    <style jsx>{`
        @keyframes bounceShrink {
          0% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-6px) scale(0.92); }
          60% { transform: translateY(4px) scale(1.05); }
          100% { transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-24 right-5 w-16 h-16 rounded-full bg-black shadow-xl hover:scale-110 transition z-50 flex items-center justify-center animate-[bounceShrink_1.8s_ease-in-out_infinite]"
        >
          <img
            src="/AI_logo.png"
            alt="Rajnikant AI"
            className="w-15 h-15 rounded-full object-cover"
          />
        </button>
      )}

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-24 right-7 w-80 h-[420px] bg-white rounded-2xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <img
                src="./AI_logo.png"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="font-semibold text-sm">
                Rajnikant – AI Assistant
              </span>
            </div>
            <button onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 px-3 py-2 rounded-xl max-w-[75%] leading-relaxed ${
                  msg.from === "user"
                    ? "ml-auto bg-black text-white shadow-md"
                    : "bg-gray-100 text-gray-800 shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="bg-gray-100 px-3 py-2 rounded-xl w-fit text-xs italic">
                Rajnikant is typing…
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex items-center gap-2 bg-white w-full">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask about cars…"
              className="flex-1 min-w-0 border rounded-xl px-3 py-2 text-sm focus:outline-none"

            />

            {/* Mic Button */}
            <button
              onClick={startListening}
              className={`w-9 h-9 flex items-center justify-center rounded-full ${
  listening ? "bg-red-600" : "bg-gray-800"
} text-white shrink-0`}

            >
              <Mic size={16} />
            </button>

            <button
              onClick={handleSend}
              className="bg-black text-white px-3 py-2 rounded-xl text-sm shadow-md shrink-0">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
