import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Score a single car based on user preferences
 * Pure runtime logic – no DB, no side effects
 */
function scoreCar(car, prefs) {
  let score = 0;

  // Budget match
  if (prefs.budget) {
    const diff = Math.abs(car.price - prefs.budget);
    if (diff <= 50000) score += 30;
    else if (diff <= 100000) score += 20;
    else if (diff <= 200000) score += 10;
  }

  // Fuel preference
  if (prefs.fuelType && car.fuelType) {
    if (car.fuelType.toLowerCase() === prefs.fuelType.toLowerCase()) {
      score += 20;
    }
  }

  // Usage-based logic
  if (prefs.usage === "city") {
    if (car.mileage >= 15) score += 15;
    if (car.bodyType === "Hatchback" || car.bodyType === "Sedan") score += 10;
  }

  if (prefs.usage === "highway") {
    if (car.bodyType === "SUV" || car.bodyType === "Sedan") score += 15;
  }

  // Family size
  if (prefs.familySize) {
    if (prefs.familySize <= 4 && car.seats >= 4) score += 10;
    if (prefs.familySize > 4 && car.seats >= 6) score += 15;
  }

  return score;
}

/**
 * Gemini AI – Explain WHY a car is recommended
 */
async function generateExplanation(car, prefs) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("No API key");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
User preferences:
- Budget: ${prefs.budget}
- Usage: ${prefs.usage}
- Fuel: ${prefs.fuelType}
- Family size: ${prefs.familySize}

Car:
${car.make} ${car.model}, Price: ${car.price}, Fuel: ${car.fuelType}, Mileage: ${car.mileage}

Explain in 1–2 short lines why this car matches the user.
`;

    const result = await model.generateContent(prompt);
    return result.response.text().trim();

  } catch (err) {
    // ✅ Fallback (NO AI)
    return `This ${car.make} ${car.model} matches your ${prefs.usage} usage and budget preferences.`;
  }
}


/**
 * Main helper called from server action
 */
export async function generateBuyerIntentResult(cars, userPreferences) {
  const budget = userPreferences.budget;

  // ✅ Budget tolerance (business logic)
  const minBudget = budget * 0.8;
  const maxBudget = budget * 1.2;

  // 🔒 HARD FILTER: remove unrealistic cars
  const filteredCars = cars.filter(
    (car) => car.price >= minBudget && car.price <= maxBudget
  );

  // ❗ Safety fallback
  const carsToProcess =
    filteredCars.length > 0 ? filteredCars : cars;

  // 1️⃣ Score cars
  const scoredCars = carsToProcess.map((car) => ({
    ...car,
    aiScore: scoreCar(car, userPreferences),
  }));

  // 2️⃣ Sort by AI score
  scoredCars.sort((a, b) => b.aiScore - a.aiScore);

  // 3️⃣ Pick top 3
  const topCars = scoredCars.slice(0, 3);

  // 4️⃣ Generate explanation (only first uses Gemini)
  const finalResults = [];

  for (let i = 0; i < topCars.length; i++) {
    const car = topCars[i];

    const reason =
      i === 0
        ? await generateExplanation(car, userPreferences)
        : "Recommended based on budget, usage, and family size match.";

    finalResults.push({
      ...car,
      matchPercentage: Math.min(100, car.aiScore),
      aiReason: reason,
    });
  }

  return finalResults;
}
