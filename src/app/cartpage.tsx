"use client";
import { useCart } from "../CartContext";
import Link from "next/link";
import { Trash2, ArrowLeft, ShoppingBag, Building2, Copy, Check, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, clearCart, total, count } = useCart();
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const halfAmount = Math.floor(total / 2);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  // Get payment note based on item types in cart
  const getPaymentNote = () => {
    const hasService = items.some(i => i.type === "service");
    const hasCourse = items.some(i => i.type === "course");
    
    if (hasService && hasCourse) {
      return "Services: remaining 50% after project completion • Courses: remaining 50% after half course completion";
    } else if (hasService) {
      return "Remaining 50% to be paid after project completion";
    } else if (hasCourse) {
      return "Remaining 50% to be paid after half course completion";
    }
    return "Remaining 50% to be paid after completion";
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <ShoppingBag size={48} className="mx-auto text-stone-300 mb-4" />
          <h2 className="text-2xl font-bold text-stone-900 mb-2">Your cart is empty</h2>
          <p className="text-stone-500 mb-6">Add some services or courses to get started!</p>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white hover:bg-amber-700 transition-colors"
          >
            Browse Services <ArrowLeft size={16} className="rotate-180" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafaf8] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-amber-600 transition-colors mb-4">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900">Checkout</h1>
          <p className="text-stone-500 mt-1">Complete your order with 50% advance payment</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT: Cart Items */}
          <div>
            <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
              <div className="p-5 border-b border-stone-100">
                <h2 className="font-semibold text-stone-900">Your Items ({count})</h2>
              </div>
              <div className="divide-y divide-stone-100">
                {items.map((item) => (
                  <div key={item.id} className="p-5 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${
                          item.type === "service" 
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-stone-100 text-stone-500 border border-stone-200"
                        }`}>
                          {item.type === "service" ? "SERVICE" : "COURSE"}
                        </span>
                        <span className="font-medium text-stone-900 text-sm">{item.name}</span>
                      </div>
                      <p className="text-xs text-stone-400">{item.description}</p>
                      <p className="text-[10px] text-amber-600 mt-1">
                        {item.type === "service" 
                          ? "💼 50% now • 50% after project completion"
                          : "📚 50% now • 50% after half course completion"
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="font-bold text-amber-600 text-sm">Rs. {item.price.toLocaleString()}</span>
                        <div className="text-[10px] text-stone-400">(50%: Rs. {(item.price / 2).toLocaleString()})</div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-stone-300 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={clearCart}
              className="w-full mt-3 py-2.5 rounded-xl text-sm text-red-500 border border-red-200 hover:bg-red-50 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* RIGHT: Payment Section */}
          <div>
            {/* 50% Advance Notice */}
            <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 mb-6 text-center">
              <div className="text-2xl font-bold text-amber-700 mb-1">50% Advance</div>
              <p className="text-sm text-stone-600">Pay 50% now, remaining 50% later</p>
              <div className="mt-3 text-3xl font-bold text-amber-700">Rs. {halfAmount.toLocaleString()}</div>
              <div className="text-xs text-stone-400 line-through">Total: Rs. {total.toLocaleString()}</div>
              <div className="mt-2 text-[10px] text-stone-500">
                {getPaymentNote()}
              </div>
            </div>

            {/* Bank Details */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={18} className="text-amber-600" />
                <h2 className="font-semibold text-stone-900">Bank Account Details</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-stone-50 rounded-xl p-4">
                  <div className="text-xs text-stone-500 mb-1">Bank Name</div>
                  <div className="font-semibold text-stone-900">SadaPay</div>
                </div>
                
                <div className="bg-stone-50 rounded-xl p-4">
                  <div className="text-xs text-stone-500 mb-1">Account Title</div>
                  <div className="font-semibold text-stone-900">Shazia</div>
                </div>

                <div className="bg-stone-50 rounded-xl p-4">
                  <div className="text-xs text-stone-500 mb-1">Account Number</div>
                  <div className="flex items-center justify-between">
                    <div className="font-mono font-semibold text-stone-900 text-lg">03133937654</div>
                    <button 
                      onClick={() => copyToClipboard("03133937654", "account")} 
                      className="text-amber-600 hover:text-amber-700 p-2 hover:bg-amber-50 rounded-lg transition-colors"
                    >
                      {copyStatus === "account" ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-green-50 rounded-2xl border border-green-200 p-6 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Total Amount</span>
                  <span className="font-semibold">Rs. {total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Today (50% Advance)</span>
                  <span className="font-semibold text-green-700">Rs. {halfAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-600">Remaining (50%)</span>
                  <span className="font-semibold">Rs. {halfAmount.toLocaleString()}</span>
                </div>
                <div className="border-t border-green-200 pt-3">
                  <div className="flex justify-between">
                    <span className="font-bold text-stone-900">Pay Now</span>
                    <span className="text-xl font-bold text-green-700">Rs. {halfAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Go to WhatsApp Button */}
            <a
              href="https://wa.me/923368952826"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} /> Go to WhatsApp
            </a>

            {/* WhatsApp Number Display */}
            <div className="mt-4 text-center">
              <p className="text-xs text-stone-500">Send payment screenshot on this number</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-sm font-bold text-green-700">+92 336 8952826</span>
                <button 
                  onClick={() => copyToClipboard("923368952826", "whatsapp")}
                  className="text-green-600 hover:text-green-700"
                >
                  {copyStatus === "whatsapp" ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
              <p className="text-xs text-stone-600 leading-relaxed">
                <span className="font-bold text-blue-700">📋 How to Order:</span><br />
                1️⃣ Transfer 50% amount to bank account above<br />
                2️⃣ Click "Go to WhatsApp"<br />
                3️⃣ Send payment screenshot on +92 336 8952826<br />
                4️⃣ Work starts immediately after confirmation<br />
                5️⃣ Pay remaining 50% after {items.some(i => i.type === "service") ? "project completion" : "half course completion"}<br /><br />
                <span className="text-amber-600">⚠️ Note:</span> Platform accounts (n8n, VAPI, hosting, domains) are provided by client.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
