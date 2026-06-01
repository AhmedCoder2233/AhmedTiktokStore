"use client";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "./CartContext";

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/#services", label: "Services" },
    { href: "/#courses", label: "Courses" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(3,5,7,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(201,145,42,0.1)" }}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #c9912a, #e8b84b)" }}>
            <span className="font-display font-bold text-black text-sm">AM</span>
          </div>
          <span className="font-display text-lg font-semibold gold-text hidden sm:block">Ahmed Memon</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm font-body text-gray-400 hover:text-amber-400 transition-colors duration-200">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Cart + mobile */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 rounded-lg btn-outline">
            <ShoppingCart size={18} className="text-amber-400" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-black" style={{ background: "#c9912a" }}>
                {count}
              </span>
            )}
          </Link>
          <button className="md:hidden p-2 text-gray-400 hover:text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: "rgba(8,13,18,0.98)" }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-gray-300 hover:text-amber-400 py-2 border-b border-gray-800 text-sm" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}