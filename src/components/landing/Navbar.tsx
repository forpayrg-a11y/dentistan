// src/components/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src="/logo.png" 
                alt="DenTourist Logo" 
                width={40} 
                height={40} 
                className="h-10 w-10 object-contain"
              />
              <span className="text-2xl font-bold text-blue-600">
                DenTourist
              </span>
            </Link>
          </div>

          {/* DESKTOP MENU (Büyük Ekranlar) */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="#treatments"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Treatments
            </Link>
            <Link
              href="#gallery"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Before & After
            </Link>
          </div>

          {/* CTA BUTTON (Aksiyon Butonu) */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#contact"
              className="rounded-full bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-all shadow-md"
            >
              Get a Free Quote
            </Link>
          </div>

          {/* MOBILE MENU BUTTON (Hamburger) */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU CONTENT (Açılır Menü) */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            >
              Home
            </Link>
            <Link
              href="#treatments"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            >
              Treatments
            </Link>
            <Link
              href="#gallery"
              onClick={() => setIsOpen(false)}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
            >
              Before & After
            </Link>
            <Link
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 block w-full rounded-md bg-blue-600 px-3 py-3 text-center text-base font-medium text-white hover:bg-blue-700"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
