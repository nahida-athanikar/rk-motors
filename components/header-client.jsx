"use client";

import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ArrowLeft, Heart, Layout } from "lucide-react";
import { Button } from "./ui/button";

const HeaderClient = ({ isAdminPage, isAdmin }) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-lg shadow-sm z-[100]">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href={isAdminPage ? "/admin" : "/"}>
          <Image
            src="/RKmotor.png"
            alt="RK Motor"
            width={160}
            height={50}
            className="h-10 md:h-12 w-auto object-contain hover:scale-105 transition"
            priority
          />
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          {isAdminPage ? (
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-1 text-sm">
                <ArrowLeft size={18} /> Back
              </Button>
            </Link>
          ) : (
            <SignedIn>
              <Link href="/saved-cars">
                <Button size="sm" className="gap-1 text-sm">
                  <Heart size={18} /> <span className="hidden md:block">Saved</span>
                </Button>
              </Link>

              {!isAdmin ? (
                <Link href="/reservations">
                  <Button size="sm" variant="outline" className="gap-1 text-sm">
                    <Heart size={18} /> <span className="hidden md:block">Bookings</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/admin">
                  <Button size="sm" variant="outline" className="gap-1 text-sm">
                    <Layout size={18} /> <span className="hidden md:block">Admin</span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}

          <SignedOut>
            <SignInButton mode="modal">
              <Button size="sm" variant="default" className="text-sm">
                Login
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 border-2 border-black rounded-full"
                }
              }}
            />
          </SignedIn>
        </div>

      </nav>
    </header>
  );
};

export default HeaderClient;
