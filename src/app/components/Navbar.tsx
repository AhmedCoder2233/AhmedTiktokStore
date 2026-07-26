'use client';

import { useCart } from './CartContext';
import { FaShoppingCart } from 'react-icons/fa';
import Link from 'next/link';

export default function Navbar() {
  const { itemCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="text-2xl font-extrabold">
          Ahmed<span className="text-blue-600">.</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link href="#courses" className="hover:text-blue-600 transition">
            Courses
          </Link>
          <Link href="#services" className="hover:text-blue-600 transition">
            Services
          </Link>
          <Link
            href="#cart"
            className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition"
          >
            <FaShoppingCart />
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="bg-red-500 text-white text-[0.65rem] font-bold px-2 py-0.5 rounded-full ml-1">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}