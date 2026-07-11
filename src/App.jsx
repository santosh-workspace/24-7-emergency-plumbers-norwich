import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Phone, ArrowUpRight, ArrowRight, ShieldCheck, BadgeCheck, Clock, Star,
  Siren, Droplets, AlertTriangle, Bath, Wrench, ShowerHead, CircleSlash2,
  Flame, Settings, MapPin, PoundSterling, HeartHandshake, Award,
} from 'lucide-react'
import { BIZ, SERVICES, AREAS, REVIEWS, FAQS, GALLERY } from './data.js'
import {
  Navbar, Footer, StickyCtaBar, QuoteForm, TrustStrip, FinalCta, Reveal, openQuote,
  CountUp, WaterDrops, Stars, FaqList, useSeo, LOCAL_BUSINESS_SCHEMA,
  faqSchema, REVIEW_SCHEMA,
} from './shared.jsx'

gsap.registerPlugin(ScrollTrigger)

const ICONS = { Siren, Droplets, AlertTriangle, Bath, Wrench, ShowerHead, CircleSlash2, Flame, Settings }

/* ================= HERO ================= */
function Hero() {
  const ref = useRef(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out' })
      gsap.from('.hero-line-2', { y: 60, opacity: 0, duration: 1.2, delay: 0.4, ease: 'power3.out' })
      gsap.from('.hero-cta, .hero-meta, .hero-form', { y: 24, opacity: 0, duration: 0.8, delay: 0.7, stagger: 0.12, ease: 'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden bg-deep">
      <img
        src="https://images.unsplash.com/photo-1676210134188-4c05dda172bc?auto=format&fit=crop&w=2000&q=80"
        alt="Professional emergency plumber at work in Norwich"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.45]"
        loading="eager" fetchpriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-deep/90 via-deep/50 to-deep/80" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-deep to-transparent" />
      {/* floating droplet particles */}
      <div className="absolute top-24 right-10 hidden lg:block" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="absolute block h-2 w-2 rounded-full bg-primary-light/70 animate-float"
            style={{ top: i * 34, right: i * 26, animationDelay: `${i * 0.9}s` }} />
        ))}
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-14 sm:pt-20 pb-16 min-h-[100dvh] grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
        <div>
          <p className="hero-meta inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/70 mb-6 border border-white/15 rounded-full px-4 py-2 glass-dark">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Engineers on call now · Est. {new Date().getFullYear() - BIZ.years}
          </p>
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tighter leading-[0.98]">
            <span className="hero-line-1 block">Norwich's 24/7</span>
            <span className="hero-line-1 block">Emergency Plumbers.</span>
            <span className="hero-line-2 block font-serif italic font-medium text-white/85 mt-1">There in 30–60 minutes.</span>
          </h1>
          <p className="hero-meta mt-6 max-w-lg text-white/70 text-base sm:text-lg leading-relaxed">
            Burst pipe, leak or no hot water? Our fully insured, DBS-checked plumbers answer day and night —
            with <strong className="text-white">no call-out fees</strong> and transparent pricing agreed before we start.
          </p>
          <div className="hero-cta mt-8 flex flex-wrap gap-3">
            <a href={`tel:${BIZ.phoneTel}`} className="magnetic-btn ring-pulse inline-flex items-center gap-2.5 bg-accent text-white px-7 py-4 rounded-full font-bold text-lg shadow-xl shadow-accent/30">
              <Phone className="h-5 w-5" /> Call Now — {BIZ.phoneDisplay}
            </a>
            <button onClick={openQuote} className="magnetic-btn inline-flex items-center gap-2 glass-dark text-white px-7 py-4 rounded-full font-bold text-lg border border-white/15">
              Get Free Quote <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>
          <div className="hero-meta mt-8 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-white rounded-full pl-2 pr-3 py-1.5 shadow-lg">
              <svg viewBox="0 0 24 24" className="h-4 w-4"><path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h5.9a5 5 0 0 1-2.2 3.3v2.8h3.6c2.1-2 3.3-4.9 3.3-8.3z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.3 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.6H2.1v2.9A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.8 14a6.6 6.6 0 0 1 0-4.2V6.9H2.1a11 11 0 0 0 0 10z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7L19.4 4A11 11 0 0 0 2.1 6.9L5.8 9.8c.9-2.7 3.3-4.4 6.2-4.4z"/></svg>
              <Stars n={5} className="h-3.5 w-3.5" />
              <span className="text-[13px] font-bold text-ink">{BIZ.rating}</span>
            </span>
            <span className="text-white/60 text-[13px]">from {BIZ.reviewCount} Google reviews</span>
          </div>
        </div>
        <div className="hero-form hidden md:block">
          <QuoteForm compact title="Get a callback in 15 minutes" />
        </div>
      </div>
    </section>
  )
}

/* ================= TRUST BADGES ================= */
function TrustBadges() {
  const badges = [
    { icon: ShieldCheck, title: 'Fully Insured', text: 'Comprehensive public liability cover on every job' },
    { icon: BadgeCheck, title: 'DBS-Checked Team', text: 'Every engineer vetted, qualified & City & Guilds certified' },
    { icon: PoundSterling, title: 'No Call-Out Fees', text: 'Transparent quotes agreed before any work begins' },
    { icon: HeartHandshake, title: 'Satisfaction Guaranteed', text: "If it's not right, we come back and fix it — free" },
  ]
  return (
    <section className="bg-surface border-b border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map((b, i) => (
          <Reveal key={b.title} delay={i * 90}>
            <div className="flex gap-3.5">
              <span className="shrink-0 grid place-items-center h-11 w-11 rounded-2xl bg-primary/10 text-primary"><b.icon className="h-5.5 w-5.5 h-6 w-6" /></span>
              <div>
                <h3 className="font-display font-bold text-[15px]">{b.title}</h3>
                <p className="text-muted text-[13px] leading-snug mt-0.5">{b.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ================= SERVICES OVERVIEW ================= */
function ServicesOverview() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28">
      <Reveal>
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary mb-3">What we do</p>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-balance max-w-xl">
            Every plumbing problem, <span className="font-serif italic font-medium gradient-text">one number.</span>
          </h2>
          <Link to="/services" className="lift-on-hover inline-flex items-center gap-2 font-semibold text-primary">
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-divider rounded-4xl overflow-hidden border border-divider">
        {SERVICES.map((s, i) => {
          const I = ICONS[s.icon] || Wrench
          return (
            <Reveal key={s.slug} delay={(i % 3) * 100} className="h-full">
              <Link to={`/services/${s.slug}`} className="group flex flex-col h-full bg-surface p-7 hover:bg-primary transition-colors duration-300">
                <span className="grid place-items-center h-12 w-12 rounded-2xl bg-primary/10 text-primary group-hover:bg-white/15 group-hover:text-white transition-colors mb-5">
                  <I className="h-6 w-6" />
                </span>
                <h3 className="font-display font-bold text-lg group-hover:text-white transition-colors">{s.title}</h3>
                <p className="text-muted text-sm leading-relaxed mt-2 flex-1 group-hover:text-white/75 transition-colors">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:text-white transition-colors">
                  Learn more <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

/* ================= PILLARS / STATS ================= */
function Pillars() {
  const stats = [
    { end: BIZ.years, suffix: '+', label: 'Years serving Norwich', icon: Award },
    { end: BIZ.reviewCount, suffix: '', label: `Google reviews · ${BIZ.rating}★ average`, icon: Star },
    { end: 60, suffix: ' min', label: 'Maximum emergency response', icon: Clock },
  ]
  return (
    <section className="bg-deep text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-20 grid sm:grid-cols-3 gap-10">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 120}>
            <div className="text-center sm:text-left">
              <s.icon className="h-6 w-6 text-primary-light mb-4 mx-auto sm:mx-0" />
              <p className="font-display font-extrabold text-5xl sm:text-6xl tracking-tight">
                <CountUp end={s.end} suffix={s.suffix} />
              </p>
              <p className="text-white/60 mt-2">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ================= WHY CHOOSE US ================= */
function WhyChooseUs() {
  const reasons = [
    { icon: Siren, title: 'Genuine 24/7 availability', text: 'A real engineer answers your call at 3pm or 3am — every day of the year, bank holidays included.' },
    { icon: Clock, title: '30–60 minute response', text: 'Local engineers stationed across Norwich mean we reach most emergencies within the hour.' },
    { icon: PoundSterling, title: 'Transparent pricing', text: 'Clear, upfront quotes before any work begins. No call-out fees, no hidden charges — ever.' },
    { icon: BadgeCheck, title: 'Qualified & vetted', text: 'City & Guilds qualified, Water Industry Approved, IPHE registered, fully insured and DBS-checked.' },
  ]
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28 grid lg:grid-cols-2 gap-14 items-center">
      <div>
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary mb-3">Why choose us</p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-balance mb-10">
            The plumber Norwich <span className="font-serif italic font-medium gradient-text">actually trusts.</span>
          </h2>
        </Reveal>
        <div className="space-y-7">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 100}>
              <div className="flex gap-4">
                <span className="shrink-0 grid place-items-center h-12 w-12 rounded-2xl bg-primary text-white shadow-lg shadow-primary/25"><r.icon className="h-5 w-5" /></span>
                <div>
                  <h3 className="font-display font-bold text-lg">{r.title}</h3>
                  <p className="text-muted text-sm leading-relaxed mt-1">{r.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal delay={150}>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1573165231977-3f0e27806045?auto=format&fit=crop&w=1400&q=80"
            alt="Friendly professional plumber ready to help"
            loading="lazy"
            className="rounded-5xl w-full aspect-[4/5] object-cover shadow-2xl shadow-primary/20"
          />
          <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-surface rounded-3xl shadow-xl border border-divider p-5 max-w-[240px]">
            <WaterDrops className="h-20 -mt-2" />
            <p className="font-display font-bold text-sm mt-1">Leak-free guarantee</p>
            <p className="text-muted text-[12px] leading-snug">Every repair pressure-tested before we leave.</p>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ================= AREAS ================= */
function AreasSection() {
  return (
    <section className="bg-surface border-y border-divider">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary mb-3">Areas we serve</p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight">
                Norwich &amp; <span className="font-serif italic font-medium gradient-text">all of Norfolk.</span>
              </h2>
            </div>
            <Link to="/areas" className="lift-on-hover inline-flex items-center gap-2 font-semibold text-primary">
              Coverage details <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-wrap gap-2.5">
            {AREAS.map((a) => (
              <span key={a} className="lift-on-hover inline-flex items-center gap-1.5 rounded-full border border-divider bg-background px-4 py-2 text-sm font-medium">
                <MapPin className="h-3.5 w-3.5 text-accent" /> {a}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ================= BEFORE / AFTER GALLERY PREVIEW ================= */
function BeforeAfterCard({ item }) {
  const [pos, setPos] = useState(50)
  return (
    <div className="bg-surface rounded-4xl border border-divider overflow-hidden shadow-sm lift-on-hover">
      <div className="relative aspect-[4/3] select-none overflow-hidden">
        <img src={item.after} alt={`${item.title} — after`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img src={item.before} alt={`${item.title} — before`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: 'none' }} />
        </div>
        <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow" />
          <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid place-items-center h-9 w-9 rounded-full bg-white shadow-lg text-primary text-xs font-bold">⇔</span>
        </div>
        <input
          type="range" min="5" max="95" value={pos} onChange={(e) => setPos(+e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
          aria-label={`Compare before and after: ${item.title}`}
        />
        <span className="absolute top-3 left-3 rounded-full bg-deep/70 backdrop-blur px-3 py-1 text-[11px] font-bold text-white">BEFORE</span>
        <span className="absolute top-3 right-3 rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-white">AFTER</span>
      </div>
      <div className="p-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{item.tag} · {item.place}</span>
        <h3 className="font-display font-bold mt-1">{item.title}</h3>
      </div>
    </div>
  )
}

function GalleryPreview() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary mb-3">Proof, not promises</p>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-balance">
              Before &amp; after — <span className="font-serif italic font-medium gradient-text">drag to see.</span>
            </h2>
          </div>
          <Link to="/gallery" className="lift-on-hover inline-flex items-center gap-2 font-semibold text-primary">
            Full gallery <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY.slice(0, 3).map((g, i) => (
          <Reveal key={g.title} delay={i * 120}><BeforeAfterCard item={g} /></Reveal>
        ))}
      </div>
    </section>
  )
}

/* ================= REVIEWS ================= */
function ReviewsSection() {
  return (
    <section className="bg-primary-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-20 sm:py-28">
        <Reveal>
          <div className="text-center mb-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/50 mb-3">Customer reviews</p>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight">
              Rated {BIZ.rating} from {BIZ.reviewCount} reviews<span className="font-serif italic font-medium text-white/80"> on Google.</span>
            </h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((r, i) => (
            <Reveal key={r.name} delay={i * 120}>
              <figure className="glass-dark border border-white/10 rounded-4xl p-7 h-full flex flex-col">
                <Stars n={r.stars} />
                <blockquote className="mt-4 text-white/85 text-[15px] leading-relaxed flex-1">"{r.text}"</blockquote>
                <figcaption className="mt-5 text-sm font-semibold">{r.name} <span className="text-white/50 font-normal">· {r.area}</span></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="text-center mt-10">
            <Link to="/reviews" className="magnetic-btn inline-flex items-center gap-2 bg-white text-primary-dark px-7 py-3.5 rounded-full font-bold">
              Read all reviews <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ================= FAQ ================= */
function FaqSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-8 py-20 sm:py-28">
      <Reveal>
        <div className="text-center mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-primary mb-3">Questions, answered</p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight">
            Before you call — <span className="font-serif italic font-medium gradient-text">good to know.</span>
          </h2>
        </div>
      </Reveal>
      <Reveal delay={100}><FaqList faqs={FAQS.slice(0, 6)} /></Reveal>
      <Reveal delay={150}>
        <p className="text-center text-muted text-sm mt-6">
          More questions? <Link to="/faqs" className="font-semibold text-primary">See all FAQs</Link> or call <a href={`tel:${BIZ.phoneTel}`} className="font-semibold text-primary">{BIZ.phoneDisplay}</a>
        </p>
      </Reveal>
    </section>
  )
}

/* ================= HOME ================= */
export default function App() {
  useSeo({
    title: '247 Emergency Plumber Norwich | 24/7 Plumbers, 30-60 Min Response',
    description: "Norwich's trusted 24/7 emergency plumbers. 30-60 minute response, no call-out fees, transparent pricing. Fully insured and DBS-checked. Call 07775 280211.",
    schema: [LOCAL_BUSINESS_SCHEMA, faqSchema(FAQS.slice(0, 6)), REVIEW_SCHEMA],
  })
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => clearTimeout(id)
  }, [])
  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TrustBadges />
        <ServicesOverview />
        <Pillars />
        <WhyChooseUs />
        <AreasSection />
        <GalleryPreview />
        <ReviewsSection />
        <FaqSection />
        {/* Mobile-only quote form (hero form hidden on small screens) */}
        <section className="md:hidden max-w-xl mx-auto px-4 pb-16">
          <QuoteForm title="Get a callback in 15 minutes" />
        </section>
        <FinalCta heading="Water where it shouldn't be?" />
      </main>
      <Footer />
      <StickyCtaBar />
    </div>
  )
}
