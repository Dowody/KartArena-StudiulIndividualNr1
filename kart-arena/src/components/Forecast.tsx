import { Calc } from "./Calc"
import { MoneyTable } from "./MoneyTable"
import { SplitBar } from "./SplitBar"
import {
  capitalTotal,
  cheltuieli,
  cheltuieliAn,
  cheltuieliLuna,
  cheltuieliPeGrupuri,
  IMPOZIT_PROFIT,
  impozitAn,
  profitAn,
  profitNetAn,
  venitAn,
  venitLuna,
  venituri,
} from "./plan"

const numar = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 })
const unZecimal = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 1 })

export function Forecast() {
  const profitLuna = venitLuna - cheltuieliLuna
  const ani = capitalTotal / profitNetAn

  return (
    <section id="prognoza" className="scroll-mt-14 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center text-[16px] font-medium text-link">Primul an de activitate</p>
        <h2 className="mx-auto mt-3 max-w-[860px] text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
          Prognoza și profitul
        </h2>

        <Calc
          label="Prognoza cheltuielilor, pe an"
          className="mx-auto mt-16 max-w-[820px]"
        >
          <SplitBar items={cheltuieliPeGrupuri} className="mb-10" />
          <MoneyTable
            head={["Nr.", "Cheltuieli", "Lunare, lei", "Anuale, lei"]}
            rows={cheltuieli.map((row, i) => ({
              cells: [`${i + 1}.`, row.label, numar.format(row.lunar), numar.format(row.anual)],
            }))}
            total={["Total", numar.format(cheltuieliLuna), numar.format(cheltuieliAn)]}
          />
        </Calc>

        <Calc
          label="Prognoza veniturilor, pe an"
          className="mx-auto mt-16 max-w-[820px]"
        >
          <SplitBar items={venituri.map((row) => ({ label: row.scurt, value: row.venitLunar }))} className="mb-10" />
          <MoneyTable
            head={["Nr.", "Produsul / serviciul", "Lunar", "Anual"]}
            rows={venituri.map((row, i) => ({
              cells: [`${i + 1}.`, row.produs, `${numar.format(row.venitLunar)} lei`, `${numar.format(row.venitAnual)} lei`],
              details: [
                [`Cantitate, ${row.unitate}`, numar.format(row.cantitate), numar.format(row.cantitate * 12)],
                ["Preț, lei", numar.format(row.pret), numar.format(row.pret)],
              ],
            }))}
            total={["Total venit din vânzări", `${numar.format(venitLuna)} lei`, `${numar.format(venitAn)} lei`]}
          />
        </Calc>

        <h3 className="mx-auto mt-24 max-w-[860px] text-center text-[28px] font-semibold tracking-tight text-ink sm:text-[32px]">
          Rezultatul financiar
        </h3>
        <div className="mx-auto mt-8 max-w-[820px]">
          <dl className="text-ink">
            <Row label="Venituri" value={venitAn} />
            <Row label="Cheltuieli" value={-cheltuieliAn} />
            <Row label={profitAn >= 0 ? "Profit" : "Pierdere"} value={profitAn} total />
            <Row label={`Impozit pe venit, ${IMPOZIT_PROFIT}%`} value={-impozitAn} />
            <Row label="Profit net în primul an" value={profitNetAn} total accent />
          </dl>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <div className="glass rounded-[28px] px-8 py-7">
              <p className="text-[16px] text-muted">Profit pe lună</p>
              <p className="mt-1 text-[32px] font-semibold tracking-tight text-ink">
                {numar.format(profitLuna)} lei
              </p>
            </div>
            <div className="glass rounded-[28px] px-8 py-7">
              <p className="text-[16px] text-muted">Capitalul se întoarce în</p>
              <p className="mt-1 text-[32px] font-semibold tracking-tight text-ink">
                ~{unZecimal.format(ani)} ani
              </p>
            </div>
          </div>

          <p className="mt-6 text-[17px] leading-relaxed text-muted">
            Afacerea este profitabilă din primul an, chiar și după ce plătim toată rata creditului,
            cu dobândă cu tot.
          </p>
        </div>
      </div>
    </section>
  )
}

/* Un rând din calcul: sumele scăzute apar cu minus, iar totalurile au o linie groasă deasupra. */
function Row({
  label,
  value,
  total = false,
  accent = false,
}: {
  label: string
  value: number
  total?: boolean
  accent?: boolean
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-6 ${
        total ? "border-t-2 border-ink py-5" : "border-t border-black/10 py-4"
      }`}
    >
      <dt className={total ? "text-[19px] font-semibold tracking-tight" : "text-[17px] text-muted"}>{label}</dt>
      <dd
        className={`font-semibold tracking-tight whitespace-nowrap ${
          total ? "text-[28px] sm:text-[32px]" : "text-[19px]"
        } ${accent ? "text-[#1a7f37]" : ""}`}
      >
        {value < 0 ? "−" : ""}
        {numar.format(Math.abs(value))} lei
      </dd>
    </div>
  )
}
