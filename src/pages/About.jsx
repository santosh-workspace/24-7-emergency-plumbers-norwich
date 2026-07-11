import { ShieldCheck, HeartHandshake, Clock, Award, BadgeCheck, PoundSterling } from 'lucide-react'
import { BIZ, CREDENTIALS } from '../data.js'
import { PageShell, PageHero, Reveal, CountUp, useSeo, LOCAL_BUSINESS_SCHEMA } from '../shared.jsx'

export default function About() {
  useSeo({
    title: `About Us | ${BIZ.name} — 20+ Years Serving Norwich`,
    description: 'Meet the local, City & Guilds qualified team behind Norwich\'s trusted 24/7 emergency plumbing service. Fully insured, DBS-checked, community-first.',
    schema: LOCAL_BUSINESS_SCHEMA,
  })
  const values = [
    { icon: HeartHandshake, title: 'Honest work, honest prices', text: 'We quote before we start, explain what we\'re doing in plain English, and never invent problems that aren\'t there. Most of our work comes from repeat customers and their recommendations — that only happens when you treat people fairly.' },
    { icon: Clock, title: 'When we say 24/7, we mean it', text: 'An emergency doesn\'t check the clock. Our on-call rota means a qualified engineer — not an answering service — picks up your call at any hour, every day of the year.' },
    { icon: ShieldCheck, title: 'Qualified, vetted, accountable', text: 'Every engineer is City & Guilds qualified, DBS-checked and fully insured. We\'re registered with the Water Industry Approved Plumbers\' Scheme and the Association of Plumbing & Heating Contractors.' },
  ]
  return (
    <PageShell>
      <PageHero
        kicker="About us"
        title="Norwich locals,"
        italic="plumbing since 2006."
        sub="We're not a national call centre reselling your job to whoever's nearest. We're a Norwich-based team who live in the communities we serve."
        image="https://images.unsplash.com/photo-1556909212-d5b604d0c90d?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="max-w-4xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <Reveal>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-6">Our story</h2>
          <div className="space-y-5 text-muted leading-relaxed text-[15px]">
            <p>
              247 Emergency Plumber Norwich started with a simple frustration: too many people in our city were being
              left waiting — or worse, overcharged — when a plumbing emergency struck. Over twenty years ago we set out
              to build the kind of plumbing service we'd want to call ourselves: fast, honest, properly qualified, and
              available at genuinely any hour.
            </p>
            <p>
              Today, from our base at Lime Kiln Mews in NR3, our engineers cover Norwich, Great Yarmouth and the
              surrounding Norfolk villages. We've pulled sodden carpets out of family homes at midnight, restored hot
              water on Christmas morning, and fitted hundreds of bathrooms that we're still proud to drive past.
            </p>
            <p>
              The thing we're proudest of isn't the {BIZ.years}+ years or the credentials — it's the {BIZ.reviewCount}{' '}
              Google reviews averaging {BIZ.rating} stars, written by neighbours who trusted us with their homes and
              would call us again.
            </p>
          </div>
        </Reveal>
      </section>
      <section className="bg-deep text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-14 grid grid-cols-3 gap-8 text-center">
          {[
            { end: BIZ.years, suffix: '+', label: 'Years in trade' },
            { end: BIZ.reviewCount, suffix: '', label: 'Google reviews' },
            { end: 24, suffix: '/7', label: 'Availability' },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 110}>
              <p className="font-display font-extrabold text-4xl sm:text-5xl"><CountUp end={s.end} suffix={s.suffix} /></p>
              <p className="text-white/55 text-sm mt-1">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <Reveal>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight mb-10 text-center">What we stand for</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 110}>
              <div className="bg-surface border border-divider rounded-4xl p-7 h-full">
                <span className="grid place-items-center h-12 w-12 rounded-2xl bg-primary text-white mb-5"><v.icon className="h-5 w-5" /></span>
                <h3 className="font-display font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="bg-surface border-y border-divider">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-16">
          <Reveal>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight mb-8 text-center">Credentials &amp; registrations</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {CREDENTIALS.map((c) => (
                <li key={c} className="flex items-start gap-2.5 bg-background border border-divider rounded-2xl px-4 py-3.5 text-sm font-medium">
                  <BadgeCheck className="h-5 w-5 text-primary shrink-0" /> {c}
                </li>
              ))}
              <li className="flex items-start gap-2.5 bg-background border border-divider rounded-2xl px-4 py-3.5 text-sm font-medium">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" /> Fully insured &amp; DBS-checked engineers
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
