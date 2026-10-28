'use client';

import { useState } from 'react';
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
  const chat = waLink(`Hi ${BUSINESS_NAME}, I'd like to know more about your courses.`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-pine/95 text-paper backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-3 font-display text-lg font-bold tracking-tight">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/profile.png" alt={`${BUSINESS_NAME} profile photo`} width={44} height={44}
               className="h-11 w-11 rounded-full" />
          {BUSINESS_NAME}
        </a>

        <ul className="hidden items-center gap-8 text-sm lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}><a href={l.href} className="text-paper/80 transition-colors hover:text-white">{l.label}</a></li>
          ))}
          <li>
            <a href={chat} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 rounded-md bg-gold px-4 py-2 font-semibold text-pine transition-colors hover:bg-[#7DB8FF]">
              <FaWhatsapp aria-hidden /> Chat on WhatsApp
            </a>
          </li>
        </ul>

        <button className="p-2 text-xl lg:hidden" onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-menu">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-white/10 bg-pine px-5 pb-5 lg:hidden">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href} className="border-b border-white/10">
                <a href={l.href} onClick={() => setOpen(false)} className="block py-3.5 font-medium">{l.label}</a>
              </li>
            ))}
          </ul>
          <a href={chat} target="_blank" rel="noopener noreferrer"
             className="mt-4 flex items-center justify-center gap-2 rounded-md bg-gold px-5 py-3 font-semibold text-pine">
            <FaWhatsapp aria-hidden /> Chat on WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
