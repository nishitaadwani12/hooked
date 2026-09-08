# 🧶 Hooked — Interactive 3D Crochet Site

A modern, interactive, 3D marketing & ordering site for **Hooked**, a handmade crochet
business. Customers browse the collection in a playful pastel, motion-rich interface and
place orders through a form that emails you the details — **no phone number is ever shown**.

Built to be **100% free** to run and easy to edit, even if you don't code.

## ✨ What's inside

- **3D hero** — floating pastel yarn balls that follow the cursor (`react-three-fiber` + `drei`),
  lazy-loaded so the page stays fast.
- **Interactive UI** — 3D pointer-tilt product cards with a moving shine, a bento featured grid,
  glassmorphic shrinking navbar, scroll reveals, gradient blobs, a marquee ribbon, and a
  yarn-trail cursor.
- **Filterable catalog** with animated transitions.
- **Order form** via [Formspree](https://formspree.io) (free) — orders arrive in your inbox.
  Optional Instagram DM + email links.
- **Accessible & mobile-friendly** — respects `prefers-reduced-motion`, provides a calm static
  hero fallback, and works without WebGL.

## 🛠️ Tech stack (all free / open-source)

Vite · React · Tailwind CSS · Framer Motion · react-three-fiber + drei + three

## 🚀 Run it locally

```bash
npm install
npm run dev      # open the URL it prints (usually http://localhost:5173)
npm run build    # production build into /dist
npm run preview  # preview the production build
```

Requires [Node.js](https://nodejs.org) 18+.

## ✏️ Make it yours (no coding required)

Everything you'll want to change lives in two files:

1. **`src/config.js`** — brand name, tagline, lead time, and how customers reach you:
   - `formspreeId` — sign up free at [formspree.io](https://formspree.io), create a form, and paste
     the ID (the part after `formspree.io/f/`). Until you do, the form shows a friendly notice.
   - `instagram` — your handle (no `@`). Leave `''` to hide.
   - `email` — optional business email for the footer.
2. **`src/data/products.js`** — your products. Add, edit, or remove items; set `price`, `category`,
   `description`, and an `image`. For photos, drop the file in the **`public/`** folder and set
   `image: '/your-photo.jpg'`. Categories create the filter buttons automatically.

Tip: replace the 🧶 placeholders in `About.jsx` and product cards with real photos for a premium,
trustworthy feel — good photography is the single biggest upgrade for a handmade brand.

## ☁️ Deploy free on Vercel

1. Push this repo to GitHub (already done if you're reading this there).
2. Go to [vercel.com](https://vercel.com) → **New Project** → import this repo.
3. Framework preset **Vite** is auto-detected — just click **Deploy**. `vercel.json` handles routing.
4. You get a free `*.vercel.app` URL. Add a custom domain later in the project settings.

> Note: Vercel's free *Hobby* tier is intended for non-commercial use. Perfect while you're
> trialling. If the business grows, Netlify's free tier is a commerce-friendly alternative
> (add a `_redirects` file with `/* /index.html 200`).
