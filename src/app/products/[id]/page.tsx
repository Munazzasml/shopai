import { notFound } from "next/navigation";
import { Star, CheckCircle, Tag } from "lucide-react";
import { PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";
import AddToCartBtn from "@/components/ui/AddToCartBtn";

// 1. Tell Next.js to pre-build a page for every product ID in our mock data
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

// 2. The Page Component (Notice we added 'async' and 'Promise')
export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // We must 'await' the params in the newest Next.js versions!
  const resolvedParams = await params;
  
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound(); // Shows the 404 page if ID doesn't exist
  }

  // Find related products in the same category (excluding this one)
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Product Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        
        {/* Left: Image */}
        <div className="bg-gray-100 rounded-3xl overflow-hidden aspect-square border border-gray-200 relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-2">
            <span className="inline-block bg-gray-100 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              {product.category}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-md">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-yellow-700">{product.rating}</span>
            </div>
            <div className="flex items-center text-green-600 font-medium space-x-1">
              <CheckCircle className="w-5 h-5" />
              <span>In Stock</span>
            </div>
          </div>
          
          <p className="text-4xl font-black text-gray-900 mb-8">
            {formatPrice(product.price)}
          </p>
          
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            {product.description}
          </p>

          {/* Client Component for interactive Add to Cart */}
          <AddToCartBtn product={product} />

          {/* Tags */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
              <Tag className="w-4 h-4 mr-2" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}