import { capitalPornire, KARTURI_LA_PORNIRE } from "./FleetCost"

const lei = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 })

const CAPITAL = capitalPornire(KARTURI_LA_PORNIRE)
const EXEMPLU = 500_000
const DOBANDA_AN = 6
const ZILE = 30
const dobandaLuna = Math.round((EXEMPLU * DOBANDA_AN * ZILE) / (365 * 100))

const surse = [
  {
    title: "Banii noștri",
    text: "Primii bani vin din economiile fondatorilor. O bancă se uită întâi dacă noi am pus bani în firmă. Fără această parte, celelalte surse se închid.",
  },
  {
    title: "Rude și prieteni",
    text: "Dacă economiile nu ajung, putem împrumuta de la oameni apropiați. Scriem suma, termenul și data când dăm banii înapoi, la fel ca la o bancă. Altfel, o afacere eșuată strică relația.",
  },
  {
    title: "Microfinanțare",
    text: "Microinvest dă credite de afaceri până la 6 milioane de lei, uneori fără gaj, iar dobânda fixă anunțată este între 24,49% și 32,50% pe an. Este scump, dar este o ușă deschisă pentru o firmă nouă.",
  },
  {
    title: "Bănci comerciale",
    text: "Pentru credit se depun cererea băncii, buletinul, certificatul firmei și planul de afaceri. O firmă fără istoric primește bani mai greu: banca păstrează depozitele oamenilor și cere dovezi că putem plăti rata.",
  },
  {
    title: "Program de stat, mai târziu",
    text: "Organizația pentru Dezvoltarea Antreprenoriatului oferă, prin bănci, credite între 200.000 și 5.000.000 de lei, cu dobândă fixă de 6% pe an pentru activitatea noastră. Moldindconbank cere situații financiare pe cel puțin doi ani, deci nu este bani de deschidere.",
  },
  {
    title: "Arendă pe termen lung",
    text: "Karturile pot fi luate în arendă lungă de la o firmă specializată. Ea cumpără utilajul, noi îl folosim și plătim rate. La final putem rămâne cu karturile. Este o cale pentru flotă, nu pentru chirie sau avize.",
  },
]

export function Finance() {
  return (
    <section id="finantare" className="scroll-mt-14 bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center text-[14px] text-muted">Finanțarea și evidența</p>
        <h2 className="mx-auto mt-3 max-w-[860px] text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
          Capitalul de care avem nevoie
        </h2>
        <p className="mx-auto mt-6 max-w-[720px] text-center text-[19px] leading-relaxed text-ink">
          Pentru 6 karturi, terenul, hala și ce trebuie ca pista să pornească, capitalul este{" "}
          <span className="font-semibold">{lei.format(CAPITAL)} lei</span>. Suma se schimbă în
          calculul de mai sus dacă luăm mai puține karturi. Nu punem aici zona de relaxare.
        </p>

        <div className="mx-auto mt-16 max-w-[820px]">
          <h3 className="text-[28px] font-semibold tracking-tight text-ink">
            Ce plătim înainte de prima cursă
          </h3>
          <dl className="mt-6">
            {[
              ["Înregistrarea", "1.634 lei: taxa de 1.149 lei și semnătura electronică de 485 lei. Sunt deja în calcul."],
              ["Ștampila", "Nu mai este obligatorie. Dacă o facem, este o cheltuială mică, de câteva sute de lei."],
              ["Contul bancar", "Îl deschidem pe numele societății. Deschiderea este de obicei gratuită; apoi apar comisioanele lunare ale băncii."],
              ["Licența", "Kartingul de agrement nu este o activitate pentru care legea cere licență."],
              ["Avizele", "Pentru sală cu public avem nevoie de avizul pompierilor și de acordul pentru spațiul închiriat."],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid gap-1 border-t border-black/10 py-5 sm:grid-cols-[180px_1fr] sm:gap-8"
              >
                <dt className="text-[14px] text-muted">{label}</dt>
                <dd className="text-[17px] leading-snug text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <h3 className="mx-auto mt-20 max-w-[860px] text-center text-[28px] font-semibold tracking-tight text-ink sm:text-[32px]">
          De unde putem lua banii
        </h3>
        <div className="mt-8 grid gap-3 md:grid-cols-2">
          {surse.map((item) => (
            <article key={item.title} className="rounded-[28px] bg-canvas px-8 py-8">
              <h4 className="text-[22px] font-semibold tracking-tight text-ink">{item.title}</h4>
              <p className="mt-3 text-[17px] leading-relaxed text-ink">{item.text}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-[820px] border-t border-black/10 pt-10">
          <h3 className="text-[28px] font-semibold tracking-tight text-ink">Cum se calculează dobânda</h3>
          <p className="mt-4 text-[17px] leading-relaxed text-ink">
            Creditul are două părți: suma împrumutată și dobânda. Dobânda poate fi fixă sau poate fi
            schimbată de bancă. Pe lângă ea se plătesc comisioane, iar întârzierea aduce penalități.
            Pentru o lună, dobânda este suma înmulțită cu rata anuală și cu zilele lunii, împărțită
            la 365 × 100.
          </p>
          <p className="mt-4 text-[17px] leading-relaxed text-ink">
            Exemplu, dacă am lua {lei.format(EXEMPLU)} lei pe un an la {DOBANDA_AN}% și luna are{" "}
            {ZILE} de zile: dobânda lunii este {lei.format(dobandaLuna)} lei. La Microinvest, aceeași
            sumă ar costa de câteva ori mai mult, pentru că rata trece de 24% pe an.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1100px] gap-3 md:grid-cols-2">
          <article className="rounded-[28px] bg-black px-8 py-10 text-white">
            <h3 className="text-[28px] font-semibold tracking-tight">Evidența contabilă</h3>
            <p className="mt-4 text-[17px] leading-relaxed text-[#d2d2d7]">
              Evidența se ține în lei. Activul este ce are firma: karturile, căștile și banii din
              cont. Datoriile sunt creditele. Capitalul propriu este partea pusă de fondatori.
              Fiecare încasare și fiecare plată are un document: bon, factură sau extras de cont.
            </p>
          </article>
          <article className="rounded-[28px] bg-canvas px-8 py-10">
            <h3 className="text-[28px] font-semibold tracking-tight text-ink">Venituri și cheltuieli</h3>
            <p className="mt-4 text-[17px] leading-relaxed text-ink">
              Venitul apare când clientul plătește cursa, un eveniment de grup sau un tichet cadou.
              Cheltuiala apare când plătim benzina, salariile, energia, piesele, impozitul pe teren și
              dobânda. Profitul este venitul rămas după aceste cheltuieli, nu banii încasați într-o
              zi plină.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
