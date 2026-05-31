import Link from "next/link";
import { Sparkles, ArrowRight, Laptop, Shirt, Sofa } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";

export default function Home() {
  // Grab the first 6 products for our Featured section
  const featuredProducts = PRODUCTS.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white pt-24 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4" />
            <span>Introducing ShopAI Assistant</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 max-w-4xl mx-auto">
            Shop smarter with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI.</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover the perfect products in seconds. Our AI-powered shopping assistant helps you find exactly what you need, tailored to your style and budget.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              href="/products" 
              className="w-full sm:w-auto px-8 py-4 bg-black hover:bg-gray-800 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Browse Products
            </Link>
            <button className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-900 rounded-xl font-semibold text-lg transition-all flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Try AI Assistant</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Category 1 */}
            <Link href="/products?category=Electronics" className="group relative bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors border border-gray-100">
              <Laptop className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Electronics</h3>
              <p className="text-gray-500 mb-4">Laptops, audio, and gadgets</p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                Explore <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Category 2 */}
            <Link href="/products?category=Fashion" className="group relative bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors border border-gray-100">
              <Shirt className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Fashion</h3>
              <p className="text-gray-500 mb-4">Apparel, shoes, and accessories</p>
              <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                Explore <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

            {/* Category 3 */}
            <Link href="/products?category=Home" className="group relative bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors border border-gray-100">
              <Sofa className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Home</h3>
              <p className="text-gray-500 mb-4">Furniture, decor, and living</p>
              <div className="flex items-center text-green-600 font-semibold group-hover:translate-x-2 transition-transform">
                Explore <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked items just for you.</p>
            </div>
            <Link href="/products" className="hidden sm:flex items-center text-black font-semibold hover:underline">
              View all products <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {/* Grid of Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-10 sm:hidden flex justify-center">
            <Link href="/products" className="flex items-center text-black font-semibold hover:underline border border-gray-300 px-6 py-3 rounded-lg w-full justify-center">
              View all products <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ABOUT / CTA BANNER */}
      <section className="bg-gray-900 py-24 relative overflow-hidden">
        {/* Decorative background circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <Sparkles className="w-12 h-12 text-blue-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Not sure what you're looking for?
          </h2>
          <p className="text-xl text-gray-400 mb-10 leading-relaxed">
            Our AI Shopping Assistant can analyze your needs, compare products, and give you personalized recommendations in real-time. Just click the chat bubble in the corner to start.
          </p>
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            Start Browsing Now
          </Link>
        </div>
      </section>

    </div>
  );
}