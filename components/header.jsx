"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignedIn, SignInButton, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react";
import { Button } from "./ui/button";

const Header = ({ isAdminPage = false }) => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const isAdmin = user?.publicMetadata?.role === "ADMIN";

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <nav className="mx-auto px-4 py-4 flex items-center justify-between">
        <Link href={isAdminPage ? "/admin" : "/"} className="flex">
          <Image
            src={"/RKmotor.png"}
            alt="RK Motor"
            width={200}
            height={80}
            className="h-10 w-auto object-contain"
            priority
          />
          {isAdminPage && <span className="text-xs font-extralight">admin</span>}
        </Link>

        <div className="flex items-center space-x-4">
          {isAdminPage ? (
            <Link href="/saved-cars">
              <Button variant="outline" className="flex items-center">
                <ArrowLeft size={18} /> <span>Back to App</span>
              </Button>
            </Link>
          ) : (
            <SignedIn>
              {/* Saved cars */}
              <Link href="/saved-cars">
                <Button>
                  <CarFront size={18} /> <span className="hidden md:inline">Saved Cars</span>
                </Button>
              </Link>

              {/* My Reservation or Admin Portal */}
              {!isAdmin ? (
                <Link href="/reservations">
                  <Button variant="outline">
                    <Heart size={18} /> <span className="hidden md:inline">My Reservation</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/admin">
                  <Button variant="outline">
                    <Layout size={18} /> <span className="hidden md:inline">Admin Portal</span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}

          <SignedOut>
            <SignInButton forceRedirectUrl="/">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>

          {/* User Avatar */}
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
