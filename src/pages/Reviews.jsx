import { ArrowUpRight, CheckCircle2 } from 'lucide-react'
import { REVIEWS, BIZ, TRUST_BADGES } from '../data.js'
import { PageShell, PageHero, Reveal, Stars, GoogleLogo, ReviewCard, useSeo, LOCAL_BUSINESS_SCHEMA, REVIEW_SCHEMA } from '../shared.jsx'

export default function Reviews() {
  useSeo({
    title: `Reviews | ${BIZ.rating}★ from ${BIZ.reviewCount} Google Reviews | ${BIZ.name}`,
    description: `Read what Norwich homeowners say about our 24/7 emergency plumbing. Rated ${BIZ.rating} stars across ${BIZ.reviewCount} Google reviews.`,
    schema: [LOCAL_BUSINESS_SCHEMA, REVIEW_SCHEMA],
  })
  return (
    <PageShell>
      <PageHero
        kicker="Customer reviews"
        title={`Rated ${BIZ.rating} stars`}
        italic={`by ${BIZ.reviewCount} customers.`}
        sub="We don't cherry-pick testimonials — these reflect our public Google profile. Read them, then decide who you'd want in your home at 2am."
        image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <Reveal>
          <div className="text-center mb-10">
            <p className="font-display font-extrabold text-2xl tracking-tight">EXCELLENT</p>
            <Stars n={5} className="h-6 w-6 mx-auto my-2" />
            <p className="text-muted text-sm">Based on <strong className="text-ink">{BIZ.reviewCount} reviews</strong></p>
            <div className="mt-2 flex justify-center"><GoogleLogo className="h-6 w-auto" /></div>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 100} className="h-full">
              <ReviewCard review={r} index={i} className="lift-on-hover" />
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="flex justify-center mb-10">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" /> Verified by Trustindex
            </span>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 mb-10">
            {TRUST_BADGES.map((b) => (
              <img key={b.alt} src={b.src} alt={b.alt} className="h-14 w-auto object-contain" loading="lazy" />
            ))}
          </div>
        </Reveal>
        <Reveal>
          <p className="text-center text-muted text-sm">
            Had a great experience?{' '}
            <a href="https://g.page/r/review" className="font-semibold text-primary inline-flex items-center gap-1">
              Leave us a Google review <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </p>
        </Reveal>
      </section>
    </PageShell>
  )
}
