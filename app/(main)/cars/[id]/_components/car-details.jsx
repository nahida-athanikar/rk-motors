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
    <div>
      <div className="flex flex-col lg:flex-row gap-8 -mt-19">
        {/* Image Gallery */}
        <div className="w-full lg:w-7/12">
          <div className="aspect-video rounded-lg overflow-hidden relative mb-4">
            {car.images && car.images.length > 0 ? (
              <Image
                src={car.images[currentImageIndex]}
                alt={`${car.year} ${car.make} ${car.model}`}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <Car className="h-24 w-24 text-gray-400" />
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {car.images && car.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {car.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-md h-20 w-24 flex-shrink-0 transition ${
                    index === currentImageIndex
                      ? "border-2 border-blue-600"
                      : "opacity-70 hover:opacity-100"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image}
                    alt={`${car.year} ${car.make} ${car.model} - view ${
                      index + 1
                    }`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Secondary Actions */}
          <div className="flex mt-4 gap-4">
            <Button
              variant="outline"
              className={`flex items-center gap-2 flex-1 ${
                isWishlisted ? "text-red-500" : ""
              }`}
              onClick={handleSaveCar}
              disabled={savingCar}
            >
              <Heart
                className={`h-5 w-5 ${isWishlisted ? "fill-red-500" : ""}`}
              />
              {isWishlisted ? "Saved" : "Save"}
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 flex-1"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
              Share
            </Button>
          </div>
        </div>

        {/* Car Details */}
        <div className="w-full lg:w-5/12">
          <div className="flex items-center justify-between">
            <Badge className="mb-2">{car.bodyType}</Badge>
          </div>

          <h1 className="text-4xl font-bold mb-1">
            {car.year} {car.make} {car.model}
          </h1>

          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(car.price)}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6">
            <div className="flex items-center gap-2">
              <Gauge className="text-gray-500 h-5 w-5" />
              <span>{car.mileage.toLocaleString("en-IN")} km</span>
            </div>
            <div className="flex items-center gap-2">
              <Fuel className="text-gray-500 h-5 w-5" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="text-gray-500 h-5 w-5" />
              <span>{car.transmission}</span>
            </div>
          </div>

          <Dialog>
            <DialogTrigger className="w-full text-start">
              <Card className="pt-5">
                <CardContent>
                  <div className="flex items-center gap-2 text-lg font-medium mb-2">
                    <Currency className="h-5 w-5 text-blue-600" />
                    <h3>EMI Calculator</h3>
                  </div>
                  <div className="text-sm text-gray-600">
                    Estimated Monthly Payment:{" "}
                    <span className="font-bold text-gray-900">
                      {formatCurrency(car.price / 60)}
                    </span>{" "}
                    for 60 months
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    *Based on ₹0 down payment and 4.5% interest rate
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>RK Motors Car Loan Calculator</DialogTitle>
                <EmiCalculator price={car.price} />
              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* Request More Info */}
          <Card className="my-6">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-lg font-medium mb-2">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <h3>Have Questions?</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Our representatives are available to answer all your queries
                about this vehicle.
              </p>
              <a href="mailto:yasinathanikar06@gmail.com">
                <Button variant="outline" className="w-full">
                  Request Info
                </Button>
              </a>
            </CardContent>
          </Card>

          {(car.status === "SOLD" || car.status === "UNAVAILABLE") && (
            <Alert variant="destructive">
              <AlertTitle className="capitalize">
                This car is {car.status.toLowerCase()}
              </AlertTitle>
              <AlertDescription>Please check again later.</AlertDescription>
            </Alert>
          )}

          {/* Book Test Drive Button */}
          {car.status !== "SOLD" && car.status !== "UNAVAILABLE" && (
            <Button
              className="w-full py-6 text-lg"
              onClick={handleBookTestDrive}
              disabled={testDriveInfo.userTestDrive}
            >
              <Calendar className="mr-2 h-5 w-5" />
              {testDriveInfo.userTestDrive
                ? `Booked for ${format(
                    new Date(testDriveInfo.userTestDrive.bookingDate),
                    "EEEE, MMMM d, yyyy"
                  )}`
                : "Book Test Drive"}
            </Button>
          )}
        </div>
      </div>

      {/* Details & Features Section */}
      <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6">Description</h3>
            <p className="whitespace-pre-line text-gray-700">
              {car.description}
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6">Features</h3>
            <ul className="grid grid-cols-1 gap-2">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                {car.transmission} Transmission
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                {car.fuelType} Engine
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                {car.bodyType} Body Style
              </li>
              {car.seats && (
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                  {car.seats} Seats
                </li>
              )}
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                {car.color} Exterior
              </li>
            </ul>
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