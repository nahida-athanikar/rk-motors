"use client";

import { useState } from "react";
import { getBuyerIntentRecommendations } from "@/actions/buyer-intent";
import { formatCurrency } from "@/lib/helper";
import Link from "next/link";
import CarCard from "@/components/car-card";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";


export default function BuyerIntent() {
  const [preferences, setPreferences] = useState({
    budget: "",
    usage: "city",
    fuelType: "any",
    familySize: 4,
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    const response = await getBuyerIntentRecommendations({
      budget: Number(preferences.budget),
      usage: preferences.usage,
      fuelType: preferences.fuelType === "any" ? "" : preferences.fuelType,
      familySize: Number(preferences.familySize),
    });

    if (!response.success) {
      setError(response.error || "Failed to get recommendations");
    } else {
      setResults(response.data);
    }

    setLoading(false);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 sm:pt-10 pb-6 space-y-6">
      {/* FORM */}
      <Card className="border shadow-sm -mt-12">
        <CardHeader className="pb-1">
          <CardTitle className="text-lg sm:text-xl font-semibold">
            Find the Best Car for You (AI Powered)
          </CardTitle>
        </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      
          {/* Budget */}
          <div className="space-y-1">
            <Label htmlFor="budget">Your Budget (₹)</Label>
            <Input
              id="budget"
              type="number"
              name="budget"
              placeholder="e.g. 500000"
              value={preferences.budget}
              onChange={handleChange}
              required
            />
          </div>

          {/* Usage */}
          <div className="space-y-1">
            <Label>Usage Type</Label>
            <Select
              value={preferences.usage}
              onValueChange={(value) =>
                setPreferences((prev) => ({ ...prev, usage: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select usage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="city">City Usage</SelectItem>
                <SelectItem value="highway">Highway Usage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fuel */}
          <div className="space-y-1">
            <Label>Fuel Type</Label>
            <Select
              value={preferences.fuelType}
              onValueChange={(value) =>
                setPreferences((prev) => ({ ...prev, fuelType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Any Fuel Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any Fuel Type</SelectItem>
                <SelectItem value="Petrol">Petrol</SelectItem>
                <SelectItem value="Diesel">Diesel</SelectItem>
                <SelectItem value="Electric">Electric</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Family Size */}
          <div className="space-y-1">
            <Label htmlFor="familySize">Family Size</Label>
            <Input
              id="familySize"
              type="number"
              min="1"
              name="familySize"
              value={preferences.familySize}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full mt-3 mb-2 sm:mb-0 z-10"
          >
            {loading ? "Analyzing with AI..." : "Get AI Recommendations"}
          </Button>

          </form>
        </CardContent>
      </Card>


      {/* ERROR */}
      {error && (
        <p className="text-red-600 bg-red-50 p-3 rounded">{error}</p>
      )}

      {/* RESULTS */}
      {/* RESULTS */}
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Top Cars Recommended for You
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {results.map((car, index) => (
                            <Link
                key={car.id}
                href={`/cars/${car.id}`}
                className="group relative"
              >
                {index === 0 && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="bg-green-600 text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow">
                      ⭐ Best Match
                    </span>
                  </div>
                )}

                <CarCard car={car} />

                {/* AI Recommendation Strip */}
                <div
                  className={`mt-2 rounded-xl border p-3 ${
                    index === 0
                      ? "border-green-400 bg-green-100"
                      : "border-green-200 bg-green-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-green-700">
                        🤖 AI Match: {car.matchPercentage}%
                      </span>

                    </div>

                    <span className="text-xs text-green-600">
                      AI Recommendation
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed line-clamp-3">
                    {car.aiReason}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
