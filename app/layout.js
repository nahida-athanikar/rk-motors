// Font Styling
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
const inter = Inter({subsets:["latin"]})
import { ClerkProvider } from '@clerk/nextjs';


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
          
          <footer className="bg-blue-50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>
                @copyright Rk Motors
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
