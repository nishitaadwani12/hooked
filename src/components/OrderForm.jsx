import { useEffect, useRef, useState } from 'react'
import { site } from '../config'
import Reveal from './Reveal'

// Order form that emails you the details via Formspree — no server, no phone
// number exposed. Set `formspreeId` in src/config.js to switch it on.
export default function OrderForm({ selected }) {
  const [item, setItem] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | ok | error
  const formRef = useRef()

  // Prefill the item field when a product is chosen elsewhere on the page.
  useEffect(() => {
    if (selected) setItem(selected.name)
  }, [selected])

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(formRef.current)

    // Preferred: Formspree posts the order to your inbox without leaving the page.
    if (site.formspreeId) {
      setStatus('sending')
      try {
        const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        })
        if (res.ok) {
          setStatus('ok')
          formRef.current.reset()
          setItem('')
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
      return
    }

    // Fallback: open the visitor's email app with the order details prefilled.
    if (site.email) {
      const body = [...data.entries()].map(([k, v]) => `${k}: ${v}`).join('\n')
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `New order — ${site.brand}`,
      )}&body=${encodeURIComponent(body)}`
      setStatus('ok')
      return
    }

    // Last resort: send them to Instagram to message you directly.
    if (site.instagram) {
      window.open(`https://instagram.com/${site.instagram}`, '_blank', 'noopener')
    }
  }

  return (
    <section id="order" className="section">
      <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 shadow-lift backdrop-blur-sm md:grid md:grid-cols-5">
        {/* Left panel */}
        <div className="relative bg-gradient-to-br from-blush via-peri to-mint p-8 md:col-span-2">
          <Reveal>
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cocoa/70">
              Place an order
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-cocoa">Let's make something for you</h2>
            <p className="mt-3 text-cocoa/80">
              Tell us what you'd like and your colours. We'll reply with a quote and timeline —
              usually made and shipped in about {site.leadTime}.
            </p>

            {(site.instagram || site.email) && (
              <div className="mt-6 space-y-2 text-sm font-semibold text-cocoa/80">
                {site.instagram && (
                  <a
                    href={`https://instagram.com/${site.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:underline"
                  >
                    ✉️ DM us @{site.instagram}
                  </a>
                )}
                {site.email && (
                  <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:underline">
                    ✉️ {site.email}
                  </a>
                )}
              </div>
            )}
          </Reveal>
        </div>

        {/* Form */}
        <div className="p-8 md:col-span-3">
          <form ref={formRef} onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Your name" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <Field
              label="What would you like?"
              name="item"
              required
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Colours / customisations" name="colours" placeholder="e.g. blush + cream" />
              <Field label="Quantity" name="quantity" type="number" defaultValue="1" min="1" />
            </div>
            <label className="text-sm font-semibold text-cocoa/80">
              Anything else?
              <textarea
                name="message"
                rows="3"
                className="mt-1 w-full rounded-2xl border border-cocoa/15 bg-white/80 px-4 py-3 text-cocoa outline-none focus:border-cocoa/40"
                placeholder="Sizing, deadline, gift note…"
              />
            </label>

            {/* Setup reminder — shown ONLY on your local machine while developing,
                never on the live site. */}
            {import.meta.env.DEV && !site.formspreeId && !site.email && (
              <p className="rounded-2xl bg-butter/50 px-4 py-3 text-sm font-semibold text-cocoa">
                ⚙️ Local reminder (hidden on the live site): add a Formspree ID or email in{' '}
                <code>src/config.js</code> so orders reach you.
              </p>
            )}
            {status === 'ok' && (
              <p className="rounded-2xl bg-mint/60 px-4 py-3 text-sm font-semibold text-cocoa">
                🎉 Thank you! Your order request is on its way. We'll be in touch soon.
              </p>
            )}
            {status === 'error' && (
              <p className="rounded-2xl bg-blush/70 px-4 py-3 text-sm font-semibold text-cocoa">
                Something went wrong — please try again in a moment.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary mt-1 w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send order request'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', ...rest }) {
  return (
    <label className="text-sm font-semibold text-cocoa/80">
      {label}
      <input
        name={name}
        type={type}
        className="mt-1 w-full rounded-2xl border border-cocoa/15 bg-white/80 px-4 py-3 text-cocoa outline-none focus:border-cocoa/40"
        {...rest}
      />
    </label>
  )
}
