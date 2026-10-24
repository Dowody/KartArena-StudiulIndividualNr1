import { useEffect, useState } from "react"

const LINE =
  "M 220 113 H 740 A 85 85 0 0 1 825 198 V 342 A 85 85 0 0 1 740 427 H 220 A 85 85 0 0 1 135 342 V 198 A 85 85 0 0 1 220 113 Z"

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

function Kart({
  fill,
  delay,
  still,
}: {
  fill: string
  delay?: string
  still?: string
}) {
  return (
    <g transform={still}>
      <rect x="-22" y="-9" width="44" height="18" rx="5" fill={fill} />
      <rect x="-6" y="-5" width="16" height="10" rx="2" fill="#1d1d1f" opacity="0.85" />
      <circle cx="-12" cy="-9" r="3.2" fill="#1d1d1f" />
      <circle cx="12" cy="-9" r="3.2" fill="#1d1d1f" />
      <circle cx="-12" cy="9" r="3.2" fill="#1d1d1f" />
      <circle cx="12" cy="9" r="3.2" fill="#1d1d1f" />
      {delay !== undefined && (
        <animateMotion
          dur="18s"
          begin={delay}
          repeatCount="indefinite"
          rotate="auto"
          path={LINE}
        />
      )}
    </g>
  )
}

export function TrackSketch() {
  const reduced = useReducedMotion()

  return (
    <div className="relative">
    <svg
      viewBox="0 0 960 540"
      role="img"
      aria-label="Schiță a pistei de karting indoor: bariere de protecție, două karturi electrice și un ecran cu rezultatele cursei."
      className="h-auto w-full"
    >
      <defs>
        <radialGradient id="hall" cx="50%" cy="42%" r="68%">
          <stop offset="0%" stopColor="#2c2c2e" />
          <stop offset="72%" stopColor="#000" />
        </radialGradient>
      </defs>
      <rect width="960" height="540" fill="url(#hall)" />
      <rect x="80" y="70" width="800" height="400" rx="120" fill="#3a3a3c" />
      <rect x="104" y="92" width="752" height="356" rx="104" fill="#161617" />
      <rect x="190" y="155" width="580" height="230" rx="64" fill="#0a0a0a" />
      <path
        d={LINE}
        fill="none"
        stroke="#f5f5f7"
        strokeOpacity="0.45"
        strokeWidth="2"
        strokeDasharray="8 12"
      />
      <rect x="466" y="96" width="5" height="59" fill="#f5f5f7" />

      <Kart
        fill="#f5f5f7"
        delay={reduced ? undefined : "0s"}
        still={reduced ? "translate(400 113)" : undefined}
      />
      <Kart
        fill="#a1a1a6"
        delay={reduced ? undefined : "-8s"}
        still={reduced ? "translate(620 113)" : undefined}
      />

    </svg>
      <div className="pointer-events-none absolute top-1/2 left-1/2 w-[148px] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#f5f5f7] px-3.5 py-3 text-left text-ink sm:w-[220px] sm:px-5 sm:py-4">
        <p className="text-[13px] font-semibold sm:text-[15px]">Rezultate</p>
        <div className="mt-2 space-y-1 text-[12px] sm:text-[14px]">
          <p className="flex justify-between gap-4">
            <span className="text-muted">1</span>
            <span>8:42.10</span>
          </p>
          <p className="flex justify-between gap-4">
            <span className="text-muted">2</span>
            <span>8:45.33</span>
          </p>
        </div>
      </div>
    </div>
  )
}
