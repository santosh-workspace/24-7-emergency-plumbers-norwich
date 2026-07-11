import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Phone, MessageCircle, Menu, X, Star, ShieldCheck, Clock, BadgeCheck,
  MapPin, Mail, ArrowUpRight, CheckCircle2, Camera, Loader2,
} from 'lucide-react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { BIZ, SERVICES, FAQS, REVIEWS, AREA_COORDS } from './data.js'

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

/* ---------------- Google 'G' logo ---------------- */
export function GoogleLogo({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h5.9a5 5 0 0 1-2.2 3.3v2.8h3.6c2.1-2 3.3-4.9 3.3-8.3z" />
      <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.3 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.6H2.1v2.9A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.8 14a6.6 6.6 0 0 1 0-4.2V6.9H2.1a11 11 0 0 0 0 10z" />
      <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7L19.4 4A11 11 0 0 0 2.1 6.9L5.8 9.8c.9-2.7 3.3-4.4 6.2-4.4z" />
    </svg>
  )
}

/* ---------------- Social brand glyphs ---------------- */
export function FacebookIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a7.664 7.664 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.239.386-.334.923-.334 1.673v1.376h3.826l-.622 3.667h-3.204v7.98H9.101z" />
    </svg>
  )
}
export function InstagramIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0C8.74 0 8.333.014 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.014 8.333 0 8.74 0 12s.014 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.014 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.014-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.014 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.645-1.44-1.44 0-.795.645-1.439 1.44-1.439.795-.001 1.44.644 1.44 1.439z" />
    </svg>
  )
}
export function XIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  )
}

/* ---------------- Social links row (Facebook / Instagram / X) ---------------- */
export function SocialLinks({ className = '', iconClassName = 'h-4 w-4', dark = true }) {
  const links = [
    { href: BIZ.facebook, label: 'Facebook', Icon: FacebookIcon },
    { href: BIZ.instagram, label: 'Instagram', Icon: InstagramIcon },
    { href: BIZ.twitter, label: 'X (Twitter)', Icon: XIcon },
  ]
  const linkClass = dark
    ? 'bg-white/10 text-white hover:bg-accent hover:text-white'
    : 'bg-primary/10 text-primary hover:bg-accent hover:text-white'
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${BIZ.name} on ${label}`}
          className={`grid place-items-center h-9 w-9 rounded-full transition-colors ${linkClass}`}
        >
          <Icon className={iconClassName} />
        </a>
      ))}
    </div>
  )
}

const AVATAR_COLORS = ['bg-emerald-600', 'bg-accent', 'bg-violet-600', 'bg-sky-600', 'bg-amber-600', 'bg-rose-600']

/* ---------------- Review card (real Google review, with read-more) ---------------- */
export function ReviewCard({ review, index = 0, className = '' }) {
  const [expanded, setExpanded] = useState(false)
  const long = review.text.length > 180
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length]
  return (
    <figure className={`bg-surface border border-divider rounded-3xl p-6 h-full flex flex-col ${className}`}>
      <div className="flex items-center gap-3">
        <span className={`shrink-0 grid place-items-center h-10 w-10 rounded-full text-white font-bold ${color}`}>
          {review.name.charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <figcaption className="font-semibold text-sm truncate">{review.name}</figcaption>
          <p className="text-muted text-xs">{review.timeAgo}</p>
        </div>
        <GoogleLogo className="h-5 w-5 shrink-0" />
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <Stars n={review.stars} className="h-4 w-4" />
        <CheckCircle2 className="h-3.5 w-3.5 text-primary" aria-label="Verified review" />
      </div>
      <blockquote className={`mt-3 text-[14px] leading-relaxed text-ink/85 flex-1 ${expanded ? '' : 'line-clamp-4'}`}>
        {review.text}
      </blockquote>
      {long && (
        <button onClick={() => setExpanded(!expanded)} className="mt-2 text-left text-sm font-semibold text-primary self-start">
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </figure>
  )
}

/* ---------------- Logo ---------------- */
export function Logo({ dark = false }) {
  const clipId = useId()
  return (
    <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label={`${BIZ.name} — home`}>
      <svg viewBox="0 0 64 100" className="h-9 w-6 shrink-0">
        <defs>
          <clipPath id={clipId}>
            <path d="M32 2C20 20 4 45 4 68a28 28 0 0 0 56 0C60 45 44 20 32 2Z" />
          </clipPath>
        </defs>
        <g clipPath={`url(#${clipId})`}>
          <rect x="0" y="0" width="64" height="100" fill="#FACC15" />
          <path
            d="M0 58C10 55 20 52 30 53C40 55 50 61 64 67L64 100L0 100Z"
            fill={dark ? '#ffffff' : '#1F2937'}
          />
        </g>
      </svg>
      <span className="leading-none">
        <span className="block font-display font-extrabold text-lg tracking-tight text-[#FACC15]">
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

export function Navbar({ overlay = false }) {
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
  const transparent = overlay && !scrolled
  return (
    <>
      <QuoteModalHost />
      <WhatsAppButton />
      <div className={overlay ? 'fixed inset-x-0 top-0 z-50' : ''}>
        {/* Emergency banner */}
        <div className="relative z-50 bg-accent text-white text-center text-[13px] font-medium py-1.5 px-4">
          <Clock className="inline h-3.5 w-3.5 -mt-0.5 mr-1.5" />
          Plumbing emergency? We answer 24/7 —{' '}
          <a href={`tel:${BIZ.phoneTel}`} className="font-bold underline underline-offset-2">{BIZ.phoneDisplay}</a>
        </div>
        <header className={`${overlay ? '' : 'sticky top-0'} z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg shadow-primary/5' : 'bg-transparent'}`}>
          <nav className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-8 py-3">
            <Logo dark={transparent} />
            <ul className="hidden lg:flex items-center gap-1">
              {NAV.map((n) => (
                <li key={n.to}>
                  <NavLink
                    to={n.to}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-full text-[14px] font-medium transition-colors ${isActive ? 'bg-primary text-white' : transparent ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-primary/10'}`}
                  >
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2">
              <a
                href={BIZ.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="magnetic-btn hidden sm:grid place-items-center h-10 w-10 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/10"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
              <a
                href={`tel:${BIZ.phoneTel}`}
                className="magnetic-btn ring-pulse hidden sm:inline-flex items-center gap-2 bg-accent text-white pl-4 pr-5 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-accent/25"
              >
                <Phone className="h-4 w-4" /> {BIZ.phoneDisplay}
              </a>
              <button
                onClick={() => setOpen(!open)}
                className={`lg:hidden grid place-items-center h-11 w-11 rounded-full border transition-colors ${transparent ? 'border-white/20 bg-white/10 text-white' : 'border-divider bg-surface text-ink'}`}
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </header>
      </div>
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

/* ---------------- WhatsApp glyph (brand icon) ---------------- */
export function WhatsAppIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.48 1.32 5L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.22-8.24 8.22zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.66-1.23-1.46-1.37-1.71-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.06 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.68 4.25 3.75.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.19.21-.58.21-1.08.15-1.19-.06-.11-.23-.17-.48-.29z" />
    </svg>
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
      <WhatsAppIcon className="relative h-7 w-7" />
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
// Resizes + re-encodes an image client-side so uploads stay small before they're emailed as an attachment.
async function compressImage(file, maxDimension = 1600, quality = 0.72) {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality))
  const jpegName = file.name.replace(/\.\w+$/, '') + '.jpg'
  return new File([blob], jpegName, { type: 'image/jpeg' })
}

export function QuoteForm({ compact = false, title = 'Request a free callback' }) {
  const [status, setStatus] = useState('idle')
  const [photo, setPhoto] = useState(null)
  const [photoBusy, setPhotoBusy] = useState(false)
  const onPhotoChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoBusy(true)
    try {
      setPhoto(await compressImage(file))
    } catch {
      setPhoto(file)
    } finally {
      setPhotoBusy(false)
    }
  }
  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.target)
    if (photo) formData.append('attachment', photo, photo.name)
    try {
      const res = await fetch('/api/quote', { method: 'POST', body: formData })
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
        <label className="flex items-center gap-3 w-full rounded-2xl border border-divider bg-background px-4 py-3 text-sm cursor-pointer hover:bg-divider/30 transition-colors">
          {photoBusy ? (
            <Loader2 className="h-4 w-4 shrink-0 text-primary animate-spin" />
          ) : (
            <Camera className="h-4 w-4 shrink-0 text-muted" />
          )}
          <span className={`flex-1 truncate ${photo ? 'text-ink' : 'text-muted'}`}>
            {photoBusy ? 'Compressing photo…' : photo ? photo.name : 'Attach a photo of the problem (optional)'}
          </span>
          {photo && !photoBusy && (
            <span className="text-[11px] font-semibold text-emerald-600 shrink-0">{Math.max(1, Math.round(photo.size / 1024))} KB</span>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={onPhotoChange} />
        </label>
        <button type="submit" disabled={status === 'sending' || photoBusy} className="magnetic-btn w-full bg-accent text-white rounded-full py-3.5 font-bold shadow-lg shadow-accent/25 disabled:opacity-70">
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
          <SocialLinks className="mt-5" />
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
