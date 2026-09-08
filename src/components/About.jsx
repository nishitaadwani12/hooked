import Reveal from './Reveal'

const stats = [
  { n: '100%', l: 'Handmade' },
  { n: 'Made', l: 'to order' },
  { n: '∞', l: 'Colour options' },
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br from-blush via-peri/70 to-mint shadow-lift">
            <span className="absolute inset-0 flex items-center justify-center text-8xl opacity-80" aria-hidden="true">
              🧶
            </span>
            {/* Swap this block for a real photo: put maker.jpg in /public and
                use <img src="/maker.jpg" ... /> here. */}
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">Our story</span>
            <h2 className="text-4xl font-extrabold text-cocoa sm:text-5xl">
              Every stitch, made by hand
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-cocoa/70">
              Hooked started as a love for yarn and a hook. Each piece is crocheted one stitch at a
              time, in the colours you choose, using soft, skin-friendly cotton. No factories, no
              two exactly alike — just handmade things made to be kept.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.l} className="rounded-2xl border border-white/70 bg-white/60 p-4 text-center shadow-soft">
                  <div className="font-display text-2xl font-extrabold text-cocoa">{s.n}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-cocoa/60">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
