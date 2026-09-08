import { motion } from 'framer-motion'
import Reveal from './Reveal'

// Edit these with real customer quotes — social proof is a big trust driver
// for handmade shops.
const reviews = [
  {
    quote: 'The bunny is even cuter in person. You can tell every stitch was made with care!',
    name: 'Ananya R.',
    tag: 'Cuddle Bunny',
  },
  {
    quote: 'Loved that I could pick my own colours. It arrived beautifully wrapped and honestly felt like a gift.',
    name: 'Meera K.',
    tag: 'Granny-Square Tote',
  },
  {
    quote: 'So soft and well made. Already ordered two more for friends. Highly recommend!',
    name: 'Ishita S.',
    tag: 'Pom-Pom Beanie',
  },
]

export default function Reviews() {
  return (
    <section className="section">
      <Reveal>
        <span className="eyebrow">Kind words</span>
        <h2 className="max-w-xl text-4xl font-extrabold text-cocoa sm:text-5xl">
          Loved by little hands & big hearts
        </h2>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {reviews.map((r, i) => (
          <motion.figure
            key={r.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex h-full flex-col rounded-3xl border border-white/70 bg-white/60 p-6 shadow-soft backdrop-blur-sm"
          >
            <div className="text-butter" aria-hidden="true">
              ★★★★★
            </div>
            <blockquote className="mt-3 flex-1 text-cocoa/80">“{r.quote}”</blockquote>
            <figcaption className="mt-4 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blush/70 font-display font-bold text-cocoa">
                {r.name.charAt(0)}
              </span>
              <span>
                <span className="block text-sm font-bold text-cocoa">{r.name}</span>
                <span className="block text-xs text-cocoa/50">{r.tag}</span>
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
