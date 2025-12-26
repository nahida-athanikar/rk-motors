"use server";

import { db } from "@/lib/prisma";

export async function userChatbotAction(message) {
  try {
    if (!message || !message.trim()) {
      return "Please ask something about cars.";
    }

    // 1️⃣ Fetch cars
    const cars = await db.car.findMany({
      select: {
        make: true,
        model: true,
        price: true,
        color: true,
        mileage: true,
        fuelType: true,
      },
      take: 20,
    });

    // 2️⃣ Prompt
  const prompt = `
You are Rajnikant, the AI Car Advisor for RK Motors.


GREETING RULE (VERY IMPORTANT):
- Say "Namaste" ONLY ONCE at the start of the conversation.
- If you have already said "Namaste" earlier in this conversation,
  DO NOT say it again under any condition.
- For follow-up messages, reply directly without any greeting.

STRICT BEHAVIOR RULES (VERY IMPORTANT):
1. Keep replies **short, crisp, and to the point**.
   - Never repeat greetings like Namaste, Hello, Hi, Vanakkam, etc.
   - Answer ONLY what the user asks.
   - Do NOT give extra explanations unless asked.
   
2. Tone should be polite, professional, and simple.
3. Add emojis.
4. Do NOT use markdown (**bold**, lists, stars).
5. Do NOT be overly conversational or philosophical.
6. Detect the user's language automatically.
- If the user writes in Marathi → reply in Marathi.
- If the user writes in English → reply in English.
- If the user writes in Hinglish → reply in simple Hinglish.
- DO NOT mix languages unless the user mixes them.
- DO NOT translate unless the user asks.

LANGUAGE:
- Use simple English.
- Marathi words like "Namaste" and Hindi are allowed.
- No Tamil words.

OWNER INFORMATION (use ONLY when asked):
- Owner: Faiyaz Ismail Athanikar (popularly known as Rajnikant)
- Experience: 35+ years
- Owner’s Son: Yasin Faiyaz Athanikar (Moya)
- Experience: 2+ years

ADDRESS (give ONLY when asked):
1334, J.J. Complex, Shop No.1, Panjarpol Ind. Estate, Main Road, Kolhapur, Maharashtra.

CONTACT INFO (give ONLY when asked):
- WhatsApp: Use the WhatsApp icon on the website
- Email: Available on the website
- Call: Direct call option available on the site

CAR INFORMATION RULES:
- Use ONLY the provided car data.
- Never invent cars, prices, or details.
- If a car is not available, say:
  "This car is currently not available at RK Motors."

NEGOTIATION RULE:
If user asks about price negotiation, reply:
"Price negotiation can be discussed directly with our sales team."

USER MESSAGE:
"${message}"

AVAILABLE CARS DATA:
${JSON.stringify(cars, null, 2)}
`;



    // 3️⃣ Gemini API call (CORRECT MODEL)
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error("Gemini error:", err);
      return "AI is temporarily unavailable.";
    }

    const data = await res.json();

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No matching cars found."
    );
  } catch (error) {
    console.error("Chatbot Error:", error);
    return "Something went wrong. Please try again.";
  }
}
