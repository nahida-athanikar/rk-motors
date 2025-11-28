import { getCarById } from '@/actions/car-listing';
import { notFound } from 'next/navigation';
import React from 'react'
import CarDetails from './_components/car-details';

export async function generateMetadata({ params }) {
  const { id } = await params;
  
  let result;
  try {
    result = await getCarById(id);
  } catch {
    return {
      title: "Car Not Found | RK Motors",
      description: "Unable to fetch car details. Please check your internet connection."
    };
  }

  if(!result?.success || !result?.data) {
    return {
      title: "Car Not Found | RK Motors",
      description: "The requested car could not be found",
    };
  }

  const car = result.data;

  return {
    title: `${car.year} ${car.make} ${car.model} | RK Motors`,
    description: car.description.substring(0, 160),
    openGraph: {
      images: car.images?.[0] ? [car.images[0]] : [],
    },
  };
}

const CarPage = async( { params } ) => {
  const { id } = await params;
  let result;
  try {
    result = await getCarById(id);
  } catch {
    return (
      <div className="container mx-auto px-4 py-12 text-red-500 text-center">
        Failed to load car details. Please check your network connection and try again.
      </div>
    );
  }

  if(!result?.success || !result?.data) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <CarDetails car={result.data} testDriveInfo={result.data.testDriveInfo}/>
    </div>
  )
}

export default CarPage;