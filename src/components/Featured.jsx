import { motion } from 'framer-motion'
import { products } from '../data/products'
import Reveal from './Reveal'

// A bento-style grid (a current layout trend) spotlighting a few pieces at
// different sizes for visual rhythm.
export default function Featured({ onOrder }) {
  const picks = products.slice(0, 4)
  const spans = ['md:col-span-2 md:row-span-2', '', '', 'md:col-span-2']

  return (
    <section id="featured" className="section">
      <Reveal>
        <span className="eyebrow">The favourites</span>
        <h2 className="max-w-xl text-4xl font-extrabold text-cocoa sm:text-5xl">
          Pieces people fall for
        </h2>
        <p className="mt-3 max-w-md text-cocoa/60">
          A little taste of the collection. Tap any piece to start an order.
        </p>
      </Reveal>

      <div className="mt-10 grid auto-rows-[190px] grid-cols-2 gap-4 md:grid-cols-4">
        {picks.map((p, i) => (
          <motion.button
            key={p.id}
            onClick={() => onOrder(p)}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className={`group relative overflow-hidden rounded-3xl border border-white/70 text-left shadow-soft ${spans[i]}`}
            style={{ backgroundColor: p.color }}
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            )}
            {!p.image && (
              <span className="absolute inset-0 flex items-center justify-center text-6xl opacity-70" aria-hidden="true">
                🧶
              </span>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 to-transparent p-4">
              <p className="font-display text-lg font-bold text-white">{p.name}</p>
              <p className="text-sm text-white/85">{p.price}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  )
}
