import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Import our new components
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ChatWidget from "@/components/ui/ChatWidget";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopAI | Your Smart Shopping Assistant",
  description: "Discover and buy products with AI assistance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* Everything inside CartProvider can access the shopping cart */}
        <CartProvider>
          <Navbar />
          
          {/* main takes up the remaining space so footer pushes to bottom */}
          <main className="flex-grow">
            {children}
          </main>
          
          <Footer />
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  );
}