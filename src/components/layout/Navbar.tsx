"use client"; // Needs to be a client component because we use State and Context

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  // Helper list for our navigation links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo on the left */}
          <Link href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
            ShopAI
          </Link>

          {/* Desktop Navigation (Hidden on mobile) */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-black font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right side: Cart & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            
            {/* Cart Icon */}
            <Link href="/cart" className="relative p-2 text-gray-600 hover:text-black transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {/* Badge for item count */}
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Menu (Hidden on desktop) */}
            <button
              className="md:hidden p-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
              className="block py-2 text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50 rounded-md"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}