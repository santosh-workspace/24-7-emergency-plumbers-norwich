import { useParams, Link, Navigate } from 'react-router-dom'
import { CheckCircle2, Phone, ArrowUpRight } from 'lucide-react'
import { SERVICES, BIZ, AREAS } from '../data.js'
import { PageShell, PageHero, Reveal, QuoteForm, FaqList, useSeo, LOCAL_BUSINESS_SCHEMA, faqSchema } from '../shared.jsx'

export default function ServicePage() {
  const { slug } = useParams()
  const svc = SERVICES.find((s) => s.slug === slug)
  useSeo(svc ? {
    title: `${svc.title} Norwich | 24/7 · No Call-Out Fees | ${BIZ.name}`,
    description: `${svc.short} Serving Norwich & Norfolk 24/7. Fully insured, DBS-checked, transparent pricing. Call ${BIZ.phoneDisplay}.`,
    schema: [
      { ...LOCAL_BUSINESS_SCHEMA, '@type': 'Plumber', makesOffer: { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${svc.title} in Norwich`, areaServed: 'Norwich, Norfolk' } } },
      faqSchema(svc.faqs),
    ],
  } : {})
  if (!svc) return <Navigate to="/services" replace />
  const related = SERVICES.filter((s) => s.slug !== slug).slice(0, 3)
  return (
    <PageShell>
      <PageHero
        kicker={`Norwich · Norfolk · 24/7`}
        title={svc.title}
        italic="in Norwich."
        sub={svc.short}
        image={svc.image}
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 grid lg:grid-cols-[1fr_380px] gap-12">
        <div>
          <Reveal>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mb-5">How we can help</h2>
            <p className="text-muted leading-relaxed text-[15px] mb-8">{svc.intro}</p>
          </Reveal>
          <Reveal delay={80}>
            <ul className="grid sm:grid-cols-2 gap-3 mb-12">
              {svc.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 bg-surface border border-divider rounded-2xl px-4 py-3.5 text-sm font-medium">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-[-1px]" /> {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-display font-extrabold text-2xl tracking-tight mb-5">Common questions</h2>
            <FaqList faqs={svc.faqs} />
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12 rounded-4xl bg-primary text-white p-8 flex flex-wrap items-center justify-between gap-5">
              <div>
                <h3 className="font-display font-bold text-xl">Need {svc.title.toLowerCase()} today?</h3>
                <p className="text-white/70 text-sm mt-1">We cover {AREAS.slice(0, 5).join(', ')} and all of Norfolk — 24/7.</p>
              </div>
              <a href={`tel:${BIZ.phoneTel}`} className="magnetic-btn inline-flex items-center gap-2 bg-accent text-white px-6 py-3.5 rounded-full font-bold shadow-lg shadow-accent/30">
                <Phone className="h-4 w-4" /> {BIZ.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
        <aside className="space-y-6 lg:sticky lg:top-28 self-start">
          <QuoteForm compact title={`Free ${svc.title.toLowerCase()} quote`} />
          <div className="bg-surface border border-divider rounded-4xl p-6">
            <h3 className="font-display font-bold text-sm uppercase tracking-wider mb-4">Related services</h3>
            <ul className="space-y-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link to={`/services/${r.slug}`} className="group flex items-center justify-between text-sm font-semibold text-ink hover:text-primary">
                    {r.title} <ArrowUpRight className="h-4 w-4 text-muted group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </PageShell>
  )
}
