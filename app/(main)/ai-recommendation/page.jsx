import BuyerIntent from "@/components/BuyerIntent";

export const metadata = {
  title: "AI Car Recommendation | RK Motors",
  description:
    "Get AI-powered car recommendations based on your budget, usage, and preferences.",
};

export default function AIRecommendationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BuyerIntent />
    </div>
  );
}
