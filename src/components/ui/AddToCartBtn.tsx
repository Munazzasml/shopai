"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

export default function AddToCartBtn({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleDecrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handleIncrease = () => setQuantity((q) => (q < product.stock ? q + 1 : q));

  return (
    <div className="flex flex-col space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-700 font-medium">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded-lg">
          <button onClick={handleDecrease} className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors">
            <Minus className="w-4 h-4 text-gray-600" />
          </button>
          <span className="w-12 text-center font-semibold text-gray-900">{quantity}</span>
          <button onClick={handleIncrease} className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors">
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        <span className="text-sm text-gray-500">({product.stock} available)</span>
      </div>

      {/* Add to Cart Button */}
      <button 
        onClick={() => addToCart(product, quantity)}
        className="w-full md:w-auto flex items-center justify-center space-x-2 bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
      >
        <ShoppingCart className="w-6 h-6" />
        <span>Add to Cart</span>
      </button>
    </div>
  );
}