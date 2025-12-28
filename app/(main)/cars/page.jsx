export const dynamic = "force-dynamic";


import { getCarFilters } from "@/actions/car-listing";
import { Suspense } from "react";
import CarFilters from "./_components/car-filters";
import CarListings from "./_components/car-listing";



export const metadata = {
  title: "Cars | RK Motors",
  description: "Browse and search for your dream car",
};

const CarsPage = async () => {
  const filtersData = await getCarFilters();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
        <span className="rk-gradient-text">
          Browse Cars
        </span>
      </h1>


      <div className="flex flex-col lg:flex-row gap-3">
        <div className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-24 h-max pr-2">
          {/* 🔴 REQUIRED Suspense */}
          <Suspense fallback={<div>Loading filters...</div>}>
            <CarFilters filters={filtersData.data} />
          </Suspense>
        </div>

        <div className="flex-1 animate-fadeIn">
          {/* 🔴 REQUIRED Suspense */}
          <Suspense fallback={<div>Loading cars...</div>}>
            <CarListings />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
