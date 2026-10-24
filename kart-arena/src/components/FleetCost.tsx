import { useState } from "react"

const UNIT_PRICE = 3500
const AVAILABLE = 10

export const KARTURI_LA_PORNIRE = 6
const BARRIER_METERS = 120
const BARRIER_PER_METER = 90
const TEREN_ARI = 10
const TEREN_PE_METRU = 50
const HALA_MP = 400
const HALA_PE_METRU = 250
const HELMETS_PER_KART = 2
const HELMET_PRICE = 110
const TIMING_BASE = 437
const TRANSPONDER = 85

const CURS = 20.1989
const INREGISTRARE = 1149 + 485

function leiDinEuro(suma: number) {
  return Math.round(suma * CURS)
}

function necessities(count: number) {
  return [
    {
      label: `Teren, ${TEREN_ARI} ari`,
      amount: leiDinEuro(TEREN_ARI * 100 * TEREN_PE_METRU),
    },
    {
      label: `Hală metalică, ${HALA_MP} m²`,
      amount: leiDinEuro(HALA_MP * HALA_PE_METRU),
    },
    { label: `Bariere modulare, ${BARRIER_METERS} m`, amount: leiDinEuro(BARRIER_METERS * BARRIER_PER_METER) },
    {
      label: `Căști de închiriat, ${count * HELMETS_PER_KART} bucăți`,
      amount: leiDinEuro(count * HELMETS_PER_KART * HELMET_PRICE),
    },
    { label: "Decodor și program de cronometrare", amount: leiDinEuro(TIMING_BASE) },
    { label: `Transpondere, ${count} bucăți`, amount: leiDinEuro(count * TRANSPONDER) },
    { label: "Iluminat, 8 proiectoare", amount: leiDinEuro(700) },
    { label: "Ventilație de evacuare", amount: leiDinEuro(2000) },
    { label: "Stingătoare și scut antiincendiu", amount: leiDinEuro(250) },
    { label: "Înregistrarea societății", amount: INREGISTRARE },
  ]
}

const numar = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 })

const SCUTIRE = 2475
const ORE_NORMA = 40
const ORE_LUCRU = 30
const ANGAJATI = [
  { rol: "Instructor", brutIntreg: 14000 },
  { rol: "Mecanic", brutIntreg: 12000 },
  { rol: "Recepție", brutIntreg: 6300 },
].map((om) => ({
  ...om,
  brut: Math.round((om.brutIntreg * ORE_LUCRU) / ORE_NORMA),
}))

function salariuNet(brut: number) {
  const medical = brut * 0.09
  const impozit = (brut - SCUTIRE - medical) * 0.12
  return brut - medical - impozit
}
const BENZINA = 32.45
const LITRI_LA_PORNIRE = 528
const CURENT = Math.round(800 * 3.56 * 1.2)

const zecimale = new Intl.NumberFormat("ro-RO", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
})

function cheltuieliLunare(count: number) {
  const parte = count / KARTURI_LA_PORNIRE
  return [
    ...ANGAJATI.map((om) => ({
      label: `${om.rol}, ${ORE_LUCRU} ore/săptămână, net ${zecimale.format(salariuNet(om.brut))} lei`,
      amount: om.brut,
    })),
    { label: "Benzină", amount: Math.round(LITRI_LA_PORNIRE * parte * BENZINA) },
    { label: "Energie electrică", amount: CURENT },
    { label: "Apă și canalizare", amount: 250 },
    { label: "Ulei și piese", amount: Math.round(2000 * parte) },
    { label: "Protecții de unică folosință", amount: 400 },
    { label: "Promovare", amount: 2000 },
    { label: "Internet", amount: 300 },
    { label: "Telefon", amount: 100 },
    { label: "Asigurare de răspundere", amount: 800 },
    { label: "Contabil", amount: 2000 },
    { label: "Gunoi", amount: 300 },
    { label: "Comision bancar", amount: 150 },
    { label: "Impozit pe teren și hală", amount: 500 },
  ]
}

function lei(suma: number) {
  return `${numar.format(suma)} lei`
}

function euro(sumaLei: number) {
  return `${numar.format(Math.round(sumaLei / CURS))} euro`
}

export function capitalPornire(count = KARTURI_LA_PORNIRE) {
  const fleet = leiDinEuro(count * UNIT_PRICE)
  const extra = necessities(count).reduce((sum, item) => sum + item.amount, 0)
  return fleet + extra
}

export function FleetCost() {
  const [count, setCount] = useState(KARTURI_LA_PORNIRE)
  const fleet = leiDinEuro(count * UNIT_PRICE)
  const extra = necessities(count)
  const extraTotal = extra.reduce((sum, item) => sum + item.amount, 0)
  const total = fleet + extraTotal
  const lunar = cheltuieliLunare(count)
  const lunarTotal = lunar.reduce((sum, item) => sum + item.amount, 0)

  function change(next: number) {
    setCount(Math.min(AVAILABLE, Math.max(1, next)))
  }

  return (
    <section id="cost" className="scroll-mt-14 bg-canvas px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center text-[14px] text-muted">Achiziție reală</p>
        <h2 className="mx-auto mt-3 max-w-[760px] text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
          Costul de pornire
        </h2>
        <p className="mx-auto mt-6 max-w-[680px] text-center text-[19px] leading-relaxed text-ink">
          Pornim cu o hală de 400 m² și 6 karturi, pe un teren de 10 ari. Anunțul are 10 karturi CRG
          Centurion GX270, anul 2024, pe benzină, recondiționate de fabrică. Locul rămas pe teren
          este pentru extinderea de mai târziu.
        </p>

        <div className="mt-14 grid gap-3 md:grid-cols-[1.4fr_1fr]">
          <img
            src="/CRG%20Racing%20Kart%20Studio%20Showcase.png"
            alt="Kartul CRG Centurion GX270, negru cu roșu, cu motor și scaun negru."
            className="h-full w-full rounded-[28px] object-cover"
          />
          <div className="grid h-full grid-cols-2 gap-3 md:grid-cols-1">
            <img
              src="/crg-centurion.jpg"
              alt="Fotografie din anunț: un kart CRG Centurion văzut de sus, pe un palet."
              className="h-full w-full rounded-[28px] object-cover object-top"
            />
            <img
              src="/crg-centurion-fleet.jpg"
              alt="Fotografie din anunț: mai multe karturi CRG Centurion așezate unul lângă altul."
              className="h-full w-full rounded-[28px] object-cover object-top"
            />
          </div>
        </div>
        <p className="mt-4 text-center text-[15px]">
          <a
            href="https://secondhand-karting.co.uk/listing/105662/10x-2024-crg-centurion-gx270-kart-italy"
            className="text-link hover:underline"
          >
            Anunțul: 10 karturi CRG Centurion GX270, anul 2024
          </a>
        </p>

        <div className="mx-auto mt-3 grid max-w-[1100px] gap-3 rounded-[28px] bg-white p-8 sm:p-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-[14px] text-muted">Preț pe bucată, fără TVA</p>
            <p className="mt-1 text-[32px] font-semibold tracking-tight text-ink">
              {lei(leiDinEuro(UNIT_PRICE))}
            </p>
            <p className="mt-6 text-[14px] text-muted">Câte karturi</p>
            <div className="mt-2 flex items-center gap-4">
              <button
                type="button"
                onClick={() => change(count - 1)}
                className="h-11 w-11 rounded-full bg-canvas text-[22px] text-ink"
                aria-label="Mai puține karturi"
              >
                −
              </button>
              <span className="min-w-8 text-center text-[28px] font-semibold tracking-tight">
                {count}
              </span>
              <button
                type="button"
                onClick={() => change(count + 1)}
                className="h-11 w-11 rounded-full bg-canvas text-[22px] text-ink"
                aria-label="Mai multe karturi"
              >
                +
              </button>
            </div>
          </div>
          <div className="md:text-right">
            <p className="text-[14px] text-muted">Total flotă</p>
            <p className="mt-1 text-[40px] font-semibold tracking-tight text-ink sm:text-[56px]">
              {lei(fleet)}
            </p>
            <p className="mt-2 text-[15px] text-muted">
              {count} × {lei(leiDinEuro(UNIT_PRICE))}
            </p>
          </div>

          <div className="border-t border-black/10 pt-8 md:col-span-2">
            <p className="text-[14px] text-muted">Necesar ca să deschizi pista</p>
            <ul className="mt-4">
              {extra.map((item) => (
                <li
                  key={item.label}
                  className="flex items-baseline justify-between gap-6 border-t border-black/10 py-3 text-[17px]"
                >
                  <span>{item.label}</span>
                  <span className="shrink-0 font-semibold tracking-tight">
                    {lei(item.amount)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <p className="text-[14px] text-muted">Flotă + necesar</p>
              <div className="md:text-right">
                <p className="text-[40px] font-semibold tracking-tight text-ink sm:text-[56px]">
                  {lei(total)}
                </p>
                <p className="mt-1 text-[13px] text-muted">{euro(total)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-3 max-w-[1100px] rounded-[28px] bg-white p-8 sm:p-12">
          <p className="text-[14px] text-muted">
            În fiecare lună, după deschidere · {ANGAJATI.length} angajați
          </p>
          <ul className="mt-4">
            {lunar.map((item) => (
              <li
                key={item.label}
                className="flex items-baseline justify-between gap-6 border-t border-black/10 py-3 text-[17px]"
              >
                <span>{item.label}</span>
                <span className="shrink-0 font-semibold tracking-tight">{lei(item.amount)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <p className="text-[14px] text-muted">Total lunar</p>
            <div className="md:text-right">
              <p className="text-[40px] font-semibold tracking-tight text-ink sm:text-[56px]">
                {lei(lunarTotal)}
              </p>
              <p className="mt-1 text-[13px] text-muted">{euro(lunarTotal)}</p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-[680px] text-center text-[13px] leading-relaxed text-muted">
          Anunțul are {AVAILABLE} bucăți. Prețul nu include transportul; ridicarea este din Lonato
          del Garda, Italia. Sumele din străinătate sunt trecute în lei la cursul Băncii Naționale
          din 24 octombrie 2026, de 20,1989 lei pentru un euro. Înregistrarea societății este taxa de
          1.149 de lei pentru 24 de ore plus semnătura electronică de 485 de lei. Terenul este
          calculat la 50 de euro pe metru pătrat, după un lot industrial de 50 de ari de pe șoseaua
          Muncești, în sectorul Botanica, scos la vânzare cu 250.000 de euro. Hala este la 250 de
          euro pe metru pătrat, capătul de jos pentru o hală izolată în Chișinău, cu fundație și
          podea de bază. Luna de lucru este calculată pentru 22 de zile, cu 4 ore de pistă și, la 6
          karturi, în medie 3 karturi pornite, la 2 litri pe oră. Benzina este plafonul de 32,45 lei
          pe litru. Sunt 3 angajați, câte 30 de ore pe săptămână: 5 zile, de la 16:00 la 22:00. Norma
          întreagă în 2026 este de 40 de ore, iar salariul minim de 6.300 lei este pentru această
          normă. Recepția este plătită la minim, deci 4.725 lei brut. Mecanicul pleacă de la 12.000
          lei pe normă întreagă, instructorul de la 14.000 lei, ambele sub salariul mediu de 17.400
          lei, apoi se reduc la 30 de ore. În listă este brutul plătit de firmă. Netul de pe card se
          calculează ca în studiul de caz: din brut se scade asigurarea medicală de 9%, apoi
          impozitul de 12% din ce rămâne după scutirea personală de 2.475 lei.
          Curentul este 800 kWh la 3,56 lei, plus taxa pe valoare. Internetul este un abonament de
          afaceri de 300 lei. Promovarea, asigurarea, gunoiul și impozitul pe teren sunt estimări de
          firmă mică; impozitul exact apare după evaluarea cadastrală. Dobânda la credit nu este în
          această lună.{" "}
          <a
            href="https://secondhand-karting.co.uk/listing/105662/10x-2024-crg-centurion-gx270-kart-italy"
            className="text-link hover:underline"
          >
            Vezi anunțul
          </a>
          .
        </p>
      </div>
    </section>
  )
}
