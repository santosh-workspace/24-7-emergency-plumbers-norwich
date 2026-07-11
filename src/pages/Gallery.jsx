import { useState } from 'react'
import { GALLERY, BIZ } from '../data.js'
import { PageShell, PageHero, Reveal, useSeo, LOCAL_BUSINESS_SCHEMA } from '../shared.jsx'

function BeforeAfter({ item }) {
  const [pos, setPos] = useState(50)
  return (
    <figure className="bg-surface rounded-4xl border border-divider overflow-hidden shadow-sm">
      <div className="relative aspect-[4/3] select-none overflow-hidden">
        <img src={item.after} alt={`${item.title} — after`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img src={item.before} alt={`${item.title} — before`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" style={{ width: `${10000 / pos}%`, maxWidth: 'none' }} />
        </div>
        <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow" />
          <span className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 grid place-items-center h-10 w-10 rounded-full bg-white shadow-lg text-primary text-sm font-bold">⇔</span>
        </div>
        <input type="range" min="5" max="95" value={pos} onChange={(e) => setPos(+e.target.value)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize" aria-label={`Compare before and after: ${item.title}`} />
        <span className="absolute top-3 left-3 rounded-full bg-deep/70 backdrop-blur px-3 py-1 text-[11px] font-bold text-white">BEFORE</span>
        <span className="absolute top-3 right-3 rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-white">AFTER</span>
      </div>
      <figcaption className="p-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{item.tag} · {item.place}</span>
        <h2 className="font-display font-bold text-lg mt-1">{item.title}</h2>
        <p className="text-muted text-sm leading-relaxed mt-2">{item.desc}</p>
      </figcaption>
    </figure>
  )
}

export default function Gallery() {
  useSeo({
    title: `Before & After Gallery | Plumbing Projects Norwich | ${BIZ.name}`,
    description: 'See real before-and-after plumbing projects across Norwich: bathroom renovations, leak repairs, pipe replacements and emergency repairs.',
    schema: LOCAL_BUSINESS_SCHEMA,
  })
  return (
    <PageShell>
      <PageHero
        kicker="Our work"
        title="Before &amp; after —"
        italic="judge us by results."
        sub="Drag the slider on any project to see the transformation. Every job pictured was completed by our own engineers in and around Norwich."
        image="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=2000&q=80"
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 100}><BeforeAfter item={g} /></Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
