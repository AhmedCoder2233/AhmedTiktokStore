import { FaCheck, FaGlobe, FaPhoneAlt, FaRobot, FaWhatsapp } from 'react-icons/fa';
import Navbar from './components/Navbar';
import CourseSection from './components/CourseSection';
import Hero from './components/Hero';
import Reveal from './components/Reveal';
import {
  BUNDLE_PRICE, BUNDLE_SAVING, BUSINESS_NAME, COURSE_PRICE, SITE_URL, STATS,
  courses, faqs, rs, waLink,
} from './site';

const services = [
  {
    id: 'ai-automation',
    name: 'AI Automation',
    subtitle: 'Custom automation for any repetitive process in your business.',
    icon: <FaRobot aria-hidden />,
    features: ['Custom workflow design and build', 'API and third-party tool integrations', 'Scalable business automation solutions'],
    note: 'third-party costs are your responsibility',
  },
  {
    id: 'ai-calling-agent',
    name: 'AI Calling Agent',
    subtitle: 'A voice agent that answers, qualifies and books calls for your business.',
    icon: <FaPhoneAlt aria-hidden />,
    features: ['Inbound or outbound agent, built to your script', 'CRM, calendar and webhook integrations', 'Trained on your business details'],
    note: 'third-party costs are your responsibility',
  },
  {
    id: 'website',
    name: 'Website',
    subtitle: 'A professional, modern business website that converts visitors.',
    icon: <FaGlobe aria-hidden />,
    features: ['Responsive design, up to 8 pages', 'Built on modern, SEO-friendly frameworks', 'Fast, clean and mobile-ready'],
    note: 'third-party costs are your responsibility.',
  },
];

// To add more feedback, drop the screenshot into /public and add an entry here.
const testimonials = [
  { name: 'Shah', role: 'Automation student', image: '/IMG_5523.PNG' },
  { name: 'SM Elevate', role: 'AI Automation student', image: '/IMG_6090.PNG' },
  { name: 'Syeda', role: 'Voice Agent student', image: '/IMG_5527.PNG' },
  { name: 'Rayyan', role: 'AI Automation student', image: '/IMG_6659.PNG' },
];

const policies = [
  'Every course purchase is final. As a digital product, it cannot be returned or exchanged once access has been granted.',
  'No refunds are issued after purchase, for any reason.',
  'Please review the course description, class count and full outline carefully before buying.',
  'For done-for-you services, project terms are agreed directly over WhatsApp before work begins.',
  'Questions before buying? Message on WhatsApp first. I am happy to help you decide if a course is the right fit.',
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: BUSINESS_NAME,
      url: SITE_URL,
      jobTitle: 'AI Automation and AI Voice Agent Developer and Instructor',
      image: `${SITE_URL}/profile.png`,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BUSINESS_NAME,
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    ...courses.map((c) => ({
      '@type': 'Course',
      name: c.name,
      description: `${c.subtitle}. ${c.pitch} ${c.classes}, ${c.duration}, lifetime access, personal guidance included.`,
      provider: { '@type': 'Person', name: BUSINESS_NAME, url: SITE_URL },
      inLanguage: 'en',
      offers: {
        '@type': 'Offer',
        category: 'Paid',
        price: String(COURSE_PRICE),
        priceCurrency: 'PKR',
        availability: 'https://schema.org/InStock',
        url: `${SITE_URL}/#courses`,
      },
    })),
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <main id="top">
        <Hero />

        {/* COURSES (listed before services) */}
        <CourseSection />

        {/* PERSONAL GUIDANCE */}
        <section id="guidance" className="bg-pine px-5 py-20 text-paper sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
                You will not be learning alone. I guide you personally.
              </h2>
              <p className="mt-5 max-w-lg text-lg text-paper/80">
                Stuck on a node, an API error, a voice prompt or how to message your first client? Send it to me on WhatsApp
                and I will help you myself. Every student gets my full support.
              </p>
              <a href={waLink(`Hi ${BUSINESS_NAME}, I have a question before joining a course.`)} target="_blank" rel="noopener noreferrer"
                 className="mt-8 inline-flex items-center gap-2 rounded-md bg-gold px-6 py-3.5 font-semibold text-pine transition-colors hover:bg-[#7DB8FF]">
                <FaWhatsapp aria-hidden /> Ask me a question first
              </a>
            </Reveal>
            <ul className="space-y-5">
              {[
                ['Direct line to me', 'No support tickets and no bots. You message me and I reply personally.'],
                ['Help at any point', 'Whatever problem you hit while learning, you bring it to me and we solve it.'],
                ['Built for earning', 'Both courses include classes on finding clients, writing outreach and delivering the work.'],
              ].map(([t, d], i) => (
                <Reveal as="li" delay={i * 0.12} key={t} className="lift rounded-xl border border-white/15 bg-pine-800 p-6">
                  <h3 className="font-display text-xl font-bold">{t}</h3>
                  <p className="mt-1.5 text-paper/75">{d}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* FEEDBACK */}
        <section id="feedback" className="px-5 py-14 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal><h2 className="font-display max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
              Students write to me. This is what they say.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">Real screenshots, shared by students who took the courses.</p></Reveal>
            <div className="mt-8 grid sm:mt-10 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {testimonials.map((t, i) => (
                <Reveal as="figure" delay={i * 0.1} key={t.image} className="lift overflow-hidden rounded-xl border border-line bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.image} alt={`Feedback message from ${t.name}, ${t.role}`} loading="lazy" decoding="async" className="h-auto w-full" />
                  <figcaption className="border-t border-line p-4">
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted">{t.role}</p>
                  </figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES (below courses) */}
        <section id="services" className="border-t border-line bg-white px-5 py-14 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <Reveal><h2 className="font-display max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
              Prefer it built for you? I also take on client work.
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              Done-for-you AI automation, AI calling agents and websites, scoped to what your business actually needs.
            </p></Reveal>
            <div className="mt-8 grid sm:mt-10 gap-6 md:grid-cols-3">
              {services.map((s, i) => (
                <Reveal as="article" delay={i * 0.12} key={s.id} className="lift flex flex-col rounded-xl border border-line p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-pine text-lg text-gold">{s.icon}</div>
                  <h3 className="font-display mt-5 text-xl font-bold">{s.name}</h3>
                  <p className="mt-2 text-muted">{s.subtitle}</p>
                  <ul className="mt-5 flex-1 space-y-2.5 text-sm text-muted">
                    {s.features.map((f) => (
                      <li key={f} className="flex gap-2.5"><FaCheck className="mt-1 shrink-0 text-xs text-gold-600" aria-hidden /> {f}</li>
                    ))}
                  </ul>
                  <p className="mt-5 text-xs text-muted">{s.note}</p>
                  <a href={waLink(`Hi ${BUSINESS_NAME}, I'm interested in the ${s.name} service. Can we discuss the details?`)}
                     target="_blank" rel="noopener noreferrer"
                     className="mt-6 rounded-md border border-line py-3 text-center font-semibold transition-colors hover:bg-mint">
                    Discuss this service
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="px-5 py-14 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <Reveal><h2 className="font-display text-3xl font-bold sm:text-4xl">Questions before you buy</h2></Reveal>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold">
                    {f.q}
                    <span className="text-xl text-gold-600 group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="mt-3 text-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* POLICIES */}
        <section id="policies" className="border-t border-line bg-mint px-5 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Course purchase policy</h2>
            <p className="mt-3 text-muted">
              Both courses are recorded, digital products. Once you purchase, you get <strong className="text-ink">lifetime access</strong>:
              watch and re-watch every class for as long as you like, with no expiry.
            </p>
            <ul className="mt-6 space-y-3 text-muted">
              {policies.map((p) => (
                <li key={p} className="flex gap-3"><FaCheck className="mt-1.5 shrink-0 text-xs text-pine-700" aria-hidden /> {p}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="bg-pine px-5 py-14 sm:py-20 text-center text-paper">
          <Reveal className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to start learning?</h2>
            <p className="mt-4 text-lg text-paper/80">
              Message me on WhatsApp. I will help you pick the right course, or set you up with the {rs(BUNDLE_PRICE)} bundle.
            </p>
            <a href={waLink(`Hi ${BUSINESS_NAME}, I'd like to get in touch.`)} target="_blank" rel="noopener noreferrer"
               className="mt-8 inline-flex items-center gap-2 rounded-md bg-gold px-8 py-4 font-semibold text-pine transition-colors hover:bg-[#7DB8FF]">
              <FaWhatsapp aria-hidden /> Message on WhatsApp
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="bg-pine-800 px-5 py-10 text-sm text-paper/70">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-4 sm:flex-row">
          <p>© {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</p>
          <p>Recorded digital courses. Lifetime access, non-refundable once purchased.</p>
        </div>
      </footer>

      <a href={waLink(`Hi ${BUSINESS_NAME}, I'd like to get in touch.`)} target="_blank" rel="noopener noreferrer"
         aria-label="Chat on WhatsApp"
         className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-lg sm:bottom-6 sm:right-6">
        <FaWhatsapp aria-hidden />
      </a>
    </>
  );
}
