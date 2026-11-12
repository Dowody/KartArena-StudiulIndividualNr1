/* Bara care arată cum se împarte o sumă, cu legenda dedesubt. */
export const CULORI_BARA = ["bg-[#d70015]", "bg-[#ff6961]", "bg-[#ffb3ad]", "bg-[#1d1d1f]", "bg-[#a1a1a6]"]

const procent = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 })

export function SplitBar({
  items,
  className = "",
}: {
  items: { label: string; value: number }[]
  className?: string
}) {
  const total = items.reduce((sum, item) => sum + item.value, 0)
  if (total <= 0) return null
  return (
    <div className={className}>
      <div className="flex h-3 gap-1 overflow-hidden rounded-full" aria-hidden="true">
        {items.map((item, i) => (
          <span
            key={item.label}
            className={`${CULORI_BARA[i % CULORI_BARA.length]} first:rounded-l-full last:rounded-r-full`}
            style={{ width: `${(item.value / total) * 100}%` }}
          />
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-muted">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            <span className={`size-2.5 shrink-0 rounded-full ${CULORI_BARA[i % CULORI_BARA.length]}`} aria-hidden="true" />
            {item.label}
            <span className="font-semibold text-ink">{procent.format((item.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
