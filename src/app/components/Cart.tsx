'use client';

import { useCart } from './CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrashAlt, FaCopy, FaWhatsapp } from 'react-icons/fa';

export default function Cart() {
  const {
    cart,
    removeItem,
    clearCart,
    totalAdvance,
    totalDue,
    totalPayNow,
    itemCount,
  } = useCart();

  const copyBank = () => {
    const text = 'SadaPay · Shazia · 03133937654';
    navigator.clipboard?.writeText(text).then(() => {
      alert('Bank details copied!');
    }).catch(() => {
      prompt('Copy manually:', text);
    });
  };

  return (
    <section id="cart" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100"
      >
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <span className="text-blue-600">🛒</span> Payment Summary
        </h2>

        {itemCount === 0 ? (
          <p className="text-gray-400 text-center py-8">Your cart is empty. Add a course or service.</p>
        ) : (
          <>
            <div className="mt-6 space-y-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div>
                      <span className="font-semibold">{item.name}</span>
                      <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full ml-2">
                        {item.type}
                      </span>
                      {item.half > 0 && (
                        <span className="text-xs text-blue-600 ml-1">50% advance</span>
                      )}
                      <div className="text-sm text-gray-500">Rs. {item.price.toLocaleString()}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold">
                        Rs. {(item.half || item.price).toLocaleString()}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Payment summary */}
            <div className="mt-6 border-t pt-6">
              <div className="flex justify-between text-lg font-semibold">
                <span>Services (50% advance)</span>
                <span>Rs. {totalAdvance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Due after completion:</span>
                <span>Rs. {totalDue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-2xl font-extrabold mt-3 border-t pt-3">
                <span>Total Payable (now)</span>
                <span>Rs. {totalPayNow.toLocaleString()}</span>
              </div>
            </div>

            {/* Bank details */}
            <div className="mt-8 bg-gray-50 rounded-xl p-5 border">
              <p className="font-bold text-sm">
                <span className="text-blue-600 mr-2">🏦</span>Bank Details
              </p>
              <div className="grid grid-cols-2 gap-1 text-sm mt-2">
                <span className="text-gray-500">Bank</span>
                <span className="font-medium">SadaPay</span>
                <span className="text-gray-500">Account Title</span>
                <span className="font-medium">Shazia</span>
                <span className="text-gray-500">Account Number</span>
                <span className="font-medium font-mono">03133937654</span>
              </div>
              <button
                onClick={copyBank}
                className="text-blue-600 text-sm font-medium mt-2 inline-flex items-center gap-1 hover:underline"
              >
                <FaCopy /> Copy
              </button>
            </div>

            {/* How to order */}
            <div className="mt-6 text-sm bg-blue-50 p-4 rounded-xl">
              <p className="font-bold">How to Order</p>
              <ol className="list-decimal list-inside space-y-1 text-gray-700 mt-1">
                <li>Transfer advance amount to SadaPay</li>
                <li>Click &quot;Send Order on WhatsApp&quot; below</li>
                <li>Attach payment screenshot</li>
                <li>Work starts immediately after confirmation</li>
                <li>Pay remaining 50% after completion</li>
              </ol>
              <p className="text-xs text-gray-400 mt-2">
                Platform accounts (n8n, hosting, domains) are provided by client.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/923182082758"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 shadow-lg shadow-green-500/30 hover:scale-105 transition"
              >
                <FaWhatsapp /> Send Order on WhatsApp
              </a>
              <button
                onClick={clearCart}
                className="border border-gray-300 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 transition"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
}