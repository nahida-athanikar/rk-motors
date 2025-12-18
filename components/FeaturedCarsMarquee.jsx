import { getFeaturedCars } from "@/actions/home";
import Image from "next/image";

export default async function FeaturedCarsMarquee() {
  const featuredCars = await getFeaturedCars(8);

  if (!featuredCars || featuredCars.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pointer-events-none select-none">
      <div className="relative w-full overflow-hidden">

        {/* First Track */}
        <div className="flex space-x-12 animate-marquee">
          {[...featuredCars, ...featuredCars].map((car, index) => (
            <div
              key={`${car.id}-${index}`}
              className="relative h-48 w-80 rounded-xl overflow-hidden shadow-lg group"
            >
              
            </div>
          ))}
        </div>

        {/* Second Track (Seamless loop) */}
        <div className="flex space-x-12 absolute top-0 animate-marquee2">
          {[...featuredCars, ...featuredCars].map((car, index) => (
            <div
              key={`dup-${car.id}-${index}`}
              className="relative h-48 w-80 rounded-xl overflow-hidden shadow-lg group"
            >
              <Image
                src={car.images?.[0] || "/fallback-car.png"}
                alt={`${car.make} ${car.model}`}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/60 p-3 text-white text-center text-sm">
                {car.make} {car.model}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
