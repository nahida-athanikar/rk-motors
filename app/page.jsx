import { Button } from "@/components/ui/button";
import HomeSearch from "@/components/home-search";
import { Calendar, Car, ChevronRight, Shield } from "lucide-react";
import { bodyTypes, carMakes, faqItems, featuredCars } from "@/lib/data";
import CarCard from "@/components/car-card";
import Link from "next/link";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SignedOut } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="pt-18 flex flex-col">
      {/* Hero Section */}

      <section className="relative py-16 md:py-28 dotted-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-8xl mb-4 gradient-title">Find your Dream Car with RK Motors</h1>
            <p className="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">Advanced AI Car Search and test drive from thousands of vehicles.</p>
          </div>

          {/* Search  */}
          <HomeSearch />
        </div>
      </section>

      {/* Featured car */}
      <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Featured cars</h2>
          <Button variant="ghost" className="flex items-center" asChild>
            <Link href="cars">
            View All<ChevronRight className="ml-1 h-4 w-4" />
             </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCars.map((car)=> {
            return <CarCard key={car.id} car={car} />;
          })}
        </div>
      </div>
      </section>


      {/* Explore Popular Brands */}
      <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Explore Popular Brands</h2>
          <Button variant="ghost" className="flex items-center" asChild>
            <Link href="cars">
            View All<ChevronRight className="ml-1 h-4 w-4" />
             </Link>
          </Button>
        </div>
        
        {/*Brand Logo div and their name */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {carMakes.map((make) => {
            return <Link key={make.name} 
          href={`/cars?make=${make.name}`}
          className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition cursor-pointer">
            <div className="h-16 w-auto mx-auto mb-2 relative">
              <Image 
                src={make.image} 
                alt={make.name} 
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <h3 className="font-medium">{make.name}</h3>
          </Link>
          })}         
        </div>
      </div>
      </section>

      {/* Why Choose Our Platform */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12" >Why Choose Our Platform
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"> 
                <Car className="h-8 w-8" />
              </div>
                <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
                <p className="text-gray-600 font-bold mb-2">
                  Thousands of verified vehicles from dealerships and private sellers. 
                </p>
              </div>

              <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"> 
                <Calendar className="h-8 w-8" />
              </div>
                <h3 className="text-xl font-bold mb-2">Easy Test Drive </h3>
                <p className="text-gray-600 font-bold mb-2">
                 book a test drive online in minutes, with flexible scheduling options. 
                </p>
              </div>

              <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4"> 
                <Shield className="h-8 w-8" />
              </div>
                <h3 className="text-xl font-bold mb-2">Secure Process</h3>
                <p className="text-gray-600 font-bold mb-2">
                  Verified listings and secure booking process for peace of mind. 
                </p>
              </div>
            </div>
        </div>
      </section>


      {/* Explore by Body Type */}
      <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Explore by Body Type</h2>
          <Button variant="ghost" className="flex items-center" asChild>
            <Link href="cars">
            View All<ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {/*Brand Logo div and their name */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bodyTypes.map((type) => {
            return <Link key={type.name} 
          href={`/cars?bodyTypes=${type.name}`}
          className="group shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition duration-300">
            <div className="h-10 w-20 mb-4 flex items-center justify-center">
              <Image 
                src={type.image} 
                alt={type.name} 
                width={64}
                height={60}
                className="group-hover:scale-110 transition-transform duration-300 group-hover:text-blue-600"
              />
            </div>
            <div className="font-semibold text-lg text-gray-800 group-hover:text-blue-600">
               {type.name}
            </div>

          </Link>
          })}         
        </div>
      </div>
      </section>


      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => {
              return <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>

            })}
            
          </Accordion>
        </div>
      </section>


      <section className="py-16 dotted-background text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Car?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">Join thousands of satisfied customers who found their perfect vehicle through our platform.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/cars">View All Cars</Link>
            </Button>
            <SignedOut size="lg" asChild>
              <Link href="/sign-up">Sign Up Now</Link>
            </SignedOut>
          </div>
        </div>
      </section>
    </div>
  )
  
}
