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
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Animated pastel gradient blobs (on-trend soft background). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-blush/60 blur-3xl md:h-96 md:w-96" />
        <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-peri/50 blur-3xl md:h-[26rem] md:w-[26rem]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-mint/60 blur-3xl" />
      </div>

      <div className="section grid w-full items-center gap-10 pt-28 md:grid-cols-2 md:pt-24">
        <div>
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

        {/* 3D showpiece — swapped for a calm static art when reduced motion is on. */}
        <div className="relative h-[340px] sm:h-[440px] md:h-[520px]">
          {reduced ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-56 w-56 animate-none rounded-full bg-gradient-to-br from-blush via-peri to-mint blur-[2px]" />
            </div>
          ) : (
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center">
                  <div className="h-40 w-40 animate-float rounded-full bg-blush/70 blur-md" />
                </div>
              }
            >
              <Hero3D animate={!reduced} />
            </Suspense>
          )}
        </div>
      </div>

      <a
        href="#featured"
        className="absolute inset-x-0 bottom-6 mx-auto w-fit text-sm font-semibold text-cocoa/50"
      >
        <span className="inline-block animate-float">↓ scroll</span>
      </a>
    </section>
  )
}
