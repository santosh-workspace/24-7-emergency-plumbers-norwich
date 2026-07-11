import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Phone, MessageCircle, Menu, X, Star, ShieldCheck, Clock, BadgeCheck,
  MapPin, Mail, ArrowUpRight, CheckCircle2,
} from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { BIZ, SERVICES, FAQS, REVIEWS, AREA_COORDS, WEB3FORMS_ACCESS_KEY } from './data.js'

L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadow,
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
})

/* ---------------- SEO helper: title, description, JSON-LD ---------------- */
export function useSeo({ title, description, schema }) {
  useEffect(() => {
    const setMeta = (sel, attrs, content) => {
      let m = document.querySelector(sel)
      if (!m) {
        m = document.createElement('meta')
        Object.entries(attrs).forEach(([k, v]) => m.setAttribute(k, v))
        document.head.appendChild(m)
      }
      m.setAttribute('content', content)
    }
    if (title) {
      document.title = title
      setMeta('meta[property="og:title"]', { property: 'og:title' }, title)
    }
    if (description) {
      setMeta('meta[name="description"]', { name: 'description' }, description)
      setMeta('meta[property="og:description"]', { property: 'og:description' }, description)
    }
    // Canonical URL for the current route
    const canonicalHref = BIZ.url + window.location.pathname.replace(/\/$/, '')
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonicalHref || BIZ.url)
    setMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalHref || BIZ.url)
    const tags = []
    const list = Array.isArray(schema) ? schema : schema ? [schema] : []
    list.forEach((obj) => {
      const s = document.createElement('script')
      s.type = 'application/ld+json'
      s.text = JSON.stringify(obj)
      document.head.appendChild(s)
      tags.push(s)
    })
    return () => tags.forEach((t) => t.remove())
  }, [title, description])
}

export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Plumber',
  name: BIZ.name,
  url: BIZ.url,
  telephone: BIZ.phoneTel,
  email: BIZ.email,
  priceRange: '££',
  image: `${BIZ.url}/og-image.jpg`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: BIZ.street,
    addressLocality: BIZ.city,
    postalCode: BIZ.postcode,
    addressCountry: 'GB',
  },
  geo: { '@type': 'GeoCoordinates', latitude: BIZ.geo.lat, longitude: BIZ.geo.lng },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
    opens: '00:00', closes: '23:59',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: BIZ.rating, reviewCount: BIZ.reviewCount,
    bestRating: 5, worstRating: 1,
  },
  areaServed: ['Norwich', 'Great Yarmouth', 'Norfolk'],
  sameAs: [BIZ.facebook, BIZ.instagram, BIZ.twitter],
}

export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export const REVIEW_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Plumber',
  name: BIZ.name,
  review: REVIEWS.slice(0, 5).map((r) => ({
    '@type': 'Review',
    author: { '@type': 'Person', name: r.name },
    reviewRating: { '@type': 'Rating', ratingValue: r.stars, bestRating: 5 },
    reviewBody: r.text,
  })),
}

/* ---------------- Scroll reveal (IntersectionObserver) ---------------- */
export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out will-change-transform ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ---------------- CountUp ---------------- */
export function CountUp({ end, suffix = '', duration = 1800 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1)
        setVal(Math.round(end * (1 - Math.pow(1 - p, 3))))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => io.disconnect()
  }, [end, duration])
  return <span ref={ref}>{val}{suffix}</span>
}

/* ---------------- Signature animation: water drops on pipe ---------------- */
export function WaterDrops({ className = '' }) {
  const drops = [
    { x: 40, delay: 0 }, { x: 110, delay: 0.8 }, { x: 180, delay: 1.6 },
    { x: 250, delay: 0.4 }, { x: 320, delay: 1.2 },
  ]
  return (
    <div className={`rain-wrap relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 360 200" className="w-full h-full">
        {drops.map((d, i) => (
          <g key={i}>
            <path
              d={`M${d.x} 20 c -5 8 -8 13 -8 18 a 8 8 0 0 0 16 0 c 0 -5 -3 -10 -8 -18 z`}
              fill="#7FB3E0" opacity="0.9"
              className="rain-drop" style={{ animationDelay: `${d.delay}s` }}
            />
            <circle
              cx={d.x} cy={160} r="10" fill="none" stroke="#7FB3E0" strokeWidth="2"
              className="rain-ripple" style={{ animationDelay: `${d.delay + 1.6}s` }}
            />
          </g>
        ))}
        <rect x="0" y="166" width="360" height="18" rx="9" fill="#123C63" />
        <rect x="0" y="169" width="360" height="4" rx="2" fill="#1E5A8F" opacity="0.7" />
        <circle cx="30" cy="175" r="3" fill="#0C2B49" />
        <circle cx="330" cy="175" r="3" fill="#0C2B49" />
      </svg>
    </div>
  )
}

/* ---------------- Stars row ---------------- */
export function Stars({ n = 5, className = 'h-4 w-4' }) {
  return (
    <span className="inline-flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`${className} ${i < n ? 'fill-amber-400 text-amber-400' : 'text-divider fill-divider'}`} />
      ))}
    </span>
  )
}

/* ---------------- Logo ---------------- */
export function Logo({ dark = false }) {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0" aria-label={`${BIZ.name} — home`}>
      <svg viewBox="0 0 24 28" className="h-8 w-7 shrink-0" fill="none">
        <path
          d="M12 1.6C7.8 7.3 4 13 4 17.6a8 8 0 0 0 16 0c0-4.6-3.8-10.3-8-15.9z"
          fill="#1C93B0"
          stroke={dark ? '#fff' : '#111111'}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M8 15.6c-.3 2.1.9 4.5 3.2 5.3"
          stroke="#AEE9F5"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.75"
        />
      </svg>
      <span className="leading-none">
        <span className={`block font-display font-extrabold text-lg tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>
          24/7
        </span>
        <span className={`block font-display font-extrabold text-lg tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>
          Emergency Plumbing
        </span>
      </span>
    </Link>
  )
}

/* ---------------- Navbar ---------------- */
const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Areas', to: '/areas' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Contact', to: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])
  return (
    <>
      <QuoteModalHost />
      <WhatsAppButton />
      {/* Emergency banner */}
      <div className="relative z-50 bg-accent text-white text-center text-[13px] font-medium py-1.5 px-4">
        <Clock className="inline h-3.5 w-3.5 -mt-0.5 mr-1.5" />
        Plumbing emergency? We answer 24/7 —{' '}
        <a href={`tel:${BIZ.phoneTel}`} className="font-bold underline underline-offset-2">{BIZ.phoneDisplay}</a>
      </div>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg shadow-primary/5' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-8 py-3">
          <Logo />
          <ul className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-full text-[14px] font-medium transition-colors ${isActive ? 'bg-primary text-white' : 'text-ink hover:bg-primary/10'}`}
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${BIZ.phoneTel}`}
              className="magnetic-btn ring-pulse hidden sm:inline-flex items-center gap-2 bg-accent text-white pl-4 pr-5 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-accent/25"
            >
              <Phone className="h-4 w-4" /> {BIZ.phoneDisplay}
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden grid place-items-center h-11 w-11 rounded-full border border-divider bg-surface"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>
      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="absolute inset-0 bg-deep/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-surface shadow-2xl p-6 pt-24 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <ul className="space-y-1">
            {NAV.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-2xl text-lg font-semibold ${isActive ? 'bg-primary text-white' : 'text-ink hover:bg-primary/10'}`}
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3">
            <button onClick={() => { setOpen(false); openQuote() }} className="magnetic-btn w-full flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-full font-bold">
              Get Free Quote
            </button>
            <a href={`tel:${BIZ.phoneTel}`} className="magnetic-btn flex items-center justify-center gap-2 bg-accent text-white py-3.5 rounded-full font-bold">
              <Phone className="h-5 w-5" /> Call {BIZ.phoneDisplay}
            </a>
            <a href={BIZ.whatsapp} className="magnetic-btn flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-full font-bold">
              <MessageCircle className="h-5 w-5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------------- Floating WhatsApp button (desktop; mobile uses the sticky bar) ---------------- */
export function WhatsAppButton() {
  return (
    <a
      href={BIZ.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${BIZ.name} on WhatsApp`}
      className="hidden sm:grid fixed z-50 right-6 bottom-6 place-items-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-black/25 magnetic-btn"
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-60" />
      <svg viewBox="0 0 24 24" className="relative h-7 w-7" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.48 1.32 5L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.22-8.24 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.06 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.68 4.25 3.75.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.15-1.19-.06-.11-.23-.17-.48-.29z" />
      </svg>
    </a>
  )
}

/* ---------------- Coverage map (real map, pinned areas) ---------------- */
export function CoverageMap({ className = '', areas = AREA_COORDS }) {
  const elRef = useRef(null)
  const mapRef = useRef(null)
  useEffect(() => {
    if (!elRef.current || mapRef.current) return
    const map = L.map(elRef.current, { scrollWheelZoom: false }).setView([BIZ.geo.lat, BIZ.geo.lng], 10)
    mapRef.current = map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map)
    L.circleMarker([BIZ.geo.lat, BIZ.geo.lng], {
      radius: 9, color: '#fff', weight: 3, fillColor: '#E2323D', fillOpacity: 1,
    }).addTo(map).bindPopup(`<strong>${BIZ.name}</strong><br/>${BIZ.address}`)
    areas.forEach((a) => {
      if (a.name === 'Norwich') return
      L.marker([a.lat, a.lng]).addTo(map).bindPopup(`<strong>${a.name}</strong><br/>Covered 24/7`)
    })
    return () => { map.remove(); mapRef.current = null }
  }, [areas])
  return <div ref={elRef} className={`z-0 ${className}`} />
}

/* ---------------- Sticky mobile CTA bar ---------------- */
export function StickyCtaBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden grid grid-cols-2 gap-px bg-divider border-t border-divider" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <a href={`tel:${BIZ.phoneTel}`} className="flex items-center justify-center gap-2 bg-accent text-white py-3.5 font-bold text-[15px]">
        <Phone className="h-5 w-5" /> Call Now
      </a>
      <a href={BIZ.whatsapp} className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 font-bold text-[15px]">
        <MessageCircle className="h-5 w-5" /> WhatsApp
      </a>
    </div>
  )
}

/* ---------------- Trust strip (used near CTAs) ---------------- */
export function TrustStrip({ dark = false }) {
  const items = [
    { icon: ShieldCheck, label: 'Fully Insured' },
    { icon: BadgeCheck, label: 'DBS-Checked' },
    { icon: Clock, label: '30–60 Min Response' },
    { icon: Star, label: `${BIZ.rating}★ · ${BIZ.reviewCount} Reviews` },
  ]
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium ${dark ? 'text-white/75' : 'text-muted'}`}>
      {items.map(({ icon: I, label }) => (
        <span key={label} className="inline-flex items-center gap-1.5">
          <I className={`h-4 w-4 ${dark ? 'text-white' : 'text-primary'}`} /> {label}
        </span>
      ))}
    </div>
  )
}

/* ---------------- Quote form (reused hero + contact + CTA) ---------------- */
export function QuoteForm({ compact = false, title = 'Request a free callback' }) {
  const [status, setStatus] = useState('idle')
  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.target)
    formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('subject', `New quote request from ${BIZ.name} website`)
    formData.append('from_name', BIZ.name)
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Submission failed')
      window.gtag && window.gtag('event', 'quote_form_submit', { event_category: 'lead' })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }
  if (status === 'sent') {
    return (
      <div className="bg-surface rounded-4xl p-8 text-center shadow-xl shadow-primary/10 border border-divider">
        <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
        <h3 className="font-display font-bold text-xl mb-1">Request received</h3>
        <p className="text-muted text-sm">We'll call you back within 15 minutes during the day. For emergencies, call <a className="font-semibold text-primary" href={`tel:${BIZ.phoneTel}`}>{BIZ.phoneDisplay}</a> now.</p>
      </div>
    )
  }
  return (
    <form onSubmit={onSubmit} className="bg-surface rounded-4xl p-6 sm:p-8 shadow-xl shadow-primary/10 border border-divider">
      <h3 className="font-display font-bold text-lg mb-1">{title}</h3>
      <p className="text-muted text-[13px] mb-5">Free, no-obligation quote · No call-out fee · Usually answered within the hour</p>
      <div className="grid gap-3">
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
        <div className={compact ? 'grid gap-3' : 'grid sm:grid-cols-2 gap-3'}>
          <input required name="name" placeholder="Your name" className="w-full rounded-2xl border border-divider bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          <input required name="phone" type="tel" placeholder="Phone number" className="w-full rounded-2xl border border-divider bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        </div>
        <div className={compact ? 'grid gap-3' : 'grid sm:grid-cols-2 gap-3'}>
          <input name="postcode" placeholder="Postcode" className="w-full rounded-2xl border border-divider bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
          <select name="service" className="w-full rounded-2xl border border-divider bg-background px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/40">
            <option value="">What do you need?</option>
            {SERVICES.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          </select>
        </div>
        {!compact && (
          <textarea name="message" rows="3" placeholder="Briefly describe the problem (optional)" className="w-full rounded-2xl border border-divider bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40" />
        )}
        <button type="submit" disabled={status === 'sending'} className="magnetic-btn w-full bg-accent text-white rounded-full py-3.5 font-bold shadow-lg shadow-accent/25 disabled:opacity-70">
          {status === 'sending' ? 'Sending…' : 'Get My Free Quote'}
        </button>
        {status === 'error' && (
          <p className="text-[12px] text-red-600 text-center">Something went wrong sending your request — please call {BIZ.phoneDisplay} instead.</p>
        )}
        <p className="text-[11px] text-muted text-center">
          <ShieldCheck className="inline h-3.5 w-3.5 -mt-0.5 mr-1 text-primary" />
          Transparent pricing · Satisfaction guaranteed · Your details are never shared
        </p>
      </div>
    </form>
  )
}

/* ---------------- Quote modal (popup) ---------------- */
export function openQuote() {
  window.dispatchEvent(new CustomEvent('open-quote-modal'))
}

export function QuoteModalHost() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const fn = () => setOpen(true)
    window.addEventListener('open-quote-modal', fn)
    return () => window.removeEventListener('open-quote-modal', fn)
  }, [])
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', esc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', esc)
    }
  }, [open])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true" aria-label="Request a free quote">
      <div className="absolute inset-0 bg-deep/70 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="modal-in relative w-full sm:max-w-md max-h-[92dvh] overflow-y-auto rounded-t-4xl sm:rounded-4xl" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-10 grid place-items-center h-9 w-9 rounded-full bg-background border border-divider text-ink hover:bg-divider transition-colors"
          aria-label="Close quote form"
        >
          <X className="h-4 w-4" />
        </button>
        <QuoteForm compact title="Get your free quote" />
      </div>
    </div>
  )
}

/* ---------------- Final CTA band ---------------- */
export function FinalCta({ heading = 'Plumbing problem? Sorted within the hour.' }) {
  return (
    <section className="relative overflow-hidden bg-deep text-white">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 text-center">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/50 mb-4">No call-out fees · 24/7 · Norwich &amp; Norfolk</p>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-balance max-w-3xl mx-auto">
            {heading} <span className="font-serif italic font-medium text-white/85">Call now.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`tel:${BIZ.phoneTel}`} className="magnetic-btn ring-pulse inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-accent/30">
              <Phone className="h-5 w-5" /> Call {BIZ.phoneDisplay}
            </a>
            <button onClick={openQuote} className="magnetic-btn inline-flex items-center gap-2 glass-dark border border-white/15 text-white px-8 py-4 rounded-full font-bold text-lg">
              Get Free Quote <ArrowUpRight className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-8 flex justify-center"><TrustStrip dark /></div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="bg-deep text-white/80 pb-20 sm:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2 max-w-sm">
          <Logo dark />
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Trusted 24/7 plumbing across Norwich &amp; Norfolk. Rapid 30–60 minute emergency response,
            no call-out fees, transparent pricing. Fully qualified, insured and DBS-checked.
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            Engineers on call now — {BIZ.hours}
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">Services</h4>
          <ul className="space-y-2 text-sm">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`} className="hover:text-white transition-colors">{s.title}</Link></li>
            ))}
            <li><Link to="/services" className="text-white/50 hover:text-white transition-colors">All services →</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li><a href={`tel:${BIZ.phoneTel}`} className="flex items-start gap-2 hover:text-white"><Phone className="h-4 w-4 mt-0.5 shrink-0" />{BIZ.phoneDisplay}</a></li>
            <li><a href={`mailto:${BIZ.email}`} className="flex items-start gap-2 hover:text-white break-all"><Mail className="h-4 w-4 mt-0.5 shrink-0" />{BIZ.email}</a></li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0" />{BIZ.address}</li>
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 shrink-0" />Mon–Sun · 24 hours</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-white/45">
          <p>© {new Date().getFullYear()} {BIZ.legalName}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ---------------- Page shell for inner pages ---------------- */
export function PageShell({ children }) {
  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <FinalCta />
      <Footer />
      <StickyCtaBar />
    </div>
  )
}

/* ---------------- Inner page hero ---------------- */
export function PageHero({ kicker, title, italic, sub, image }) {
  return (
    <section className="relative overflow-hidden bg-deep text-white">
      {image && (
        <>
          <img src={image} alt="" loading="eager" className="absolute inset-0 h-full w-full object-cover brightness-[0.4]" />
          <div className="absolute inset-0 bg-gradient-to-br from-deep/85 via-deep/50 to-deep/80" />
        </>
      )}
      {!image && <div className="absolute inset-0 grid-bg opacity-30" />}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 pt-16 pb-14 sm:pt-24 sm:pb-20">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/55 mb-4">{kicker}</p>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl tracking-tight text-balance max-w-3xl">
          {title}{' '}
          {italic && <span className="font-serif italic font-medium text-white/85">{italic}</span>}
        </h1>
        {sub && <p className="mt-5 max-w-2xl text-white/70 leading-relaxed">{sub}</p>}
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={`tel:${BIZ.phoneTel}`} className="magnetic-btn inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-accent/25">
            <Phone className="h-4 w-4" /> {BIZ.phoneDisplay}
          </a>
          <button onClick={openQuote} className="magnetic-btn inline-flex items-center gap-2 glass-dark border border-white/15 text-white px-6 py-3 rounded-full font-bold">
            Get Free Quote <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6"><TrustStrip dark /></div>
      </div>
    </section>
  )
}

/* ---------------- FAQ accordion ---------------- */
export function FaqList({ faqs }) {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <div className="divide-y divide-divider rounded-4xl border border-divider bg-surface overflow-hidden">
      {faqs.map((f, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-display font-semibold text-[15px] hover:bg-background transition-colors"
            aria-expanded={openIdx === i}
          >
            {f.q}
            <span className={`shrink-0 grid place-items-center h-7 w-7 rounded-full border border-divider text-primary transition-transform duration-300 ${openIdx === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          <div className={`grid transition-all duration-300 ease-out ${openIdx === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              <p className="px-6 pb-5 text-muted text-sm leading-relaxed">{f.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
