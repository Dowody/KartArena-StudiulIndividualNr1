import { useEffect, useState } from "react"

type Pt = { x: number; y: number }

const CORNERS: Pt[] = [
  { x: 190, y: 400 },
  { x: 690, y: 400 },
  { x: 830, y: 310 },
  { x: 790, y: 190 },
  { x: 640, y: 130 },
  { x: 470, y: 130 },
  { x: 390, y: 220 },
  { x: 300, y: 140 },
  { x: 170, y: 165 },
  { x: 95, y: 280 },
  { x: 150, y: 390 },
]

function sub(a: Pt, b: Pt): Pt {
  return { x: a.x - b.x, y: a.y - b.y }
}

function add(a: Pt, b: Pt): Pt {
  return { x: a.x + b.x, y: a.y + b.y }
}

function mul(a: Pt, s: number): Pt {
  return { x: a.x * s, y: a.y * s }
}

function norm(a: Pt): Pt {
  const l = Math.hypot(a.x, a.y) || 1
  return { x: a.x / l, y: a.y / l }
}

function circuit(pts: Pt[], radius: number) {
  const n = pts.length
  const corners = pts.map((curr, i) => {
    const prev = pts[(i - 1 + n) % n]
    const next = pts[(i + 1) % n]
    const toPrev = norm(sub(prev, curr))
    const toNext = norm(sub(next, curr))
    const dot = Math.min(1, Math.max(-1, toPrev.x * toNext.x + toPrev.y * toNext.y))
    const angle = Math.acos(dot)
    const leg = Math.min(Math.hypot(curr.x - prev.x, curr.y - prev.y), Math.hypot(next.x - curr.x, next.y - curr.y))
    const maxDist = leg * 0.46
    let dist = radius / Math.tan(angle / 2)
    let r = radius
    if (!Number.isFinite(dist) || dist > maxDist) {
      dist = maxDist
      r = dist * Math.tan(angle / 2)
    }
    if (!Number.isFinite(r) || r < 0.5) r = 0.5
    const incoming = sub(curr, prev)
    const outgoing = sub(next, curr)
    const cross = incoming.x * outgoing.y - incoming.y * outgoing.x
    return {
      start: add(curr, mul(toPrev, dist)),
      end: add(curr, mul(toNext, dist)),
      r,
      sweep: cross > 0 ? 1 : 0,
    }
  })

  const fmt = (p: Pt) => `${p.x.toFixed(1)} ${p.y.toFixed(1)}`
  let d = `M ${fmt(corners[n - 1].end)}`
  for (let i = 0; i < n; i++) {
    d += ` L ${fmt(corners[i].start)} A ${corners[i].r.toFixed(1)} ${corners[i].r.toFixed(1)} 0 0 ${corners[i].sweep} ${fmt(corners[i].end)}`
  }
  d += " Z"

  const a = corners[0].end
  const b = corners[1].start
  const dx = b.x - a.x
  const dy = b.y - a.y
  const span = Math.hypot(dx, dy) || 1
  return {
    d,
    start: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
    nx: -dy / span,
    ny: dx / span,
  }
}

const TRACK = circuit(CORNERS, 68)

function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setReduced(media.matches)
    update()
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  return reduced
}

function Kart({ delay, still }: { delay?: string; still?: string }) {
  return (
    <g transform={still} fill="#f5f5f7">
      <rect x="-9" y="-6.2" width="4.2" height="2.6" rx="0.6" />
      <rect x="-9" y="3.6" width="4.2" height="2.6" rx="0.6" />
      <rect x="3.4" y="-6.2" width="4.2" height="2.6" rx="0.6" />
      <rect x="3.4" y="3.6" width="4.2" height="2.6" rx="0.6" />
      <path d="M-8 -3.4 H4.5 L9.5 0 L4.5 3.4 H-8 Z" />
      {delay !== undefined && (
        <animateMotion dur="20s" begin={delay} repeatCount="indefinite" rotate="auto" path={TRACK.d} />
      )}
    </g>
  )
}

export function TrackSketch() {
  const reduced = useReducedMotion()

  return (
    <svg
      viewBox="40 70 860 390"
      role="img"
      aria-label="Siluetă a pistei văzută de sus, cu două karturi pe circuit."
      className="h-auto w-full"
    >
      <path d={TRACK.d} fill="none" stroke="#f5f5f7" strokeWidth="34" strokeLinejoin="round" />
      <path d={TRACK.d} fill="none" stroke="#0a0a0a" strokeWidth="28" strokeLinejoin="round" />
      <line
        x1={TRACK.start.x - TRACK.nx * 14}
        y1={TRACK.start.y - TRACK.ny * 14}
        x2={TRACK.start.x + TRACK.nx * 14}
        y2={TRACK.start.y + TRACK.ny * 14}
        stroke="#f5f5f7"
        strokeWidth="2"
      />
      <Kart delay={reduced ? undefined : "0s"} still={reduced ? `translate(${TRACK.start.x + 80} ${TRACK.start.y})` : undefined} />
      <Kart delay={reduced ? undefined : "-9s"} still={reduced ? "translate(800 250)" : undefined} />
    </svg>
  )
}
