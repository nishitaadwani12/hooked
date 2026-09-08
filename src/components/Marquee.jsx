// An infinite scrolling ribbon of little brand phrases — a popular accent that
// adds motion between sections. Pauses automatically under reduced motion
// (via the global CSS rule).
const items = [
  'Hand-stitched',
  '100% made to order',
  'Choose your colours',
  'Cotton & love',
  'One of a kind',
  'Wrapped with care',
]

export default function Marquee() {
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-white/60 bg-white/40 py-4 backdrop-blur-sm">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-8 pr-8">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-cocoa/60">
            {t} <span className="text-blush">✿</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
    </div>
  )
}
