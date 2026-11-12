import type { ReactNode } from "react"

/* Un calcul afișat direct în pagină: titlul sus, detaliile dedesubt, iar totalul la final. */
export function Calc({
  label,
  note,
  className = "",
  children,
}: {
  label?: string
  note?: string
  className?: string
  children: ReactNode
}) {
  return (
    <section className={className}>
      {label && (
        <div className="mb-6">
          <h4 className="text-[22px] font-semibold tracking-tight text-ink">{label}</h4>
          {note && <p className="mt-1 text-[15px] text-muted">{note}</p>}
        </div>
      )}
      {children}
    </section>
  )
}
