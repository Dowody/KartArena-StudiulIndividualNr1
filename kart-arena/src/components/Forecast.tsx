import { Calc } from "./Calc"
import { MoneyTable } from "./MoneyTable"
import {
  capitalTotal,
  cheltuieli,
  cheltuieliAn,
  cheltuieliLuna,
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
    <section id="prognoza" className="scroll-mt-14 bg-canvas px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center text-[14px] text-muted">Primul an de activitate</p>
        <h2 className="mx-auto mt-3 max-w-[860px] text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
          Prognoza și profitul
        </h2>
        <p className="mx-auto mt-6 max-w-[680px] text-center text-[19px] leading-relaxed text-ink">
          Socotim o lună obișnuită și o înmulțim cu 12. O cursă de 10 minute costă 300 de lei.
        </p>

        <Calc
          label="Prognoza cheltuielilor, pe an"
          value={`${numar.format(cheltuieliAn)} lei`}
          note={`${numar.format(cheltuieliLuna)} lei pe lună`}
          className="mx-auto mt-16 max-w-[820px]"
        >
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
          value={`${numar.format(venitAn)} lei`}
          note={`${numar.format(venitLuna)} lei pe lună`}
          className="mx-auto mt-3 max-w-[820px]"
        >
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
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            600 de curse pe lună înseamnă în medie 27 de curse pe zi, din cele 4 ore de pistă. Evenimentul
            de grup costă mai puțin decât 8 curse separate, ca să fie o ofertă bună pentru grupuri.
          </p>
        </Calc>

        <h3 className="mx-auto mt-24 max-w-[860px] text-center text-[28px] font-semibold tracking-tight text-ink sm:text-[32px]">
          Rezultatul financiar
        </h3>
        <div className="mx-auto mt-8 max-w-[1100px] rounded-[28px] bg-black px-8 py-12 text-white sm:px-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-end">
            <Figure label="Venituri" value={venitAn} />
            <span className="hidden pb-2 text-[40px] text-[#86868b] md:block">−</span>
            <Figure label="Cheltuieli" value={cheltuieliAn} />
            <span className="hidden pb-2 text-[40px] text-[#86868b] md:block">=</span>
            <Figure label={profitAn >= 0 ? "Profit" : "Pierdere"} value={profitAn} accent />
          </div>
          <dl className="mt-12 border-t border-white/15">
            {[
              ["Profit pe lună", `${numar.format(profitLuna)} lei`],
              [`Impozit pe venit, ${IMPOZIT_PROFIT}%`, `${numar.format(impozitAn)} lei`],
              ["Profit net în primul an", `${numar.format(profitNetAn)} lei`],
              ["Capitalul se întoarce în", `aproximativ ${unZecimal.format(ani)} ani`],
            ].map(([label, value]) => (
              <div key={label} className="flex items-baseline justify-between gap-6 border-b border-white/15 py-4">
                <dt className="text-[17px] text-[#d2d2d7]">{label}</dt>
                <dd className="text-[19px] font-semibold tracking-tight">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[15px] leading-relaxed text-[#86868b]">
            Afacerea este profitabilă din primul an. Rata creditului nu este o cheltuială, se plătește
            din profit; în cheltuieli intră doar dobânda.
          </p>
        </div>
      </div>
    </section>
  )
}

function Figure({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div>
      <p className="text-[14px] text-[#86868b]">{label}, lei pe an</p>
      <p
        className={`mt-1 text-[32px] font-semibold tracking-tight sm:text-[40px] ${
          accent ? "text-link-on-dark" : ""
        }`}
      >
        {numar.format(value)}
      </p>
    </div>
  )
}
