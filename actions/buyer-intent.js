"use server";

import { getCars } from "@/actions/car-listing";
import { generateBuyerIntentResult } from "@/lib/buyerIntentHelper";

/**
 * Buyer Intent AI – Server Action
 * Reads existing car data
 * No DB write
 * No schema change
 */
export async function getBuyerIntentRecommendations(userPreferences) {
  try {
    // 1️⃣ Fetch available cars (reuse existing logic)
    const carsResponse = await getCars({
      page: 1,
      limit: 50, // runtime analysis ke liye enough
    });

    if (!carsResponse.success) {
      return {
        success: false,
        error: "Failed to fetch cars",
      };
    }

    const cars = carsResponse.data;

    // 2️⃣ Generate AI-based recommendation (pure runtime)
    const recommendations = await generateBuyerIntentResult(
      cars,
      userPreferences
    );

    return {
      success: true,
      data: recommendations,
    };
  } catch (error) {
    console.error("Buyer Intent AI Error:", error);

    return {
      success: false,
      error: error?.message || "Something went wrong",
    };
  }
}
