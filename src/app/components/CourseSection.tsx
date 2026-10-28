'use client';

import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import { FaCheck, FaClock, FaListUl, FaTimes, FaUserCheck, FaWhatsapp } from 'react-icons/fa';
import {
  BUNDLE_PRICE, BUNDLE_SAVING, BUSINESS_NAME, COURSE_ORIGINAL, COURSE_PRICE,
  courses, rs, waLink, type Course,
} from '../site';

const buyLink = (c: Course) =>
  waLink(`Hi ${BUSINESS_NAME}, I'd like to buy the "${c.name}" course (${rs(COURSE_PRICE)}).`);
const bundleLink = waLink(
  `Hi ${BUSINESS_NAME}, I'd like to buy both courses (AI Automation Mastery + AI Voice Agent Course) for ${rs(BUNDLE_PRICE)}.`,
);

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

  if (!course) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-pine/60" onClick={onClose} aria-hidden />
      <div role="dialog" aria-modal="true" aria-label={`${course.name} full outline`}
           className="relative flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-2xl bg-white sm:max-w-xl sm:rounded-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
          <div>
            <p className="text-sm text-muted">{course.classes} · {course.duration}</p>
            <h3 className="font-display mt-1 text-xl font-bold">{course.name}</h3>
          </div>
          <button onClick={onClose} aria-label="Close outline" autoFocus
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-line text-muted hover:bg-mint">
            <FaTimes />
          </button>
        </div>
        <ol className="space-y-5 overflow-y-auto p-5">
          {course.outline.map((cls, i) => (
            <li key={cls.title} className="flex gap-3.5">
              <span className="font-display mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-pine text-xs font-bold text-gold">{i + 1}</span>
              <div>
                <p className="font-semibold">{cls.title}</p>
                <ul className="mt-1.5 space-y-1 text-sm text-muted">
                  {cls.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <div className="border-t border-line p-5">
          <a href={buyLink(course)} target="_blank" rel="noopener noreferrer"
             className="flex items-center justify-center gap-2 rounded-md bg-gold py-3 font-semibold text-pine hover:bg-[#7DB8FF]">
            <FaWhatsapp aria-hidden /> Buy this course for {rs(COURSE_PRICE)}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function CourseSection() {
  const [active, setActive] = useState<Course | null>(null);

  return (
    <section id="courses" className="px-5 py-14 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal><h2 className="font-display max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
          Two courses. One skill set that businesses pay for.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Recorded classes you can watch at your own pace, with lifetime access and my personal help whenever you get stuck.
        </p></Reveal>

        <div className="mt-8 grid gap-6 sm:mt-12 sm:gap-8 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-0">
          {courses.map((c, i) => (
            <Reveal as="article" delay={i * 0.14} key={c.id} className="lift rounded-2xl border border-line bg-white p-5 sm:p-9 lg:row-span-6 lg:grid lg:grid-rows-subgrid">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5"><FaClock aria-hidden /> {c.classes}</span>
                <span>{c.duration}</span>
              </div>

              <div className="mt-3">
                <h3 className="font-display text-2xl font-bold sm:text-3xl">{c.name}</h3>
                <p className="mt-1 font-medium text-pine-700">{c.subtitle}</p>
                <p className="mt-3 text-muted">{c.pitch}</p>
              </div>

              <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-display text-4xl font-bold">{rs(COURSE_PRICE)}</span>
                <span className="text-muted line-through">{rs(COURSE_ORIGINAL)}</span>
                <span className="rounded-md bg-mint px-2 py-0.5 text-sm font-semibold text-pine-700">Save 50%</span>
              </div>

              <div className="mt-7">
                <h4 className="font-semibold">What you will be able to do</h4>
                <ul className="mt-3 space-y-2.5 text-muted">
                  {c.outcomes.map((o) => (
                    <li key={o} className="flex gap-3"><FaCheck className="mt-1.5 shrink-0 text-xs text-gold-600" aria-hidden /> <span>{o}</span></li>
                  ))}
                </ul>
              </div>

              <ul className="mt-6 space-y-2 self-start rounded-xl bg-mint p-5 text-sm">
                <li className="flex gap-3"><FaUserCheck className="mt-0.5 shrink-0 text-pine-700" aria-hidden /> <span><strong>My personal guidance and full support.</strong> Stuck anywhere? Message me and I will help you myself.</span></li>
                <li className="flex gap-3"><FaCheck className="mt-0.5 shrink-0 text-pine-700" aria-hidden /> Lifetime access, watch anytime</li>
                <li className="flex gap-3"><FaCheck className="mt-0.5 shrink-0 text-pine-700" aria-hidden /> Access given immediately after payment</li>
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={buyLink(c)} target="_blank" rel="noopener noreferrer"
                   className="flex flex-1 items-center justify-center gap-2 rounded-md bg-pine py-3.5 font-semibold text-white transition-colors hover:bg-pine-700">
                  <FaWhatsapp aria-hidden /> Buy for {rs(COURSE_PRICE)}
                </a>
                <button onClick={() => setActive(c)}
                        className="flex items-center justify-center gap-2 rounded-md border border-line px-5 py-3.5 font-semibold transition-colors hover:bg-mint">
                  <FaListUl className="text-sm" aria-hidden /> Full outline
                </button>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-6 rounded-2xl bg-pine p-6 sm:mt-8 sm:p-10 text-paper md:flex-row md:items-center">
          <div className="max-w-xl">
            <h3 className="font-display text-2xl font-bold sm:text-3xl">Take both courses for {rs(BUNDLE_PRICE)}</h3>
            <p className="mt-2 text-paper/80">
              Automation plus voice agents is the combination clients ask for. Together they cost {rs(BUNDLE_PRICE)} instead of {rs(COURSE_PRICE * 2)}, so you save {rs(BUNDLE_SAVING)} ({rs(BUNDLE_SAVING / 2)} off each course).
            </p>
          </div>
          <a href={bundleLink} target="_blank" rel="noopener noreferrer"
             className="inline-flex shrink-0 items-center gap-2 rounded-md bg-gold px-7 py-4 font-semibold text-pine transition-colors hover:bg-[#7DB8FF]">
            <FaWhatsapp aria-hidden /> Get the bundle
          </a>
        </div>
      </div>
      <OutlineModal course={active} onClose={() => setActive(null)} />
    </section>
  );
}
