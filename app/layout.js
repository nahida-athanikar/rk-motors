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
          
          <footer className="bg-zinc-900 text-gray-300 py-8 px-6 md:px-16 border-t border-zinc-800">
              {/* Top Grid */}
             <div className="border-b border-zinc-700 pb-5">

                {/* ROW 1: LOGO (Mobile single row) */}
                <div className="flex justify-center md:justify-start mb-5">
                  <div className="flex flex-col items-center md:items-start gap-2">
                    <img
                      src="/RKmotors-white.webp"
                      alt="RK Motors"
                      className="w-[120px]"
                    />
                    <p className="text-[10px] text-zinc-500">
                      Designed for RK Motors
                    </p>
                  </div>
                </div>

                {/* ROW 2: 3 COLUMNS */}
                <div className="grid grid-cols-3 gap-6 text-center md:text-left md:grid-cols-3">

                  {/* Quick Links */}
                  <div className="flex flex-col gap-2">
                    <h4 className="font-semibold text-white mb-2">Quick Links</h4>
                    <a href="/" className="text-sm text-zinc-500 hover:text-white"> Home</a>
                    <a href="/cars" className="text-sm text-zinc-500 hover:text-white">   Cars</a>
                    <a href="tel:+918421000786" className="flex items-center gap-2 text-sm text-zinc-500 hover:text-white"
                    >📞 Contact
                    </a>

                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-2">
                    <h4 className="font-semibold text-white mb-2">Address</h4>
                    <p className="text-sm text-zinc-500">RK Motors</p>
                    <p className="text-sm text-zinc-500">
                      1334, J.J. Complex, Shop No.1
                    </p>
                    <p className="text-sm text-zinc-500">
                      Kolhapur, Maharashtra
                    </p>
                  </div>

                  {/* Social Icons */}
                  <div className="flex flex-col gap-3 items-center md:items-start">
                    <h4 className="font-semibold text-white mb-2">Follow Us</h4>
                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 text-lg items-center md:items-start">
                      <Facebook className="hover:text-green-400 transition cursor-pointer" />
                      <Instagram className="hover:text-pink-400 transition cursor-pointer" />
                      <Image className="hover:text-blue-400 transition cursor-pointer" />
                    </div>

                  </div>

                </div>
              </div>

              {/* Bottom Bar */}
              <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
                <p>© {new Date().getFullYear()} RK Motors. All rights reserved.</p>

                <p>
                  Got a question? Contact{" "}
                  <span className="text-green-400 font-medium">
                    Chat via WhatsApp
                  </span>
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
