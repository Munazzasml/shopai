import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          
          {/* Copyright */}
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} ShopAI. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link href="#" className="hover:text-gray-900 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-gray-900 transition-colors">
              FAQ
            </Link>
          </div>
          
        </div>
      </div>
    </footer>
  );
}