import type { ReactNode } from "react"

/* Un calcul ascuns: pe pagină se vede doar rezultatul, iar detaliile se deschid la clic. */
export function Calc({
  label,
  value,
  note,
  tone = "white",
  className = "",
  children,
}: {
  label: string
  value?: string
  note?: string
  tone?: "white" | "canvas"
  className?: string
  children: ReactNode
}) {
  return (
    <details className={`group rounded-[28px] ${tone === "white" ? "bg-white" : "bg-canvas"} ${className}`}>
      <summary className="flex cursor-pointer list-none flex-wrap items-end justify-between gap-x-6 gap-y-4 p-8 sm:px-12 [&::-webkit-details-marker]:hidden">
        <div>
          <p className="text-[14px] text-muted">{label}</p>
          {value && (
            <p className="mt-1 text-[32px] leading-tight font-semibold tracking-tight text-ink sm:text-[40px]">
              {value}
            </p>
          )}
          {note && <p className="mt-1 text-[13px] text-muted">{note}</p>}
        </div>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[15px] text-link ${
            tone === "white" ? "bg-canvas" : "bg-white"
          }`}
        >
          <span className="group-open:hidden">Vezi calculul</span>
          <span className="hidden group-open:inline">Ascunde calculul</span>
          <svg
            viewBox="0 0 12 12"
            className="size-3 transition-transform duration-200 group-open:rotate-180"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
          </svg>
        </span>
      </summary>
      <div className="px-8 pb-8 sm:px-12 sm:pb-12">{children}</div>
    </details>
  )
}
