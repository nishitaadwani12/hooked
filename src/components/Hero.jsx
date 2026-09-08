import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { site } from '../config'
import { useReducedMotion } from '../hooks/useReducedMotion'

// The 3D canvas is code-split so the heavy Three.js bundle never blocks the
// first paint — it streams in after the page is interactive.
const Hero3D = lazy(() => import('./Hero3D'))

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section id="top" className="relative min-h-screen overflow-hidden">
      {/* Full-bleed floating charms behind everything. */}
      <div className="absolute inset-0">
        {reduced ? (
          <div className="h-full w-full bg-gradient-to-br from-blush via-peri/60 to-mint" />
        ) : (
          <Suspense fallback={<div className="h-full w-full bg-blush/30" />}>
            <Hero3D animate={!reduced} />
          </Suspense>
        )}
      </div>

      {/* Soft scrims so the headline stays readable over the charms. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cream via-cream/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-cream to-transparent" />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-5 sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          Handmade · Made to order
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl font-extrabold leading-[1.05] tracking-tight text-cocoa sm:text-6xl lg:text-7xl"
        >
          {site.brand}
          <span className="block bg-gradient-to-r from-blush via-peri to-mint bg-clip-text text-transparent">
            made with love.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-md text-lg text-cocoa/70"
        >
          {site.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a href="#catalog" className="btn-primary">
            Explore the collection
          </a>
          <a href="#order" className="btn-ghost">
            How to order
          </a>
        </motion.div>
      </div>

      <a href="#featured" className="absolute inset-x-0 bottom-6 mx-auto w-fit text-sm font-semibold text-cocoa/50">
        <span className="inline-block animate-float">↓ scroll</span>
      </a>
    </section>
  )
}
