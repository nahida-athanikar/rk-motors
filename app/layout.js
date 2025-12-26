// Font Styling
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
const inter = Inter({subsets:["latin"]})
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from "sonner";
import { Facebook, Image, Instagram } from "lucide-react";
import WhatsappFloating from "./(main)/cars/_components/whatsappFloating";
import UserChatbot from "@/components/UserChatbot";
import AIChatWidget from "@/components/AIChatWidget";


export const metadata = {
  title: "RK Motors",
  description: "Find your dream Car",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Header />

          <main className="min-h-screen"> {children} </main>
          <Toaster richColors />
          
          <footer className="bg-grey-50 py-2">
            <div className="container mx-auto px- flex flex-col items-center gap-2 text-center mb-4">

              {/* Logo */}
              <div className="w-30 h-auto m-5">
                <img src="./RKmotor.webp" alt="RK Motors" />
              </div>   

              
              {/* Text */}
              <p className="-mt-5 text-black text-sm font-semibold">
                Premium Pre-Owned Cars. Verified. Trusted. AI Assisted.
              </p>

              {/* Copyright */}
              <p className="text-gray-600 text-xs">
                © 2025 RK Motors — All Rights Reserved.
              </p>
            </div>
          </footer>
        <WhatsappFloating />
        <AIChatWidget />
        </body>
      </html>
    </ClerkProvider>
  );
}
