// A scalloped edge — the little crochet-blanket detail — drawn as a smooth
// wave of half-circles. `flip` points the bumps downward for bottom edges.
export default function Scallop({ color = '#FDF3EE', flip = false, className = '' }) {
  // Build a wave of scallops across a 1200-wide viewBox.
  const step = 60
  let d = 'M0,0 '
  for (let x = 0; x < 1200; x += step) {
    d += `Q${x + step / 2},44 ${x + step},0 `
  }
  d += 'L1200,44 L0,44 Z'

  return (
    <svg
      viewBox="0 0 1200 44"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`block h-5 w-full ${flip ? 'rotate-180' : ''} ${className}`}
    >
      <path d={d} fill={color} />
    </svg>
  )
}
