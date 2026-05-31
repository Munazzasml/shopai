import { Sparkles, Code2, Database, Layout, Bot, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header Section */}
      <div className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">ShopAI</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We are revolutionizing the e-commerce experience by combining modern web technologies with advanced Artificial Intelligence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Project Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Shopping online can be overwhelming with thousands of choices. ShopAI was built to solve this by providing a smart, AI-powered shopping assistant that helps users discover, evaluate, and purchase exactly what they need.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              This platform serves as a group project demonstrating the seamless integration of a high-performance frontend with an intelligent, data-driven backend.
            </p>
          </div>
          <div className="bg-gray-100 rounded-3xl p-8 aspect-video flex items-center justify-center border border-gray-200">
            <Sparkles className="w-32 h-32 text-blue-500 opacity-50" />
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powered by Modern Tech</h2>
            <p className="text-gray-600">Built using the latest tools for performance and scalability.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <Layout className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Frontend</h3>
              <p className="text-gray-500 text-sm">Next.js 14, React, TypeScript, and Tailwind CSS for a fast, responsive UI.</p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <Code2 className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Backend</h3>
              <p className="text-gray-500 text-sm">FastAPI (Python) for lightning-fast API responses and AI processing.</p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <Bot className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">AI Engine</h3>
              <p className="text-gray-500 text-sm">OpenAI integration for intelligent product recommendations and natural conversation.</p>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <Database className="w-10 h-10 text-orange-600 mb-4" />
              <h3 className="font-bold text-gray-900 mb-2">Data</h3>
              <p className="text-gray-500 text-sm">Qdrant Vector Database for RAG (Retrieval-Augmented Generation).</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-200">
          <div className="text-center mb-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Team</h2>
            <p className="text-gray-600">The developers behind ShopAI.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Member 1 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">M1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Maryam</h3>
              <p className="text-blue-600 text-sm font-medium mb-4">Frontend Developer</p>
              <p className="text-gray-500 text-sm">Focused on building the Next.js UI, managing state, and creating responsive layouts with Tailwind CSS.</p>
            </div>

            {/* Member 2 */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 text-center">
              <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">M2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Munazza Ismail</h3>
              <p className="text-purple-600 text-sm font-medium mb-4">Backend & AI Developer</p>
              <p className="text-gray-500 text-sm">Focused on the FastAPI backend, OpenAI integration, and configuring the Qdrant vector database.</p>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}