"use client";
import { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";

// ─── PRICING CONFIG ───────────────────────────────────────────────────────────
const RECORDED_PRICE = 7499;
const RECORDED_REGULAR_PRICE = 12000;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "ai-automation",
    name: "AI Automation",
    price: 30000,
    tagline: "Any type of AI automation",
    icon: "⚡",
    features: [
      "Custom workflow design & build",
      "n8n automation only",
      "API integrations & webhooks",
      "e-commerce, CRM automation",
      "Ongoing support & documentation",
    ],
    note: "n8n platform account and its associated costs will be provided by the client. Ahmed will build the workflows only.",
  },
  {
    id: "website",
    name: "Complete Website",
    price: 20000,
    tagline: "Professional business website",
    icon: "🌐",
    features: [
      "Responsive modern design",
      "Up to 8 pages",
      "Contact & inquiry forms",
      "SEO optimization",
      "1 month free support",
    ],
    note: "Domain, hosting, and third-party service costs are the client's responsibility.",
  },
];

const voiceAgentOutline = [
  { class: "Class 1", title: "Introduction to AI Call Agents", topics: ["What is an AI call agent and how it works", "Overview of popular platforms: VAPI, Retell AI", "Inbound vs outbound call agents — key differences", "Real-world use cases: bookings, lead qualification, customer support", "Setting up your first platform account in Retell AI and dashboard walkthrough"] },
  { class: "Class 2", title: "Designing the Call Flow & Script", topics: ["Understanding Single Prompt Agent", "Single Prompt Agent — full dashboard walkthrough (Begin Message, General Prompt, variables, tools, model settings, voice settings, call settings)", "Writing a natural, human-sounding call script with help of AI", "Handling greetings, objections, and fallback responses", "Setting goals for the agent: what should it collect or do?", "Testing your script logic before going live", "How voicemail & IVR works"] },
  { class: "Class 3", title: "Voice & Configuration", topics: ["Dynamic Variables vs Static Variables", "Choosing the right AI voice (ElevenLabs)", "Setting tone, speed, and language of the agent", "Building a persona: name, personality, and purpose", "Configuring background sound and silence detection", "Knowledge base in agent"] },
  { class: "Class 4", title: "Integrations — CRM, Calendar & Webhooks", topics: ["Connecting your agent to a CRM (GoHighLevel, HubSpot, etc.)", "Booking appointments via Cal.com or Google Calendar", "Using webhooks to send call data to other tools", "Understanding Tools e.g. Transfer Call and more!"] },
  { class: "Class 5", title: "Phone Number Setup", topics: ["How to connect a phone number with Retell", "Platforms from where to buy numbers", "The UI of the phone number page"] },
  { class: "Class 6", title: "Final Project", topics: ["AI Receptionist Agent in Roman Urdu"] },
];

const automationOutline = [
  { module: "Class 1", title: "Introduction, UI & Setup", topics: ["What is n8n?", "What is AI Automation vs Normal Automation?", "Cloud vs Self-Hosted", "n8n Instance Tour (UI Walkthrough)", "Basic Workflow Concept"] },
  { module: "Class 2", title: "Core Concepts", topics: ["Nodes Explained", "What is a Workflow?", "Trigger vs Action Nodes", "Simple Automation: Manual Trigger + Send Email", "Understanding Data Flow"] },
  { module: "Class 3", title: "Triggers, Webhooks & Cron Jobs", topics: ["What is a Webhook?", "What is a Cron Job?", "Form Submission Automations", "Workflow Trigger Node", "Real-World Examples"] },
  { module: "Class 4", title: "APIs & Real Integrations", topics: ["What is an API?", "GET vs POST Requests", "MCP Server & Client", "Nodes Open & Explained — how mapping set nodes & expressions works"] },
  { module: "Class 5", title: "Logic & Smart Automations", topics: ["IF Conditions", "Switch Nodes", "Filters", "AI Agent Node Introduction", "How AI Agent Nodes Work"] },
  { module: "Final Project", title: "WhatsApp Restaurant Chatbot", topics: ["Third-party WhatsApp tool setup & connecting with n8n (no Business API needed)", "Building the chatbot flow — customer sends message, AI takes order", "AI Agent node configuration for natural conversation", "Parsing and validating the order (item name, quantity, price)", "Saving confirmed orders to Google Sheets in real-time", "Step-by-step walkthrough of the complete end-to-end workflow"] },
];

const COURSES = [
  {
    id: "course-automation-recorded",
    name: "AI Automation Mastery",
    icon: "⚡",
    tagline: "Master n8n workflows from scratch",
    duration: "6 classes · ~15 min each",
    price: RECORDED_PRICE,
    regularPrice: RECORDED_REGULAR_PRICE,
    outline: automationOutline,
    courseType: "recorded" as const,
    tag: "Most popular",
  },
  {
    id: "course-voice-agent-recorded",
    name: "AI Voice Agent Course",
    icon: "🎙️",
    tagline: "Build production-ready AI agents",
    duration: "6 classes · ~15 min each",
    price: RECORDED_PRICE,
    regularPrice: RECORDED_REGULAR_PRICE,
    outline: voiceAgentOutline,
    courseType: "recorded" as const,
    tag: "Includes Roman Urdu project",
  },
];

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

// ─── COUNT-UP STAT ────────────────────────────────────────────────────────────
function CountUp({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.unobserve(el);
        const duration = 1500;
        const start = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const { count } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <nav className={`main-nav ${scrolled ? "main-nav-scrolled" : ""}`}>
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="nav-logo">
        <span className="nav-logo-node" />
        Ahmed<span className="nav-logo-dim">Memon</span>
      </button>
      
      <div className="nav-desktop">
        <div className="nav-links">
          {["courses", "services", "pricing", "about"].map(s => (
            <button key={s} onClick={() => scrollTo(s)} className="nav-link">
              {s}
            </button>
          ))}
        </div>
        <Link href="/cart" className="nav-cart">
          <span>Cart</span>
          {count > 0 && <span className="cart-badge">{count}</span>}
        </Link>
      </div>

      <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
        <span className={`hamburger-line ${mobileOpen ? "open" : ""}`} />
        <span className={`hamburger-line ${mobileOpen ? "open" : ""}`} />
        <span className={`hamburger-line ${mobileOpen ? "open" : ""}`} />
      </button>

      {mobileOpen && (
        <div className="nav-mobile">
          <div className="nav-mobile-links">
            {["courses", "services", "pricing", "about"].map(s => (
              <button key={s} onClick={() => scrollTo(s)} className="nav-mobile-link">
                {s}
              </button>
            ))}
            <Link href="/cart" className="nav-mobile-cart" onClick={() => setMobileOpen(false)}>
              Cart {count > 0 && <span className="cart-badge-mobile">{count}</span>}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── HERO FLOW DIAGRAM ──────────────────────────────────────────────────────
function HeroFlow() {
  return (
    <div className="hero-flow">
      <div className="flow-node flow-node-1">
        <span className="flow-icon">🧠</span>
        <span className="flow-label">Learn</span>
      </div>
      <div className="flow-arrow">→</div>
      <div className="flow-node flow-node-2">
        <span className="flow-icon">⚡</span>
        <span className="flow-label">Build</span>
      </div>
      <div className="flow-arrow">→</div>
      <div className="flow-node flow-node-3">
        <span className="flow-icon">💰</span>
        <span className="flow-label">Earn</span>
      </div>
    </div>
  );
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────
function ServiceCard({ svc }: { svc: typeof SERVICES[0] }) {
  const { addItem, items } = useCart();
  const inCart = !!items.find(i => i.id === svc.id);

  return (
    <div className="card service-card">
      <div className="card-glow" />
      <div className="card-header">
        <div className="card-icon">{svc.icon}</div>
        <span className="badge badge-gold">Service</span>
      </div>
      <div>
        <h3 className="card-title">{svc.name}</h3>
        <p className="card-tagline">{svc.tagline}</p>
      </div>
      <ul className="feature-list">
        {svc.features.map(f => (
          <li key={f} className="feature-item">
            <span className="check">✓</span> {f}
          </li>
        ))}
      </ul>
      {svc.note && <p className="card-note">{svc.note}</p>}
      <div className="card-footer">
        <div className="price-row">
          <span className="price mono">Rs. {svc.price.toLocaleString()}</span>
          <span className="price-unit">/ project</span>
        </div>
        <p className="payment-info">50% advance · 50% after completion</p>
        <button
          onClick={() => addItem({ id: svc.id, name: svc.name, price: svc.price, type: "service", description: svc.tagline })}
          disabled={inCart}
          className={`btn-add ${inCart ? "btn-added" : "btn-primary"}`}
        >
          {inCart ? "✓ Added" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

// ─── COURSE CARD ─────────────────────────────────────────────────────────────
function CourseCard({ course }: { course: typeof COURSES[0] }) {
  const { addItem, items } = useCart();
  const inCart = !!items.find(i => i.id === course.id);
  const [showOutline, setShowOutline] = useState(false);
  const savingsPct = Math.round((1 - course.price / course.regularPrice) * 100);

  return (
    <div className="card course-card">
      <div className="card-glow card-glow-teal" />
      <div className="card-header">
        <div className="card-icon">{course.icon}</div>
        <span className="badge badge-recorded">{course.tag}</span>
      </div>

      <div>
        <h3 className="card-title">{course.name}</h3>
        <p className="card-tagline">{course.tagline}</p>
        <p className="duration-text mono">{course.duration}</p>
      </div>

      <div className="price-box">
        <div>
          <div className="price-with-original">
            <span className="price mono">Rs. {course.price.toLocaleString()}</span>
            <span className="price-original mono">Rs. {course.regularPrice.toLocaleString()}</span>
          </div>
          <p className="price-unit">lifetime access</p>
        </div>
        <span className="discount-badge mono">Save {savingsPct}%</span>
      </div>

      <div className="delivery-box">
        <p className="delivery-item">✓ Lifetime access to all recordings</p>
        <p className="delivery-gold">✓ Access given immediately after payment</p>
      </div>

      <div className="refund-box">
        <p className="refund-title">No Refund Policy</p>
        <p className="refund-text">
          Course purchase karne ke baad koi refund nahi milega. Please carefully review the course outline before enrolling.
        </p>
      </div>

      <button onClick={() => setShowOutline(p => !p)} className="btn-outline-toggle">
        {showOutline ? "Hide" : "View"} full course outline
        <span className={`chevron ${showOutline ? "chevron-up" : ""}`}>›</span>
      </button>

      {showOutline && (
        <div className="outline-box">
          {course.outline.map((item: any, idx: number) => (
            <div key={idx} className="outline-item">
              <p className="outline-header mono">
                {item.class || item.module} — {item.title}
              </p>
              <ul className="outline-topics">
                {item.topics.map((t: string, ti: number) => (
                  <li key={ti} className="outline-topic">
                    <span className="outline-arrow">›</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => addItem({
          id: course.id,
          name: `${course.name} (Recorded)`,
          price: course.price,
          type: "course",
          courseType: course.courseType,
          description: course.tagline,
        })}
        disabled={inCart}
        className={`btn-add ${inCart ? "btn-added" : "btn-primary"}`}
      >
        {inCart ? "✓ Enrolled" : "Enroll now"}
      </button>
    </div>
  );
}

// ─── HOME PAGE ──────────────────────────────────────────────────────────────
export default function Home() {
  const { count } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!isMounted) return null;

  const rateCard = [
    { name: "AI Automation Mastery", detail: "Recorded · lifetime access", price: `${RECORDED_PRICE.toLocaleString()}`, orig: RECORDED_REGULAR_PRICE.toLocaleString(), type: "course" },
    { name: "AI Voice Agent Course", detail: "Recorded · lifetime access", price: `${RECORDED_PRICE.toLocaleString()}`, orig: RECORDED_REGULAR_PRICE.toLocaleString(), type: "course" },
    { name: "AI Automation Service", detail: "n8n workflows only", price: "30,000", type: "service" },
    { name: "Complete Website", detail: "Up to 8 pages", price: "20,000", type: "service" },
  ];

  return (
    <div className="site-wrapper">
      <style>{`
        /* ─── FONTS ─── */
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        /* ─── TOKENS ─── */
        :root {
          --bg: #ffffff;
          --bg-soft: #f8f7f4;
          --bg-elevated: #ffffff;
          --bg-elevated-2: #f0efea;
          --border: #e8e6df;
          --border-soft: #f0efe9;
          --text: #1a1b1e;
          --text-dim: #5a5d66;
          --text-faint: #8a8d96;
          --accent: #c9771e;
          --accent-light: #e8993e;
          --accent-soft: rgba(201,119,30,.08);
          --on-accent: #ffffff;
          --teal: #0d9488;
          --teal-soft: rgba(13,148,136,.08);
          --danger: #dc2626;
          --danger-soft: rgba(220,38,38,.06);
          --shadow-sm: 0 2px 12px rgba(0,0,0,.04);
          --shadow-md: 0 8px 32px rgba(0,0,0,.06);
          --shadow-lg: 0 20px 60px rgba(0,0,0,.08);
          --shadow-xl: 0 30px 80px rgba(0,0,0,.1);
          --radius: 20px;
        }

        /* ─── RESET ─── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: var(--bg); font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: var(--text); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: var(--accent); }
        button { font-family: inherit; cursor: pointer; border: none; background: none; }
        :focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
        .mono { font-family: 'JetBrains Mono', monospace; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
        }

        /* ─── REVEAL ─── */
        .reveal { opacity: 0; transform: translateY(40px) scale(.98); transition: opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
        .reveal-in { opacity: 1; transform: translateY(0) scale(1); }

        /* ─── NAV ─── */
        .main-nav {
          background: rgba(255,255,255,.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid transparent;
          padding: 0 32px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 99;
          transition: all .4s cubic-bezier(.16,1,.3,1);
        }
        .main-nav-scrolled {
          border-bottom-color: var(--border-soft);
          background: rgba(255,255,255,.95);
          box-shadow: var(--shadow-sm);
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text);
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: 19px;
          letter-spacing: -.01em;
        }
        .nav-logo-node {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--accent);
          animation: pulseDot 2.4s infinite;
        }
        @keyframes pulseDot {
          0% { box-shadow: 0 0 0 0 rgba(201,119,30,.4); }
          70% { box-shadow: 0 0 0 12px rgba(201,119,30,0); }
          100% { box-shadow: 0 0 0 0 rgba(201,119,30,0); }
        }
        .nav-logo-dim { color: var(--text-dim); font-weight: 500; }

        .nav-desktop { display: flex; align-items: center; gap: 32px; }
        @media(max-width:768px){ .nav-desktop { display: none; } }

        .nav-links { display: flex; align-items: center; gap: 32px; }
        .nav-link {
          color: var(--text-dim);
          font-size: 13px;
          font-weight: 500;
          text-transform: capitalize;
          padding: 4px 0;
          position: relative;
          transition: color .3s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 2px;
          background: var(--accent);
          border-radius: 2px;
          transition: width .3s cubic-bezier(.16,1,.3,1);
        }
        .nav-link:hover { color: var(--text); }
        .nav-link:hover::after { width: 100%; }

        .nav-cart {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 22px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 100px;
          color: var(--text);
          font-size: 13px;
          font-weight: 500;
          transition: all .3s cubic-bezier(.16,1,.3,1);
          text-decoration: none;
          position: relative;
        }
        .nav-cart:hover {
          border-color: var(--accent);
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .cart-badge {
          position: absolute;
          top: -6px;
          right: -6px;
          background: var(--accent);
          color: var(--on-accent);
          width: 18px;
          height: 18px;
          border-radius: 50%;
          font-size: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .nav-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          padding: 4px;
        }
        @media(max-width:768px){ .nav-hamburger { display: flex; } }
        .hamburger-line {
          width: 24px;
          height: 2px;
          background: var(--text);
          border-radius: 2px;
          transition: all .3s cubic-bezier(.16,1,.3,1);
        }
        .hamburger-line.open:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .hamburger-line.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .hamburger-line.open:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

        .nav-mobile {
          position: absolute;
          top: 72px;
          left: 0;
          right: 0;
          background: rgba(255,255,255,.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-soft);
          padding: 20px 32px;
          animation: slideDown .35s cubic-bezier(.16,1,.3,1);
          display: none;
        }
        @media(max-width:768px){ .nav-mobile { display: block; } }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .nav-mobile-links { display: flex; flex-direction: column; gap: 4px; }
        .nav-mobile-link {
          padding: 12px 0;
          color: var(--text-dim);
          font-size: 15px;
          font-weight: 500;
          text-align: left;
          border-bottom: 1px solid var(--border-soft);
          transition: color .2s;
        }
        .nav-mobile-link:hover { color: var(--text); }
        .nav-mobile-cart {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          color: var(--text);
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          border-bottom: 1px solid var(--border-soft);
        }
        .cart-badge-mobile {
          background: var(--accent);
          color: var(--on-accent);
          padding: 2px 12px;
          border-radius: 100px;
          font-size: 12px;
        }

        /* ─── HERO ─── */
        .hero {
          padding: 80px 32px 60px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #fdfcfa 0%, #ffffff 100%);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
          align-items: center;
        }
        .hero-left { position: relative; }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 18px 6px 10px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 100px;
          margin-bottom: 24px;
          box-shadow: var(--shadow-sm);
        }
        .hero-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--teal);
          animation: pulseDot 2s infinite;
        }
        .hero-badge-text {
          color: var(--text-dim);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .06em;
          font-family: 'JetBrains Mono', monospace;
        }
        .hero-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(40px,5.5vw,62px);
          font-weight: 700;
          line-height: 1.06;
          letter-spacing: -.02em;
          margin-bottom: 20px;
        }
        .hero-title-accent {
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-desc {
          color: var(--text-dim);
          font-size: clamp(15px,1.3vw,17px);
          line-height: 1.7;
          margin-bottom: 32px;
          max-width: 480px;
        }
        .hero-desc strong { color: var(--text); font-weight: 600; }
        .hero-actions {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .btn-primary {
          padding: 15px 36px;
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          color: var(--on-accent);
          border-radius: 100px;
          font-size: 14px;
          font-weight: 700;
          transition: all .3s cubic-bezier(.16,1,.3,1);
          box-shadow: 0 4px 24px rgba(201,119,30,.25);
        }
        .btn-primary:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 40px rgba(201,119,30,.35);
        }
        .btn-secondary {
          padding: 15px 36px;
          background: var(--bg-elevated);
          color: var(--text);
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          transition: all .3s cubic-bezier(.16,1,.3,1);
        }
        .btn-secondary:hover {
          border-color: var(--accent);
          transform: translateY(-3px);
          box-shadow: var(--shadow-sm);
        }
        .hero-stats-row {
          display: flex;
          gap: 40px;
          padding-top: 28px;
          border-top: 1px solid var(--border-soft);
        }
        .hero-stat-item {
          display: flex;
          flex-direction: column;
        }
        .hero-stat-number {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 28px;
          font-weight: 700;
        }
        .hero-stat-label {
          color: var(--text-faint);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .04em;
          margin-top: 2px;
        }

        .hero-right {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-flow-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 40px;
          box-shadow: var(--shadow-lg);
          width: 100%;
          max-width: 420px;
        }
        .hero-flow {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
        }
        .flow-node {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 24px;
          background: var(--bg-soft);
          border: 1px solid var(--border);
          border-radius: 14px;
          width: 100%;
          transition: all .3s cubic-bezier(.16,1,.3,1);
        }
        .flow-node:hover {
          border-color: var(--accent);
          transform: translateX(4px);
          box-shadow: var(--shadow-sm);
        }
        .flow-icon { font-size: 24px; }
        .flow-label { font-weight: 600; font-size: 16px; }
        .flow-arrow {
          color: var(--text-faint);
          font-size: 20px;
          animation: bounceArrow 2s infinite;
        }
        @keyframes bounceArrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }

        @media(max-width:1024px){
          .hero-grid { grid-template-columns: 1fr; gap: 40px; text-align: center; }
          .hero-desc { margin-left: auto; margin-right: auto; }
          .hero-actions { justify-content: center; }
          .hero-stats-row { justify-content: center; }
          .hero-flow-card { max-width: 360px; margin: 0 auto; }
        }
        @media(max-width:480px){
          .hero { padding: 50px 16px 40px; }
          .hero-actions { flex-direction: column; align-items: center; }
          .hero-actions button { width: 100%; max-width: 300px; text-align: center; }
          .hero-stats-row { gap: 24px; flex-wrap: wrap; justify-content: center; }
          .hero-flow-card { padding: 24px; }
        }

        /* ─── SECTIONS ─── */
        .section { padding: 90px 32px; }
        .section-alt { background: var(--bg-soft); }
        .section-inner { max-width: 1200px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 52px; }
        .section-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--accent);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
          margin-bottom: 16px;
        }
        .section-tag::before {
          content: '';
          width: 24px;
          height: 2px;
          background: var(--accent);
          border-radius: 2px;
        }
        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(32px,4vw,44px);
          font-weight: 700;
          letter-spacing: -.02em;
        }
        .section-title span {
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .section-desc {
          color: var(--text-dim);
          margin-top: 16px;
          max-width: 540px;
          margin-left: auto;
          margin-right: auto;
          font-size: 14px;
          line-height: 1.7;
        }

        @media(max-width:480px){
          .section { padding: 60px 16px; }
          .section-header { margin-bottom: 36px; }
        }

        /* ─── GRIDS ─── */
        .courses-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
        .services-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; max-width: 900px; margin: 0 auto; }

        @media(max-width:860px){ .courses-grid { grid-template-columns: 1fr; } }
        @media(max-width:720px){ .services-grid { grid-template-columns: 1fr; } }

        /* ─── CARD ─── */
        .card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: all .4s cubic-bezier(.16,1,.3,1);
          box-shadow: var(--shadow-sm);
          position: relative;
          overflow: hidden;
        }
        .card:hover {
          transform: translateY(-8px);
          border-color: rgba(201,119,30,.2);
          box-shadow: var(--shadow-lg);
        }
        .card-glow {
          position: absolute;
          top: -80px;
          right: -80px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,119,30,.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .card-glow-teal { background: radial-gradient(circle, rgba(13,148,136,.06) 0%, transparent 70%); }
        .course-card { border-width: 1.5px; }
        .card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }
        .card-icon {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: var(--bg-soft);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          flex-shrink: 0;
          transition: all .3s cubic-bezier(.16,1,.3,1);
        }
        .card:hover .card-icon {
          border-color: var(--accent);
          transform: scale(1.06) rotate(-4deg);
        }
        .badge {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .04em;
          padding: 4px 16px;
          border-radius: 100px;
          text-transform: uppercase;
          font-family: 'JetBrains Mono', monospace;
          white-space: nowrap;
        }
        .badge-gold {
          color: var(--accent);
          background: var(--accent-soft);
          border: 1px solid rgba(201,119,30,.2);
        }
        .badge-recorded {
          color: var(--teal);
          background: var(--teal-soft);
          border: 1px solid rgba(13,148,136,.2);
        }
        .card-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 21px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .card-tagline { color: var(--text-dim); font-size: 14px; }
        .duration-text { color: var(--teal); font-size: 12px; margin-top: 6px; }

        .feature-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          color: var(--text-dim);
          font-size: 13px;
          line-height: 1.5;
        }
        .check { color: var(--accent); flex-shrink: 0; font-weight: 700; }
        .card-note {
          font-size: 11.5px;
          color: var(--text-faint);
          font-style: italic;
          padding-left: 14px;
          border-left: 2px solid var(--border);
          line-height: 1.6;
        }
        .card-footer {
          border-top: 1px solid var(--border-soft);
          padding-top: 20px;
        }
        .price-row { display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px; }
        .price { color: var(--accent); font-size: 28px; font-weight: 700; }
        .price-unit { color: var(--text-faint); font-size: 12px; }
        .payment-info { color: var(--text-faint); font-size: 11.5px; margin-bottom: 14px; }

        .price-box {
          background: var(--bg-soft);
          border: 1px solid var(--border-soft);
          border-radius: 14px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .price-with-original { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
        .price-original { color: var(--text-faint); font-size: 13px; text-decoration: line-through; }
        .discount-badge {
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          color: var(--on-accent);
          padding: 5px 14px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          white-space: nowrap;
        }
        .delivery-box {
          background: var(--bg-soft);
          border: 1px solid var(--border-soft);
          border-radius: 12px;
          padding: 12px 16px;
        }
        .delivery-item { color: var(--text-dim); font-size: 12px; margin-bottom: 4px; }
        .delivery-gold { color: var(--accent); font-size: 12px; font-weight: 600; }

        .refund-box {
          background: var(--danger-soft);
          border: 1px solid rgba(220,38,38,.12);
          border-radius: 12px;
          padding: 12px 16px;
        }
        .refund-title { color: var(--danger); font-size: 12px; font-weight: 700; margin-bottom: 4px; }
        .refund-text { color: var(--text-dim); font-size: 11.5px; line-height: 1.6; }

        .btn-add {
          width: 100%;
          padding: 14px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 700;
          transition: all .3s cubic-bezier(.16,1,.3,1);
        }
        .btn-add:disabled { cursor: default; }
        .btn-primary {
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          color: var(--on-accent);
        }
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 32px rgba(201,119,30,.3);
        }
        .btn-added {
          background: var(--bg-soft);
          color: var(--text-faint);
          border: 1px solid var(--border-soft);
        }

        .btn-outline-toggle {
          width: 100%;
          padding: 10px;
          border: 1px solid var(--border);
          border-radius: 100px;
          color: var(--text-dim);
          font-size: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all .3s cubic-bezier(.16,1,.3,1);
        }
        .btn-outline-toggle:hover {
          border-color: var(--accent);
          color: var(--accent);
          background: var(--accent-soft);
        }
        .chevron {
          display: inline-block;
          transform: rotate(90deg);
          transition: transform .3s cubic-bezier(.16,1,.3,1);
        }
        .chevron-up { transform: rotate(-90deg); }

        .outline-box {
          max-height: 360px;
          overflow-y: auto;
          padding: 16px;
          border: 1px solid var(--border-soft);
          border-radius: 14px;
          background: var(--bg-soft);
          animation: expandDown .35s cubic-bezier(.16,1,.3,1);
        }
        .outline-box::-webkit-scrollbar { width: 4px; }
        .outline-box::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }
        @keyframes expandDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .outline-item { border-left: 2px solid rgba(201,119,30,.3); padding-left: 14px; margin-bottom: 16px; }
        .outline-item:last-child { margin-bottom: 0; }
        .outline-header { color: var(--accent); font-size: 11.5px; font-weight: 600; margin-bottom: 6px; }
        .outline-topics { list-style: none; display: flex; flex-direction: column; gap: 4px; }
        .outline-topic { color: var(--text-dim); font-size: 12px; display: flex; gap: 6px; line-height: 1.5; }
        .outline-arrow { color: var(--text-faint); flex-shrink: 0; }

        @media(max-width:480px){
          .card { padding: 24px; }
          .card-title { font-size: 18px; }
          .price { font-size: 24px; }
          .price-box { flex-direction: column; align-items: stretch; text-align: center; }
          .discount-badge { align-self: center; }
        }

        /* ─── RATE CARD ─── */
        .rate-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 4px;
          box-shadow: var(--shadow-sm);
        }
        .rate-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 24px;
          border-bottom: 1px solid var(--border-soft);
          transition: background .2s;
          border-radius: 4px;
        }
        .rate-row:last-child { border-bottom: none; }
        .rate-row:hover { background: var(--bg-soft); }
        .rate-left { display: flex; align-items: center; gap: 14px; min-width: 0; }
        .rate-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .rate-dot-service { background: var(--accent); }
        .rate-dot-course { background: var(--teal); }
        .rate-text { min-width: 0; }
        .rate-name { font-weight: 500; font-size: 14px; }
        .rate-detail { color: var(--text-faint); font-size: 11.5px; margin-top: 2px; }
        .rate-price { display: flex; align-items: baseline; gap: 10px; flex-shrink: 0; }
        .rate-price-val { font-size: 15px; font-weight: 700; }
        .rate-price-orig { color: var(--text-faint); font-size: 12px; text-decoration: line-through; }

        .pricing-note {
          margin-top: 16px;
          padding: 16px 24px;
          background: var(--bg-elevated);
          border: 1px solid var(--border-soft);
          border-radius: 14px;
          color: var(--text-dim);
          font-size: 12px;
          line-height: 1.7;
        }
        .pricing-refund-note {
          margin-top: 10px;
          padding: 14px 24px;
          background: var(--danger-soft);
          border: 1px solid rgba(220,38,38,.1);
          border-radius: 14px;
          color: var(--text-dim);
          font-size: 12px;
          line-height: 1.7;
        }

        @media(max-width:600px){
          .rate-row { flex-direction: column; align-items: flex-start; gap: 8px; padding: 14px 16px; }
          .rate-price { align-self: flex-start; }
        }

        /* ─── WHY ME ─── */
        .whyme-inner { max-width: 860px; margin: 0 auto; text-align: center; }
        .whyme-p {
          color: var(--text-dim);
          line-height: 1.8;
          margin: 16px auto 48px;
          font-size: 14.5px;
          max-width: 560px;
        }
        .stat-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 48px;
        }
        @media(max-width:640px){ .stat-strip { grid-template-columns: 1fr; } }
        .stat-card {
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 32px;
          text-align: center;
          transition: all .3s cubic-bezier(.16,1,.3,1);
          box-shadow: var(--shadow-sm);
        }
        .stat-card:hover {
          border-color: rgba(201,119,30,.2);
          transform: translateY(-6px);
          box-shadow: var(--shadow-md);
        }
        .stat-val {
          font-family: 'Space Grotesk', sans-serif;
          color: var(--accent);
          font-size: 30px;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .stat-label { font-weight: 600; font-size: 13px; }
        .stat-desc { color: var(--text-faint); font-size: 11px; margin-top: 4px; }

        .whyme-feature-row {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
        }
        .whyme-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 24px;
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 100px;
          box-shadow: var(--shadow-sm);
          transition: all .3s cubic-bezier(.16,1,.3,1);
        }
        .whyme-feature:hover {
          border-color: var(--accent);
          transform: translateY(-3px) scale(1.02);
          box-shadow: var(--shadow-md);
        }
        .whyme-feat-text { color: var(--text-dim); font-size: 13px; }

        /* ─── CONTACT ─── */
        .contact-section {
          background: var(--bg-soft);
          border-top: 1px solid var(--border-soft);
          padding: 90px 32px;
          position: relative;
          overflow: hidden;
        }
        .contact-glow {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 300px;
          background: radial-gradient(ellipse, rgba(201,119,30,.05) 0%, transparent 70%);
          pointer-events: none;
        }
        .contact-inner { max-width: 660px; margin: 0 auto; text-align: center; position: relative; }
        .contact-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .btn-wa {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 36px;
          background: var(--bg-elevated);
          color: var(--teal);
          border: 1px solid rgba(13,148,136,.2);
          border-radius: 100px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: all .3s cubic-bezier(.16,1,.3,1);
          box-shadow: var(--shadow-sm);
        }
        .btn-wa:hover {
          border-color: var(--teal);
          background: var(--teal-soft);
          transform: translateY(-3px);
        }
        .btn-link { text-decoration: none; }
        .contact-note {
          margin-top: 20px;
          color: var(--text-faint);
          font-size: 12px;
          font-family: 'JetBrains Mono', monospace;
        }

        @media(max-width:480px){
          .contact-section { padding: 60px 16px; }
          .contact-actions { flex-direction: column; align-items: center; }
          .contact-actions a { width: 100%; max-width: 300px; justify-content: center; }
        }

        /* ─── CART FLOAT ─── */
        .cart-float {
          position: fixed;
          bottom: 32px;
          right: 32px;
          z-index: 200;
        }
        .cart-float-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          color: var(--on-accent);
          font-size: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          box-shadow: 0 4px 32px rgba(201,119,30,.3);
          transition: all .3s cubic-bezier(.16,1,.3,1);
        }
        .cart-float-btn:hover {
          transform: scale(1.1) rotate(-4deg);
          box-shadow: 0 8px 48px rgba(201,119,30,.4);
        }
        .cart-float-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--danger);
          color: #fff;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          font-size: 10px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>

      <Nav />

      {/* HERO - NEW LAYOUT */}
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-left">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              <span className="hero-badge-text">LEARN OR BUILD</span>
            </div>
            <h1 className="hero-title">
              Build the <span className="hero-title-accent">AI systems</span><br />businesses pay for
            </h1>
            <p className="hero-desc">
              Two self-paced courses on n8n automation and AI voice agents — <strong>lifetime access, immediate delivery</strong>. Or let <strong>Ahmed Memon</strong> build it for you.
            </p>
            <div className="hero-actions">
              <button onClick={() => scrollTo("courses")} className="btn-primary">
                Enroll in a course
              </button>
              <button onClick={() => scrollTo("services")} className="btn-secondary">
                Get it built
              </button>
            </div>
            <div className="hero-stats-row">
              <div className="hero-stat-item">
                <span className="hero-stat-number mono"><CountUp to={100} suffix="%" /></span>
                <span className="hero-stat-label">Satisfaction</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-number mono">Rs. <CountUp to={7499} /></span>
                <span className="hero-stat-label">Courses from</span>
              </div>
              <div className="hero-stat-item">
                <span className="hero-stat-number mono"><CountUp to={6} /></span>
                <span className="hero-stat-label">Classes each</span>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-flow-card">
              <div className="hero-flow">
                <div className="flow-node flow-node-1">
                  <span className="flow-icon">🧠</span>
                  <span className="flow-label">Learn AI Skills</span>
                </div>
                <span className="flow-arrow">↓</span>
                <div className="flow-node flow-node-2">
                  <span className="flow-icon">⚡</span>
                  <span className="flow-label">Build Systems</span>
                </div>
                <span className="flow-arrow">↓</span>
                <div className="flow-node flow-node-3">
                  <span className="flow-icon">💰</span>
                  <span className="flow-label">Get Paid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="section">
        <div className="section-inner">
          <Reveal>
            <div className="section-header">
              <p className="section-tag">start learning today</p>
              <h2 className="section-title">Self-paced <span>courses</span></h2>
              <p className="section-desc">Lifetime access, immediate delivery after payment. Learn at your own speed.</p>
            </div>
          </Reveal>
          <div className="courses-grid">
            {COURSES.map((c, i) => (
              <Reveal key={c.id} delay={i * 140}>
                <CourseCard course={c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section section-alt">
        <div className="section-inner">
          <Reveal>
            <div className="section-header">
              <p className="section-tag">or, get it built</p>
              <h2 className="section-title">Done-for-you <span>services</span></h2>
              <p className="section-desc">Don't want to build it yourself? Ahmed builds it for you, end to end.</p>
            </div>
          </Reveal>
          <div className="services-grid">
            {SERVICES.map((svc, i) => (
              <Reveal key={svc.id} delay={i * 140}>
                <ServiceCard svc={svc} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section">
        <div style={{ maxWidth: "820px", margin: "0 auto" }}>
          <Reveal>
            <div className="section-header">
              <p className="section-tag">at a glance</p>
              <h2 className="section-title">Clear <span>pricing</span></h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="rate-card">
              {rateCard.map((row, i) => (
                <div key={i} className="rate-row">
                  <div className="rate-left">
                    <span className={`rate-dot ${row.type === "service" ? "rate-dot-service" : "rate-dot-course"}`} />
                    <div className="rate-text">
                      <div className="rate-name">{row.name}</div>
                      <div className="rate-detail">{row.detail}</div>
                    </div>
                  </div>
                  <div className="rate-price">
                    {row.orig && <span className="rate-price-orig mono">Rs. {row.orig}</span>}
                    <span className="rate-price-val mono">Rs. {row.price}</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="pricing-note">
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>Note:</span> Platform accounts and associated costs (n8n, hosting, etc.) are the responsibility of the client. Ahmed builds the workflows and websites only.
            </p>
            <p className="pricing-refund-note">
              <span style={{ color: "var(--danger)", fontWeight: 700 }}>No Refund Policy:</span> Course purchase karne ke baad koi bhi refund nahi diya jayega. Enroll karne se pehle course outline zaroor dekh lein.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHY ME */}
      <section id="about" className="section section-alt">
        <div className="whyme-inner">
          <Reveal>
            <p className="section-tag">why choose me</p>
            <h2 className="section-title">Results-driven <span>AI expert</span></h2>
            <p className="whyme-p">I engineer intelligent systems that save time, cut costs, and scale businesses. Every project is built to production standards.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="stat-strip">
              {[
                { val: "30K", label: "AI Automation", desc: "n8n workflow builds" },
                { val: "20K", label: "Website", desc: "Full business site" },
                { val: "7.5K", label: "Recorded Course", desc: "Lifetime access" }
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <div className="stat-val mono">Rs. {s.val}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={180}>
            <div className="whyme-feature-row">
              {[
                { icon: "⚡", text: "Fast turnaround with quality delivery" },
                { icon: "🏆", text: "Production-ready, documented solutions" },
                { icon: "👥", text: "Dedicated post-delivery support" },
                { icon: "⭐", text: "100% client satisfaction focus" },
              ].map(({ icon, text }) => (
                <div key={text} className="whyme-feature">
                  <span>{icon}</span>
                  <span className="whyme-feat-text">{text}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="contact-glow" />
        <div className="contact-inner">
          <Reveal>
            <p className="section-tag">get started</p>
            <h2 className="section-title" style={{ marginBottom: "16px" }}>Ready to <span>start?</span></h2>
            <p style={{ color: "var(--text-dim)", marginBottom: "36px", lineHeight: 1.8, fontSize: "14px" }}>
              Add your desired course or service to the cart and checkout. Payment confirmation and you're good to go!
            </p>
            <div className="contact-actions">
              <Link href="/cart" className="btn-primary btn-link" style={{ padding: "14px 36px" }}>
                Go to cart →
              </Link>
              <a href="https://wa.me/923182082758" target="_blank" rel="noopener noreferrer" className="btn-wa">
                Chat on WhatsApp
              </a>
            </div>
            <div className="contact-note">
              Questions? WhatsApp +92 318 2082758
            </div>
          </Reveal>
        </div>
      </section>

      {count > 0 && (
        <div className="cart-float">
          <Link href="/cart" className="cart-float-btn">
            🛒
            <span className="cart-float-badge">{count}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
