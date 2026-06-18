"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";

// ─── SALE CONFIG ──────────────────────────────────────────────────────────────
const SALE_END_DATE = "July 31st";
const SALE_RECORDED_PRICE = 7499;
const SALE_LIVE_PRICE = 14999;
const SALE_CLIENT_HUNTING_PRICE = 5999;
const ORIGINAL_RECORDED_PRICE = 12000;
const ORIGINAL_LIVE_PRICE = 20000;
const ORIGINAL_CLIENT_HUNTING_PRICE = 9999;

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
    id: "ai-call-agent",
    name: "AI Call Agent",
    price: 50000,
    tagline: "Any type of AI voice/call agent",
    icon: "🎙️",
    features: [
      "Full AI call agent setup",
      "Custom voice & persona design",
      "CRM & booking integration",
      "Call flow scripting & testing",
      "Agent training",
    ],
    note: "All platform accounts (VAPI, Retell, Telnyx, Twilio, etc.) and costs will be provided/borne by the client.",
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
  { module: "Module 1", title: "Introduction, UI & Setup", topics: ["What is n8n?", "What is AI Automation vs Normal Automation?", "Cloud vs Self-Hosted", "n8n Instance Tour (UI Walkthrough)", "Basic Workflow Concept"] },
  { module: "Module 2", title: "Core Concepts", topics: ["Nodes Explained", "What is a Workflow?", "Trigger vs Action Nodes", "Simple Automation: Manual Trigger + Send Email", "Understanding Data Flow"] },
  { module: "Module 3", title: "Triggers, Webhooks & Cron Jobs", topics: ["What is a Webhook?", "What is a Cron Job?", "Form Submission Automations", "Workflow Trigger Node", "Real-World Examples"] },
  { module: "Module 4", title: "APIs & Real Integrations", topics: ["What is an API?", "GET vs POST Requests", "MCP Server & Client", "Nodes Open & Explained — how mapping set nodes & expressions works"] },
  { module: "Module 5", title: "Logic & Smart Automations", topics: ["IF Conditions", "Switch Nodes", "Filters", "AI Agent Node Introduction", "How AI Agent Nodes Work"] },
  { module: "Final Project", title: "Build an AI Agent Chatbot", topics: ["Generate AI Responses Automatically", "Restaurant Booking", "Save Interested Leads into Google Sheets", "Complete End-to-End Automation Workflow"] },
];

const clientHuntingOutline: never[] = [];

const COURSES = [
  {
    id: "course-automation-recorded",
    name: "AI Automation Mastery",
    format: "recorded",
    icon: "⚡",
    tagline: "Master n8n workflows from scratch",
    duration: "6 classes · ~15 min each",
    price: SALE_RECORDED_PRICE,
    originalPrice: ORIGINAL_RECORDED_PRICE,
    outline: automationOutline,
    courseType: "recorded" as const,
  },
  {
    id: "course-automation-live",
    name: "AI Automation Mastery",
    format: "live",
    icon: "⚡",
    tagline: "Live sessions on Google Meet",
    duration: "2 classes · ~45 min each",
    price: SALE_LIVE_PRICE,
    originalPrice: ORIGINAL_LIVE_PRICE,
    outline: automationOutline,
    courseType: "live" as const,
  },
  {
    id: "course-voice-agent-recorded",
    name: "AI Voice Agent Course",
    format: "recorded",
    icon: "🎙️",
    tagline: "Build production-ready AI agents",
    duration: "6 classes · ~15 min each",
    price: SALE_RECORDED_PRICE,
    originalPrice: ORIGINAL_RECORDED_PRICE,
    outline: voiceAgentOutline,
    courseType: "recorded" as const,
  },
  {
    id: "course-voice-agent-live",
    name: "AI Voice Agent Course",
    format: "live",
    icon: "🎙️",
    tagline: "Live sessions on Google Meet",
    duration: "2 classes · ~45 min each",
    price: SALE_LIVE_PRICE,
    originalPrice: ORIGINAL_LIVE_PRICE,
    outline: voiceAgentOutline,
    courseType: "live" as const,
  },
  {
    id: "course-client-hunting-recorded",
    name: "Client Hunting Masterclass",
    format: "recorded",
    icon: "🎯",
    tagline: "12 proven methods to land clients",
    duration: "1 video · ~1 hour",
    price: SALE_CLIENT_HUNTING_PRICE,
    originalPrice: ORIGINAL_CLIENT_HUNTING_PRICE,
    outline: clientHuntingOutline,
    courseType: "recorded" as const,
  },
];

// ─── SALE BANNER ──────────────────────────────────────────────────────────────
function SaleBanner() {
  return (
    <div className="sale-banner">
      <div className="sale-banner-inner">
        <div className="sale-title">
          <span>🔥</span>
          <span>SUMMER SALE — ENDS {SALE_END_DATE.toUpperCase()}</span>
        </div>
        <div className="sale-prices">
          <span className="muted">Recorded:</span>
          <span className="gold bold">Rs. {SALE_RECORDED_PRICE.toLocaleString()}</span>
          <span className="strike">Rs. {ORIGINAL_RECORDED_PRICE.toLocaleString()}</span>
          <span className="dot">·</span>
          <span className="muted">Live:</span>
          <span className="gold bold">Rs. {SALE_LIVE_PRICE.toLocaleString()}</span>
          <span className="strike">Rs. {ORIGINAL_LIVE_PRICE.toLocaleString()}</span>
          <span className="dot">·</span>
          <span className="muted">Client Hunting:</span>
          <span className="gold bold">Rs. {SALE_CLIENT_HUNTING_PRICE.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const { count } = useCart();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="main-nav">
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="nav-logo">
        Ahmed <span className="nav-logo-white">Memon</span>
      </button>
      <div className="nav-links">
        {["services", "courses", "pricing", "about"].map(s => (
          <button key={s} onClick={() => scrollTo(s)} className="nav-link">
            {s}
          </button>
        ))}
      </div>
      <Link href="/cart" className="nav-cart">
        🛒 Cart
        {count > 0 && <span className="cart-badge">{count}</span>}
      </Link>
    </nav>
  );
}

// ─── SERVICE CARD ─────────────────────────────────────────────────────────────
function ServiceCard({ svc }: { svc: typeof SERVICES[0] }) {
  const { addItem, items } = useCart();
  const inCart = !!items.find(i => i.id === svc.id);

  return (
    <div className="card service-card">
      <div className="card-header">
        <div className="card-icon">{svc.icon}</div>
        <span className="badge badge-gold">SERVICE</span>
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
          <span className="price">Rs. {svc.price.toLocaleString()}</span>
          <span className="price-unit">/ project</span>
        </div>
        <p className="payment-info">💼 50% advance · 50% after completion</p>
        <button
          onClick={() => addItem({ id: svc.id, name: svc.name, price: svc.price, type: "service", description: svc.tagline })}
          disabled={inCart}
          className={`btn-add ${inCart ? "btn-added" : "btn-primary"}`}
        >
          {inCart ? "✓ Added to Cart" : "Add to Cart"}
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
  const isLive = course.format === "live";
  const isClientHunting = course.id === "course-client-hunting-recorded";
  const discount = Math.round((1 - course.price / course.originalPrice) * 100);

  return (
    <div className={`card course-card ${isLive ? "course-live" : ""} ${isClientHunting ? "course-client-hunting" : ""}`}>
      {isLive && <div className="live-ribbon">LIVE</div>}
      {isClientHunting && <div className="new-ribbon">NEW</div>}

      <div className="card-header">
        <div className={`card-icon ${isClientHunting ? "card-icon-hunting" : ""}`}>{course.icon}</div>
        <span className={`badge ${isLive ? "badge-live" : isClientHunting ? "badge-hunting" : "badge-recorded"}`}>
          {isLive ? "🔴 LIVE" : isClientHunting ? "🎯 RECORDED" : "📹 RECORDED"}
        </span>
      </div>

      <div>
        <h3 className="card-title">{course.name}</h3>
        <p className="card-tagline">{course.tagline}</p>
        <p className="duration-text">{course.duration}</p>
      </div>

      <div className="price-box">
        <div>
          <div className="price-with-original">
            <span className="price">Rs. {course.price.toLocaleString()}</span>
            <span className="price-original">Rs. {course.originalPrice.toLocaleString()}</span>
          </div>
          <p className="price-unit">{isLive ? "2 live classes" : "lifetime access"}</p>
        </div>
        <span className="discount-badge">{discount}% OFF</span>
      </div>

      <div className="delivery-box">
        {isLive ? (
          <>
            <p className="delivery-item">✅ Interactive Q&A each session</p>
            <p className="delivery-item">🔗 Google Meet link shared before class</p>
            <p className="delivery-gold">⚡ Class starts within 1–2 days of payment</p>
          </>
        ) : isClientHunting ? (
          <>
            <p className="delivery-item">📹 12 client-getting methods covered</p>
            <p className="delivery-item">🌐 Live portfolio website built in video</p>
            <p className="delivery-gold">📨 Access sent within 3 days of payment</p>
          </>
        ) : (
          <>
            <p className="delivery-item">📹 Lifetime access to recordings</p>
            <p className="delivery-gold">📨 Access sent within 3 days of payment</p>
          </>
        )}
      </div>

      {!isClientHunting && (
        <>
          <button
            onClick={() => setShowOutline(p => !p)}
            className="btn-outline-toggle"
          >
            📋 {showOutline ? "Hide" : "View"} Full Course Outline {showOutline ? "▲" : "▼"}
          </button>

          {showOutline && (
            <div className="outline-box">
              {course.outline.map((item: any, idx: number) => (
                <div key={idx} className="outline-item">
                  <p className="outline-header">
                    {item.class || item.module}: {item.title}
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
        </>
      )}

      <button
        onClick={() => addItem({
          id: course.id,
          name: `${course.name} (${isLive ? "Live" : "Recorded"})`,
          price: course.price,
          type: "course",
          courseType: course.courseType,
          description: course.tagline,
        })}
        disabled={inCart}
        className={`btn-add ${inCart ? "btn-added" : isLive ? "btn-primary" : isClientHunting ? "btn-hunting" : "btn-outline-gold"}`}
      >
        {inCart ? "✓ Enrolled" : isLive ? "Book Live Classes" : isClientHunting ? "Get the Course →" : "Enroll Now"}
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

  return (
    <div className="site-wrapper">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #c0c0c0; border-radius: 3px; }

        /* ── BANNER ── */
        .sale-banner { background: linear-gradient(90deg,#fff0e0,#ffe8d4,#fff0e0); border-bottom: 1px solid #f0c48b; padding: 10px 16px; position: sticky; top: 0; z-index: 100; }
        .sale-banner-inner { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
        .sale-title { display: flex; align-items: center; gap: 8px; color: #d45113; font-weight: 700; font-size: 13px; letter-spacing: .05em; }
        .sale-prices { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 13px; color: #1e1a14; }
        .gold { color: #d45113; }
        .bold { font-weight: 700; }
        .strike { color: #999; text-decoration: line-through; font-size: 11px; }
        .dot { color: #ccc; }
        .muted { color: #666; }

        /* ── NAV ── */
        .main-nav { background: rgba(255,255,255,.95); backdrop-filter: blur(12px); border-bottom: 1px solid #eee; padding: 0 24px; height: 60px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 41px; z-index: 99; }
        .nav-logo { background: none; border: none; cursor: pointer; color: #d45113; font-weight: 800; font-size: 18px; letter-spacing: -.02em; }
        .nav-logo-white { color: #1e1a14; }
        .nav-links { display: flex; align-items: center; gap: 24px; }
        @media(max-width:640px){ .nav-links { display: none; } }
        .nav-link { background: none; border: none; cursor: pointer; color: #666; font-size: 13px; text-transform: capitalize; letter-spacing: .03em; padding: 4px 0; transition: color .2s; }
        .nav-link:hover { color: #d45113; }
        .nav-cart { position: relative; background: none; border: 1px solid #ddd; border-radius: 10px; padding: 8px 14px; cursor: pointer; display: flex; align-items: center; gap: 8px; color: #1e1a14; font-size: 13px; text-decoration: none; transition: border-color .2s; }
        .nav-cart:hover { border-color: #d45113; }
        .cart-badge { position: absolute; top: -8px; right: -8px; background: #d45113; color: #fff; width: 18px; height: 18px; border-radius: 50%; font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center; }

        /* ── HERO ── */
        .hero { min-height: 90vh; background: #ffffff; display: flex; align-items: center; justify-content: center; padding: 80px 24px; position: relative; overflow: hidden; }
        .hero-grid { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(rgba(212,81,19,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,81,19,.04) 1px,transparent 1px); background-size: 60px 60px; }
        .hero-glow { position: absolute; top: 20%; left: 50%; transform: translateX(-50%); width: 600px; height: 300px; background: radial-gradient(ellipse,rgba(212,81,19,.06) 0%,transparent 70%); pointer-events: none; }
        .hero-content { position: relative; text-align: center; max-width: 700px; }
        .hero-pill { display: inline-flex; align-items: center; gap: 8px; background: rgba(212,81,19,.08); border: 1px solid rgba(212,81,19,.2); border-radius: 100px; padding: 6px 16px; margin-bottom: 32px; }
        .hero-pill-dot { width: 8px; height: 8px; border-radius: 50%; background: #d45113; box-shadow: 0 0 6px #d45113; }
        .hero-pill-text { color: #d45113; font-size: 12px; font-weight: 700; letter-spacing: .08em; }
        .hero-h1 { font-size: clamp(48px,8vw,88px); font-weight: 900; color: #1e1a14; line-height: 1; letter-spacing: -.03em; margin-bottom: 20px; }
        .hero-outline { color: transparent; -webkit-text-stroke: 2px #d45113; }
        .hero-sub { color: #666; font-size: clamp(15px,2vw,18px); line-height: 1.7; max-width: 500px; margin: 0 auto 40px; }
        .hero-accent { color: #d45113; }
        .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .btn-hero-primary { background: #d45113; color: #fff; border: none; border-radius: 12px; padding: 14px 32px; font-size: 14px; font-weight: 700; cursor: pointer; transition: opacity .2s; }
        .btn-hero-primary:hover { opacity: .85; }
        .btn-hero-secondary { background: transparent; color: #d45113; border: 1px solid rgba(212,81,19,.4); border-radius: 12px; padding: 14px 32px; font-size: 14px; font-weight: 600; cursor: pointer; transition: border-color .2s, background .2s; }
        .btn-hero-secondary:hover { background: rgba(212,81,19,.05); border-color: #d45113; }
        .hero-stats { display: flex; gap: 48px; justify-content: center; margin-top: 64px; flex-wrap: wrap; }
        .hero-stat-val { color: #d45113; font-size: 28px; font-weight: 800; }
        .hero-stat-label { color: #999; font-size: 12px; margin-top: 4px; letter-spacing: .05em; }

        /* ── SALE SPOTLIGHT ── */
        .sale-spotlight { background: linear-gradient(135deg,#fff8f0,#fff4ea); border-top: 1px solid #f0e0d0; border-bottom: 1px solid #f0e0d0; padding: 60px 24px; position: relative; overflow: hidden; }
        .sale-spotlight-glow { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 50%,rgba(212,81,19,.03) 0%,transparent 70%); pointer-events: none; }
        .sale-spotlight-inner { max-width: 1000px; margin: 0 auto; position: relative; }
        .sale-badge-pill { display: inline-flex; align-items: center; gap: 8px; background: #d45113; color: #fff; border-radius: 100px; padding: 6px 20px; font-size: 12px; font-weight: 800; letter-spacing: .08em; margin-bottom: 16px; }
        .sale-h2 { color: #1e1a14; font-size: clamp(28px,5vw,40px); font-weight: 800; margin-bottom: 8px; letter-spacing: -.02em; }
        .sale-sub { color: #666; font-size: 15px; margin-bottom: 36px; }
        .sale-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(180px,1fr)); gap: 16px; margin-bottom: 32px; }
        .sale-box { background: #fff; border: 1px solid rgba(212,81,19,.2); border-radius: 16px; padding: 28px 24px; text-align: center; box-shadow: 0 4px 12px rgba(0,0,0,.02); transition: transform .2s, box-shadow .2s; }
        .sale-box:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,.05); }
        .sale-box-pct { display: inline-block; background: rgba(212,81,19,.1); color: #d45113; border-radius: 8px; padding: 3px 10px; font-size: 11px; font-weight: 700; letter-spacing: .06em; margin-bottom: 12px; }
        .sale-box-label { color: #1e1a14; font-size: 16px; font-weight: 700; margin-bottom: 4px; }
        .sale-box-price { color: #d45113; font-size: 32px; font-weight: 900; line-height: 1.1; margin-bottom: 4px; }
        .sale-box-orig { color: #aaa; font-size: 14px; text-decoration: line-through; margin-bottom: 8px; }
        .sale-box-detail { color: #888; font-size: 12px; }

        /* ── SECTIONS ── */
        .section-dark { background: #fefcf8; padding: 80px 24px; }
        .section-darker { background: #ffffff; padding: 80px 24px; }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-inner-lg { max-width: 1100px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 48px; }
        .section-eyebrow { color: #d45113; font-size: 12px; font-weight: 700; letter-spacing: .1em; margin-bottom: 12px; }
        .section-h2 { color: #1e1a14; font-size: clamp(28px,5vw,44px); font-weight: 800; letter-spacing: -.02em; }
        .section-h2 span { color: #d45113; }
        .section-desc { color: #666; margin-top: 12px; max-width: 480px; margin-left: auto; margin-right: auto; font-size: 14px; line-height: 1.7; }
        .courses-sale-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(212,81,19,.06); border: 1px solid rgba(212,81,19,.2); border-radius: 12px; padding: 10px 20px; margin-top: 20px; flex-wrap: wrap; justify-content: center; }

        /* ── CARDS GRIDS ── */
        .cards-grid-3 { display: grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 20px; }
        .cards-grid-courses { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        @media (max-width: 768px) { .cards-grid-courses { grid-template-columns: 1fr; } }

        /* ── CARD ── */
        .card { background: #ffffff; border: 1px solid #eee; border-radius: 20px; padding: 28px; display: flex; flex-direction: column; gap: 16px; transition: box-shadow .3s, border-color .3s; position: relative; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,.02); }
        .card:hover { border-color: #d45113; box-shadow: 0 12px 24px rgba(0,0,0,.04); }
        .service-card { padding: 32px; gap: 20px; }
        .course-card { padding: 28px; }
        .course-live { border-color: rgba(212,81,19,.2); }
        .course-client-hunting { border-color: rgba(99,102,241,.2); background: linear-gradient(135deg,#ffffff,#faf9ff); }
        .course-client-hunting:hover { border-color: #6366f1; box-shadow: 0 12px 24px rgba(99,102,241,.08); }
        .live-ribbon { position: absolute; top: 16px; right: -28px; background: #d45113; color: #fff; font-size: 10px; font-weight: 800; letter-spacing: .08em; padding: 4px 40px; transform: rotate(35deg); }
        .new-ribbon { position: absolute; top: 16px; right: -28px; background: #6366f1; color: #fff; font-size: 10px; font-weight: 800; letter-spacing: .08em; padding: 4px 40px; transform: rotate(35deg); }
        .card-header { display: flex; align-items: flex-start; justify-content: space-between; padding-right: 20px; }
        .card-icon { width: 48px; height: 48px; border-radius: 14px; background: rgba(212,81,19,.08); border: 1px solid rgba(212,81,19,.15); display: flex; align-items: center; justify-content: center; font-size: 22px; }
        .card-icon-hunting { background: rgba(99,102,241,.08); border-color: rgba(99,102,241,.2); }
        .badge { font-size: 11px; font-weight: 700; letter-spacing: .08em; border-radius: 100px; padding: 4px 12px; }
        .badge-gold { color: #d45113; background: rgba(212,81,19,.08); border: 1px solid rgba(212,81,19,.2); }
        .badge-live { color: #d45113; background: rgba(212,81,19,.1); border: 1px solid rgba(212,81,19,.3); }
        .badge-recorded { color: #888; background: #f5f5f5; border: 1px solid #e0e0e0; }
        .badge-hunting { color: #6366f1; background: rgba(99,102,241,.08); border: 1px solid rgba(99,102,241,.2); }
        .card-title { color: #1e1a14; font-size: 18px; font-weight: 700; margin-bottom: 6px; }
        .card-tagline { color: #888; font-size: 14px; }
        .duration-text { color: #d45113; font-size: 12px; font-family: monospace; margin-top: 6px; }
        .feature-list { list-style: none; display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .feature-item { display: flex; align-items: flex-start; gap: 10px; color: #666; font-size: 13px; }
        .check { color: #d45113; margin-top: 1px; flex-shrink: 0; }
        .card-note { font-size: 11px; color: #aaa; font-style: italic; border-left: 2px solid rgba(212,81,19,.3); padding-left: 12px; line-height: 1.6; }
        .card-footer { border-top: 1px solid #f0f0f0; padding-top: 20px; }
        .price-row { display: flex; align-items: baseline; gap: 6px; margin-bottom: 6px; }
        .price { color: #d45113; font-size: 28px; font-weight: 800; }
        .price-unit { color: #aaa; font-size: 12px; }
        .payment-info { color: #aaa; font-size: 11px; margin-bottom: 12px; }
        .price-box { background: rgba(212,81,19,.04); border: 1px solid rgba(212,81,19,.1); border-radius: 12px; padding: 16px 18px; display: flex; align-items: center; justify-content: space-between; }
        .price-with-original { display: flex; align-items: baseline; gap: 8px; }
        .price-original { color: #bbb; font-size: 14px; text-decoration: line-through; }
        .discount-badge { background: #d45113; color: #fff; border-radius: 8px; padding: 6px 12px; font-size: 13px; font-weight: 800; }
        .delivery-box { background: #fafafa; border-radius: 10px; padding: 12px 14px; }
        .delivery-item { color: #777; font-size: 12px; margin-bottom: 4px; }
        .delivery-gold { color: #d45113; font-size: 12px; }

        /* ── BUTTONS ── */
        .btn-add { width: 100%; padding: 13px; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; transition: opacity .2s; }
        .btn-add:disabled { cursor: default; }
        .btn-primary { background: #d45113; color: #fff; border: none; }
        .btn-primary:hover:not(:disabled) { opacity: .85; }
        .btn-outline-gold { background: transparent; color: #d45113; border: 1px solid rgba(212,81,19,.4); }
        .btn-outline-gold:hover:not(:disabled) { background: rgba(212,81,19,.05); border-color: #d45113; }
        .btn-hunting { background: #6366f1; color: #fff; border: none; }
        .btn-hunting:hover:not(:disabled) { opacity: .85; }
        .btn-added { background: #f5f5f5; color: #aaa; border: 1px solid #e0e0e0; }
        .btn-outline-toggle { background: transparent; border: 1px solid #e0e0e0; border-radius: 10px; padding: 10px; cursor: pointer; color: #888; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 6px; transition: border-color .2s,color .2s; width: 100%; margin-top: 8px; }
        .btn-outline-toggle:hover { border-color: #d45113; color: #d45113; }
        .btn-cta-primary { background: #d45113; color: #fff; border: none; border-radius: 12px; padding: 14px 36px; font-size: 15px; font-weight: 700; cursor: pointer; transition: opacity .2s; }
        .btn-cta-primary:hover { opacity: .85; }

        /* ── OUTLINE ── */
        .outline-box { max-height: 320px; overflow-y: auto; border: 1px solid #f0f0f0; border-radius: 12px; padding: 16px; background: #fefcf8; margin-top: 8px; }
        .outline-item { border-left: 2px solid rgba(212,81,19,.3); padding-left: 14px; margin-bottom: 16px; }
        .outline-header { color: #d45113; font-size: 12px; font-weight: 700; margin-bottom: 6px; }
        .outline-topics { list-style: none; display: flex; flex-direction: column; gap: 4px; }
        .outline-topic { color: #888; font-size: 12px; display: flex; gap: 6px; }
        .outline-arrow { color: #d0c0b0; flex-shrink: 0; }

        /* ── PRICING TABLE ── */
        .pricing-table-wrap { background: #fff; border: 1px solid #eee; border-radius: 20px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.02); }
        .pricing-table { width: 100%; border-collapse: collapse; }
        .pricing-table thead { background: #fefcf8; border-bottom: 1px solid #f0f0f0; }
        .pricing-table th { text-align: left; padding: 16px 24px; color: #aaa; font-size: 11px; font-weight: 700; letter-spacing: .08em; }
        .pricing-table th:last-child { text-align: right; }
        .pricing-table td { padding: 16px 24px; border-bottom: 1px solid #f5f5f5; }
        .pricing-table tr:last-child td { border-bottom: none; }
        .pricing-table tr:hover td { background: #fefcf8; }
        .pricing-td-inner { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .pricing-name { color: #333; font-size: 14px; }
        .type-service { font-size: 10px; font-weight: 700; letter-spacing: .06em; padding: 2px 8px; border-radius: 100px; background: rgba(212,81,19,.08); color: #d45113; border: 1px solid rgba(212,81,19,.2); white-space: nowrap; }
        .type-live { font-size: 10px; font-weight: 700; letter-spacing: .06em; padding: 2px 8px; border-radius: 100px; background: rgba(100,200,100,.08); color: #2c8f5c; border: 1px solid rgba(100,200,100,.2); white-space: nowrap; }
        .type-recorded { font-size: 10px; font-weight: 700; letter-spacing: .06em; padding: 2px 8px; border-radius: 100px; background: #f5f5f5; color: #888; border: 1px solid #e0e0e0; white-space: nowrap; }
        .type-new { font-size: 10px; font-weight: 700; letter-spacing: .06em; padding: 2px 8px; border-radius: 100px; background: rgba(99,102,241,.08); color: #6366f1; border: 1px solid rgba(99,102,241,.2); white-space: nowrap; }
        .pricing-price { color: #d45113; font-weight: 700; font-size: 15px; text-align: right; }
        .pricing-orig { color: #bbb; font-size: 12px; text-decoration: line-through; }
        .pricing-note { margin-top: 16px; padding: 16px 20px; background: rgba(212,81,19,.03); border: 1px solid rgba(212,81,19,.1); border-radius: 14px; color: #888; font-size: 12px; line-height: 1.7; }

        /* ── WHY ME ── */
        .whyme-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(280px,1fr)); gap: 48px; align-items: center; }
        .whyme-eyebrow { color: #d45113; font-size: 12px; font-weight: 700; letter-spacing: .1em; margin-bottom: 12px; }
        .whyme-h2 { color: #1e1a14; font-size: clamp(28px,4vw,36px); font-weight: 800; margin-bottom: 20px; letter-spacing: -.02em; }
        .whyme-h2 span { color: #d45113; }
        .whyme-p { color: #666; line-height: 1.8; margin-bottom: 28px; font-size: 14px; }
        .whyme-feature { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .whyme-icon { width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0; background: rgba(212,81,19,.08); border: 1px solid rgba(212,81,19,.15); display: flex; align-items: center; justify-content: center; font-size: 16px; }
        .whyme-feat-text { color: #777; font-size: 14px; }
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .stat-card { background: #fff; border: 1px solid #eee; border-radius: 16px; padding: 24px; text-align: center; transition: border-color .3s, box-shadow .3s; }
        .stat-card:hover { border-color: #d45113; box-shadow: 0 8px 20px rgba(0,0,0,.04); }
        .stat-val { color: #d45113; font-size: 28px; font-weight: 800; margin-bottom: 4px; }
        .stat-label { color: #1e1a14; font-size: 13px; font-weight: 600; }
        .stat-desc { color: #aaa; font-size: 11px; margin-top: 4px; }

        /* ── CONTACT ── */
        .contact-section { background: #fefcf8; border-top: 1px solid #f0e0d0; padding: 80px 24px; }
        .contact-inner { max-width: 600px; margin: 0 auto; text-align: center; }
        .contact-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 24px; }
        .btn-wa { display: inline-flex; align-items: center; gap: 8px; background: transparent; color: #25D366; border: 1px solid rgba(37,211,102,.3); border-radius: 12px; padding: 14px 32px; font-size: 14px; font-weight: 700; text-decoration: none; transition: border-color .2s; }
        .btn-wa:hover { border-color: #25D366; }

        /* ── CART FLOAT ── */
        .cart-float { position: fixed; bottom: 24px; right: 24px; z-index: 200; }
        .cart-float-btn { background: #d45113; color: #fff; border: none; width: 56px; height: 56px; border-radius: 50%; font-size: 22px; cursor: pointer; box-shadow: 0 4px 20px rgba(212,81,19,.3); transition: transform .2s; display: flex; align-items: center; justify-content: center; text-decoration: none; }
        .cart-float-btn:hover { transform: scale(1.05); }
        .cart-float-badge { position: absolute; top: -4px; right: -4px; background: #ff4444; color: #fff; width: 20px; height: 20px; border-radius: 50%; font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center; }
      `}</style>

      <SaleBanner />
      <Nav />

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-pill">
            <span className="hero-pill-dot" />
            <span className="hero-pill-text">🔥 SUMMER SALE — ENDS JULY 31ST! UP TO 40% OFF</span>
          </div>
          <h1 className="hero-h1">
            Ahmed <span className="hero-outline">Memon</span>
          </h1>
          <p className="hero-sub">
            AI Automations · Voice Agents · Professional Courses.{" "}
            <span className="hero-accent">Enroll now at discounted prices!</span>
          </p>
          <div className="hero-btns">
            <button onClick={() => scrollTo("services")} className="btn-hero-primary">
              Explore Services →
            </button>
            <button onClick={() => scrollTo("courses")} className="btn-hero-secondary">
              View Sale Courses 🎓
            </button>
          </div>
          <div className="hero-stats">
            {[["100%", "Satisfaction"], ["40%", "Off on Courses"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div className="hero-stat-val">{v}</div>
                <div className="hero-stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SALE SPOTLIGHT */}
      <section className="sale-spotlight">
        <div className="sale-spotlight-glow" />
        <div className="sale-spotlight-inner">
          <div style={{ textAlign: "center" }}>
            <div className="sale-badge-pill">🔥 SUMMER SALE — ENDS JULY 31ST</div>
            <h2 className="sale-h2">
              Courses at <span style={{ color: "#d45113" }}>Unbeatable Prices</span>
            </h2>
            <p className="sale-sub">Sale ends {SALE_END_DATE}. Enroll before time runs out.</p>
          </div>
          <div className="sale-grid">
            {[
              { label: "Recorded Course", salePrice: SALE_RECORDED_PRICE, origPrice: ORIGINAL_RECORDED_PRICE, detail: "6 classes · lifetime access" },
              { label: "Live Course", salePrice: SALE_LIVE_PRICE, origPrice: ORIGINAL_LIVE_PRICE, detail: "2 live sessions · Google Meet" },
              { label: "Client Hunting", salePrice: SALE_CLIENT_HUNTING_PRICE, origPrice: ORIGINAL_CLIENT_HUNTING_PRICE, detail: "~1 hr video · 12 methods" },
            ].map(item => (
              <div key={item.label} className="sale-box">
                <div className="sale-box-pct">{Math.round((1 - item.salePrice / item.origPrice) * 100)}% OFF</div>
                <div className="sale-box-label">{item.label}</div>
                <div className="sale-box-price">Rs. {item.salePrice.toLocaleString()}</div>
                <div className="sale-box-orig">Rs. {item.origPrice.toLocaleString()}</div>
                <div className="sale-box-detail">{item.detail}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button onClick={() => scrollTo("courses")} className="btn-cta-primary">
              Enroll Now at Sale Price →
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section-dark">
        <div className="section-inner">
          <div className="section-header">
            <p className="section-eyebrow">WHAT I BUILD</p>
            <h2 className="section-h2">Premium <span>Services</span></h2>
            <p className="section-desc">End-to-end AI solutions crafted with precision. You bring the vision — I build the intelligence.</p>
          </div>
          <div className="cards-grid-3">
            {SERVICES.map(svc => <ServiceCard key={svc.id} svc={svc} />)}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="section-darker">
        <div className="section-inner-lg">
          <div className="section-header">
            <p className="section-eyebrow">LEARN FROM ME</p>
            <h2 className="section-h2">Expert-Led <span>Courses</span></h2>
            <p className="section-desc">Self-paced recordings, live sessions, or learn how to land your first client — choose what fits you.</p>
            <div className="courses-sale-badge">
              <span>🔥</span>
              <span style={{ color: "#d45113", fontWeight: 700, fontSize: "14px" }}>
                Summer Sale ends {SALE_END_DATE} · Recorded Rs. {SALE_RECORDED_PRICE.toLocaleString()} · Live Rs. {SALE_LIVE_PRICE.toLocaleString()} · Client Hunting Rs. {SALE_CLIENT_HUNTING_PRICE.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="cards-grid-courses">
            {COURSES.map(c => <CourseCard key={c.id} course={c} />)}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="section-dark">
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div className="section-header">
            <p className="section-eyebrow">TRANSPARENT</p>
            <h2 className="section-h2">Clear <span>Pricing</span></h2>
          </div>
          <div className="pricing-table-wrap">
            <div style={{ overflowX: "auto" }}>
              <table className="pricing-table" style={{ minWidth: "500px" }}>
                <thead>
                  <tr>
                    <th>SERVICE / COURSE</th>
                    <th>PRICE (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "AI Automation (n8n only)", price: "30,000", type: "Service" },
                    { name: "AI Call / Voice Agent", price: "50,000", type: "Service" },
                    { name: "Complete Website", price: "20,000", type: "Service" },
                    { name: "AI Automation Mastery — Recorded", price: `${SALE_RECORDED_PRICE.toLocaleString()} 🔥`, origPrice: ORIGINAL_RECORDED_PRICE.toLocaleString(), type: "Recorded" },
                    { name: "AI Automation Mastery — Live", price: `${SALE_LIVE_PRICE.toLocaleString()} 🔥`, origPrice: ORIGINAL_LIVE_PRICE.toLocaleString(), type: "Live" },
                    { name: "AI Voice Agent Course — Recorded", price: `${SALE_RECORDED_PRICE.toLocaleString()} 🔥`, origPrice: ORIGINAL_RECORDED_PRICE.toLocaleString(), type: "Recorded" },
                    { name: "AI Voice Agent Course — Live", price: `${SALE_LIVE_PRICE.toLocaleString()} 🔥`, origPrice: ORIGINAL_LIVE_PRICE.toLocaleString(), type: "Live" },
                    { name: "Client Hunting Masterclass — Recorded", price: `${SALE_CLIENT_HUNTING_PRICE.toLocaleString()} 🔥`, origPrice: ORIGINAL_CLIENT_HUNTING_PRICE.toLocaleString(), type: "New" },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td>
                        <div className="pricing-td-inner">
                          <span className="pricing-name">{row.name}</span>
                          <span className={row.type === "Service" ? "type-service" : row.type === "Live" ? "type-live" : row.type === "New" ? "type-new" : "type-recorded"}>
                            {row.type}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div style={{ textAlign: "right" }}>
                          <div className="pricing-price">Rs. {row.price}</div>
                          {row.origPrice && <div className="pricing-orig">Rs. {row.origPrice}</div>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="pricing-note">
            <span style={{ color: "#d45113", fontWeight: 700 }}>Note:</span> Platform accounts and associated costs (n8n, voice AI, hosting, etc.) are the responsibility of the client. Ahmed builds the workflows, agents, and websites only.
          </p>
        </div>
      </section>

      {/* WHY ME */}
      <section id="about" style={{ background: "#ffffff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div className="whyme-grid">
            <div>
              <p className="whyme-eyebrow">WHY CHOOSE ME</p>
              <h2 className="whyme-h2">Results-Driven<br /><span>AI Expert</span></h2>
              <p className="whyme-p">I engineer intelligent systems that save time, cut costs, and scale businesses. Every project is built to production standards.</p>
              {[
                { icon: "⚡", text: "Fast turnaround with quality delivery" },
                { icon: "🏆", text: "Production-ready, documented solutions" },
                { icon: "👥", text: "Dedicated post-delivery support" },
                { icon: "⭐", text: "100% client satisfaction focus" },
              ].map(({ icon, text }) => (
                <div key={text} className="whyme-feature">
                  <div className="whyme-icon">{icon}</div>
                  <span className="whyme-feat-text">{text}</span>
                </div>
              ))}
            </div>
            <div className="stats-grid">
              {[
                { val: "30K", label: "AI Automation", desc: "n8n workflow builds" },
                { val: "50K", label: "AI Call Agent", desc: "Voice-ready AI systems" },
                { val: "20K", label: "Website", desc: "Full business site" },
                { val: "∞", label: "Support", desc: "Post-delivery guidance" },
              ].map(s => (
                <div key={s.label} className="stat-card">
                  <div className="stat-val">Rs. {s.val}</div>
                  <div className="stat-label">{s.label}</div>
                  <div className="stat-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-section">
        <div className="contact-inner">
          <p className="section-eyebrow">GET STARTED</p>
          <h2 className="section-h2" style={{ marginBottom: "16px" }}>Ready to <span>Build?</span></h2>
          <p style={{ color: "#666", marginBottom: "36px", lineHeight: 1.8, fontSize: "14px" }}>
            Add your desired service or course to the cart and checkout. Payment confirmation and you're good to go!
          </p>
          <div className="contact-btns">
            <Link href="/cart" className="btn-add btn-primary" style={{ width: "auto", padding: "14px 32px", textDecoration: "none" }}>
              Go to Cart →
            </Link>
            <a href="https://wa.me/923368952826" target="_blank" rel="noopener noreferrer" className="btn-wa">
              💬 Chat on WhatsApp
            </a>
          </div>
          <div style={{ marginTop: "24px", fontSize: "12px", color: "#aaa" }}>
            Questions? WhatsApp +92 336 8952826
          </div>
        </div>
      </section>

      {/* Floating cart button */}
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
