"use client";

import { CarrotIcon, Heart, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import useFetch from '@/hooks/use-fetch';
import { toggleSavedCar } from '@/actions/car-listing';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';


const CarCard = ({ car }) => {
  const { isSignedIn } = useAuth();
  const [isSaved, setIsSaved] = useState(car.wishlisted)
  const router = useRouter();

// Use the useFetch hook
  const {
    loading: isToggling,
    fn: toggleSavedCarFn,
    data: toggleResult,
    error: toggleError,
  } = useFetch(toggleSavedCar);


  // Handle toggle result with useEffect
  useEffect(() => {
    if (toggleResult?.success && toggleResult.saved !== isSaved) {
      setIsSaved(toggleResult.saved);
      toast.success(toggleResult.message);
    }
  }, [toggleResult, isSaved]);

  // Handle errors with useEffect
  useEffect(() => {
    if (toggleError) {
      toast.error("Failed to update favorites");
    }
  }, [toggleError]);


  const handleToggleSave = async(e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      toast.error("Please sign in to save cars");
      router.push("/sign-in");
      return;
    }

    if (isToggling) return;

    // Call the toggleSavedCar function using our useFetch hook
    await toggleSavedCarFn(car.id);
  }


  return (
    <Card className="overflow-hidden  hover:shadow-lg transition group py-0 bg-white">
      <div className="relative w-full h-48">
        {car.images && car.images.length > 0 ? (
          <div className="relative w-full h-full">
            <Image src={car.images[0]} alt={`${car.make} ${car.model}`} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <CarrotIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}

        <Button variant="ghost" size="icon" className={`absolute top-2 right-2 bg-white/90 rounded-full p-1.5 ${
          isSaved 
            ? "text-red-500 hover:text-red-600"
            : "text-gray-600 hover:text-gray-900"
        }`}
          onClick={handleToggleSave}
        >
          {isToggling ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Heart className={isSaved ? "fill-current" : ""} size={20} />
          )}
        </Button>
      </div>

{/* Cars Information */}
       <CardContent className="p-4">
        <div className="flex flex-col gap-1 mb-2">
          <h3 className="text-[1.15rem] font-bold line-clamp-1">{car.make} {car.model}</h3>
          <span className="text-xl font-bold text-blue-600"> ₹{car.price.toLocaleString("en-IN")}</span>
        </div>

        <div className="text-gray-600 flex items-center text-sm gap-1 mb-2">
          <span>{car.year}</span>
          <span className="mx-1">.</span>
          <span>{car.transmission}</span>
          <span className="mx-1">.</span>
          <span>{car.fuelType}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          <Badge variant="outline" className="bg-gray-100 text-gray-700 px-2 py-1 text-xs">{car.bodyType}</Badge>
          
          <Badge variant="outline" className="bg-gray-100 text-gray-700 px-2 py-1 text-xs">{car.mileage.toLocaleString("en-IN")} km</Badge>

          <Badge variant="outline" className="bg-gray-100 text-gray-700 px-2 py-1 text-xs">{car.color}</Badge>
        </div>

        <div className="flex justify-between">
          <Button className="flex-1" 
          onClick={() => router.push(`/cars/${car.id}`)}>View Car</Button>
        </div>
      </CardContent>

    </Card>
  )
}

export default CarCard;