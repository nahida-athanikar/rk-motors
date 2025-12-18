import { getCarById } from '@/actions/car-listing';
import { notFound } from 'next/navigation';
import React from 'react'
import TestDriveForm from '../_components/test-drive-form';

export async function generateMetadata() {
   return {
    title: `Book Test Drive | RK Motors`,
    description: `Schedule a test drive in few seconds`,
  };
}

const TestDrivePage = async ({ params }) => {
  const { id } = await params;
  const result = await getCarById(id);

  if(!result.success) {
    notFound();
  }

  return (
     <div className="container mx-auto px-4">
      <h1 className="text-3xl md:text-4xl lg:text-5xl mb-2 gradient-title">Book a Test Drive</h1>
      <TestDriveForm
        car={result.data}
        testDriveInfo={result.data.testDriveInfo}
      />
    </div>
  )
}

export default TestDrivePage;