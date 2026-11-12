type Row = { cells: string[]; details?: string[][] }

/* Tabel în stilul paginii: prima coloană este Nr., a doua textul, restul sume aliniate la dreapta. */
export function MoneyTable({
  head,
  rows,
  total,
  className = "",
}: {
  head: string[]
  rows: Row[]
  total?: string[]
  className?: string
}) {
  const numeric = (i: number) => i >= 2
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full min-w-[520px] border-collapse text-left text-[17px] text-ink">
        <thead>
          <tr className="text-[16px] text-muted">
            {head.map((cell, i) => (
              <th
                key={i}
                scope="col"
                className={`pb-3 font-normal ${i === 0 ? "w-10" : ""} ${numeric(i) ? "pl-4 text-right" : ""}`}
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <RowGroup key={r} row={row} numeric={numeric} width={head.length} />
          ))}
        </tbody>
        {total && (
          <tfoot>
            <tr className="border-t-2 border-ink">
              <th scope="row" colSpan={2} className="py-4 text-left text-[19px] font-semibold tracking-tight">
                {total[0]}
              </th>
              {total.slice(1).map((cell, i) => (
                <td key={i} className="py-4 pl-4 text-right text-[19px] font-semibold tracking-tight whitespace-nowrap">
                  {cell}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  )
}

function RowGroup({ row, numeric, width }: { row: Row; numeric: (i: number) => boolean; width: number }) {
  return (
    <>
      <tr className="border-t border-black/10 align-baseline">
        {row.cells.map((cell, i) => (
          <td
            key={i}
            className={`py-3 ${i === 0 ? "text-muted" : ""} ${
              numeric(i) ? "pl-4 text-right font-semibold tracking-tight whitespace-nowrap" : ""
            }`}
          >
            {cell}
          </td>
        ))}
      </tr>
      {row.details?.map(([label, ...amounts], d) => {
        // Sumele din detalii se aliniază la ultimele coloane ale tabelului.
        const cells = [...Array(Math.max(0, width - 2 - amounts.length)).fill(""), ...amounts]
        return (
          <tr key={d} className="align-baseline text-[17px] text-muted">
            <td />
            <td className="pb-2 pl-4">– {label}</td>
            {cells.map((amount, i) => (
              <td key={i} className="pb-2 pl-4 text-right whitespace-nowrap">
                {amount}
              </td>
            ))}
          </tr>
        )
      })}
    </>
  )
}
