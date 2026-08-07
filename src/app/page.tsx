'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaShoppingCart,
  FaRocket,
  FaConciergeBell,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
  FaChevronDown,
  FaChevronUp,
  FaMicrophoneAlt,
  FaCartPlus,
  FaRobot,
  FaGlobe,
  FaTrashAlt,
  FaCopy,
  FaWhatsapp,
  FaArrowRight,
  FaArrowLeft,
  FaStar,
} from 'react-icons/fa';

/**
 * ─────────────────────────────────────────────────────────────────────────
 * DESIGN NOTE
 * Fonts: Space Grotesk (display / headings) + Inter (body) + JetBrains Mono
 * (prices, badges, node labels — a nod to the n8n workflow-node aesthetic).
 * For production, move the @import below into your root layout.tsx via
 * next/font instead of the CSS @import used here for single-file portability.
 *
 * Placeholder stats (students / ratings / projects shipped) are marked
 * clearly below — swap in your real numbers before publishing.
 *
 * SALE NOTE: Azadi (Independence) Sale — both courses Rs. 5,999 each,
 * valid until 14 August. See SALE_END_LABEL / SALE_PRICE below.
 * ─────────────────────────────────────────────────────────────────────────
 */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');
:root {
  --font-display: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}
body { font-family: var(--font-body); }
.font-display { font-family: var(--font-display); }
.font-mono { font-family: var(--font-mono); }
`;

// Azadi Sale config — course price locked at Rs. 5,999 until 14 August
const SALE_PRICE = 5999;
const SALE_END_LABEL = 'Ends 14 August';

// ─── Types ────────────────────────────────────────────────────────────────
interface CartItem {
  id: string;
  name: string;
  price: number;
  half: number;
  type: 'course' | 'service';
}

type ViewName = 'home' | 'checkout';

interface CartContextType {
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalAdvance: number;
  totalDue: number;
  totalPayNow: number;
  itemCount: number;
  view: ViewName;
  goTo: (v: ViewName) => void;
}

// ─── Cart + Navigation Context ─────────────────────────────────────────────
const CartContext = createContext<CartContextType | undefined>(undefined);

function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [view, setView] = useState<ViewName>('home');

  useEffect(() => {
    const stored = localStorage.getItem('ahmedCart');
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }
    // Basic back-button support for the checkout "page"
    const onPop = (e: PopStateEvent) => setView(e.state?.view === 'checkout' ? 'checkout' : 'home');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    localStorage.setItem('ahmedCart', JSON.stringify(cart));
  }, [cart]);

  const goTo = (v: ViewName) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    window.history.pushState({ view: v }, '', v === 'checkout' ? '#checkout' : '#');
  };

  const addItem = (item: CartItem) => {
    setCart((prev) => (prev.some((i) => i.id === item.id) ? prev : [...prev, item]));
    goTo('checkout');
  };

  const removeItem = (id: string) => setCart((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setCart([]);

  // Courses are paid in full up front. Services are 50% now, 50% on delivery.
  const totalAdvance = cart.filter((i) => i.type === 'service').reduce((sum, i) => sum + i.half, 0);
  const totalDue = cart.filter((i) => i.type === 'service').reduce((sum, i) => sum + (i.price - i.half), 0);
  const totalPayNow = cart.reduce((sum, i) => sum + (i.type === 'service' ? i.half : i.price), 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, clearCart, totalAdvance, totalDue, totalPayNow, itemCount: cart.length, view, goTo }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

// ─── Small shared bits ──────────────────────────────────────────────────
function NodeChip({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[0.7rem] tracking-wide uppercase bg-emerald-950/5 text-emerald-800 border border-emerald-800/15 px-2.5 py-1 rounded-md">
      {children}
    </span>
  );
}

// ─── 1. Navbar ──────────────────────────────────────────────────────────
function Navbar() {
  const { itemCount, goTo, view } = useCart();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#F7F6F2]/85 backdrop-blur-md border-b border-emerald-950/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <button onClick={() => goTo('home')} className="font-display text-xl font-bold tracking-tight text-emerald-950">
          Ahmed<span className="text-emerald-600">.</span>
          <span className="font-mono text-[0.65rem] font-medium text-emerald-700/60 ml-2 align-middle">Memon</span>
        </button>
        <div className="flex items-center gap-6 text-sm font-medium text-emerald-950">
          {view === 'home' && (
            <>
              <a href="#courses" className="hidden sm:inline hover:text-emerald-600 transition">Courses</a>
              <a href="#services" className="hidden sm:inline hover:text-emerald-600 transition">Services</a>
            </>
          )}
          <button
            onClick={() => goTo('checkout')}
            className="flex items-center gap-1.5 bg-emerald-950 text-white hover:bg-emerald-900 px-4 py-2 rounded-full transition"
          >
            <FaShoppingCart className="text-emerald-300" />
            <span>Cart</span>
            {itemCount > 0 && (
              <span className="bg-amber-400 text-emerald-950 text-[0.65rem] font-bold px-2 py-0.5 rounded-full ml-0.5">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── 1b. Azadi Sale banner ────────────────────────────────────────────────
function SaleBanner() {
  return (
    <div className="fixed top-16 left-0 w-full z-40 bg-amber-400 text-emerald-950 text-center py-2 px-4 text-sm font-semibold font-mono tracking-wide">
      🇵🇰 Azadi Sale — Har course sirf Rs. {SALE_PRICE.toLocaleString()} · {SALE_END_LABEL}
    </div>
  );
}

// ─── 2. Hero — signature element: a live "workflow node" diagram ────────
function WorkflowDiagram() {
  const nodes = [
    { label: 'Trigger', sub: 'WhatsApp message', x: 16, y: 40 },
    { label: 'AI Agent', sub: 'Understands order', x: 178, y: 18 },
    { label: 'Sheet', sub: 'Saves to Sheets', x: 178, y: 132 },
    { label: 'Reply', sub: 'Confirms order', x: 344, y: 75 },
  ];
  return (
    <div className="max-w-[380px] mx-auto">
      <svg viewBox="0 0 420 190" className="w-full h-auto">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path d="M 90 55 C 130 55, 130 33, 163 33" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
        <path d="M 90 55 C 130 55, 130 142, 163 142" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
        <path d="M 264 33 C 305 33, 305 75, 329 75" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
        <path d="M 264 142 C 305 142, 305 90, 329 85" stroke="url(#lineGrad)" strokeWidth="2" fill="none" />
        {nodes.map((n, i) => (
          <g key={i} transform={`translate(${n.x - 16}, ${n.y - 20})`}>
            <rect width="108" height="40" rx="10" fill="#0B1F18" stroke="#34D399" strokeOpacity="0.5" />
            <circle cx="12" cy="20" r="4" fill="#FBBF24" />
            <text x="24" y="17" fill="#ECFDF5" fontSize="10" fontFamily="Space Grotesk, sans-serif" fontWeight={600}>
              {n.label}
            </text>
            <text x="24" y="29" fill="#6EE7B7" fontSize="7" fontFamily="JetBrains Mono, monospace">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function Hero() {
  const { goTo } = useCart();
  return (
    <section className="relative overflow-hidden bg-[#081712] pt-28 pb-20">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(#34D399 1px, transparent 1px), linear-gradient(90deg, #34D399 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-14 items-center"
        >
          <div className="space-y-6">
            <NodeChip>Ahmed Memon · Official</NodeChip>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold leading-[1.08] text-white">
              Turn busywork into
              <span className="text-emerald-400"> workflows</span> that run themselves
            </h1>
            <p className="text-lg text-emerald-100/70 max-w-lg">
              Learn n8n and AI voice agents from scratch, or have a working automation built and shipped for you — no fluff, real projects.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#courses"
                className="bg-emerald-400 text-emerald-950 px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-emerald-300 transition"
              >
                <FaRocket /> Explore courses
              </a>
              <a
                href="#services"
                className="bg-white/5 border border-white/15 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition inline-flex items-center gap-2"
              >
                <FaConciergeBell /> Get it built for me
              </a>
            </div>
            {/* Placeholder trust strip — replace with real numbers */}
            <div className="flex flex-wrap gap-x-8 gap-y-2 pt-6 font-mono text-xs text-emerald-200/50">
              <span>STUDENTS · 50+</span>
              <span>PROJECT SHIPPED · 10+</span>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <div className="bg-white/[0.04] backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10">
              <p className="font-mono text-xs text-emerald-300/70 mb-3">FINAL PROJECT · WHATSAPP RESTAURANT BOT</p>
              <WorkflowDiagram />
              <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                <div>
                  <p className="font-display font-bold text-2xl text-white">Rs. {SALE_PRICE.toLocaleString()}</p>
                  <p className="text-xs text-emerald-300/50 line-through">Rs. 12,000</p>
                </div>
                <button
                  onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-emerald-300 font-medium text-sm inline-flex items-center gap-2 hover:text-emerald-200"
                >
                  See full outline <FaArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 3. Course Card ─────────────────────────────────────────────────────
function CourseCard({ course }: { course: any }) {
  const [expanded, setExpanded] = useState(false);
  const { addItem } = useCart();

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-emerald-950/8 hover:shadow-lg hover:border-emerald-800/15 transition-all"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 flex-wrap">
          <NodeChip>{course.badge}</NodeChip>
          <span className="font-mono text-[0.7rem] tracking-wide uppercase bg-amber-100 text-amber-800 border border-amber-300/50 px-2.5 py-1 rounded-md">
            Recorded
          </span>
        </div>
        <span className="text-xs text-emerald-950/40 flex items-center gap-1 font-mono shrink-0 text-right">
          <FaClock /> {course.classes}
        </span>
      </div>
      <h3 className="font-display text-2xl font-bold mt-3 text-emerald-950">{course.name}</h3>
      <p className="text-emerald-950/50 text-sm mt-1">{course.subtitle}</p>
      {course.duration && (
        <p className="text-xs text-emerald-950/40 mt-1.5 font-mono">{course.duration} · watch anytime</p>
      )}
      <div className="flex items-center gap-3 mt-3 flex-wrap">
        <span className="font-mono text-2xl font-semibold text-emerald-950">Rs. {course.price.toLocaleString()}</span>
        <span className="text-sm line-through text-emerald-950/30">Rs. {course.originalPrice.toLocaleString()}</span>
        <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full">Save {course.discount}%</span>
      </div>
      <p className="text-xs text-amber-700 font-mono font-semibold mt-1.5">🇵🇰 Azadi Sale price · {SALE_END_LABEL}</p>
      <ul className="text-sm text-emerald-950/70 mt-3 space-y-1.5">
        <li className="flex gap-2"><FaCheckCircle className="text-emerald-600 mt-0.5 shrink-0" /> Lifetime access to all recordings</li>
        <li className="flex gap-2"><FaCheckCircle className="text-emerald-600 mt-0.5 shrink-0" /> Access given immediately after payment</li>
        <li className="flex gap-2"><FaExclamationCircle className="text-amber-500 mt-0.5 shrink-0" /> No refund policy</li>
      </ul>

      <button
        className="text-emerald-700 text-sm font-medium mt-3 inline-flex items-center gap-1.5"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <FaChevronUp /> : <FaChevronDown />}
        {expanded ? 'Hide' : 'Show'} full course outline
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 pt-4 border-t border-emerald-950/8 space-y-4 text-sm">
              {course.outline.map((cls: any, idx: number) => (
                <div key={idx} className="flex gap-3">
                  <span className="font-mono text-xs shrink-0 w-6 h-6 rounded-md bg-emerald-950 text-emerald-300 flex items-center justify-center mt-0.5">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-semibold text-emerald-950">{cls.title.replace(/^Class \d+\s*—\s*/, '').replace(/^Final Project\s*—\s*/, '')}</p>
                    <ul className="mt-1 space-y-0.5 text-emerald-950/60">
                      {cls.points.map((point: string, i: number) => (
                        <li key={i}>· {point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              {course.romanUrdu && (
                <p className="text-xs text-emerald-950/40 flex items-center gap-1.5"><FaMicrophoneAlt /> Includes a Roman Urdu project walkthrough</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => addItem({ id: course.id, name: course.name, price: course.price, half: 0, type: 'course' })}
        className="mt-5 w-full bg-emerald-950 hover:bg-emerald-900 text-white font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
      >
        <FaCartPlus /> Enroll now
      </button>
    </motion.div>
  );
}

// ─── 4. Service Card ────────────────────────────────────────────────────
function ServiceCard({ service }: { service: any }) {
  const { addItem } = useCart();
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-2xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-emerald-950/8 hover:shadow-lg hover:border-emerald-800/15 transition-all"
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl text-emerald-700">{service.icon}</span>
        <NodeChip>50% advance</NodeChip>
      </div>
      <h3 className="font-display text-2xl font-bold mt-3 text-emerald-950">{service.name}</h3>
      <p className="text-emerald-950/50 text-sm mt-1">{service.subtitle}</p>
      <div className="mt-3 font-mono text-2xl font-semibold text-emerald-950">
        Rs. {service.price.toLocaleString()} <span className="text-sm font-normal text-emerald-950/40 font-body">/ project</span>
      </div>
      <ul className="text-sm text-emerald-950/70 mt-3 space-y-1.5">
        {service.features.map((f: string, i: number) => (
          <li key={i} className="flex gap-2"><FaCheckCircle className="text-emerald-600 mt-0.5 shrink-0" /> {f}</li>
        ))}
      </ul>
      <p className="text-xs text-emerald-950/40 mt-2">{service.note}</p>
      <button
        onClick={() => addItem({ id: service.id, name: service.name, price: service.price, half: service.price / 2, type: 'service' })}
        className="mt-5 w-full bg-emerald-950 hover:bg-emerald-900 text-white font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
      >
        <FaCartPlus /> Add to cart
      </button>
    </motion.div>
  );
}

// ─── 5. CTA Band ─────────────────────────────────────────────────────────
function CtaBand() {
  const { goTo } = useCart();
  return (
    <section className="bg-emerald-950 py-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">Ready to stop doing this by hand?</h2>
        <p className="text-emerald-200/60 mt-2">Pick a course to learn it yourself, or hand it off — pay 50% now, rest on delivery.</p>
        <button
          onClick={() => goTo('checkout')}
          className="mt-6 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2 transition"
        >
          Go to checkout <FaArrowRight />
        </button>
      </div>
    </section>
  );
}

// ─── 6. Footer ───────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#F7F6F2] border-t border-emerald-950/8 py-10 text-center text-emerald-950/40 text-sm">
      <div className="max-w-7xl mx-auto px-4">
        <p className="font-display font-semibold text-emerald-950/70">Ahmed<span className="text-emerald-600">.</span></p>
        <p className="mt-2">© 2026 Ahmed Memon · AI Automation. All rights reserved.</p>
        <p className="text-xs mt-1">No refund policy on courses · lifetime access to recordings.</p>
      </div>
    </footer>
  );
}

// ─── HOME "PAGE" ─────────────────────────────────────────────────────────
function HomePage({ courses, services }: { courses: any[]; services: any[] }) {
  return (
    <>
      <Hero />

      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="font-mono text-xs text-emerald-700/60 mb-1">01 · LEARN IT YOURSELF</p>
                <h2 className="font-display text-3xl font-bold text-emerald-950">Master Classes</h2>
              </div>
              <span className="text-sm text-emerald-950/40 hidden sm:block">lifetime access · no refund</span>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {courses.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="services" className="py-20 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="font-mono text-xs text-emerald-700/60 mb-1">02 · HAVE IT BUILT FOR YOU</p>
            <h2 className="font-display text-3xl font-bold text-emerald-950 mb-10">Done-for-you services</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((s) => <ServiceCard key={s.id} service={s} />)}
            </div>
          </motion.div>
        </div>
      </section>

      <CtaBand />
      <Footer />
    </>
  );
}

// ─── CHECKOUT "PAGE" — fully separate from the landing page ─────────────
function CheckoutPage() {
  const { cart, removeItem, clearCart, totalAdvance, totalDue, totalPayNow, itemCount, goTo } = useCart();

  const copyBank = () => {
    const text = 'SadaPay · Shazia · 03133937654';
    navigator.clipboard?.writeText(text).then(() => alert('Bank details copied!')).catch(() => prompt('Copy manually:', text));
  };

  const whatsappMessage = encodeURIComponent(
    cart.length
      ? `Hi Ahmed, I'd like to order:\n${cart.map((i) => `- ${i.name} (Rs. ${(i.half || i.price).toLocaleString()})`).join('\n')}\nTotal now: Rs. ${totalPayNow.toLocaleString()}`
      : `Hi Ahmed, I'd like to place an order.`
  );

  return (
    <section className="min-h-screen bg-[#F7F6F2] pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => goTo('home')} className="text-emerald-950/60 hover:text-emerald-950 text-sm font-medium inline-flex items-center gap-2 mb-6">
          <FaArrowLeft /> Back to courses &amp; services
        </button>

        <p className="font-mono text-xs text-emerald-700/60 mb-1">CHECKOUT</p>
        <h1 className="font-display text-3xl font-bold text-emerald-950 mb-6">Your order</h1>

        {itemCount === 0 ? (
          <div className="bg-white rounded-2xl border border-emerald-950/8 text-center py-16">
            <p className="text-emerald-950/40">Your cart is empty.</p>
            <button onClick={() => goTo('home')} className="mt-4 text-emerald-700 font-medium hover:underline">
              Browse courses &amp; services
            </button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-5">

            {/* Order items */}
            <div className="bg-white rounded-2xl border border-emerald-950/8 divide-y divide-emerald-950/6 overflow-hidden">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-between items-center p-5"
                  >
                    <div>
                      <p className="font-semibold text-emerald-950">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <NodeChip>{item.type === 'course' ? 'full payment' : '50% advance'}</NodeChip>
                        <span className="text-xs text-emerald-950/40 font-mono">list price Rs. {item.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right">
                        <p className="font-mono font-semibold text-emerald-950">Rs. {(item.type === 'service' ? item.half : item.price).toLocaleString()}</p>
                        {item.type === 'service' && (
                          <p className="text-[0.7rem] text-emerald-950/35 font-mono">+Rs. {(item.price - item.half).toLocaleString()} later</p>
                        )}
                      </div>
                      <button onClick={() => removeItem(item.id)} aria-label="Remove item" className="text-red-400 hover:text-red-600 transition">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Totals */}
            <div className="bg-emerald-950 rounded-2xl p-6 text-white">
              <div className="flex justify-between items-baseline">
                <span className="font-display font-semibold">Pay now</span>
                <span className="font-mono text-3xl font-bold">Rs. {totalPayNow.toLocaleString()}</span>
              </div>
              {totalDue > 0 && (
                <div className="flex justify-between text-sm text-emerald-200/60 mt-2 pt-2 border-t border-white/10">
                  <span>Due on delivery (services)</span>
                  <span className="font-mono">Rs. {totalDue.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Bank details */}
            <div className="bg-white rounded-2xl p-6 border border-emerald-950/8">
              <p className="font-semibold text-sm text-emerald-950">Bank details</p>
              <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-sm mt-3">
                <span className="text-emerald-950/45">Bank</span><span className="font-medium font-mono text-emerald-950">SadaPay</span>
                <span className="text-emerald-950/45">Title</span><span className="font-medium font-mono text-emerald-950">Shazia</span>
                <span className="text-emerald-950/45">Account</span><span className="font-medium font-mono text-emerald-950">03133937654</span>
              </div>
              <button onClick={copyBank} className="text-emerald-700 text-sm font-medium mt-3 inline-flex items-center gap-1.5 hover:underline">
                <FaCopy /> Copy details
              </button>
            </div>

            {/* How it works */}
            <div className="bg-white rounded-2xl p-6 border border-emerald-950/8">
              <p className="font-semibold text-emerald-950 mb-3 text-sm">How ordering works</p>
              <ol className="space-y-2 text-sm text-emerald-950/70">
                {[
                  `Transfer Rs. ${totalPayNow.toLocaleString()} to the SadaPay account above`,
                  'Tap "Send order on WhatsApp" below',
                  'Attach your payment screenshot',
                  'Work starts right after confirmation',
                  ...(totalDue > 0 ? ["Pay what's left once your service is delivered"] : []),
                ].map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-mono text-xs shrink-0 w-5 h-5 rounded-full bg-emerald-950 text-emerald-300 flex items-center justify-center mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <p className="text-xs text-emerald-950/35 mt-3">Platform accounts (n8n, hosting, domains) are provided by the client.</p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <a
                href={`https://wa.me/923182082758?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-950 text-white px-6 py-3.5 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-emerald-900 transition"
              >
                <FaWhatsapp /> Send order on WhatsApp
              </a>
              <button onClick={clearCart} className="border border-emerald-950/15 px-6 py-3.5 rounded-xl font-medium text-emerald-950/60 hover:bg-emerald-950/5 transition">
                Clear cart
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── ROOT SWITCH ─────────────────────────────────────────────────────────
function AppShell({ courses, services }: { courses: any[]; services: any[] }) {
  const { view } = useCart();
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONT_IMPORT }} />
      <Navbar />
      <SaleBanner />
      <main>
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <HomePage courses={courses} services={services} />
            </motion.div>
          ) : (
            <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <CheckoutPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────
export default function Home() {
  const courses = [
    {
      id: 'n8n-course',
      name: 'AI Automation Mastery',
      subtitle: 'Master n8n workflows from scratch',
      price: SALE_PRICE,
      originalPrice: 12000,
      discount: Math.round((1 - SALE_PRICE / 12000) * 100),
      badge: 'Popular',
      classes: '11 classes',
      duration: '~2h 30m total',
      romanUrdu: true,
      outline: [
        { title: 'Class 1 — Introduction, UI & Setup', points: ['What is n8n?', 'AI automation vs normal automation', 'Cloud vs self-hosted', 'n8n instance tour (UI walkthrough)', 'Basic workflow concept'] },
        { title: 'Class 2 — Core Concepts', points: ['Nodes explained', 'What is a workflow?', 'Trigger vs action nodes', 'Simple automation: manual trigger + send email', 'Understanding data flow'] },
        { title: 'Class 3 — Triggers, Webhooks & Cron Jobs', points: ['What is a webhook?', 'What is a cron job?', 'Form submission automations', 'Workflow trigger node', 'Real-world examples'] },
        { title: 'Class 4 — APIs & Real Integrations', points: ['What is an API?', 'GET vs POST requests', 'MCP server & client', 'How mapping, set nodes & expressions work'] },
        { title: 'Class 5 — Logic & Smart Automations', points: ['IF conditions', 'Switch nodes', 'Filters', 'AI agent node introduction', 'How AI agent nodes work'] },
        { title: 'Class 6 — WhatsApp Restaurant Chatbot', points: ['Third-party WhatsApp tool setup, no Business API needed', 'Building the chatbot flow — customer messages, AI takes the order', 'AI agent node configuration for natural conversation', 'Parsing and validating the order (item, quantity, price)', 'Saving confirmed orders to Google Sheets in real time', 'Full end-to-end walkthrough'] },
        { title: 'Class 7 — What is RAG?', points: ['What RAG (Retrieval-Augmented Generation) is', 'RAG with Pinecone', 'How to set up RAG in your workflow'] },
        { title: 'Class 8 — Error Handling', points: ['How error handling works', 'Building production-ready error handling'] },
        { title: 'Class 9 — Memory in AI Agents', points: ['Short-term vs long-term memory', 'Using Supabase Postgres as production-ready long-term memory', 'How memory state is maintained'] },
        { title: 'Class 10 — Finding & Delivering to Clients', points: ['2-3 proven methods to find clients', 'Writing an effective outreach message', 'How to deliver AI automation to a client'] },
        { title: 'Class 11 — Lead Generation Automation', points: ['Automation that scrapes leads from Google Maps', 'AI writes a personalized email for each lead', 'Automatically sends the email to every lead'] },
      ],
    },
    {
      id: 'voice-course',
      name: 'AI Voice Agent Course',
      subtitle: 'Build production-ready AI agents',
      price: SALE_PRICE,
      originalPrice: 12000,
      discount: Math.round((1 - SALE_PRICE / 12000) * 100),
      badge: 'New',
      classes: '7 classes',
      duration: '~1h 30m total',
      romanUrdu: true,
      outline: [
        { title: 'Class 1 — Introduction to AI Call Agents', points: ['What an AI call agent is and how it works', 'Popular platforms: VAPI, Retell AI', 'Inbound vs outbound agents', 'Real-world use cases', 'Setting up Retell AI and dashboard walkthrough'] },
        { title: 'Class 2 — Designing the Call Flow & Script', points: ['Single prompt agent, full dashboard walkthrough', 'Writing a natural call script with AI', 'Handling greetings, objections, fallback responses', 'Setting agent goals', 'Testing script logic', 'How voicemail & IVR works'] },
        { title: 'Class 3 — Voice & Configuration', points: ['Dynamic vs static variables', 'Choosing the right AI voice (ElevenLabs)', 'Tone, speed, language', 'Building a persona', 'Background sound & silence detection', 'Knowledge base in agent'] },
        { title: 'Class 4 — Integrations — CRM, Calendar & Webhooks', points: ['Connecting to a CRM (GoHighLevel, HubSpot, etc.)', 'Booking via Cal.com or Google Calendar', 'Sending call data via webhooks', 'Tools like transfer call and more'] },
        { title: 'Class 5 — Phone Number Setup', points: ['Connecting a number with Retell', 'Where to buy numbers', 'Phone number page UI'] },
        { title: 'Class 6 — AI Receptionist Agent', points: ['Full receptionist agent, built in Roman Urdu'] },
        { title: 'Class 7 — Finding Clients & Outreach', points: ['How to find clients for AI voice agents', 'How to deliver the agent to a client', 'Writing an effective outreach message'] },
      ],
    },
  ];

  const services = [
    {
      id: 'ai-auto-service',
      name: 'AI Automation',
      subtitle: 'Any type of AI automation · n8n workflows',
      price: 30000,
      icon: <FaRobot />,
      features: ['Custom workflow design & build', 'n8n automation only', 'API integrations & webhooks', 'Ongoing support & documentation'],
      note: 'Client provides the n8n platform account.',
    },
    {
      id: 'website-service',
      name: 'Complete Website',
      subtitle: 'Professional business website',
      price: 20000,
      icon: <FaGlobe />,
      features: ['Responsive modern design', 'Up to 8 pages', 'SEO optimization', 'Build On Modern Frameworks'],
      note: "Domain, hosting & third-party costs are the client's responsibility.",
    },
  ];

  return (
    <CartProvider>
      <AppShell courses={courses} services={services} />
    </CartProvider>
  );
}
