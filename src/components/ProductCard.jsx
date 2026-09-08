import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

// A product card that tilts in 3D toward the pointer with a moving shine —
// gives the whole catalog an interactive, three-dimensional feel without the
// cost of rendering every item in WebGL.
export default function ProductCard({ product, onOrder }) {
  const ref = useRef()
  const [style, setStyle] = useState({ rx: 0, ry: 0, mx: 50, my: 50 })

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    setStyle({
      ry: (px - 0.5) * 16, // rotate on Y based on horizontal position
      rx: (0.5 - py) * 16, // rotate on X based on vertical position
      mx: px * 100,
      my: py * 100,
    })
  }

  const reset = () => setStyle({ rx: 0, ry: 0, mx: 50, my: 50 })

  const hasImage = Boolean(product.image)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      style={{ perspective: 1000 }}
    >
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={{
          transform: `rotateX(${style.rx}deg) rotateY(${style.ry}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s ease-out',
        }}
        className="group relative overflow-hidden rounded-3xl border border-white/70 bg-white/70 p-3 shadow-soft backdrop-blur-sm hover:shadow-lift"
      >
        {/* Product art */}
        <div
          className="relative flex h-56 items-center justify-center overflow-hidden rounded-2xl"
          style={{ backgroundColor: hasImage ? undefined : product.color }}
        >
          {hasImage ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <span className="select-none text-6xl drop-shadow-sm" aria-hidden="true">
              🧶
            </span>
          )}

          {product.madeToOrder && (
            <span className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-cocoa/70">
              Made to order
            </span>
          )}

          {/* Moving shine following the pointer. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: `radial-gradient(circle at ${style.mx}% ${style.my}%, rgba(255,255,255,0.55), transparent 55%)`,
            }}
          />
        </div>

        <div className="px-2 pb-1 pt-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-cocoa">{product.name}</h3>
            <span className="shrink-0 font-display font-bold text-cocoa">{product.price}</span>
          </div>
          <p className="mt-1 text-sm text-cocoa/60">{product.description}</p>
          <button onClick={() => onOrder(product)} className="btn-primary mt-4 w-full !py-2.5 text-sm">
            Order this
          </button>
        </div>
      </div>
    </motion.div>
  )
}
