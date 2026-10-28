'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBars, FaTimes, FaWhatsapp } from 'react-icons/fa';
import { BUSINESS_NAME, waLink } from '../site';

const LINKS = [
  { label: 'Courses', href: '#courses' },
  { label: 'Personal guidance', href: '#guidance' },
  { label: 'Student feedback', href: '#feedback' },
  { label: 'Services', href: '#services' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const chat = waLink(`Hi ${BUSINESS_NAME}, I'd like to know more about your courses.`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto max-w-6xl rounded-2xl border transition-all duration-300 ${
          scrolled || open
            ? 'border-white/15 bg-pine/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl'
            : 'border-white/[0.07] bg-white/[0.04] backdrop-blur-md'
        }`}
      >
        <nav aria-label="Main" className="flex h-14 items-center justify-between pl-3 pr-2 sm:h-16 sm:pl-4">
          <a href="#top" className="flex items-center gap-3 font-display text-base font-bold tracking-tight text-paper sm:text-lg">
            <span className="relative">
              <span className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-gold via-sky-300 to-transparent opacity-80" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/profile.png" alt={`${BUSINESS_NAME} profile photo`} width={40} height={40}
                   className="relative h-9 w-9 rounded-full border-2 border-pine object-cover sm:h-10 sm:w-10" />
            </span>
            {BUSINESS_NAME}
          </a>

          <ul className="hidden items-center gap-1 text-sm lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-lg px-3.5 py-2 text-paper/75 transition-colors hover:bg-white/10 hover:text-white">{l.label}</a>
              </li>
            ))}
            <li className="ml-2">
              <a href={chat} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 font-semibold text-pine shadow-[0_0_24px_-4px_#4096FF] transition-all hover:bg-[#7DB8FF] hover:shadow-[0_0_32px_-2px_#4096FF]">
                <FaWhatsapp aria-hidden /> Chat on WhatsApp
              </a>
            </li>
          </ul>

          <button className="flex h-10 w-10 items-center justify-center rounded-xl text-lg text-paper hover:bg-white/10 lg:hidden" onClick={() => setOpen((v) => !v)}
                  aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </nav>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <div className="border-t border-white/10 px-4 pb-4 pt-1 text-paper">
                <ul>
                  {LINKS.map((l) => (
                    <li key={l.href} className="border-b border-white/10 last:border-0">
                      <a href={l.href} onClick={() => setOpen(false)} className="block py-3 font-medium">{l.label}</a>
                    </li>
                  ))}
                </ul>
                <a href={chat} target="_blank" rel="noopener noreferrer"
                   className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3 font-semibold text-pine">
                  <FaWhatsapp aria-hidden /> Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
