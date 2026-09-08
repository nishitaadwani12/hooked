import { useEffect, useState } from 'react'
import { site } from '../config'

const links = [
  { href: '#featured', label: 'Featured' },
  { href: '#catalog', label: 'Shop' },
  { href: '#about', label: 'Our story' },
  { href: '#order', label: 'How to order' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full border border-white/60
          px-5 transition-all duration-300 ${
            scrolled
              ? 'bg-white/70 py-2.5 shadow-soft backdrop-blur-xl'
              : 'bg-white/30 py-3.5 backdrop-blur-md'
          }`}
      >
        <a href="#top" className="flex items-center gap-2 font-display text-xl font-extrabold text-cocoa">
          <span className="inline-block h-7 w-7 animate-wiggle">🧶</span>
          {site.brand}
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-cocoa/70 transition hover:text-cocoa"
            >
              {l.label}
            </a>
          ))}
          <a href="#order" className="btn-primary !px-5 !py-2 text-sm">
            Order now
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-cocoa/20 p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="block h-0.5 w-5 bg-cocoa" />
          <span className="mt-1 block h-0.5 w-5 bg-cocoa" />
          <span className="mt-1 block h-0.5 w-5 bg-cocoa" />
        </button>
      </nav>

      {open && (
        <div className="absolute top-20 w-[92%] max-w-6xl rounded-3xl border border-white/60 bg-white/90 p-4 shadow-lift backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 font-semibold text-cocoa/80 hover:bg-cream"
            >
              {l.label}
            </a>
          ))}
          <a href="#order" onClick={() => setOpen(false)} className="btn-primary mt-2 w-full">
            Order now
          </a>
        </div>
      )}
    </header>
  )
}
