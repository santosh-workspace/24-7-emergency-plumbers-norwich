// ------- Business constants (single source of truth for NAP) -------
export const BIZ = {
  name: '247 Emergency Plumber Norwich',
  legalName: '247 Emergency Plumber Norwich',
  phoneDisplay: '07775 280211',
  phoneTel: '+447775280211',
  whatsapp: 'https://wa.me/447775280211',
  email: 'info@emergencyplumbersnorwich.co.uk',
  address: '15 Lime Kiln Mews, Norwich, NR3 2ET',
  street: '15 Lime Kiln Mews',
  city: 'Norwich',
  postcode: 'NR3 2ET',
  geo: { lat: 52.6420041, lng: 1.2862301 },
  hours: 'Open 24 hours, 7 days a week',
  rating: 4.9,
  reviewCount: 154,
  years: 20,
  url: 'https://www.emergencyplumbersnorwich.co.uk',
  responseTime: '30–60 minutes',
  facebook: 'https://facebook.com/247emergencyplumbernorwichNorfolk',
  instagram: 'https://instagram.com/247emergencyplumbernorwich',
  twitter: 'https://x.com/247plumbplumber',
}

// ------- Services (9 dedicated pages) -------
export const SERVICES = [
  {
    slug: 'emergency-plumbing',
    title: 'Emergency Plumbing',
    short: '24/7 rapid response for burst pipes, major leaks and flooding — on site in 30–60 minutes.',
    icon: 'Siren',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1600&q=80',
    intro: 'When water is pouring through your ceiling at 3am, every minute counts. Our emergency plumbers are on call around the clock, 365 days a year, reaching most Norwich homes within 30–60 minutes of your call. We arrive fully equipped to isolate the problem, make your home safe and complete a lasting repair — not just a temporary patch.',
    points: ['Genuine 24/7 availability — nights, weekends and bank holidays', 'No call-out fees, ever', 'Fully stocked vans for first-visit fixes', 'Water damage minimisation as standard'],
    faqs: [
      { q: 'How fast can you reach me in an emergency?', a: 'For addresses in Norwich we typically arrive within 30–60 minutes. Surrounding villages may take slightly longer depending on traffic and time of day.' },
      { q: 'Do you charge extra at night or weekends?', a: 'Our pricing is transparent and agreed before work starts. There are no hidden call-out fees, and we quote the full cost up front — whatever the hour.' },
      { q: 'What should I do while I wait for the plumber?', a: 'Turn off your internal stop valve (usually under the kitchen sink), switch off your boiler, and move valuables away from the water. Our call handler will talk you through it.' },
    ],
  },
  {
    slug: 'leak-repairs',
    title: 'Leak Repairs & Detection',
    short: 'Hidden leaks found fast with professional detection equipment, then fixed for good.',
    icon: 'Droplets',
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1600&q=80',
    intro: 'A slow leak can quietly destroy plaster, joists and flooring for months before it shows. We combine acoustic listening equipment, moisture mapping and thermal imaging to pinpoint hidden leaks without ripping your home apart — then repair the source properly, first time.',
    points: ['Non-invasive leak detection technology', 'Ceiling, underfloor and in-wall leaks traced', 'Insurance report provided for claims', 'Repairs guaranteed'],
    faqs: [
      { q: 'Can you find a leak without removing tiles or floorboards?', a: 'In most cases, yes. Thermal imaging and acoustic detection allow us to locate the leak precisely so any access work is kept to an absolute minimum.' },
      { q: 'Will you provide a report for my insurer?', a: 'Yes — we routinely provide written leak detection and repair reports that home insurers accept for escape-of-water claims.' },
    ],
  },
  {
    slug: 'burst-pipes',
    title: 'Burst Pipe Repair',
    short: 'Immediate isolation and permanent repair of burst and frozen pipes.',
    icon: 'AlertTriangle',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=1600&q=80',
    intro: 'A burst pipe can release hundreds of litres of water an hour. We isolate the supply, drain down safely and replace the damaged section with quality copper or barrier pipe — including frozen pipe repairs in winter and advice to stop it happening again.',
    points: ['Rapid isolation to stop the flooding', 'Copper, plastic and barrier pipe replacement', 'Frozen pipe thawing and protection', 'Full system check before we leave'],
    faqs: [
      { q: 'My pipe has burst — what do I do right now?', a: 'Turn off your stop valve immediately, open cold taps to drain the system, switch off your central heating, and call us on 07775 280211. We will be with you as fast as possible.' },
      { q: 'Do you repair pipes that freeze in winter?', a: 'Yes. We thaw frozen pipes safely, repair any splits, and can insulate vulnerable pipework to prevent repeat freezing.' },
    ],
  },
  {
    slug: 'bathroom-installation',
    title: 'Bathroom Installation',
    short: 'Complete bathroom design and installation with a beautiful, lasting finish.',
    icon: 'Bath',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1600&q=80',
    intro: 'From a straightforward suite swap to a full luxury refit, our City & Guilds qualified installers manage the whole job — plumbing, tiling coordination and finishing — with the attention to detail your home deserves. Free, no-obligation estimates on every project.',
    points: ['Free design consultation and estimate', 'Full suite, shower and bath installation', 'Quality workmanship, beautiful finish', 'Tidy, respectful tradespeople'],
    faqs: [
      { q: 'How long does a full bathroom installation take?', a: 'A typical full refit takes 5–10 working days depending on the scope. We agree a schedule before we start and keep disruption to a minimum.' },
      { q: 'Can you supply the bathroom suite or should I buy my own?', a: 'Either works. We can supply trade-quality suites or install fixtures you have purchased yourself — we will advise on quality and fit before you buy.' },
    ],
  },
  {
    slug: 'toilet-repairs',
    title: 'Toilet Repairs & Installation',
    short: 'Blocked, leaking or constantly running toilets fixed same day.',
    icon: 'Wrench',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80',
    intro: 'A faulty toilet is one of those problems that cannot wait. We repair blocked, leaking, overflowing and constantly running toilets — usually on the first visit — and install new WCs, including modern water-saving models.',
    points: ['Same-day repairs in most cases', 'Blockages, leaks, fill valves and flush faults', 'New toilet supply and installation', 'Water-saving upgrade advice'],
    faqs: [
      { q: 'My toilet keeps running — is that serious?', a: 'A running toilet can waste over 400 litres a day and inflate your water bill. It is usually a worn fill or flush valve — a quick, inexpensive fix for us.' },
      { q: 'Can you replace my old toilet with a modern one?', a: 'Yes, we supply and fit close-coupled, back-to-wall and wall-hung WCs, and can convert to dual-flush to cut your water use.' },
    ],
  },
  {
    slug: 'shower-repairs',
    title: 'Shower Installation & Repair',
    short: 'Electric, mixer and power showers installed and repaired.',
    icon: 'ShowerHead',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1600&q=80',
    intro: 'Whether your shower has lost pressure, runs hot and cold, or you want a new electric or thermostatic mixer installed, we handle every make and model — with safe electrical isolation and watertight installation guaranteed.',
    points: ['Electric, mixer and power showers', 'Low pressure diagnosed and cured', 'Thermostatic safety valves fitted', 'Leaking enclosures resealed'],
    faqs: [
      { q: 'Why does my shower run hot and cold?', a: 'Usually a failing thermostatic cartridge or pressure imbalance. We diagnose the cause and can often repair rather than replace the whole unit.' },
      { q: 'Can you replace an electric shower like-for-like?', a: 'Yes — provided the existing cable and RCD protection are rated correctly, a like-for-like swap is usually a same-day job.' },
    ],
  },
  {
    slug: 'drain-unblocking',
    title: 'Drain Unblocking',
    short: 'Blocked sinks, toilets and drains cleared fast — with the cause fixed, not just the symptom.',
    icon: 'CircleSlash2',
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=1600&q=80',
    intro: 'Slow-draining sink? Gurgling toilet? Bad smells? We clear internal and external blockages using professional rodding, plunging and drain-care equipment, then identify what caused the blockage so it does not come straight back.',
    points: ['Sinks, baths, toilets and external drains', 'Professional rodding and clearance equipment', 'Root cause identified and fixed', 'Prevention advice included'],
    faqs: [
      { q: 'How quickly can you clear a blocked drain?', a: 'Most standard blockages are cleared within the first hour on site. Stubborn or recurring blockages may need further investigation, which we will explain before any extra work.' },
      { q: 'Is drain unblocking messy?', a: 'No — we protect your floors and surfaces, use sealed equipment where possible, and leave the area clean and disinfected.' },
    ],
  },
  {
    slug: 'water-heater-services',
    title: 'Water Heater Services',
    short: 'Water heaters and hot water cylinders repaired, serviced and replaced.',
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80',
    intro: 'No hot water is an emergency in any home. We diagnose and repair immersion heaters, unvented cylinders and thermal stores, replace failed units, and service systems to keep them efficient and safe.',
    points: ['Immersion heater repair and replacement', 'Vented and unvented cylinder work', 'Thermostat and element faults fixed', 'Efficiency and safety checks'],
    faqs: [
      { q: 'I have no hot water — can you come today?', a: 'In most cases, yes. Loss of hot water is treated as a priority call and we aim to restore your supply on the first visit.' },
      { q: 'Should I repair or replace my old cylinder?', a: 'If your cylinder is over 15 years old or corroding, replacement is usually more economical. We will give you an honest assessment and a clear quote for both options.' },
    ],
  },
  {
    slug: 'general-plumbing',
    title: 'General Plumbing',
    short: 'Taps, radiators, kitchen appliances and every everyday plumbing job — done properly.',
    icon: 'Settings',
    image: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1600&q=80',
    intro: 'From dripping taps and radiator swaps to washing machine installation and full kitchen plumbing, no job is too small. The same qualified, DBS-checked plumbers who handle our emergencies handle your everyday jobs — with the same care.',
    points: ['Tap repair and replacement', 'Radiator repair and installation', 'Washing machine and dishwasher installation', 'Kitchen and bathroom plumbing'],
    faqs: [
      { q: 'Do you take on small jobs like a dripping tap?', a: 'Absolutely. No job is too small, and because we quote up front you will know the exact cost before we start.' },
      { q: 'Can you fit a radiator I bought online?', a: 'Yes — we install customer-supplied radiators, valves and towel rails, and will balance your system afterwards so every room heats evenly.' },
    ],
  },
]

// ------- Areas served -------
export const AREAS = [
  'Norwich', 'Great Yarmouth', 'Wymondham', 'Hethersett', 'Cringleford', 'Eaton',
  'Hellesdon', 'Thorpe St Andrew', 'Drayton', 'Taverham', 'Thorpe Marriott', 'Poringland',
  'Brundall', 'Blofield', 'Acle', 'Wroxham', 'Lakenham', 'Easton',
  'Spixworth', 'Rackheath', 'Mulbarton', 'Swardeston', 'Long Stratton', 'Reepham',
]

// ------- Coordinates for the coverage map (approximate town centres) -------
export const AREA_COORDS = [
  { name: 'Norwich', lat: 52.6309, lng: 1.2974 },
  { name: 'Great Yarmouth', lat: 52.6083, lng: 1.7305 },
  { name: 'Wymondham', lat: 52.5706, lng: 1.1147 },
  { name: 'Hethersett', lat: 52.5883, lng: 1.1817 },
  { name: 'Cringleford', lat: 52.6089, lng: 1.2258 },
  { name: 'Eaton', lat: 52.6106, lng: 1.2687 },
  { name: 'Hellesdon', lat: 52.6461, lng: 1.2551 },
  { name: 'Thorpe St Andrew', lat: 52.6335, lng: 1.3444 },
  { name: 'Drayton', lat: 52.6797, lng: 1.2308 },
  { name: 'Taverham', lat: 52.6712, lng: 1.2058 },
  { name: 'Thorpe Marriott', lat: 52.6825, lng: 1.2150 },
  { name: 'Poringland', lat: 52.5817, lng: 1.3489 },
  { name: 'Brundall', lat: 52.6103, lng: 1.4335 },
  { name: 'Blofield', lat: 52.6335, lng: 1.4653 },
  { name: 'Acle', lat: 52.6394, lng: 1.5464 },
  { name: 'Wroxham', lat: 52.7147, lng: 1.4056 },
  { name: 'Lakenham', lat: 52.6172, lng: 1.2989 },
  { name: 'Easton', lat: 52.6489, lng: 1.1489 },
  { name: 'Spixworth', lat: 52.6975, lng: 1.2856 },
  { name: 'Rackheath', lat: 52.6725, lng: 1.3308 },
  { name: 'Mulbarton', lat: 52.5544, lng: 1.2278 },
  { name: 'Swardeston', lat: 52.5794, lng: 1.2394 },
  { name: 'Long Stratton', lat: 52.4975, lng: 1.2189 },
  { name: 'Reepham', lat: 52.7625, lng: 1.1178 },
]

// ------- Reviews (real Google reviews, sourced from the business's Google profile) -------
export const REVIEWS = [
  { name: 'James Edwards', stars: 5, timeAgo: '1 year ago', text: 'Was able to come out quickly and fixed the pipe I had managed to bend. Was incredibly helpful in guiding me on what I could do before arrival to keep costs to a minimum. Then got the job sorted in great time. Very friendly and would happily recommend.' },
  { name: 'Diane Burt', stars: 5, timeAgo: '1 year ago', text: 'A very quick and efficient service at a very reasonable price. Would definitely use again' },
  { name: 'Serena Jones', stars: 5, timeAgo: '1 year ago', text: 'Excellent work by Jason. Came the following day. Easy to contact and communicate with. Difficult job that involved moving a huge, very wobbly wardrobe. Then pulling up carpet + underlay, then sawing through a laminated floor, then through the chipboard floor and finding leak/damp area. Then had to put it all back, (fixing wardrobe too!) and fix toilet which was leaking! Came back following day to finish and fit new part. Couldn’t believe he got it all done in the time he did. Was sooo grateful! Reasonable price too. Thanks so much!!' },
  { name: 'Colene Collins-Pereira', stars: 5, timeAgo: '10 months ago', text: "As plumbing emergencies would have it, my shower broke late on Sunday night. I'm very grateful to Jason for taking my call at that time. Very professional, easy to communicate with, and sorted the problem in no time. First helping over the phone via WhatsApp to switch off the water for the night, then came early the next day to fix the shower. Brilliant - like it never even happened. Thank you, Jason!" },
  { name: 'Philip Betts', stars: 5, timeAgo: '11 months ago', text: 'After significant leak in our kitchen late last night leaving significant amount of water on the floor, I had a reassuring and clear chat to establish facts around next steps. Isolating water overnight, today we had new pipes installed and full check carried out. Fantastic service.' },
  { name: 'Gerry Virgo', stars: 5, timeAgo: '11 months ago', text: 'Exceptional service: I called late evening in a panic when a hot water leak began to flood the kitchen and into the hall. Jason was calm on the phone and talked me through isolating and diagnosing the source of the leak - with phone photos. He made sure I had access to cold water until he arrived at 9.00 the following morning. He was professional and effective throughout and has left a repair, new tap plus a much neater array of copper pipework. I am profoundly grateful for his help at a time when I felt overwhelmed by the situation. Many thanks, Gerry' },
  { name: 'kat maloo', stars: 5, timeAgo: '11 months ago', text: 'What can I say? A day of plumbing disaster resolved quickly, politely and genuinely by Jason. He gave a time and arrived bang on. Observed the problem and addressed it. Furthermore Jason signposted my boiler trouble to another plumber so two problems fixed in one day. As a single female with disabilities who knows nothing about plumbing I certainly recommend Jason. Kind and courteous - I felt safe. Excellent!' },
  { name: 'Edwin Wadhams', stars: 5, timeAgo: '1 year ago', text: 'A first class service, job well done, reasonable prices. Strongly recommended' },
  { name: 'Alex Yates', stars: 5, timeAgo: '1 year ago', text: 'Got some excellent advice over the phone after a prior plumber made an error installing our kitchen waste. Excellent service and a really nice guy, particularly as it was a bank holiday. Thank you.' },
]

// ------- Trust badges (real certifications/awards, hosted locally in /public/badges) -------
export const TRUST_BADGES = [
  { src: '/badges/top-plumber-award.png', alt: 'Top 3 Plumbers in Norwich Award' },
  { src: '/badges/dbs-checked.png', alt: 'DBS Checked' },
  { src: '/badges/fully-insured.png', alt: 'Fully Insured' },
  { src: '/badges/yell.png', alt: 'Find us on Yell.com' },
  { src: '/badges/city-guilds.png', alt: 'City & Guilds Qualified' },
]

// ------- FAQs (site-wide) -------
export const FAQS = [
  { q: 'How quickly can you respond to an emergency?', a: 'We aim to reach addresses in Norwich within 30–60 minutes, 24 hours a day, 7 days a week — including bank holidays. Surrounding villages may take a little longer.' },
  { q: 'Do you charge a call-out fee?', a: 'No. We never charge call-out fees. You receive a clear, upfront quote before any work begins, and the price we quote is the price you pay.' },
  { q: 'Which areas do you cover?', a: 'We cover Norwich, Great Yarmouth and the surrounding Norfolk villages — including Wymondham, Hethersett, Taverham, Wroxham, Brundall, Poringland and more. See our Areas We Cover page for the full list.' },
  { q: 'Are your plumbers qualified and insured?', a: 'Yes. Every engineer is City & Guilds qualified, fully insured and DBS-checked, with membership of the Water Industry Approved Plumbers’ Scheme and the Association of Plumbing and Heating Contractors.' },
  { q: 'Are you really available 24/7?', a: 'Yes — genuinely. Our phone line 07775 280211 is answered around the clock, every day of the year, and an on-call engineer is always ready to respond.' },
  { q: 'Do you guarantee your work?', a: 'All workmanship is covered by our satisfaction guarantee. If anything is not right, we come back and fix it — no quibbles.' },
  { q: 'What payment methods do you accept?', a: 'We accept card payments, bank transfer and cash. Payment is only due when the work is completed to your satisfaction.' },
  { q: 'Can I get a free quote before committing?', a: 'Of course. Call, WhatsApp or use our quote form and we will give you a free, no-obligation quote — usually within the hour during the day.' },
]

// ------- Gallery: before & after projects -------
export const GALLERY = [
  {
    title: 'Victorian Bathroom Renovation', place: 'Golden Triangle, Norwich', tag: 'Bathroom Installation',
    before: 'https://images.unsplash.com/photo-1758192496546-dc59dd3baa59?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1200&q=80',
    desc: 'Dated 1970s suite stripped out and replaced with a walk-in rainfall shower, wall-hung vanity and underfloor heating.',
  },
  {
    title: 'Kitchen Ceiling Leak Repair', place: 'Hethersett', tag: 'Leak Repair',
    before: 'https://images.unsplash.com/photo-1637847522219-ef24dd4445fe?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80',
    desc: 'Hidden bathroom waste leak traced with thermal imaging, pipework replaced and ceiling made good.',
  },
  {
    title: 'Full Copper Pipe Replacement', place: 'Lakenham', tag: 'Pipe Replacement',
    before: 'https://images.unsplash.com/photo-1769012334604-8b3bf24b474c?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
    desc: 'Corroded imperial pipework in a 1930s semi fully replaced with new copper, restoring mains pressure.',
  },
  {
    title: 'Burst Pipe Emergency, 2am Call-Out', place: 'Taverham', tag: 'Emergency Repair',
    before: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
    desc: 'Frozen loft pipe burst overnight. Supply isolated within the hour, section replaced and insulated by morning.',
  },
  {
    title: 'En-Suite Shower Installation', place: 'Wroxham', tag: 'Plumbing Installation',
    before: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1613323593608-abc90fec84ff?auto=format&fit=crop&w=1200&q=80',
    desc: 'New thermostatic mixer shower and enclosure installed in a loft-conversion en-suite.',
  },
  {
    title: 'Utility Room First Fix', place: 'Poringland', tag: 'Plumbing Installation',
    before: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80',
    after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    desc: 'Complete first-fix plumbing for a new utility room — washing machine, sink and outside tap.',
  },
]

export const CREDENTIALS = [
  'The Water Industry Approved Plumbers’ Scheme (134574)',
  'Institute of Plumbing & Heating Engineering — IPHE (456745)',
  'Institute of Plumbing (908790567444)',
  'Association of Plumbing & Heating Contractors (8979067511)',
  'Plumbing Level 2 IVQ Diploma — City & Guilds of London Institute',
]
