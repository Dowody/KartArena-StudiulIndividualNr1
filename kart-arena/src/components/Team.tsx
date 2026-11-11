import { MoneyTable } from "./MoneyTable"
import { personal, salariiBrut, salariiCas } from "./plan"

const numar = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 })

const posturi = [
  {
    post: "Director general",
    cine: "Borș Bogdan, fondator",
    functii: "Conduce firma, semnează contractele, ține legătura cu banca și cu contabilul, aprobă cheltuielile.",
  },
  {
    post: "Manager pistă și marketing",
    cine: "Covali Alexandru, fondator",
    functii: "Face orarul angajaților, verifică siguranța pe pistă, se ocupă de rețelele sociale și de evenimentele de grup.",
  },
  {
    post: "Instructor",
    cine: "1 angajat",
    functii: "Explică regulile, ajută clienții să se echipeze, supraveghează cursa și oprește kartul la nevoie.",
  },
  {
    post: "Mecanic",
    cine: "1 angajat",
    functii: "Verifică karturile înainte de deschidere, alimentează, schimbă uleiul și piesele, repară defectele.",
  },
  {
    post: "Recepție",
    cine: "1 angajat",
    functii: "Primește rezervările, încasează plata, vinde tichete cadou și arată timpii obținuți la final.",
  },
  {
    post: "Contabil",
    cine: "contract extern",
    functii: "Ține evidența, calculează salariile și impozitele, depune dările de seamă.",
  },
]

const motivare = [
  {
    title: "Metode nefinanciare",
    dark: false,
    points: [
      ["Program de 30 de ore", "Lucrul de la 16:00 la 22:00 lasă timp pentru studii, iar pentru tineri asta contează mult."],
      ["Curse gratuite", "Fiecare angajat are o cursă gratuită pe săptămână și reducere pentru familie. Nu ne costă mult și îi leagă de pistă."],
      ["Instruire", "Un curs de prim ajutor și de siguranță pe pistă. Angajatul învață ceva util, iar clienții sunt mai în siguranță."],
      ["Laudă și încredere", "Lăudăm în fața echipei pe cel care a lucrat bine și îl ascultăm când propune ceva. Oamenii rămân unde sunt respectați."],
    ],
  },
  {
    title: "Metode financiare",
    dark: true,
    points: [
      ["Salariu peste minim", "Instructorul și mecanicul pornesc de la 14.000 și 12.000 de lei pe normă întreagă, ca să nu plece la prima ofertă."],
      ["Bonus din evenimente", "Recepția primește 5% din fiecare eveniment de grup vândut. Așa are motiv să vândă mai mult."],
      ["Primă trimestrială", "1.000 de lei pentru fiecare angajat, dacă în trei luni nu a fost niciun accident și niciun kart stricat din neatenție."],
      ["Primă la final de an", "Din profitul net, fiecare angajat primește o primă, ca toată echipa să câștige când firma câștigă."],
    ],
  },
]

export function Team() {
  return (
    <section id="echipa" className="scroll-mt-14 bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center text-[14px] text-muted">Personalul</p>
        <h2 className="mx-auto mt-3 max-w-[860px] text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
          Echipa de la deschidere
        </h2>
        <p className="mx-auto mt-6 max-w-[680px] text-center text-[19px] leading-relaxed text-ink">
          La început avem 3 angajați, câte 30 de ore pe săptămână. Cei doi fondatori conduc firma și
          nu iau salariu în primul an. Contabilul lucrează pe contract.
        </p>

        <div className="mx-auto mt-16 max-w-[820px]">
          <h3 className="text-[28px] font-semibold tracking-tight text-ink">Salariile și CAS</h3>
          <MoneyTable
            className="mt-6"
            head={["Nr.", "Funcția", "Persoane", "Salariu brut, lei", "CAS 24%, lei", "Total, lei"]}
            rows={personal.map((om, i) => ({
              cells: [
                `${i + 1}.`,
                om.functia,
                String(om.persoane),
                numar.format(om.brut),
                numar.format(om.cas),
                numar.format(om.brut + om.cas),
              ],
            }))}
            total={[
              "Total lunar",
              String(personal.length),
              numar.format(salariiBrut),
              numar.format(salariiCas),
              numar.format(salariiBrut + salariiCas),
            ]}
          />
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Salariul brut este pentru 30 de ore pe săptămână. CAS este contribuția de asigurări
            sociale de 24%, pe care firma o plătește peste salariul brut.
          </p>
        </div>

        <h3 className="mx-auto mt-24 max-w-[860px] text-center text-[28px] font-semibold tracking-tight text-ink sm:text-[32px]">
          Organigrama
        </h3>
        <div className="mt-10 overflow-x-auto pb-2">
          <div className="org mx-auto w-max min-w-full text-center">
            <ul>
              <li>
                <OrgBox title="Adunarea asociaților" note="Borș Bogdan, Covali Alexandru" dark />
                <ul>
                  <li>
                    <OrgBox title="Director general" note="Borș Bogdan" dark />
                    <ul>
                      <li>
                        <OrgBox title="Manager pistă și marketing" note="Covali Alexandru" />
                        <ul>
                          <li>
                            <OrgBox title="Instructor" note="1 persoană" />
                          </li>
                          <li>
                            <OrgBox title="Mecanic" note="1 persoană" />
                          </li>
                          <li>
                            <OrgBox title="Recepție" note="1 persoană" />
                          </li>
                        </ul>
                      </li>
                      <li>
                        <OrgBox title="Contabil" note="contract extern" />
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <dl className="mx-auto mt-14 max-w-[820px]">
          {posturi.map((item) => (
            <div
              key={item.post}
              className="grid gap-1 border-t border-black/10 py-5 sm:grid-cols-[220px_1fr] sm:gap-8"
            >
              <dt>
                <span className="block text-[17px] font-semibold tracking-tight text-ink">{item.post}</span>
                <span className="text-[14px] text-muted">{item.cine}</span>
              </dt>
              <dd className="text-[17px] leading-snug text-ink">{item.functii}</dd>
            </div>
          ))}
        </dl>

        <h3 className="mx-auto mt-24 max-w-[860px] text-center text-[28px] font-semibold tracking-tight text-ink sm:text-[32px]">
          Cum motivăm personalul
        </h3>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {motivare.map((block) => (
            <article
              key={block.title}
              className={`rounded-[28px] px-8 py-10 sm:px-12 ${block.dark ? "bg-black text-white" : "bg-canvas text-ink"}`}
            >
              <h4 className="text-[28px] font-semibold tracking-tight">{block.title}</h4>
              <ul className="mt-6 space-y-5">
                {block.points.map(([title, text]) => (
                  <li key={title}>
                    <p className="text-[17px] font-semibold tracking-tight">{title}</p>
                    <p className={`mt-1 text-[17px] leading-snug ${block.dark ? "text-[#d2d2d7]" : "text-ink"}`}>
                      {text}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function OrgBox({ title, note, dark = false }: { title: string; note: string; dark?: boolean }) {
  return (
    <div
      className={`inline-block min-w-[136px] rounded-2xl px-4 py-3 ${dark ? "bg-ink text-white" : "bg-canvas text-ink"}`}
    >
      <p className="text-[15px] font-semibold tracking-tight">{title}</p>
      <p className={`mt-0.5 text-[13px] ${dark ? "text-[#d2d2d7]" : "text-muted"}`}>{note}</p>
    </div>
  )
}
