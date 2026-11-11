import { useState } from "react"
import { Calc } from "./Calc"

export const UNIT_PRICE = 3500
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

export const CURS = 20.1989
export const CAS = 0.24
const INREGISTRARE = 1149 + 485
export const AUTOSIM_POSTURI = 2
const AUTOSIM_PRET = 1500
const MOBILIER = 2000
const SCULE = 400

export function leiDinEuro(suma: number) {
  return Math.round(suma * CURS)
}

export type Categorie = "imobil" | "utilaje" | "mobilier" | "ustensile" | "alte"

export function necessities(count: number): { label: string; amount: number; cat: Categorie }[] {
  return [
    {
      label: `Teren, ${TEREN_ARI} ari`,
      amount: leiDinEuro(TEREN_ARI * 100 * TEREN_PE_METRU),
      cat: "imobil",
    },
    {
      label: `Hală metalică, ${HALA_MP} m²`,
      amount: leiDinEuro(HALA_MP * HALA_PE_METRU),
      cat: "imobil",
    },
    {
      label: `Bariere modulare, ${BARRIER_METERS} m`,
      amount: leiDinEuro(BARRIER_METERS * BARRIER_PER_METER),
      cat: "utilaje",
    },
    {
      label: `Căști de închiriat, ${count * HELMETS_PER_KART} bucăți`,
      amount: leiDinEuro(count * HELMETS_PER_KART * HELMET_PRICE),
      cat: "ustensile",
    },
    { label: "Decodor și program de cronometrare", amount: leiDinEuro(TIMING_BASE), cat: "utilaje" },
    { label: `Transpondere, ${count} bucăți`, amount: leiDinEuro(count * TRANSPONDER), cat: "utilaje" },
    { label: "Iluminat, 8 proiectoare", amount: leiDinEuro(700), cat: "utilaje" },
    { label: "Ventilație de evacuare", amount: leiDinEuro(2000), cat: "utilaje" },
    { label: "Stingătoare și scut antiincendiu", amount: leiDinEuro(250), cat: "utilaje" },
    {
      label: `Autosim, ${AUTOSIM_POSTURI} posturi: scaun, volan, pedale, calculator, ecran`,
      amount: leiDinEuro(AUTOSIM_POSTURI * AUTOSIM_PRET),
      cat: "utilaje",
    },
    {
      label: "Mobilier: birou de recepție, calculator, mese, scaune, canapea",
      amount: leiDinEuro(MOBILIER),
      cat: "mobilier",
    },
    { label: "Scule pentru mecanic: cric, chei, compresor", amount: leiDinEuro(SCULE), cat: "ustensile" },
    { label: "Înregistrarea societății", amount: INREGISTRARE, cat: "alte" },
  ]
}

const numar = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 })

const SCUTIRE = 2475
const ORE_NORMA = 40
const ORE_LUCRU = 30
export const ANGAJATI = [
  { rol: "Instructor", brutIntreg: 14000 },
  { rol: "Mecanic", brutIntreg: 12000 },
  { rol: "Recepție", brutIntreg: 6300 },
].map((om) => ({
  ...om,
  brut: Math.round((om.brutIntreg * ORE_LUCRU) / ORE_NORMA),
}))

export function salariuNet(brut: number) {
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

export type CategorieLunara = "salarii" | "materiale" | "alte"

export function cheltuieliLunare(count: number): { label: string; amount: number; cat: CategorieLunara }[] {
  const parte = count / KARTURI_LA_PORNIRE
  return [
    ...ANGAJATI.map((om) => ({
      label: `${om.rol}, ${ORE_LUCRU} ore/săptămână, net ${zecimale.format(salariuNet(om.brut))} lei`,
      amount: om.brut,
      cat: "salarii" as const,
    })),
    {
      label: "CAS 24%, plătit de firmă pentru salarii",
      amount: Math.round(ANGAJATI.reduce((sum, om) => sum + om.brut, 0) * CAS),
      cat: "salarii",
    },
    { label: "Benzină", amount: Math.round(LITRI_LA_PORNIRE * parte * BENZINA), cat: "materiale" },
    { label: "Energie electrică", amount: CURENT, cat: "alte" },
    { label: "Apă și canalizare", amount: 250, cat: "alte" },
    { label: "Ulei și piese", amount: Math.round(2000 * parte), cat: "materiale" },
    { label: "Protecții de unică folosință", amount: 400, cat: "materiale" },
    { label: "Promovare", amount: 2000, cat: "alte" },
    { label: "Internet", amount: 300, cat: "alte" },
    { label: "Telefon", amount: 100, cat: "alte" },
    { label: "Asigurare de răspundere", amount: 800, cat: "alte" },
    { label: "Contabil", amount: 2000, cat: "alte" },
    { label: "Gunoi", amount: 300, cat: "alte" },
    { label: "Comision bancar", amount: 150, cat: "alte" },
    { label: "Impozit pe teren și hală", amount: 500, cat: "alte" },
  ]
}

export function lei(suma: number) {
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
            src={`${import.meta.env.BASE_URL}CRG Racing Kart Studio Showcase.png`}
            alt="Kartul CRG Centurion GX270, negru cu roșu, cu motor și scaun negru."
            className="h-full w-full rounded-[28px] object-cover"
          />
          <div className="grid h-full grid-cols-2 gap-3 md:grid-cols-1">
            <img
              src={`${import.meta.env.BASE_URL}crg-centurion.jpg`}
              alt="Fotografie din anunț: un kart CRG Centurion văzut de sus, pe un palet."
              className="h-full w-full rounded-[28px] object-cover object-top"
            />
            <img
              src={`${import.meta.env.BASE_URL}crg-centurion-fleet.jpg`}
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

          <div className="flex flex-wrap items-end justify-between gap-4 border-t border-black/10 pt-8 md:col-span-2">
            <div>
              <p className="text-[14px] text-muted">Flotă + tot ce trebuie ca pista să pornească</p>
              <a href="#finantare" className="mt-1 inline-block text-[15px] text-link hover:underline">
                Lista completă este în capitalul necesar
              </a>
            </div>
            <div className="md:text-right">
              <p className="text-[40px] font-semibold tracking-tight text-ink sm:text-[56px]">{lei(total)}</p>
              <p className="mt-1 text-[13px] text-muted">{euro(total)}</p>
            </div>
          </div>
        </div>

        <Calc label="De unde vin sumele" className="mx-auto mt-3 max-w-[1100px]">
          <p className="max-w-[760px] text-[15px] leading-relaxed text-muted">
          Anunțul are {AVAILABLE} bucăți. Prețul nu include transportul; ridicarea este din Lonato
          del Garda, Italia. Sumele din străinătate sunt trecute în lei la cursul Băncii Naționale
          din 24 octombrie 2026, de 20,1989 lei pentru un euro. Înregistrarea societății este taxa de
          1.149 de lei pentru 24 de ore plus semnătura electronică de 485 de lei. Terenul este
          calculat la 50 de euro pe metru pătrat, după un lot industrial de 50 de ari de pe șoseaua
          Muncești, în sectorul Botanica, scos la vânzare cu 250.000 de euro. Hala este la 250 de
          euro pe metru pătrat, capătul de jos pentru o hală izolată în Chișinău, cu fundație și
          podea de bază. Un post de autosim este socotit la 1.500 de euro, mobilierul la 2.000 de
          euro, iar sculele mecanicului la 400 de euro.
          </p>
          <p className="mt-4 max-w-[760px] text-[15px] leading-relaxed text-muted">
          Luna de lucru este calculată pentru 22 de zile, cu 4 ore de pistă și, la 6
          karturi, în medie 3 karturi pornite, la 2 litri pe oră. Benzina este plafonul de 32,45 lei
          pe litru. Sunt 3 angajați, câte 30 de ore pe săptămână: 5 zile, de la 16:00 la 22:00. Norma
          întreagă în 2026 este de 40 de ore, iar salariul minim de 6.300 lei este pentru această
          normă. Recepția este plătită la minim, deci 4.725 lei brut. Mecanicul pleacă de la 12.000
          lei pe normă întreagă, instructorul de la 14.000 lei, ambele sub salariul mediu de 17.400
          lei, apoi se reduc la 30 de ore. Firma plătește peste brut contribuția de asigurări sociale
          (CAS) de 24%. Netul de pe card se calculează ca în studiul de caz: din brut se scade
          asigurarea medicală de 9%, apoi impozitul de 12% din ce rămâne după scutirea personală de
          2.475 lei. Curentul este 800 kWh la 3,56 lei, plus taxa pe valoare. Internetul este un
          abonament de afaceri de 300 lei. Promovarea, asigurarea, gunoiul și impozitul pe teren sunt
          estimări de firmă mică; impozitul exact apare după evaluarea cadastrală.
          </p>
        </Calc>
      </div>
    </section>
  )
}
