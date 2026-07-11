import { ArrowUpRight } from 'lucide-react'
import { REVIEWS, BIZ } from '../data.js'
import { PageShell, PageHero, Reveal, Stars, useSeo, LOCAL_BUSINESS_SCHEMA, REVIEW_SCHEMA } from '../shared.jsx'

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 100}>
              <figure className="bg-surface border border-divider rounded-4xl p-7 h-full flex flex-col lift-on-hover">
                <div className="flex items-center justify-between">
                  <Stars n={r.stars} />
                  <svg viewBox="0 0 24 24" className="h-5 w-5 opacity-80"><path fill="#4285F4" d="M22.6 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h5.9a5 5 0 0 1-2.2 3.3v2.8h3.6c2.1-2 3.3-4.9 3.3-8.3z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.3 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.6H2.1v2.9A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.8 14a6.6 6.6 0 0 1 0-4.2V6.9H2.1a11 11 0 0 0 0 10z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7L19.4 4A11 11 0 0 0 2.1 6.9L5.8 9.8c.9-2.7 3.3-4.4 6.2-4.4z"/></svg>
                </div>
                <blockquote className="mt-4 text-[15px] leading-relaxed flex-1">"{r.text}"</blockquote>
                <figcaption className="mt-5 text-sm font-semibold">{r.name} <span className="text-muted font-normal">· {r.area}</span></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
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
