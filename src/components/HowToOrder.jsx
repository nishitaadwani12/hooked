import { site } from '../config'
import Reveal from './Reveal'

const steps = [
  {
    n: '01',
    t: 'Pick your piece',
    d: 'Browse the collection and choose what you love.',
    icon: '🧺',
  },
  {
    n: '02',
    t: 'Tell us the details',
    d: 'Send your colours and any customisations through the order form.',
    icon: '🎨',
  },
  {
    n: '03',
    t: 'We hand-make it',
    d: `Your piece is crocheted just for you and shipped in about ${site.leadTime}.`,
    icon: '📦',
  },
]

export default function HowToOrder() {
  return (
    <section className="section">
      <Reveal>
        <span className="eyebrow">How to order</span>
        <h2 className="text-4xl font-extrabold text-cocoa sm:text-5xl">Simple as one, two, three</h2>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1}>
            <div className="relative h-full rounded-3xl border border-white/70 bg-white/60 p-6 shadow-soft">
              <div className="text-4xl">{s.icon}</div>
              <div className="mt-4 font-display text-sm font-bold text-cocoa/40">{s.n}</div>
              <h3 className="mt-1 text-xl font-bold text-cocoa">{s.t}</h3>
              <p className="mt-2 text-sm text-cocoa/60">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
