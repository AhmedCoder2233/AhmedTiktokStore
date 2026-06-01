"use client";
import { useCart } from "./CartContext";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight, PackageOpen } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="card-glass rounded-2xl p-12 text-center max-w-md w-full">
          <PackageOpen size={48} className="text-gray-600 mx-auto mb-4" />
          <h2 className="font-display text-2xl font-semibold text-white mb-2">Your cart is empty</h2>
          <p className="text-gray-400 text-sm mb-8">Add a service or course to get started.</p>
          <Link href="/#services" className="btn-gold px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
            <span>Browse Services</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <ShoppingBag size={22} className="text-amber-400" />
          <h1 className="font-display text-3xl font-bold text-white">Your Cart</h1>
          <span className="ml-auto text-sm text-gray-500">{items.length} item{items.length !== 1 ? "s" : ""}</span>
        </div>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="card-glass rounded-xl p-5 flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(201,145,42,0.12)", border: "1px solid rgba(201,145,42,0.25)" }}>
                <ShoppingBag size={16} className="text-amber-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-white font-medium text-sm">{item.name}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: item.type === "service" ? "rgba(201,145,42,0.1)" : "rgba(99,102,241,0.1)", color: item.type === "service" ? "#e8b84b" : "#a5b4fc" }}>
                    {item.type === "service" ? "Service" : "Course"}
                  </span>
                </div>
                <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
              </div>
              <div className="text-right">
                <div className="font-display font-bold gold-text">Rs. {item.price.toLocaleString()}</div>
              </div>
              <button onClick={() => removeItem(item.id)} className="p-2 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="card-glass rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Subtotal</span>
            <span className="text-white font-medium">Rs. {total.toLocaleString()}</span>
          </div>
          <hr className="section-divider my-3" />
          <div className="flex justify-between items-center">
            <span className="font-display text-lg text-white">Total</span>
            <span className="font-display text-2xl font-bold gold-text">Rs. {total.toLocaleString()}</span>
          </div>
        </div>

        <Link href="/checkout" className="btn-gold w-full py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
          <span>Proceed to Checkout</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}