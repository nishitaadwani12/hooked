import { site } from '../config'

export default function Footer() {
  return (
    <footer className="border-t border-white/60 bg-white/40 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-10 sm:flex-row sm:justify-between sm:px-8">
        <div className="flex items-center gap-2 font-display text-lg font-extrabold text-cocoa">
          <span aria-hidden="true">🧶</span> {site.brand}
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-5 text-sm font-semibold text-cocoa/60">
          <a href="#featured" className="hover:text-cocoa">Featured</a>
          <a href="#catalog" className="hover:text-cocoa">Shop</a>
          <a href="#about" className="hover:text-cocoa">Our story</a>
          <a href="#order" className="hover:text-cocoa">Order</a>
          {site.instagram && (
            <a
              href={`https://instagram.com/${site.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cocoa"
            >
              Instagram
            </a>
          )}
        </nav>

        <p className="text-xs text-cocoa/50">
          © {new Date().getFullYear()} {site.brand} · Handmade with love
        </p>
      </div>
    </footer>
  )
}
