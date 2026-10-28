'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { FaCheck, FaWhatsapp } from 'react-icons/fa';
import { BUNDLE_PRICE, BUNDLE_SAVING, BUSINESS_NAME, COURSE_PRICE, STATS, courses, rs, waLink } from '../site';

const bundleLink = waLink(
  `Hi ${BUSINESS_NAME}, I'd like to buy both courses (AI Automation Mastery + AI Voice Agent Course) for ${rs(BUNDLE_PRICE)}.`,
);

const HIGHLIGHTS = [
  `Special offer: both courses for ${rs(BUNDLE_PRICE)}`,
  `Save ${rs(BUNDLE_SAVING)} on the bundle`,
  '19 recorded classes',
  'AI Automation Mastery: 12 classes',
  'AI Voice Agent Course: 7 classes',
  'Lifetime access',
  'My personal guidance and full support',
  'Access immediately after payment',
  'Classes on finding clients and delivering the work',
  `${STATS.students} students taught`,
  `Built from ${STATS.projects} real projects`,
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();
  const item = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.15 + i * 0.12, ease },
  } as const);

  return (
    <section className="relative overflow-hidden bg-pine text-paper">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="aurora absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#1F6FEB]/40 blur-[120px]" />
        <div className="aurora-2 absolute -right-32 top-20 h-[30rem] w-[30rem] rounded-full bg-[#4096FF]/25 blur-[120px]" />
        <div className="absolute inset-0 hero-grid" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-pine to-transparent" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 pb-12 pt-28 sm:gap-14 sm:pb-20 sm:pt-36 lg:grid-cols-[1.1fr_0.9fr] lg:pt-40">
        {/* copy */}
        <div className="lg:order-1">
          <motion.h1 {...item(0)} className="font-display text-[2.35rem] font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.6rem]">
            Learn AI automation and voice agents from someone who builds them for clients.
          </motion.h1>
          <motion.p {...item(1)} className="mt-5 max-w-xl text-base text-paper/75 sm:mt-6 sm:text-lg">
            Step-by-step n8n and AI calling agent courses, built from {STATS.projects} real projects. Watch at your own pace,
            keep lifetime access, and message me whenever you get stuck.
          </motion.p>
          <motion.div {...item(2)} className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <a href={bundleLink} target="_blank" rel="noopener noreferrer"
               className="shine group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gold px-7 py-4 font-semibold text-pine shadow-[0_0_40px_-6px_#4096FF] transition-all hover:-translate-y-0.5 hover:bg-[#7DB8FF]">
              <FaWhatsapp aria-hidden /> Get both courses for {rs(BUNDLE_PRICE)}
            </a>
            <a href="#courses"
               className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-7 py-4 font-semibold backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/10">
              See the courses
            </a>
          </motion.div>
          <motion.dl {...item(3)} className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-white/15 pt-6 sm:mt-12 sm:grid-cols-4">
            <div><dd className="font-display text-2xl font-bold sm:text-3xl">{STATS.students}</dd><dt className="text-sm text-paper/65">Students taught</dt></div>
            <div><dd className="font-display text-2xl font-bold sm:text-3xl">{STATS.projects}</dd><dt className="text-sm text-paper/65">Projects completed</dt></div>
            <div><dd className="font-display text-2xl font-bold sm:text-3xl">19</dd><dt className="text-sm text-paper/65">Recorded classes</dt></div>
            <div><dd className="font-display text-2xl font-bold sm:text-3xl">Lifetime</dd><dt className="text-sm text-paper/65">Access</dt></div>
          </motion.dl>
        </div>
        {/* bundle offer card */}
        <motion.aside
          aria-label="Two-course bundle offer"
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.45, ease }}
          className="relative lg:order-2"
        >
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-[#1F6FEB] via-[#4096FF] to-sky-200 opacity-40 blur-2xl" aria-hidden />
          <div className="relative rounded-3xl border border-white/20 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <p className="text-sm font-semibold text-gold">Special offer: take two courses</p>
            <p className="mt-2 font-display text-5xl font-bold">{rs(BUNDLE_PRICE)}</p>
            <p className="mt-1 text-paper/70">
              instead of <span className="line-through">{rs(COURSE_PRICE * 2)}</span>. You save {rs(BUNDLE_SAVING)}, which is {rs(BUNDLE_SAVING / 2)} off each course.
            </p>
            <ul className="mt-6 divide-y divide-white/10 border-y border-white/10">
              {courses.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-4 py-3.5">
                  <div>
                    <p className="font-semibold">{c.name}</p>
                    <p className="text-sm text-paper/60">{c.classes} · {c.duration}</p>
                  </div>
                  <p className="shrink-0 text-sm text-paper/60">{rs(COURSE_PRICE)}</p>
                </li>
              ))}
            </ul>
            <ul className="mt-5 space-y-2 text-sm text-paper/85">
              <li className="flex gap-2.5"><FaCheck className="mt-1 shrink-0 text-xs text-gold" aria-hidden /> My personal guidance and full support</li>
              <li className="flex gap-2.5"><FaCheck className="mt-1 shrink-0 text-xs text-gold" aria-hidden /> Lifetime access to every class</li>
              <li className="flex gap-2.5"><FaCheck className="mt-1 shrink-0 text-xs text-gold" aria-hidden /> Access immediately after payment</li>
            </ul>
            <a href={bundleLink} target="_blank" rel="noopener noreferrer"
               className="mt-7 flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 font-semibold text-pine transition-all hover:-translate-y-0.5 hover:bg-paper">
              <FaWhatsapp aria-hidden /> Claim the bundle
            </a>
          </div>
        </motion.aside>
      </div>

      {/* course highlights marquee */}
      <div className="relative border-y border-white/10 bg-pine-800/60 py-4 backdrop-blur" aria-label="Course highlights">
        <div className="marquee-mask overflow-hidden">
          <div className="marquee flex w-max gap-10 pr-10 text-sm font-medium text-paper/60">
            {[...HIGHLIGHTS, ...HIGHLIGHTS].map((t, i) => (
              <span key={i} className="flex items-center gap-10 whitespace-nowrap" aria-hidden={i >= HIGHLIGHTS.length}>
                {t}<span className="h-1 w-1 rounded-full bg-gold/70" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
