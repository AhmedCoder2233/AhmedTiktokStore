"use client";
import { useCart } from "./CartContext";
import Link from "next/link";
import { useState } from "react";
import {
  Bot, Phone, Globe, BookOpen, Zap, CheckCircle, ArrowRight,
  Star, Users, Award, MessageCircle, ChevronRight, ShoppingCart,
  Video, MonitorPlay, ChevronDown, FileText,
} from "lucide-react";

const SERVICES = [
  {
    id: "ai-automation",
    name: "AI Automation",
    icon: Bot,
    price: 30000,
    tagline: "Any type of AI automation",
    accent: "#b07d1e",
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
    icon: Phone,
    price: 50000,
    tagline: "Any type of AI voice/call agent",
    accent: "#c9912a",
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
    icon: Globe,
    price: 20000,
    tagline: "Professional business website",
    accent: "#8a6312",
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

// Detailed outline for AI Voice Agent Course
const voiceAgentOutline = [
  { class: "Class 1", title: "Introduction to AI Call Agents", topics: ["What is an AI call agent and how it works", "Overview of popular platforms: VAPI, Retell AI", "Inbound vs outbound call agents — key differences", "Real-world use cases: bookings, lead qualification, customer support", "Setting up your first platform account in Retell AI and dashboard walkthrough"] },
  { class: "Class 2", title: "Designing the Call Flow & Script", topics: ["Understanding conversation flow", "Writing a natural, human-sounding call script", "Handling greetings, objections, and fallback responses", "Setting goals for the agent: what should it collect or do?", "Testing your script logic before going live"] },
  { class: "Class 3", title: "Voice & Persona Configuration", topics: ["Choosing the right AI voice (ElevenLabs)", "Setting tone, speed, and language of the agent", "Building a persona: name, personality, and purpose", "Configuring background sound and silence detection", "Knowledge base in agent"] },
  { class: "Class 4", title: "Integrations — CRM, Calendar & Webhooks", topics: ["Connecting your agent to a CRM (GoHighLevel, HubSpot, etc.)", "Booking appointments via Cal.com or Google Calendar", "Using webhooks to send call data to other tools", "Logging call outcomes and transcripts automatically"] },
  { class: "Class 5", title: "Phone Number Setup", topics: ["How to connect phone number with Retell", "Platform from where to buy the numbers", "The UI of the phone number page", "VAPI free number and limitation"] },
  { class: "Class 6", title: "Final Project", topics: ["AI Receptionist Agent in Roman Urdu"] }
];

// Detailed outline for AI Automation Course (n8n)
const automationOutline = [
  { module: "Module 1", title: "Introduction, UI & Setup", topics: ["What is n8n?", "What is AI Automation vs Normal Automation?", "Cloud vs Self-Hosted", "n8n Instance Tour (UI Walkthrough)", "Basic Workflow Concept"] },
  { module: "Module 2", title: "Core Concepts", topics: ["Nodes Explained", "What is a Workflow?", "Trigger vs Action Nodes", "Simple Automation: Manual Trigger + Send Email", "Understanding Data Flow"] },
  { module: "Module 3", title: "Triggers, Webhooks & Cron Jobs", topics: ["What is a Webhook?", "What is a Cron Job?", "Form Submission Automations", "Workflow Trigger Node", "Real-World Examples"] },
  { module: "Module 4", title: "APIs & Real Integrations", topics: ["What is an API?", "GET vs POST Requests", "MCP Server & Client", "Nodes Open & Explained — how mapping set nodes & expressions works"] },
  { module: "Module 5", title: "Logic & Smart Automations", topics: ["IF Conditions", "Switch Nodes", "Filters", "AI Agent Node Introduction", "How AI Agent Nodes Work"] },
  { module: "Final Project", title: "Build an AI Agent Chatbot", topics: ["Generate AI Responses Automatically", "Restaurant Booking", "Save Interested Leads into Google Sheets", "Complete End-to-End Automation Workflow"] }
];

const COURSES = [
  {
    id: "course-automation-recorded",
    name: "AI Automation Mastery",
    icon: Zap,
    price: 12000,
    format: "recorded",
    tagline: "Master n8n workflows from scratch",
    duration: "6 classes · ~15 min each",
    modules: ["n8n Deep Dive", "API Mastery", "Real Projects", "Deployment", "Webhooks", "Advanced Flows"],
    outline: automationOutline,
    outlineTitle: "Course Curriculum (6 Modules)",
  },
  {
    id: "course-automation-live",
    name: "AI Automation Mastery",
    icon: Zap,
    price: 20000,
    format: "live",
    tagline: "Live sessions on Google Meet",
    duration: "2 classes · ~45 min each",
    modules: ["n8n Deep Dive", "API Mastery", "Real Projects", "Deployment", "Webhooks", "Advanced Flows"],
    outline: automationOutline,
    outlineTitle: "Course Curriculum (6 Modules)",
  },
  {
    id: "course-voice-agent-recorded",
    name: "AI Voice Agent Course",
    icon: Phone,
    price: 12000,
    format: "recorded",
    tagline: "Build production-ready AI agents",
    duration: "6 classes · ~15 min each",
    modules: ["Voice AI Fundamentals", "VAPI / Retell Setup", "Script Writing", "Launch & Scale", "CRM Integration", "Testing & QA"],
    outline: voiceAgentOutline,
    outlineTitle: "Complete Course Outline — 6 Classes · 30 Minutes Each",
  },
  {
    id: "course-voice-agent-live",
    name: "AI Voice Agent Course",
    icon: Phone,
    price: 20000,
    format: "live",
    tagline: "Live sessions on Google Meet",
    duration: "2 classes · ~45 min each",
    modules: ["Voice AI Fundamentals", "VAPI / Retell Setup", "Script Writing", "Launch & Scale", "CRM Integration", "Testing & QA"],
    outline: voiceAgentOutline,
    outlineTitle: "Complete Course Outline — 6 Classes · 30 Minutes Each",
  },
];

function ServiceCard({ svc }: { svc: (typeof SERVICES)[0] }) {
  const { addItem, items } = useCart();
  const inCart = items.find((i) => i.id === svc.id);
  const Icon = svc.icon;

  return (
    <div
      className="group relative flex flex-col gap-6 rounded-2xl p-8 bg-white border border-stone-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: svc.accent + "12", border: `1.5px solid ${svc.accent}30` }}
        >
          <Icon size={20} style={{ color: svc.accent }} />
        </div>
        <span
          className="text-[11px] font-mono font-medium px-3 py-1 rounded-full tracking-wider"
          style={{ background: svc.accent + "10", color: svc.accent, border: `1px solid ${svc.accent}25` }}
        >
          SERVICE
        </span>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-stone-900 mb-1">{svc.name}</h3>
        <p className="text-stone-500 text-sm">{svc.tagline}</p>
      </div>

      <ul className="space-y-2 flex-1">
        {svc.features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-stone-600">
            <CheckCircle size={13} className="mt-0.5 shrink-0" style={{ color: svc.accent }} />
            {f}
          </li>
        ))}
      </ul>

      {svc.note && (
        <p
          className="text-[11px] text-stone-400 italic border-l-2 pl-3 leading-relaxed"
          style={{ borderColor: svc.accent + "50" }}
        >
          {svc.note}
        </p>
      )}

      <div className="pt-4 border-t border-stone-100">
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-2xl font-bold" style={{ color: svc.accent }}>
            Rs. {svc.price.toLocaleString()}
          </span>
          <span className="text-stone-400 text-xs">/ project</span>
        </div>
        <button
          onClick={() =>
            addItem({ id: svc.id, name: svc.name, price: svc.price, type: "service", description: svc.tagline })
          }
          disabled={!!inCart}
          className={`w-full py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
            inCart ? "bg-stone-100 text-stone-400 cursor-default" : "text-white"
          }`}
          style={!inCart ? { background: svc.accent } : undefined}
        >
          {inCart ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: (typeof COURSES)[0] }) {
  const { addItem, items } = useCart();
  const inCart = items.find((i) => i.id === course.id);
  const Icon = course.icon;
  const isLive = course.format === "live";
  const [showOutline, setShowOutline] = useState(false);

  return (
    <div
      className={`group relative flex flex-col gap-5 rounded-2xl p-8 bg-white border transition-all duration-300 hover:shadow-lg ${
        isLive ? "border-amber-300 hover:border-amber-400" : "border-stone-200 hover:border-amber-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
              isLive ? "bg-amber-100 border-amber-300" : "bg-amber-50 border-amber-200"
            }`}
          >
            <Icon size={17} className="text-amber-600" />
          </div>
          <span className="text-[11px] font-mono font-medium px-3 py-1 rounded-full tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
            COURSE
          </span>
        </div>
        <div
          className={`flex items-center gap-1.5 text-[11px] font-mono px-3 py-1 rounded-full font-medium ${
            isLive
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-stone-100 text-stone-500 border border-stone-200"
          }`}
        >
          {isLive ? (
            <>
              <MonitorPlay size={11} />
              LIVE
            </>
          ) : (
            <>
              <Video size={11} />
              RECORDED
            </>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-stone-900 mb-1">{course.name}</h3>
        <p className="text-stone-500 text-sm">{course.tagline}</p>
        <p className="text-amber-600 text-xs font-mono mt-1.5">{course.duration}</p>
      </div>

      <div className="flex-1">
        <p className="text-[10px] font-mono uppercase tracking-widest text-amber-600 mb-3">Modules</p>
        <div className="flex flex-wrap gap-2">
          {course.modules.map((m) => (
            <span
              key={m}
              className="text-xs px-2.5 py-1 rounded-lg text-stone-600 bg-stone-50 border border-stone-200"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* View Outline Button */}
      <button
        onClick={() => setShowOutline(!showOutline)}
        className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 hover:bg-amber-100 transition-colors"
      >
        <FileText size={13} />
        {showOutline ? "Hide Full Outline" : "View Full Course Outline"}
        <ChevronDown size={13} className={`transition-transform ${showOutline ? "rotate-180" : ""}`} />
      </button>

      {/* Detailed Outline Section */}
      {showOutline && (
        <div className="mt-2 pt-4 border-t border-stone-100">
          <p className="text-xs font-semibold text-amber-700 mb-3 flex items-center gap-1">
            <BookOpen size={12} /> {course.outlineTitle}
          </p>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {course.outline.map((item: any, idx: number) => (
              <div key={idx} className="border-l-2 border-amber-200 pl-3">
                <p className="text-xs font-semibold text-stone-800">
                  {item.class || item.module}: {item.title}
                </p>
                <ul className="mt-1 space-y-0.5">
                  {item.topics.map((topic: string, tIdx: number) => (
                    <li key={tIdx} className="text-[11px] text-stone-500 flex items-start gap-1.5">
                      <ChevronRight size={10} className="mt-0.5 shrink-0 text-amber-500" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {isLive && (
        <ul className="space-y-1.5">
          {["Interactive Q&A each session", "Google Meet link shared before class"].map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-xs text-stone-500">
              <CheckCircle size={12} className="text-green-500 shrink-0" />
              {perk}
            </li>
          ))}
        </ul>
      )}

      <div className="pt-4 border-t border-stone-100">
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-amber-700">Rs. {course.price.toLocaleString()}</span>
          <span className="text-stone-400 text-xs">{isLive ? "2 live classes" : "lifetime access"}</span>
        </div>
        <button
          onClick={() =>
            addItem({
              id: course.id,
              name: `${course.name} (${isLive ? "Live" : "Recorded"})`,
              price: course.price,
              type: "course",
              description: course.tagline,
            })
          }
          disabled={!!inCart}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 border ${
            inCart
              ? "bg-stone-100 text-stone-400 border-stone-200 cursor-default"
              : isLive
              ? "bg-amber-600 text-white border-amber-600 hover:bg-amber-700"
              : "border-amber-400 text-amber-700 hover:bg-amber-50"
          }`}
        >
          {inCart ? "✓ Added to Cart" : isLive ? "Book Live Classes" : "Enroll Now"}
        </button>
      </div>
    </div>
  );
}

function CartButton() {
  const { count } = useCart();
  return (
    <Link href="/cart" className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <div className="bg-amber-600 text-white p-3 rounded-full shadow-lg hover:bg-amber-700 transition-colors">
          <ShoppingCart size={24} />
        </div>
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {count}
          </span>
        )}
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafaf8] text-stone-900">
      <CartButton />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(180,140,60,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(180,140,60,0.06) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, #fafaf8 40%, transparent 100%)" }}
        />
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 bg-amber-50 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[11px] font-mono tracking-widest text-amber-700 uppercase">AI Solutions Expert</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-5 leading-tight tracking-tight">
            Ahmed <span className="text-amber-600">Memon</span>
          </h1>
          <p className="text-stone-500 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Transforming businesses with{" "}
            <span className="text-amber-600 font-medium">AI Automations</span>, intelligent{" "}
            <span className="text-amber-600 font-medium">Voice Agents</span>, and world-class courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold bg-amber-600 text-white hover:bg-amber-700 transition-colors"
            >
              Explore Services <ArrowRight size={15} />
            </a>
            <a
              href="#courses"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold border border-stone-300 text-stone-700 hover:border-amber-400 hover:text-amber-700 transition-colors bg-white"
            >
              <BookOpen size={15} /> View Courses
            </a>
          </div>
          <div className="mt-20 grid grid-cols-3 gap-6 max-w-sm mx-auto">
            {[["5+", "Projects"], ["100%", "Satisfaction"], ["1+", "Years Exp."]].map(([val, label]) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-amber-600">{val}</div>
                <div className="text-stone-400 text-xs mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-30">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-amber-600" />
          <span className="text-[10px] font-mono text-amber-700 tracking-widest">scroll</span>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-600">What I Build</span>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-3">
              Premium <span className="text-amber-600">Services</span>
            </h2>
            <p className="text-stone-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              End-to-end AI solutions crafted with precision. You bring the vision — I build the intelligence.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc) => (
              <ServiceCard key={svc.id} svc={svc} />
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-stone-100 mx-6" />

      {/* COURSES */}
      <section id="courses" className="py-24 px-6 bg-[#fafaf8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-600">Learn From Me</span>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-3">
              Expert-Led <span className="text-amber-600">Courses</span>
            </h2>
            <p className="text-stone-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Choose your learning style — self-paced recorded videos or interactive live sessions on Google Meet.
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <Video size={13} className="text-stone-400" />
              <span>Recorded — Rs. 12,000 · 6 classes · ~15 min each · Lifetime access</span>
            </div>
            <div className="w-px h-4 bg-stone-200" />
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <MonitorPlay size={13} className="text-green-500" />
              <span>Live — Rs. 20,000 · 2 classes · ~45 min each · Google Meet</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-stone-100 mx-6" />

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-600">Transparent</span>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-3">
              Clear <span className="text-amber-600">Pricing</span>
            </h2>
          </div>
          <div className="rounded-2xl border border-stone-200 overflow-hidden bg-white">
            <table className="w-full">
              <thead className="bg-stone-50 border-b border-stone-200">
                <tr>
                  <th className="text-left px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-stone-500">
                    Service / Course
                  </th>
                  <th className="text-right px-6 py-4 text-[10px] font-mono uppercase tracking-widest text-stone-500">
                    Price (PKR)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "AI Automation (n8n only)", price: "30,000", type: "Service" },
                  { name: "AI Call / Voice Agent (any type)", price: "50,000", type: "Service" },
                  { name: "Complete Website", price: "20,000", type: "Service" },
                  { name: "AI Automation Mastery — Recorded (6 classes · ~15 min each)", price: "12,000", type: "Recorded" },
                  { name: "AI Automation Mastery — Live (2 classes · ~45 min each · Google Meet)", price: "20,000", type: "Live" },
                  { name: "AI Voice Agent Course — Recorded (6 classes · ~15 min each)", price: "12,000", type: "Recorded" },
                  { name: "AI Voice Agent Course — Live (2 classes · ~45 min each · Google Meet)", price: "20,000", type: "Live" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <ChevronRight size={13} className="text-amber-500 shrink-0" />
                        <span className="text-stone-700 text-sm">{row.name}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-mono whitespace-nowrap ${
                            row.type === "Service"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : row.type === "Live"
                              ? "bg-green-50 text-green-700 border border-green-200"
                              : "bg-stone-100 text-stone-500 border border-stone-200"
                          }`}
                        >
                          {row.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-amber-700 text-sm">
                      Rs. {row.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-5 p-5 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-xs text-stone-500 leading-relaxed">
              <span className="text-amber-700 font-semibold">Note:</span> All platform accounts and associated costs
              (n8n, voice AI services, hosting, domains, etc.) are the responsibility of the client. Ahmed Memon will
              build the workflows, agents, and websites only. Costs of third-party services are{" "}
              <strong className="text-stone-700">not included</strong> in the pricing above.
            </p>
          </div>
        </div>
      </section>

      <div className="border-t border-stone-100 mx-6" />

      {/* WHY ME */}
      <section id="about" className="py-24 px-6 bg-[#fafaf8]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-amber-600">Why Choose Me</span>
            <h2 className="text-4xl font-bold text-stone-900 mt-3 mb-6">
              Results-Driven <span className="text-amber-600">AI Expert</span>
            </h2>
            <p className="text-stone-500 leading-relaxed mb-8 text-sm">
              I don't just build automations — I engineer intelligent systems that save time, cut costs, and scale
              businesses. With deep expertise in AI voice agents and workflow automation, every project is built to
              production standards.
            </p>
            <div className="space-y-3">
              {[
                { icon: Zap, text: "Fast turnaround with quality delivery" },
                { icon: Award, text: "Production-ready, documented solutions" },
                { icon: Users, text: "Dedicated post-delivery support" },
                { icon: Star, text: "100% client satisfaction focus" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-amber-50 border border-amber-200">
                    <Icon size={13} className="text-amber-600" />
                  </div>
                  <span className="text-stone-600 text-sm">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { val: "30K", label: "AI Automation", desc: "n8n workflow builds" },
              { val: "50K", label: "AI Call Agent", desc: "Voice-ready AI systems" },
              { val: "20K", label: "Website", desc: "Full business site" },
              { val: "∞", label: "Support", desc: "Post-delivery guidance" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-5 text-center bg-white border border-stone-200 hover:border-amber-300 transition-colors"
              >
                <div className="text-3xl font-bold text-amber-600 mb-1">Rs. {s.val}</div>
                <div className="text-stone-800 text-sm font-medium">{s.label}</div>
                <div className="text-stone-400 text-xs mt-1">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-stone-100 mx-6" />

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-600">Get Started</span>
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 mt-3 mb-5">
            Ready to <span className="text-amber-600">Build?</span>
          </h2>
          <p className="text-stone-500 mb-10 leading-relaxed text-sm">
            Add your desired service to the cart and proceed to checkout. Once payment is confirmed, your project
            begins immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 justify-center px-8 py-3.5 rounded-xl text-sm font-semibold bg-amber-600 text-white hover:bg-amber-700 transition-colors"
            >
              Go to Cart <ArrowRight size={15} />
            </Link>
            <a
              href="https://wa.me/923368952826"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 justify-center px-8 py-3.5 rounded-xl text-sm font-semibold border border-stone-300 text-stone-700 hover:border-green-400 hover:text-green-700 transition-colors"
            >
              <MessageCircle size={15} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
