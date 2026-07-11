import { Link } from 'react-router-dom'
import { ArrowUpRight, Wrench, Siren, Droplets, AlertTriangle, Bath, ShowerHead, CircleSlash2, Flame, Settings } from 'lucide-react'
import { SERVICES, BIZ } from '../data.js'
import { PageShell, PageHero, Reveal, useSeo, LOCAL_BUSINESS_SCHEMA } from '../shared.jsx'

const ICONS = { Siren, Droplets, AlertTriangle, Bath, Wrench, ShowerHead, CircleSlash2, Flame, Settings }

export default function ServicesIndex() {
  useSeo({
    title: `Plumbing Services Norwich | ${BIZ.name}`,
    description: 'Emergency plumbing, leak repairs, burst pipes, bathroom installation, drain unblocking and more across Norwich & Norfolk. 24/7, no call-out fees.',
    schema: LOCAL_BUSINESS_SCHEMA,
  })
  return (
    <PageShell>
      <PageHero
        kicker="Our services"
        title="Every plumbing job,"
        italic="done properly."
        sub="From 3am emergencies to complete bathroom installations — one qualified, insured, DBS-checked team for all of it."
        image="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => {
            const I = ICONS[s.icon] || Wrench
            return (
              <Reveal key={s.slug} delay={(i % 3) * 100} className="h-full">
                <Link to={`/services/${s.slug}`} className="group flex flex-col h-full bg-surface rounded-4xl border border-divider overflow-hidden lift-on-hover shadow-sm">
                  <div className="relative h-44 overflow-hidden">
                    <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className="absolute top-3 left-3 grid place-items-center h-10 w-10 rounded-xl bg-white/90 backdrop-blur text-primary"><I className="h-5 w-5" /></span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-display font-bold text-lg">{s.title}</h2>
                    <p className="text-muted text-sm leading-relaxed mt-2 flex-1">{s.short}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                      View service <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </section>
    </PageShell>
  )
}
