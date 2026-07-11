import { Phone, Mail, MapPin, Clock, MessageCircle, Siren } from 'lucide-react'
import { BIZ } from '../data.js'
import { PageShell, PageHero, Reveal, QuoteForm, SocialLinks, useSeo, LOCAL_BUSINESS_SCHEMA } from '../shared.jsx'

export default function Contact() {
  useSeo({
    title: `Contact Us | 24/7 Emergency Line ${BIZ.phoneDisplay} | ${BIZ.name}`,
    description: `Call ${BIZ.phoneDisplay} (24/7), WhatsApp us, or request a free callback. ${BIZ.address}. No call-out fees, transparent pricing.`,
    schema: LOCAL_BUSINESS_SCHEMA,
  })
  const cards = [
    { icon: Phone, title: '24/7 Emergency Line', value: BIZ.phoneDisplay, href: `tel:${BIZ.phoneTel}`, note: 'Fastest option — answered day & night' },
    { icon: MessageCircle, title: 'WhatsApp', value: 'Message us photos of the problem', href: BIZ.whatsapp, note: 'Great for quick quotes' },
    { icon: Mail, title: 'Email', value: BIZ.email, href: `mailto:${BIZ.email}`, note: 'Replies within a few hours' },
  ]
  return (
    <PageShell>
      <PageHero
        kicker="Contact"
        title="Talk to a plumber,"
        italic="not a call queue."
        sub="For emergencies, call — we answer 24/7 and can be with you in 30–60 minutes. For everything else, WhatsApp, email or the form below all work."
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <Reveal>
          <div className="mb-8 rounded-4xl bg-accent text-white p-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="grid place-items-center h-12 w-12 rounded-2xl bg-white/15"><Siren className="h-6 w-6" /></span>
              <div>
                <h2 className="font-display font-bold text-lg">Plumbing emergency right now?</h2>
                <p className="text-white/80 text-sm">Skip the form. Call and we'll dispatch the nearest engineer immediately.</p>
              </div>
            </div>
            <a href={`tel:${BIZ.phoneTel}`} className="magnetic-btn inline-flex items-center gap-2 bg-white text-accent px-7 py-3.5 rounded-full font-extrabold text-lg">
              <Phone className="h-5 w-5" /> {BIZ.phoneDisplay}
            </a>
          </div>
        </Reveal>
        <div className="grid lg:grid-cols-[1fr_420px] gap-10">
          <div>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {cards.map((c, i) => (
                <Reveal key={c.title} delay={i * 90}>
                  <a href={c.href} className="block bg-surface border border-divider rounded-3xl p-5 h-full lift-on-hover">
                    <c.icon className="h-6 w-6 text-primary mb-3" />
                    <h3 className="font-display font-bold text-[15px]">{c.title}</h3>
                    <p className="text-sm text-ink mt-1 break-words">{c.value}</p>
                    <p className="text-muted text-[12px] mt-1.5">{c.note}</p>
                  </a>
                </Reveal>
              ))}
            </div>
            <Reveal delay={100}>
              <div className="mb-8 flex items-center justify-between gap-4 bg-surface border border-divider rounded-3xl p-5">
                <div>
                  <h3 className="font-display font-bold text-[15px]">Follow us</h3>
                  <p className="text-muted text-[12px] mt-1">Tips, jobs and offers on social media</p>
                </div>
                <SocialLinks dark={false} />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="bg-surface border border-divider rounded-4xl overflow-hidden">
                <iframe
                  title={`Map — ${BIZ.name}, ${BIZ.address}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(BIZ.name + ' ' + BIZ.address)}&output=embed`}
                  className="w-full h-72 border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="p-6 grid sm:grid-cols-2 gap-4 text-sm">
                  <p className="flex items-start gap-2.5"><MapPin className="h-5 w-5 text-primary shrink-0" /> {BIZ.address}</p>
                  <p className="flex items-start gap-2.5"><Clock className="h-5 w-5 text-primary shrink-0" /> {BIZ.hours}</p>
                </div>
              </div>
            </Reveal>
          </div>
          <Reveal delay={100}>
            <div className="lg:sticky lg:top-28">
              <QuoteForm title="Request a free callback" />
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
