"use client";

import { usePathname } from "next/navigation";

export default function WhatsappFloating({ car }) {
  const pathname = usePathname();

  // Check if user is inside a specific car detail page (e.g. /cars/abc123)
  const isCarDetailPage = pathname.startsWith("/cars/");

  let message;

  if (isCarDetailPage && car) {
    // Auto message with car details
    message = `
Hello, I am interested in the ${car.make} ${car.model} (${car.year}) listed on RK Motors.

Could you please share:
• Final Negotiable Price?
• Vehicle Condition?
• Insurance Validity?
• Service History & Any Accidents?
• Test Drive Availability?

Looking forward to your reply.`;
  } else {
    // Default message for homepage or anywhere else
    message = "Hello, I would like to inquire about a car listed on RK Motors. Please assist me.";
  }

  
  return (
    <>
      

      <a
        href={`https://wa.me/917796000786?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50"
      >
        <img
          src="/whatsapp.webp"
          alt="WhatsApp"
          className="w-16 h-16 hover:scale-110 drop-shadow-lg transition-all duration-300"
        />
      </a>
    </>
  );
}
