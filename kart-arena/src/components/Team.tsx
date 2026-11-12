import { MoneyTable } from "./MoneyTable"
import { CAS, salariuNet } from "./FleetCost"
import { personal, salariiBrut, salariiCas } from "./plan"

const numar = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 })

// Fiecare angajat pe rândul lui, chiar dacă sunt doi pe aceeași funcție.
const angajati = personal.flatMap((om) =>
  Array.from({ length: om.persoane }, () => ({
    functia: om.functia,
    brut: om.brutPersoana,
    cas: Math.round(om.brutPersoana * CAS),
    net: Math.round(salariuNet(om.brutPersoana)),
  })),
)
const netTotal = angajati.reduce((total, om) => total + om.net, 0)

const motivare = [
  {
    title: "Metode nefinanciare",
    points: [
      ["Program de 30 de ore", "Lucrul de la 16:00 la 22:00 lasă timp pentru studii, iar pentru tineri asta contează mult."],
      ["Curse gratuite", "Fiecare angajat are o cursă gratuită pe săptămână și reducere pentru familie. Nu ne costă mult și îi leagă de pistă."],
    ],
  },
  {
    title: "Metode financiare",
    points: [
      ["Salariu peste minim", "Instructorii și mecanicul pornesc de la 15.000 de lei pe normă întreagă, peste media de 12.891 lei din domeniul recreativ, ca să nu plece la prima ofertă."],
      ["Bonusuri la salariu", "Cine este responsabil și vine la timp primește un bonus la salariu. Așa răsplătim seriozitatea, nu doar orele lucrate."],
    ],
  },
]

export function Team() {
  return (
    <section id="echipa" className="scroll-mt-14 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center text-[16px] font-medium text-link">Personalul</p>
        <h2 className="mx-auto mt-3 max-w-[860px] text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
          Echipa de la deschidere
        </h2>

        <div className="mx-auto mt-16 max-w-[820px]">
          <h3 className="text-[28px] font-semibold tracking-tight text-ink">Salariile și CAS</h3>
          <MoneyTable
            className="mt-6"
            head={["Nr.", "Funcția", "Salariu brut, lei", "CAS 24%, lei", "Salariu net, lei"]}
            rows={angajati.map((om, i) => ({
              cells: [
                `${i + 1}.`,
                om.functia,
                numar.format(om.brut),
                numar.format(om.cas),
                numar.format(om.net),
              ],
            }))}
            total={[
              "Total lunar",
              numar.format(salariiBrut),
              numar.format(salariiCas),
              numar.format(netTotal),
            ]}
          />
        </div>

        <h3 className="mx-auto mt-24 max-w-[860px] text-center text-[28px] font-semibold tracking-tight text-ink sm:text-[32px]">
          Organigrama
        </h3>
        <div className="-mx-6 mt-4 -mb-10 overflow-x-auto px-6 pt-6 pb-12">
          <div className="org mx-auto w-max min-w-full text-center">
            <ul>
              <li>
                <OrgBox title="Fondatori" note="Borș Bogdan, Covali Alexandru" dark />
                <ul>
                  <li>
                    <OrgBox title="Director general" note="Covali Alexandru" dark />
                    <ul>
                      <li>
                        <OrgBox title="Manager pistă și marketing" note="Borș Bogdan" />
                        <ul>
                          <li>
                            <OrgBox title="Instructori" note="2 persoane" />
                          </li>
                          <li>
                            <OrgBox title="Mecanic" note="1 persoană" />
                          </li>
                          <li>
                            <OrgBox title="Recepție" note="2 persoane" />
                          </li>
                          <li>
                            <OrgBox title="Menajeră" note="1 persoană" />
                          </li>
                        </ul>
                      </li>
                      <li>
                        <OrgBox title="Contabil" note="1 persoană" />
                      </li>
                      <li>
                        <OrgBox title="Paznic" note="1 persoană" />
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>


        <h3 className="mx-auto mt-24 max-w-[860px] text-center text-[28px] font-semibold tracking-tight text-ink sm:text-[32px]">
          Cum motivăm personalul
        </h3>
        <div className="mx-auto mt-12 max-w-[1040px] space-y-14">
          {motivare.map((block) => (
            <div key={block.title} className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-10">
              <h4 className="flex items-center gap-3 text-[22px] font-semibold tracking-tight text-ink">
                <span className="size-2.5 shrink-0 rounded-full bg-link" aria-hidden="true" />
                {block.title}
              </h4>
              <ul className="grid gap-x-10 sm:grid-cols-2">
                {block.points.map(([title, text]) => (
                  <li key={title} className="border-t border-black/[0.08] py-5">
                    <p className="text-[17px] font-semibold tracking-tight text-ink">{title}</p>
                    <p className="mt-1.5 text-[17px] leading-relaxed text-muted">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OrgBox({ title, note, dark = false }: { title: string; note: string; dark?: boolean }) {
  return (
    <div
      className={`inline-block min-w-[136px] rounded-2xl px-4 py-3 ${dark ? "glass-dark text-white" : "glass text-ink"}`}
    >
      <p className="text-[17px] font-semibold tracking-tight">{title}</p>
      <p className={`mt-0.5 text-[15px] ${dark ? "text-[#d2d2d7]" : "text-muted"}`}>{note}</p>
    </div>
  )
}
