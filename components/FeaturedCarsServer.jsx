import { getFeaturedCars } from "@/actions/home";
import CarCard from "@/components/car-card";

export default async function FeaturedCarsServer() {
  const featuredCars = await getFeaturedCars(10);

  if (!featuredCars || featuredCars.length === 0) {
    return <p className="text-gray-500">No featured cars found</p>;
  }

  return (
    <div className="flex space-x-6 overflow-x-auto pb-4">
      {featuredCars.map((car) => (
        <div key={car.id} className="w-72 flex-shrink-0">
          <CarCard car={car} />
        </div>
      ))}
    </div>
  );
}
