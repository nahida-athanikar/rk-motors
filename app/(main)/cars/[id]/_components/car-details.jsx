// Isme car overview  ka sb edit krna hai.
"use client";

import { toggleSavedCar } from '@/actions/car-listing';
import { Alert, AlertDescription, AlertTitle, AlertCircle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useFetch from '@/hooks/use-fetch';
import { formatCurrency } from '@/lib/helper';
import { useAuth } from '@clerk/nextjs';
import { Calendar, Car, Currency, Fuel, Gauge, Heart, LocateFixed, MessageSquare, Share2, Key, BadgeCheck, Palette, Settings, Users} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import EmiCalculator from './emi-calculator';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { format } from 'date-fns';
import WhatsappFloating from '../../_components/whatsappFloating';




const CarDetails = ({ car, testDriveInfo }) => {

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(car.wishlisted);

   const {
    loading: savingCar,
    fn: toggleSavedCarFn,
    data: toggleResult,
    error: toggleError,
  } = useFetch(toggleSavedCar);

  // Handle toggle result with useEffect
  useEffect(() => {
    if (toggleResult?.success && toggleResult.saved !== isWishlisted) {
      setIsWishlisted(toggleResult.saved);
      toast.success(toggleResult.message);
    }
  }, [toggleResult, isWishlisted]);

  // Handle errors with useEffect
  useEffect(() => {
    if (toggleError) {
      toast.error("Failed to update favorites");
    }
  }, [toggleError]);


   // Handle save car
  const handleSaveCar = async () => {
    if (!isSignedIn) {
      toast.error("Please sign in to save cars");
      router.push("/sign-in");
      return;
    }

    if (savingCar) return;

    // Use the toggleSavedCarFn from useFetch hook
    await toggleSavedCarFn(car.id);
  };

   // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${car.year} ${car.make} ${car.model}`,
          text: `Check out this ${car.year} ${car.make} ${car.model} on RK Motors!`,
          url: window.location.href,
        })
        .catch((error) => {
          console.log("Error sharing", error);
          copyToClipboard();
        });
    } else {
      copyToClipboard();
    }
  };

   const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  // Handle book test drive
  const handleBookTestDrive = () => {
    if (!isSignedIn) {
      toast.error("Please sign in to book a test drive");
      router.push("/sign-in");
      return;
    }
    router.push(`/test-drive/${car.id}`);
  };

  const specs = [
    {
      label: "Make",
      value: car.make,
      icon: Car,
    },
    {
      label: "Model",
      value: car.model,
      icon: BadgeCheck,
    },
    {
      label: "Year",
      value: car.year,
      icon: Calendar,
    },
    {
      label: "Body Type",
      value: car.bodyType,
      icon: Car,
    },
    {
      label: "Fuel Type",
      value: car.fuelType,
      icon: Fuel,
    },
    {
      label: "Transmission",
      value: car.transmission,
      icon: Settings,
    },
    {
      label: "Running",
      value: `${car.mileage.toLocaleString("en-IN")} km`,
      icon: Gauge,
    },
    {
      label: "Color",
      value: car.color,
      icon: Palette,
    },
    {
      label: "Seats",
      value: car.seats,
      icon: Users,
    },
  ];


   return (
    <div >
      <div className="flex flex-col lg:flex-row gap-8 -mt-19">
        {/* Image Gallery */}
        <div className="w-full lg:w-7/12 space-y-5">

        {/* Main Image Box */}
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
          {car.images && car.images.length > 0 ? (
            <Image
              src={car.images[currentImageIndex]}
              alt={`${car.year} ${car.make} ${car.model}`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <Car className="h-24 w-24 text-gray-400" />
            </div>
          )}

          {/* Photo Counter Tag */}
          {car.images?.length > 1 && (
            <span className="absolute bottom-3 right-3 text-sm bg-black/60 text-white px-3 py-1 rounded-full">
              {currentImageIndex + 1}/{car.images.length}
            </span>
          )}
        </div>

        {/* Thumbnails Slider */}
        {car.images && car.images.length > 1 && (
          <div className="flex gap-4 p-2 overflow-x-auto scrollbar-hide">
            {car.images.map((image, index) => (
              <div
                key={index}
                className={`relative cursor-pointer h-20 w-28 rounded-md overflow-hidden border transition-all duration-200 flex-shrink-0 shadow-sm 
                  ${index === currentImageIndex ? "ring-2 ring-blue-600 scale-105" : "opacity-70 hover:opacity-100 hover:scale-105"}
                `}
                onClick={() => setCurrentImageIndex(index)}
              >
                <Image
                  src={image}
                  alt={`${car.year} ${car.make} ${car.model} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className={`flex items-center justify-center gap-2 py-4 rounded-lg shadow-sm transition-all hover:shadow-md 
            ${isWishlisted ? "text-red-500 border-red-400" : ""}`}
            onClick={handleSaveCar}
            disabled={savingCar}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`} />
            {isWishlisted ? "Saved" : "Save"}
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 py-4 rounded-lg shadow-sm hover:shadow-md transition-all"
            onClick={handleShare}
          >
            <Share2 className="h-5 w-5" />
            Share
          </Button>
        </div>
        </div>


        {/* Car Details */}
      <div className="w-full lg:w-5/12 space-y-3 px-1">

          {/* Body Badge */}
          <div className="flex justify-between items-center">
            <Badge className="px-3 py-1 text-xs sm:text-sm rounded-full bg-gradient-to-r from-red-600 via-red-500 to-red-700 
          text-white shadow-[0_0_20px_rgba(255,0,0,0.35)] font-semibold">
              {car.bodyType}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
            {car.make} {car.model} {car.year}
          </h1>

          {/* Price */}
          <div className="text-2xl sm:text-3xl font-bold text-blue-700">
            {formatCurrency(car.price)}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-4 p-2 rounded-xl border border-gray-200">
            <div className="flex flex-col items-center text-xs sm:text-sm gap-1">
              <Gauge className="text-blue-600 h-5 w-5" />
              <span>{car.mileage.toLocaleString("en-IN")} km</span>
            </div>

            <div className="flex flex-col items-center text-xs sm:text-sm gap-1">
              <Fuel className="text-blue-600 h-5 w-5" />
              <span>{car.fuelType}</span>
            </div>

            <div className="flex flex-col items-center text-xs sm:text-sm gap-1">
              <Car className="text-blue-600 h-5 w-5" />
              <span>{car.transmission}</span>
            </div>
          </div>

          {/* EMI Calculator */}
          <Dialog>
            <DialogTrigger className="w-full text-start">
              <Card className="border border-grey-200 hover:shadow-md transition cursor-pointer active:scale-[0.98]">
                <CardContent className="sm:p-2">
                  <div className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg font-semibold mb-1">
                    <Currency className="h-5 w-5 text-blue-700" />
                    <h3>EMI Calculator</h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600">
                    Estimated Monthly Payment:
                    <span className="font-bold text-gray-900 ml-1">
                    {formatCurrency(car.price / 60)}
                    </span>
                  </p>

                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                    *Based on ₹0 down payment & 4.5% interest rate
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent className="max-w-md w-[90%] sm:w-auto mt-15">
              <DialogHeader>
                <DialogTitle className="text-center text-lg font-bold">RK Motors Loan Calculator</DialogTitle>
              </DialogHeader>
              <EmiCalculator price={car.price} />
            </DialogContent>
          </Dialog>

         {/* Request Info */}
          <Card className="border border-gray-200 shadow-md rounded-2xl bg-white">
            <CardContent className="p-5 sm:p-6">
              
              {/* Title + Icon */}
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Have Questions?
                </h3>
              </div>

              {/* Subtext */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5">
                Our team is ready to assist you with accurate details, price breakdown, and availability.
              </p>
            
              {/* Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  {/* CTA Button */}
                <Button
                  className="w-full py-3 text-sm sm:text-base font-medium rounded-lg"
                  onClick={() => {
                    window.open(
                      `https://mail.google.com/mail/?view=cm&fs=1&to=yasinathanikar06@gmail.com&su=Inquiry About Car&body=Hello, I am interested in this car.`,
                      "_blank"
                    );
                  }}> 📩 Request Info
                </Button>
                
                {/* Call */}
              <a href={`tel:+91${car.ownerPhone || "8421000786"}`}>
                <Button className="w-full py-3 text-sm sm:text-base font-medium bg-green-600 hover:bg-green-500 text-white rounded-lg">
                  📞 Call Now
                </Button>
              </a>
              </div>

          </CardContent>
          </Card>


  {/* Status */}
  {(car.status === "SOLD" || car.status === "UNAVAILABLE") && (
    <Alert variant="destructive" className="py-3 text-sm sm:text-base">
      <AlertTitle className="capitalize font-bold text-sm">
        This car is {car.status.toLowerCase()}
      </AlertTitle>
      <AlertDescription className="text-xs">
        Please check again later.
      </AlertDescription>
    </Alert>
  )}

  {/* Book Test Drive */}
  {car.status !== "SOLD" && car.status !== "UNAVAILABLE" && (
    <Button
      className="w-full py-4 sm:py-5 text-sm sm:text-lg font-semibold rounded-xl shadow-md hover:scale-[1.01] transition-transform"
      onClick={handleBookTestDrive}
      disabled={testDriveInfo.userTestDrive}
    >
      <Calendar className="mr-2 h-5 w-5" />
      {testDriveInfo.userTestDrive
        ? `Booked for ${format(new Date(testDriveInfo.userTestDrive.bookingDate), "EEE, MMM d")}`
        : "Book Test Drive"}
    </Button>
  )}
        </div>
      </div>

      {/* Details & Features Section */}
<div className="mt-5 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    
    {/* Description */}
    <div>
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-[#FF4B4B] to-[#B30000] text-transparent bg-clip-text mb-4">
        Description
      </h3>
      <p className="text-gray-700 text-base md:text-lg leading-relaxed">
        {car.description}
      </p>
    </div>
    
    {/* Features */}
    <div>
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-[#FF4B4B] to-[#B30000] text-transparent bg-clip-text mb-4">
        Features
      </h3>
      <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-full shadow-sm">
          {car.transmission} Transmission
        </span>
        <span className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-full shadow-sm">
          {car.fuelType} Engine
        </span>
        <span className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-full shadow-sm">
          {car.bodyType} Body Style
        </span>
        
        
      </div>
    </div>

  </div>
</div>


      {/* car Overview */}
      <Card className="mt-8 rounded-2xl shadow-sm border bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Car Overview</CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {specs.map((item, index) => (
          <div key={index}>
            <div className="flex items-start gap-3">
              <item.icon className="h-5 w-5 text-blue-600 mt-1" />

              <div>
                <p className="text-gray-500 text-sm">{item.label}</p>
                <p className="font-semibold text-[15px] mt-0.5">{item.value}</p>
              </div>
            </div>

            {/* Divider except for last row */}
            {(index + 1) % 3 !== 0 && (
              <Separator className="mt-4 sm:hidden block" />
            )}
          </div>
        ))}
      </CardContent>
     </Card>
  

      {/* Dealership Location Section */}
      <div className="mt-8">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-3">
          <h2 className="text-2xl font-bold mb-6">Dealership Location</h2>

          <div className="bg-gray-50 rounded-2xl p-6 flex flex-col lg:flex-row justify-between gap-8">

            {/* Left Side: Dealership Info */}
            <div className="flex items-start gap-2 flex-1">
              <div className="bg-blue-100 p-2 -ml-3 rounded-full">
                <LocateFixed className="h-6 w-6 text-blue-600" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900">RK Motors</h3>

                <p className="text-gray-700 mt-1 leading-relaxed">
                  {testDriveInfo.dealership?.address ||
                    "Not Available"}
                </p>

                <p className="text-gray-700 mt-2">
                  <span className="font-medium">Phone: </span>
                  {testDriveInfo.dealership?.phone || "Not Available"}
                </p>

                <p className="text-gray-700">
                  <span className="font-medium">Email: </span>
                  {testDriveInfo.dealership?.email || "Not Available"}
                </p>
              </div>
            </div>

            {/* Right Side: Working Hours */}
            <div className="flex-1 lg:max-w-xs">
              <h3 className="text-lg font-semibold">Working Hours</h3>

              <div className="space-y-2 p-4">

                {/* Static client-specified hours */}
                {[
                  { day: "Monday", isOpen: false, time: "Closed" },
                  { day: "Tuesday", isOpen: true, time: "09:00 – 20:00" },
                  { day: "Wednesday", isOpen: true, time: "09:00 – 20:00" },
                  { day: "Thursday", isOpen: true, time: "09:00 – 20:00" },
                  { day: "Friday", isOpen: true, time: "09:00 – 20:00" },
                  { day: "Saturday", isOpen: true, time: "09:00 – 20:00" },
                  { day: "Sunday", isOpen: true, time: "09:00 – 20:00" },
                ].map((item) => (
                  <div
                    key={item.day}
                    className="flex justify-between text-sm items-center"
                  >
                    <span className="text-gray-700">{item.day}</span>
                    <span className={`${item.isOpen ? "text-gray-900" : "text-red-500 font-medium"}`}>
                      {item.time}
                    </span>
                  </div>
                ))}
                
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>



  );
}

export default CarDetails;