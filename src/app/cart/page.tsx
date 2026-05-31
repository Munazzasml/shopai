"use client";

import Link from "next/link";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();

  const shipping = totalPrice > 50 || items.length === 0 ? 0 : 10;
  const finalTotal = totalPrice + shipping;

  const handleCheckout = () => {
    alert("Checkout successful! Thank you for your order. (This is a mock checkout)");
    clearCart();
  };

  // EMPTY CART STATE
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="bg-gray-100 p-6 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-gray-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Looks like you haven't added anything to your cart yet. Browse our products to find something you'll love!
        </p>
        <Link 
          href="/products" 
          className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  // FILLED CART STATE
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-10">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Cart Items List */}
        <div className="lg:w-2/3 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
              
              {/* Image */}
              <div className="sm:w-32 sm:h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              {/* Item Details */}
              <div className="flex flex-col flex-grow sm:ml-6 justify-center">
                <div className="flex justify-between items-start mb-2">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 line-clamp-1">{item.name}</h3>
                  </Link>
                  <p className="font-bold text-gray-900">{formatPrice(item.price)}</p>
                </div>
                <p className="text-gray-500 text-sm mb-4">{item.category}</p>
                
                {/* Controls */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-10 text-center font-semibold text-gray-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Remove
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Right Side: Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                {shipping === 0 ? (
                  <span className="font-medium text-green-600">Free</span>
                ) : (
                  <span className="font-medium text-gray-900">{formatPrice(shipping)}</span>
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-6 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-3xl font-black text-gray-900">{formatPrice(finalTotal)}</span>
              </div>
              {shipping !== 0 && (
                <p className="text-sm text-gray-500 mt-2 text-right">
                  Add {formatPrice(50 - totalPrice)} more for free shipping!
                </p>
              )}
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full flex items-center justify-center space-x-2 bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}