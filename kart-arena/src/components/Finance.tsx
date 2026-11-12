import { Calc } from "./Calc"
import { capital, capitalTotal, DOBANDA_CREDIT, imprumut, proprii, propriiProcent, rataLunara, TERMEN_CREDIT_ANI, totalPlatitCredit } from "./plan"
import { MoneyTable } from "./MoneyTable"
import { SplitBar } from "./SplitBar"

const lei = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 })

export function Finance() {
  return (
    <section id="finantare" className="scroll-mt-14 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center text-[16px] font-medium text-link">Finanțarea și evidența</p>
        <h2 className="mx-auto mt-3 max-w-[860px] text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
          Capitalul de care avem nevoie
        </h2>

        <div className="mx-auto mt-16 max-w-[820px]">
          <Calc>
          <MoneyTable
            head={["Nr.", "Cheltuieli", "Suma totală, lei"]}
            rows={capital.map((row, index) => ({
              cells: [`${index + 1}.`, row.title, lei.format(row.amount)],
              details: row.items.map((item) => [item.label, lei.format(item.amount)]),
            }))}
            total={["Total capital necesar", lei.format(capitalTotal)]}
          />
          </Calc>
        </div>

        <div className="mx-auto mt-16 max-w-[820px]">
          <h3 className="text-[28px] font-semibold tracking-tight text-ink">
            Acte necesare înainte de deschidere
          </h3>
          <dl className="mt-6">
            {[
              ["Înregistrarea", "1.634 lei: taxa de 1.149 lei și semnătura electronică de 485 lei. Sunt deja în calcul."],
              ["Contul bancar", "Îl deschidem pe numele societății. Deschiderea este de obicei gratuită; apoi apar comisioanele lunare ale băncii."],
              ["Licența", "Kartingul de agrement nu este o activitate pentru care legea cere licență."],
              ["Avizele", "Pentru sală cu public avem nevoie de avizul pompierilor și de acordul pentru spațiul închiriat."],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 border-t border-black/10 py-5 sm:grid-cols-[180px_1fr] sm:gap-8"
              >
                <dt className="text-[16px] text-muted">{label}</dt>
                <dd className="text-[17px] leading-snug text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto mt-16 max-w-[820px]">
          <h3 className="text-[28px] font-semibold tracking-tight text-ink">Sursele de finanțare</h3>
          <SplitBar
            className="mt-6 mb-10"
            items={[
              { label: "Bani proprii, rude și prieteni", value: proprii },
              { label: "Credit Microinvest", value: imprumut },
            ]}
          />
          <MoneyTable
            head={["", "Surse de finanțare", "Suma, lei", "Ponderea, %"]}
            rows={[
              { cells: ["1.", "Mijloace bănești proprii: economiile fondatorilor și împrumuturi de la rude și prieteni", lei.format(proprii), `${propriiProcent}%`] },
              {
                cells: [
                  "2.",
                  `Mijloace împrumutate: credit Microinvest pe ${TERMEN_CREDIT_ANI} ani, ${DOBANDA_CREDIT.toString().replace(".", ",")}% pe an`,
                  lei.format(imprumut),
                  `${100 - propriiProcent}%`,
                ],
              },
            ]}
            total={["Total necesar de capital", lei.format(capitalTotal), "100%"]}
          />
          <p className="mt-4 text-[17px] leading-relaxed text-muted">
            Microinvest dă credit firmelor noi, cu dobândă fixă între 14,5% și 50% pe an. Cu acest plan
            de afaceri negociem cea mai mică dobândă, {DOBANDA_CREDIT.toString().replace(".", ",")}%, pe{" "}
            {TERMEN_CREDIT_ANI} ani: {lei.format(rataLunara)} lei pe lună. În {TERMEN_CREDIT_ANI} ani întoarcem în total{" "}
            {lei.format(totalPlatitCredit)} lei: {lei.format(imprumut)} lei creditul și{" "}
            {lei.format(totalPlatitCredit - imprumut)} lei dobânda.
          </p>
        </div>
      </div>
    </section>
  )
}
