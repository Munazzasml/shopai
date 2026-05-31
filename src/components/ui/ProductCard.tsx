"use client"; // We need this so the button can handle clicks!

import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }: { product: Product }) {
  // Bring in our addToCart function from the context!
  const { addToCart } = useCart();

  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      
      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="relative h-64 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 uppercase tracking-wide">
          {product.category}
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-md">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        {/* Price and Add to Cart Button */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <span className="text-xl font-black text-gray-900">
            {formatPrice(product.price)}
          </span>
          <button 
            // Here is where we actually call the function!
            onClick={() => addToCart(product, 1)}
            className="flex items-center space-x-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
      
    </div>
  );
}