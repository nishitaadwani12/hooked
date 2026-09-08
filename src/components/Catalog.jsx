import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { categories, products } from '../data/products'
import ProductCard from './ProductCard'
import Reveal from './Reveal'
import Scallop from './Scallop'

export default function Catalog({ onOrder }) {
  const [active, setActive] = useState('All')

  const shown = useMemo(
    () => (active === 'All' ? products : products.filter((p) => p.category === active)),
    [active],
  )

  return (
    <section id="catalog" className="relative">
      <Scallop />
      <div className="yarn-dots bg-[#FDF3EE]">
        <div className="section">
        <Reveal>
          <span className="eyebrow">The shop</span>
          <h2 className="text-4xl font-extrabold text-cocoa sm:text-5xl">Browse the collection</h2>
          <p className="mt-3 max-w-md text-cocoa/60">
            Everything's handmade to order. Pick a piece and tell us your colours.
          </p>
        </Reveal>

        {/* Filter pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === c
                  ? 'bg-cocoa text-cream shadow-soft'
                  : 'border border-cocoa/15 bg-white/60 text-cocoa/70 hover:border-cocoa/30'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.div key={p.id} layout exit={{ opacity: 0, scale: 0.9 }}>
                <ProductCard product={p} onOrder={onOrder} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        </div>
      </div>
      <Scallop flip />
    </section>
  )
}
