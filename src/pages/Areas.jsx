import { MapPin, Clock, Phone } from 'lucide-react'
import { BIZ, AREAS } from '../data.js'
import { PageShell, PageHero, Reveal, CoverageMap, useSeo, LOCAL_BUSINESS_SCHEMA } from '../shared.jsx'

const ZONES = [
  {
    name: 'Norwich City', time: '30–45 min typical response',
    towns: ['Norwich', 'Lakenham', 'Eaton', 'Hellesdon', 'Thorpe St Andrew', 'Cringleford'],
    blurb: 'Our home turf. With engineers based at Lime Kiln Mews in NR3, city addresses get our fastest response — often well inside 45 minutes, day or night.',
  },
  {
    name: 'Greater Norwich', time: '35–55 min typical response',
    towns: ['Drayton', 'Taverham', 'Thorpe Marriott', 'Spixworth', 'Rackheath', 'Easton', 'Hethersett', 'Cringleford'],
    blurb: 'The ring of villages around the city is covered by the same on-call rota — no subcontractors, no premium for distance.',
  },
  {
    name: 'South Norfolk', time: '40–60 min typical response',
    towns: ['Wymondham', 'Mulbarton', 'Swardeston', 'Poringland', 'Long Stratton'],
    blurb: 'From Wymondham market town to the villages along the A140, we\'re a regular sight across South Norfolk.',
  },
  {
    name: 'Broadland & East', time: '45–60 min typical response',
    towns: ['Wroxham', 'Brundall', 'Blofield', 'Acle', 'Great Yarmouth', 'Reepham'],
    blurb: 'Broads-side homes and coastal Great Yarmouth included — flooding emergencies out here get priority dispatch.',
  },
]

export default function Areas() {
  useSeo({
    title: `Areas We Cover | Plumbers in Norwich, Wymondham, Great Yarmouth | ${BIZ.name}`,
    description: 'Emergency plumbers covering Norwich, Great Yarmouth, Wymondham, Taverham, Wroxham and all surrounding Norfolk villages. 30-60 minute response, 24/7.',
    schema: { ...LOCAL_BUSINESS_SCHEMA, areaServed: AREAS },
  })
  return (
    <PageShell>
      <PageHero
        kicker="Areas we cover"
        title="Local to Norwich,"
        italic="all across Norfolk."
        sub="One team, one phone number, no subcontracting. If you're within our patch, an engineer is 30–60 minutes away at any hour."
        image="https://images.unsplash.com/photo-1587839155839-1a02e4b1d165?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <Reveal>
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="font-display font-extrabold text-xl sm:text-2xl tracking-tight">Our coverage map</h2>
            <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-primary bg-primary/10 rounded-full px-3 py-1.5">
              <MapPin className="h-3.5 w-3.5" /> {AREAS.length} towns &amp; villages
            </span>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="mb-12 rounded-4xl border border-divider overflow-hidden shadow-sm">
            <CoverageMap className="h-[380px] sm:h-[480px] w-full" />
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {ZONES.map((z, i) => (
            <Reveal key={z.name} delay={(i % 2) * 100}>
              <div className="bg-surface border border-divider rounded-4xl p-7 h-full lift-on-hover">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h2 className="font-display font-extrabold text-xl">{z.name}</h2>
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-accent bg-accent/10 rounded-full px-3 py-1.5">
                    <Clock className="h-3.5 w-3.5" /> {z.time}
                  </span>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-5">{z.blurb}</p>
                <div className="flex flex-wrap gap-2">
                  {z.towns.map((t) => (
                    <span key={t} className="inline-flex items-center gap-1 rounded-full bg-background border border-divider px-3 py-1.5 text-[13px] font-medium">
                      <MapPin className="h-3 w-3 text-primary" /> {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={150}>
          <div className="mt-10 rounded-4xl bg-primary text-white p-8 text-center">
            <h2 className="font-display font-bold text-xl">Not sure if we cover you?</h2>
            <p className="text-white/70 text-sm mt-1 mb-5">If you're anywhere near Norwich, the answer is almost certainly yes. Call and ask — it costs nothing.</p>
            <a href={`tel:${BIZ.phoneTel}`} className="magnetic-btn inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 rounded-full font-bold shadow-lg shadow-accent/30">
              <Phone className="h-4 w-4" /> {BIZ.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </section>
    </PageShell>
  )
}
