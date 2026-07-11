import { Phone } from 'lucide-react'
import { FAQS, BIZ } from '../data.js'
import { PageShell, PageHero, Reveal, FaqList, useSeo, LOCAL_BUSINESS_SCHEMA, faqSchema } from '../shared.jsx'

export default function Faqs() {
  useSeo({
    title: `FAQs | Call-Out Fees, Response Times, Coverage | ${BIZ.name}`,
    description: 'Answers to common questions: emergency response times, call-out fees, pricing, areas covered, guarantees and payment methods.',
    schema: [LOCAL_BUSINESS_SCHEMA, faqSchema(FAQS)],
  })
  return (
    <PageShell>
      <PageHero
        kicker="FAQs"
        title="Questions,"
        italic="answered honestly."
        sub="Everything Norwich homeowners usually ask before booking us — fees, timings, guarantees and more."
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <Reveal><FaqList faqs={FAQS} /></Reveal>
        <Reveal delay={100}>
          <div className="mt-10 text-center">
            <p className="text-muted text-sm mb-4">Still unsure about something? A real person answers 24/7.</p>
            <a href={`tel:${BIZ.phoneTel}`} className="magnetic-btn inline-flex items-center gap-2 bg-accent text-white px-7 py-3.5 rounded-full font-bold shadow-lg shadow-accent/25">
              <Phone className="h-4 w-4" /> Call {BIZ.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </section>
    </PageShell>
  )
}
