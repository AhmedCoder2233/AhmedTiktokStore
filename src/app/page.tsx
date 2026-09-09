'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FaWhatsapp,
  FaRobot,
  FaPhoneAlt,
  FaGlobe,
  FaCheck,
  FaBars,
  FaTimes,
  FaClock,
  FaMicrophoneAlt,
  FaListUl,
  FaArrowRight,
} from 'react-icons/fa';

/**
 * ─────────────────────────────────────────────────────────────────────────
 * CENTERED HERO WITH FIXED VISIBILITY + REAL FEEDBACK SCREENSHOTS
 * 
 * Fixed: Navbar overlap issue, font contrast, background blur
 * Feedback: Real student screenshots added
 * ─────────────────────────────────────────────────────────────────────────
 */

const FONT_IMPORT = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --font-display: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
  --font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;

  --bg: #f7f3ee;
  --bg-warm: #f0ebe5;
  --panel: #ffffff;
  --panel-soft: #f5f0ea;
  --line: rgba(44, 34, 28, 0.06);
  --line-strong: rgba(44, 34, 28, 0.12);

  --text: #2c221c;
  --text-muted: #5a4a3e;
  --text-dim: #8a7a6e;

  --accent: #c46b3a;
  --accent-light: #e8c9b0;
  --accent-soft: rgba(196, 107, 58, 0.06);
  --accent-gradient: linear-gradient(135deg, #c46b3a, #a8552a);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { background: var(--bg); font-family: var(--font-body); color: var(--text); line-height: 1.5; }
.font-display { font-family: var(--font-display); }

.square { border-radius: 0px; }

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
`;

const WHATSAPP_NUMBER = '923182082758';
const BUSINESS_NAME = 'Ahmed Memon';
const COURSE_PRICE = 6000;
const COURSE_ORIGINAL = 12000;

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ─── Scroll Reveal ───
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── 1. NAVBAR ──────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'Courses', href: '#courses' },
  { label: 'Feedback', href: '#feedback' },
  { label: 'Policies', href: '#policies' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 flex justify-center ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`w-[92%] max-w-7xl transition-all duration-300 border ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-[var(--line-strong)] shadow-sm'
            : 'bg-white/90 backdrop-blur-sm border-[var(--line)]'
        } square`}
      >
        <div className="px-5 sm:px-8 flex items-center justify-between h-[68px]">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => go('#top')}
            className="font-display text-xl font-semibold tracking-tight text-[var(--text)]"
          >
            {BUSINESS_NAME}
          </motion.button>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => go(l.href)}
                className="relative text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] transition-colors py-1 group"
              >
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <motion.a
              whileHover={{ scale: 1.03 }}
              href={waLink(`Hi ${BUSINESS_NAME}, I'd like to know more about your services.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-200 square"
              style={{ background: 'var(--accent-gradient)' }}
            >
              <FaWhatsapp /> Chat
            </motion.a>
          </div>

          <button
            className="lg:hidden text-[var(--text)] text-xl p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-[var(--line)]"
            >
              <div className="px-5 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((l) => (
                  <button
                    key={l.href}
                    onClick={() => go(l.href)}
                    className="text-left py-3 text-[var(--text)] font-medium border-b border-[var(--line)] last:border-0"
                  >
                    {l.label}
                  </button>
                ))}
                
                  href={waLink(`Hi ${BUSINESS_NAME}, I'd like to know more about your services.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white square"
                  style={{ background: 'var(--accent-gradient)' }}
                >
                  <FaWhatsapp /> Chat
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

// ─── 2. HERO ─── CENTERED WITH FIXED VISIBILITY ──────────────────────
function Hero() {
  return (
    <section id="top" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20 lg:pt-24">
      {/* Background Image with Strong Overlay for Text Readability */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&crop=center&q=80"
          alt="Modern workspace background"
          className="w-full h-full object-cover"
        />
        {/* Darker overlay for better text visibility */}
        <div className="absolute inset-0 bg-[#2c221c]/70 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2c221c]/50 via-transparent to-[#2c221c]/50" />
      </div>

      {/* Content - Centered with better contrast */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Small Badge - White text for dark bg */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-sm font-medium text-white/90 square mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c46b3a] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c46b3a]" />
            </span>
            AI Automation · Voice Agents · Web
          </div>

          {/* Big Heading - White for contrast */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-white">
            Smart Systems for
            <br />
            <span className="text-[#c46b3a]">Smarter Business</span>
          </h1>

          {/* Description - Light text */}
          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mt-6 leading-relaxed">
            Custom AI automations, intelligent voice agents, and modern websites — 
            built to help your business run more efficiently.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={waLink(`Hi ${BUSINESS_NAME}, I'd like to discuss a project.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold text-white transition-all duration-200 square"
              style={{ background: 'var(--accent-gradient)' }}
            >
              Start a Project <FaArrowRight className="text-sm" />
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#courses')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 border border-white/30 px-8 py-3.5 font-semibold text-white hover:bg-white/10 transition-colors square"
            >
              Explore Courses
            </motion.button>
          </div>

          {/* Trust Indicators - White text */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-6 border-t border-white/10 max-w-md mx-auto">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-white/80"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-white/70">Trusted by students & businesses</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5" style={{ background: 'var(--accent)' }} />
                80+ Students
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5" style={{ background: 'var(--accent)' }} />
                20+ Projects
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── 3. SERVICES ───────────────────────────────────────────────────────────
const services = [
  {
    id: 'ai-automation',
    name: 'AI Automation',
    subtitle: 'Custom automation for any repetitive process in your business.',
    icon: <FaRobot />,
    features: ['Custom workflow design and build', 'API and third-party tool integrations', 'Scalable business automation solutions'],
    note: 'You provide the automation platform account, if one is required.',
  },
  {
    id: 'ai-calling-agent',
    name: 'AI Calling Agent',
    subtitle: 'A voice agent that answers, qualifies and books calls for your business.',
    icon: <FaPhoneAlt />,
    features: ['Inbound or outbound agent, built to your script', 'CRM, calendar and webhook integrations', 'Trained on your business details'],
    note: 'You provide the voice platform and phone number account.',
  },
  {
    id: 'website',
    name: 'Website',
    subtitle: 'A professional, modern business website that converts visitors.',
    icon: <FaGlobe />,
    features: ['Responsive design, up to 8 pages', 'Built on modern, SEO-friendly frameworks', 'Fast, clean and mobile-ready'],
    note: 'Domain, hosting and third-party costs are your responsibility.',
  },
];

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className="h-full flex flex-col border border-[var(--line-strong)] bg-white p-7 transition-all duration-300 hover:shadow-md square"
    >
      <motion.div
        whileHover={{ rotate: 5 }}
        className="w-11 h-11 flex items-center justify-center text-lg text-white square"
        style={{ background: 'var(--accent-gradient)' }}
      >
        {service.icon}
      </motion.div>
      <h3 className="font-display text-xl font-semibold mt-5 text-[var(--text)]">{service.name}</h3>
      <p className="text-[var(--text-muted)] text-sm mt-2 leading-relaxed">{service.subtitle}</p>

      <ul className="text-sm text-[var(--text-muted)] mt-5 space-y-2.5 flex-1">
        {service.features.map((f, i) => (
          <motion.li 
            key={i} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-2.5"
          >
            <FaCheck className="text-[var(--accent)] mt-1 shrink-0 text-xs" />
            <span>{f}</span>
          </motion.li>
        ))}
      </ul>

      <p className="text-xs text-[var(--text-dim)] mt-5">{service.note}</p>

      <motion.a
        whileHover={{ scale: 1.02 }}
        href={waLink(`Hi ${BUSINESS_NAME}, I'm interested in the ${service.name} service. Can we discuss the details?`)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 w-full border border-[var(--line-strong)] text-[var(--text)] hover:bg-[var(--panel-soft)] font-semibold py-2.5 transition-colors flex items-center justify-center gap-2 text-sm square"
      >
        Get started
      </motion.a>
    </motion.div>
  );
}

function Services() {
  return (
    <section id="services" className="py-20 border-t border-[var(--line)] bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-[2.2rem] font-semibold text-[var(--text)] max-w-xl">
            Three ways I can help your business move faster
          </h2>
          <p className="text-[var(--text-muted)] mt-3 max-w-lg">
            Done-for-you automation, voice agents and websites — scoped to what your business actually needs.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 mt-10 items-stretch">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06} className="h-full">
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 4. COURSES ─────────────────────────────────────────────────────────────
const courses = [
  {
    id: 'n8n-course',
    name: 'AI Automation Mastery',
    subtitle: 'Master n8n workflows from scratch',
    price: COURSE_PRICE,
    originalPrice: COURSE_ORIGINAL,
    classes: '12 classes',
    duration: '~2h 45m total',
    romanUrdu: true,
    outline: [
      { title: 'Introduction, UI & Setup', points: ['What is n8n?', 'AI automation vs normal automation', 'Cloud vs self-hosted', 'n8n instance tour (UI walkthrough)', 'Basic workflow concept'] },
      { title: 'Core Concepts', points: ['Nodes explained', 'What is a workflow?', 'Trigger vs action nodes', 'Simple automation: manual trigger + send email', 'Understanding data flow'] },
      { title: 'Triggers, Webhooks & Cron Jobs', points: ['What is a webhook?', 'What is a cron job?', 'Form submission automations', 'Workflow trigger node', 'Real-world examples'] },
      { title: 'APIs & Real Integrations', points: ['What is an API?', 'GET vs POST requests', 'MCP server & client', 'How mapping, set nodes & expressions work'] },
      { title: 'Logic & Smart Automations', points: ['IF conditions', 'Switch nodes', 'Filters', 'AI agent node introduction', 'How AI agent nodes work'] },
      { title: 'WhatsApp Restaurant Chatbot', points: ['Third-party WhatsApp tool setup, no Business API needed', 'Building the chatbot flow — customer messages, AI takes the order', 'AI agent node configuration for natural conversation', 'Parsing and validating the order (item, quantity, price)', 'Saving confirmed orders to Google Sheets in real time', 'Full end-to-end walkthrough'] },
      { title: 'What is RAG?', points: ['What RAG (Retrieval-Augmented Generation) is', 'RAG with Pinecone', 'How to set up RAG in your workflow'] },
      { title: 'Error Handling', points: ['How error handling works', 'Building production-ready error handling'] },
      { title: 'Memory in AI Agents', points: ['Short-term vs long-term memory', 'Using Supabase Postgres as production-ready long-term memory', 'How memory state is maintained'] },
      { title: 'Finding Clients (Part 1) & Delivery', points: ['2-3 proven methods to find clients', 'Writing an effective outreach message', 'How to deliver AI automation to a client'] },
      { title: 'Lead Generation Automation', points: ['Automation that scrapes leads from Google Maps', 'AI writes a personalized email for each lead', 'Automatically sends the email to every lead'] },
      { title: 'Finding Clients (Part 2)', points: ['Finding local clients', 'Finding international clients', '4-5 high-quality client-hunting methods', 'Reaching out via WhatsApp, DMs & Emails', 'Avoiding spam filters while cold emailing'] },
    ],
  },
  {
    id: 'voice-course',
    name: 'AI Voice Agent Course',
    subtitle: 'Build production-ready AI agents',
    price: COURSE_PRICE,
    originalPrice: COURSE_ORIGINAL,
    classes: '7 classes',
    duration: '~1h 45m total',
    romanUrdu: true,
    outline: [
      { title: 'Introduction to AI Call Agents', points: ['What an AI call agent is and how it works', 'Popular platforms: VAPI, Retell AI', 'Inbound vs outbound agents', 'Real-world use cases', 'Setting up Retell AI and dashboard walkthrough'] },
      { title: 'Designing the Call Flow & Script', points: ['Single prompt agent, full dashboard walkthrough', 'Writing a natural call script with AI', 'Handling greetings, objections, fallback responses', 'Setting agent goals', 'Testing script logic', 'How voicemail & IVR works'] },
      { title: 'Voice & Configuration', points: ['Dynamic vs static variables', 'Choosing the right AI voice (ElevenLabs)', 'Tone, speed, language', 'Building a persona', 'Background sound & silence detection', 'Knowledge base in agent'] },
      { title: 'Integrations — CRM, Calendar & Webhooks', points: ['Connecting to a CRM (GoHighLevel, HubSpot, etc.)', 'Booking via Cal.com or Google Calendar', 'Sending call data via webhooks', 'Tools like transfer call and more'] },
      { title: 'Phone Number Setup', points: ['Connecting a number with Retell', 'Where to buy numbers', 'Phone number page UI'] },
      { title: 'AI Receptionist Agent', points: ['Full receptionist agent, built in Roman Urdu'] },
      { title: 'Finding Clients & Outreach', points: ['How to find clients for AI voice agents', 'How to deliver the agent to a client', 'Writing an effective outreach message'] },
    ],
  },
];

type Course = (typeof courses)[number];

function CourseCard({ course, onViewOutline }: { course: Course; onViewOutline: () => void }) {
  const discount = Math.round((1 - course.price / course.originalPrice) * 100);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="h-full flex flex-col border border-[var(--line-strong)] bg-white overflow-hidden transition-all duration-300 hover:shadow-md square"
    >
      <div className="h-1" style={{ background: 'var(--accent-gradient)' }} />
      <div className="p-7 sm:p-8 flex flex-col flex-1">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 square" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
            Recorded Course
          </span>
          <span className="text-xs text-[var(--text-dim)] flex items-center gap-1.5">
            <FaClock /> {course.classes}
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-[1.6rem] font-semibold mt-4 text-[var(--text)]">
          {course.name}
        </h3>
        <p className="text-[var(--text-muted)] text-sm mt-1.5">{course.subtitle}</p>
        <p className="text-[var(--text-dim)] text-xs mt-1">{course.duration}</p>

        <div className="flex items-baseline gap-3 mt-5">
          <span className="font-display text-3xl font-semibold text-[var(--text)]">
            Rs. {course.price.toLocaleString()}
          </span>
          <span className="text-sm line-through text-[var(--text-dim)]">
            Rs. {course.originalPrice.toLocaleString()}
          </span>
          <span className="text-xs font-semibold px-2 py-0.5 square" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
            Save {discount}%
          </span>
        </div>

        <ul className="text-sm text-[var(--text-muted)] mt-4 space-y-1.5">
          <li className="flex gap-2.5"><FaCheck className="text-[var(--accent)] mt-1 shrink-0 text-xs" /> Lifetime access, watch anytime</li>
          <li className="flex gap-2.5"><FaCheck className="text-[var(--accent)] mt-1 shrink-0 text-xs" /> Access given immediately after payment</li>
          {course.romanUrdu && (
            <li className="flex gap-2.5"><FaMicrophoneAlt className="text-[var(--accent)] mt-1 shrink-0 text-xs" /> Includes a Roman Urdu project walkthrough</li>
          )}
        </ul>

        <motion.button
          whileHover={{ x: 4 }}
          onClick={onViewOutline}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)] hover:text-[var(--accent)] transition-colors"
        >
          <FaListUl className="text-xs" /> View full course outline
        </motion.button>

        <div className="flex-1" />

        <motion.a
          whileHover={{ scale: 1.02 }}
          href={waLink(`Hi ${BUSINESS_NAME}, I'd like to buy the "${course.name}" course (Rs. ${course.price.toLocaleString()}).`)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-7 w-full font-semibold py-3 transition-transform duration-200 flex items-center justify-center gap-2 text-white square"
          style={{ background: 'var(--accent-gradient)' }}
        >
          <FaWhatsapp /> Buy Course
        </motion.a>
      </div>
    </motion.div>
  );
}

// Outline Modal
function OutlineModal({ course, onClose }: { course: Course | null; onClose: () => void }) {
  useEffect(() => {
    if (!course) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [course, onClose]);

  return (
    <AnimatePresence>
      {course && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-6"
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={`${course.name} course outline`}
            className="relative w-full sm:max-w-xl max-h-[85vh] bg-white border border-[var(--line-strong)] overflow-hidden flex flex-col square"
          >
            <div className="flex items-start justify-between gap-4 p-6 border-b border-[var(--line)]">
              <div>
                <p className="text-xs text-[var(--text-dim)]">{course.classes} · full outline</p>
                <h3 className="font-display text-xl font-semibold text-[var(--text)] mt-1">{course.name}</h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close outline"
                className="shrink-0 w-9 h-9 border border-[var(--line-strong)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--panel-soft)] transition-colors square"
              >
                <FaTimes className="text-sm" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-5">
              {course.outline.map((cls, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  className="flex gap-3.5"
                >
                  <span className="font-display text-xs font-semibold shrink-0 w-7 h-7 flex items-center justify-center text-white mt-0.5 square" style={{ background: 'var(--accent-gradient)' }}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-semibold text-[var(--text)] text-sm">{cls.title}</p>
                    <ul className="mt-1.5 space-y-1 text-sm text-[var(--text-muted)]">
                      {cls.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-6 border-t border-[var(--line)]">
              <motion.a
                whileHover={{ scale: 1.02 }}
                href={waLink(`Hi ${BUSINESS_NAME}, I'd like to buy the "${course.name}" course (Rs. ${course.price.toLocaleString()}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full font-semibold py-3 flex items-center justify-center gap-2 text-white square"
                style={{ background: 'var(--accent-gradient)' }}
              >
                <FaWhatsapp /> Buy Course
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Courses() {
  const [activeOutline, setActiveOutline] = useState<Course | null>(null);

  return (
    <section id="courses" className="py-20 border-t border-[var(--line)] bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-[2.2rem] font-semibold text-[var(--text)] max-w-xl">
            Two recorded courses, learn at your own pace
          </h2>
          <p className="text-[var(--text-muted)] mt-3 max-w-lg">
            Fully recorded, lifetime access — watch whenever it suits you, revisit any class as often as you like.
          </p>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-8 mt-10 items-stretch">
          {courses.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06} className="h-full">
              <CourseCard course={c} onViewOutline={() => setActiveOutline(c)} />
            </Reveal>
          ))}
        </div>
      </div>
      <OutlineModal course={activeOutline} onClose={() => setActiveOutline(null)} />
    </section>
  );
}

// ─── 5. FEEDBACK ─── WITH YOUR REAL SCREENSHOTS ──────────────────────
const testimonials = [
  {
    name: 'Shah (Automation Student)',
    image: '/IMG_5523.PNG'
  },
  {
    name: 'SM Elevate (AI Automation Student)',
    image: '/IMG_6090.PNG'
  },
  {
    name: 'Syeda (Voice Agent Student)',
    image: '/IMG_5527.PNG'
  },
  {
    name: 'AI Automation Course Student',
    image: '/IMG_5528.PNG'
  }
];

function Feedback() {
  return (
    <section id="feedback" className="py-20 border-t border-[var(--line)] bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-[2.2rem] font-semibold text-[var(--text)] max-w-xl">
            What students say about my courses
          </h2>
          <p className="text-[var(--text-muted)] mt-3 max-w-lg">
            Real feedback from real students who took my courses and learned AI automation.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 items-stretch">
          {testimonials.map((t, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -4 }}
              className="border border-[var(--line-strong)] bg-white overflow-hidden transition-all duration-300 square shadow-sm hover:shadow-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={t.image} 
                alt={`Feedback from ${t.name}`} 
                className="w-full h-auto" 
              />
              <div className="p-4 border-t border-[var(--line)]">
                <p className="text-sm font-medium text-[var(--text)]">{t.name}</p>
                <p className="text-xs text-[var(--text-muted)]">Student Feedback</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── 6. POLICIES ─────────────────────────────────────────────────────────────
function Policies() {
  return (
    <section id="policies" className="py-20 border-t border-[var(--line)]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-[var(--text)]">
            Course purchase policy
          </h2>
          <p className="text-[var(--text-muted)] mt-3 leading-relaxed">
            Both courses are recorded, digital products. Once you purchase, you're granted{' '}
            <span className="font-semibold text-[var(--accent)]">lifetime access</span> —
            watch and re-watch every class for as long as you like, with no expiry.
          </p>

          <ul className="mt-8 space-y-4 text-[var(--text-muted)] leading-relaxed">
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 mt-2 shrink-0" style={{ background: 'var(--accent)' }} />
              Every course purchase is final. As a digital product, it cannot be returned or exchanged once access has been granted.
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 mt-2 shrink-0" style={{ background: 'var(--accent)' }} />
              No refunds are issued after purchase, for any reason.
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 mt-2 shrink-0" style={{ background: 'var(--accent)' }} />
              Please review the course description, class count and full outline carefully before buying.
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 mt-2 shrink-0" style={{ background: 'var(--accent)' }} />
              For done-for-you services, project terms are agreed directly over WhatsApp before work begins.
            </li>
            <li className="flex gap-3">
              <span className="w-1.5 h-1.5 mt-2 shrink-0" style={{ background: 'var(--accent)' }} />
              Questions before buying? Message on WhatsApp first — happy to help you decide if a course is the right fit.
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 7. CONTACT ─────────────────────────────────────────────────────────────
function ContactBand() {
  return (
    <section id="contact" className="py-16 border-t border-[var(--line)] bg-[var(--panel-soft)]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--text)]">
            Ready to automate something?
          </h2>
          <p className="text-[var(--text-muted)] mt-2">
            Message me on WhatsApp — courses, automations or voice agents, I'll point you the right way.
          </p>
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={waLink(`Hi ${BUSINESS_NAME}, I'd like to get in touch.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-semibold px-6 py-3.5 text-white transition-transform duration-200 square"
            style={{ background: 'var(--accent-gradient)' }}
          >
            <FaWhatsapp /> Message on WhatsApp
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}

// ─── 8. FOOTER ─── SIMPLE, NO LINKS ─────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-10 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <p className="font-display text-lg font-semibold text-[var(--text)]">{BUSINESS_NAME}</p>
        <p className="text-xs text-[var(--text-dim)]">
          © {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ─── 9. FLOATING WHATSAPP ───────────────────────────────────────────────────
function FloatingWhatsApp() {
  return (
    <motion.a
      href={waLink(`Hi ${BUSINESS_NAME}, I'd like to get in touch.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08, rotate: -5 }}
      whileTap={{ scale: 0.95 }}
      className="fixed z-40 bottom-5 right-5 sm:bottom-6 sm:right-6 w-14 h-14 bg-[#25D366] text-white flex items-center justify-center text-2xl shadow-lg square"
    >
      <FaWhatsapp />
    </motion.a>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONT_IMPORT }} />
      <Navbar />
      <main className="bg-[var(--bg)]">
        <Hero />
        <Services />
        <Courses />
        <Feedback />
        <Policies />
        <ContactBand />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
