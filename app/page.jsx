import { Suspense } from "react";
import FeaturedCarsServer from "@/components/FeaturedCarsServer";
import FeaturedCarsMarquee from "@/components/FeaturedCarsMarquee";

import { Button } from "@/components/ui/button";
import HomeSearch from "@/components/home-search";
import { Calendar, Car, ChevronRight, Shield } from "lucide-react";
import { bodyTypes, carMakes, faqItems } from "@/lib/data";
import CarCard from "@/components/car-card";
import Link from "next/link";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SignedOut } from "@clerk/nextjs";
//import { getFeaturedCars } from "@/actions/home";



export default async function Home() {

  //const featuredCars = await getFeaturedCars();

  return (
  <div className="pt-16 flex flex-col">

    {/* HERO SECTION NEW UI */}
    <section className="relative overflow-hidden py-7 bg-cover bg-center bg-no-repeat bg-fixed animate-fadeZoom"  
      style={{backgroundImage: "url('/HeroSection/HomeCar2.png')"}}>    
      <div className="absolute inset-0 bg-black/30"/>

        {/* Title */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 ">
          <h1 className="text-4xl md:text-7xl font-extrabold text-[#f9fdf2] leading-[1.2] md:leading-tight mb-4">
            <span className="bg-gradient-to-b from-white via-[#fa3939] to-[#e00909] bg-clip-text text-transparent">
              RK Motors
            </span>
            <br />
            <span className="text-2xl md:text-5xl font-semibold block mt-2 italic">
              Premium Pre-Owned Cars for Every Drive
            </span>
          </h1>

          <p className="max-w-lg mx-auto text-[#e9e6f9] text-base font-semibold  md:text-xl leading-relaxed mb-8">
            From buying, selling, insurance to exchange — RK Motors ensures honest deals,
            quality cars, and complete customer satisfaction every step of the way.
          </p>

          {/* Search */}
          <HomeSearch />
        </div>

        <Suspense fallback={null}>
          <FeaturedCarsMarquee />
        </Suspense>

    </section>


    {/* Featured car */}
      <section className="py-8 lg:px-8">
        <div className="container mx-auto px-4">

          {/* Heading */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-br from-[#FF4B4B] to-[#B30000] text-transparent bg-clip-text">
              Featured Cars
            </h2>

            <Button variant="link" asChild className="flex items-center gap-1">
              <Link href="/cars">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Scrollable row */}
          <div
            className="
              flex 
              space-x-6 
              overflow-x-auto 
              overflow-y-hidden 
              snap-x 
              snap-mandatory 
              pb-4
              mx-1 px-4
              scroll-smooth
            "
            style={{ scrollbarWidth: "none" }}
          >
            <Suspense fallback={<p className="text-center">Loading featured cars...</p>}>
                <FeaturedCarsServer />
            </Suspense>

          </div>

        </div>
      </section>


    {/* Explore Popular Brands */}
      <section className="bg-gray-50 -mt-10 lg:px-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-br from-[#FF4B4B] to-[#B30000] text-transparent bg-clip-text">
              Explore Brands</h2>

            <Button variant="link" asChild className="flex items-center gap-1">
              <Link href="/cars">
                View All <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Horizontal Brand Slider */}
          <div className="relative overflow-hidden">
        <div
          className="brand-track flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-1">
          {[...carMakes, ...carMakes].map((make, index) => (
            <Link
              key={index}
              href={`/cars?make=${make.name}`}
              className="brand-card min-w-[130px] bg-white shadow border-2 border-black p-4 text-center 
                        hover:shadow-2xl transition-all snap-start cursor-pointer 
                        transform hover:scale-[1.15] hover:-translate-y-2 
                        hover:rotate-x-3 hover:rotate-y-3 duration-300">

              <div className="h-20 w-auto mx-auto mb-2 relative">
                <Image
                  src={make.image}
                  alt={make.name}
                  fill
                  style={{ objectFit: "contain" }}/>
              </div>
              <h3 className="font-medium text-sm">{make.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
      </section>
      
    {/* Why choose RK motors */}
    <section className="py-5 mt-3 lg:px-8">
        <div className="container mx-auto px-4">

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-5 tracking-tight">
            <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-br from-[#FF4B4B] to-[#B30000] text-transparent bg-clip-text">
              Why Choose RK Motors
            </span>
          </h2>

          {/* 3 premium cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              img: "./HeroSection/hero1.webp",
              icon: <Car className="h-10 w-10" />,
              title: "Wide Selection",
              desc: "Choose from fully inspected luxury and budget-friendly cars."
            },{
              img: "./HeroSection/hero7.webp",
              icon: <Calendar className="h-10 w-10"/>,
              title: "Flexible Test Drives",
              desc: "Book a test drive online with seamless scheduling."
            },{
              img: "./HeroSection/hero8.webp",
              icon: <Shield className="h-10 w-10"/>,
              title: "Verified & Secure",
              desc: "Transparent inspection, verified papers, trusted purchase experience."
            }].map((item, i)=> (
              
              <div key={i}
                className="relative rounded-2xl p-10 flex flex-col items-center text-center overflow-hidden border border-[#ffffff20]
                transition-all duration-500 hover:scale-[1.03] shadow-xl">

                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:brightness-75 transition-all duration-500"
                  style={{ backgroundImage: `url(${item.img})` }}
                ></div>

                {/* Overlay for visibility */}
                <div className="absolute inset-0 bg-black/50 backdrop-blur-[0.5px]"></div>

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center gap-4">
                  
                  {/* Icon */}
                  <div className="mb-6 bg-white/10 backdrop-blur-md border border-white/20
                  w-20 h-20 flex items-center justify-center rounded-full transition-all duration-500 text-white">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>

                  {/* Desc */}
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>
    </section>


    {/* Explore by Body Type */}
    <section className="bg-gray-50 mt-3 lg:px-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-br from-[#FF4B4B] to-[#B30000] text-transparent bg-clip-text ">Explore Body Type</h2>
          <Button variant="link" className="flex items-center gap-1" asChild>
            <Link href="/cars">
            View All<ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        
                {/* Horizontal Brand Slider (seamless loop) */}
        <div className="relative overflow-hidden">
          <div className="brand-track flex gap-5 px-1">
            {/* render list twice for seamless loop */}
            {[...bodyTypes, ...bodyTypes].map((type, index) => (
              <Link
                key={`${type.name}-${index}`}
                href={`/cars?bodyTypes=${type.name}`}
                className="brand-card min-w-[130px] bg-white border-2 border-black shadow p-4 text-center
                          transition-all snap-start cursor-pointer transform duration-300
                          hover:scale-[1.12] hover:-translate-y-2"
              >
                <div className="h-20 flex items-center justify-center relative">
                  <Image
                    src={type.image}
                    alt={type.name}
                    width={64}
                    height={60}
                    className="transition-transform duration-300"
                  />
                </div>
                <div className="font-semibold text-lg text-gray-800">
                  {type.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
    
    
     {/* FAQ */}
    <section className="mt-3 py-2 bg-gray-50">
       <div className="container mx-auto px-4 max-w-4xl">
    
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900">
            Frequently Asked <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-br from-[#FF4B4B] to-[#B30000] text-transparent bg-clip-text">Questions</span>
          </h2>
          <p className="text-gray-500 mt-2">
            Everything you need to know before buying a car.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-[#B30000] rounded-xl shadow-sm hover:shadow-md transition-all bg-white animate-fade-up duration-500"
            >
              <AccordionTrigger className="text-lg font-medium px-5 py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="px-5 pb-5 text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>


   {/* Dream car */}
  <section className="relative overflow-hidden py-9 flex items-center justify-center bg-center bg-cover"
  style={{ backgroundImage: "url('/HeroSection/hero6.webp')"}}>
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-[1.2] md:leading-tight mb-4">Ready to Find Your
        <span className="bg-gradient-to-b from-white via-[#fa3939] to-[#c80606] bg-clip-text text-transparent">
        {" "}Dream Car?
        </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-100 mb-5">
          Trusted sellers, verified vehicles, and thousands of happy buyers — now it’s your turn.
        </p>

        <div className="flex flex-col-2 gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:scale-110 transition-all duration-300 px-8 font-semibold"
            asChild>
            <Link href="/cars">View All Cars</Link>
          </Button>

          <SignedOut>
            <Button
                size="lg"
                variant="outline"
                className="border-gray-400 text-black hover:scale-105 transition-all duration-300 px-8 font-semibold"
                asChild>
                <Link href="/sign-up">Sign Up Now</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </section>

</div>
  )
  
}
