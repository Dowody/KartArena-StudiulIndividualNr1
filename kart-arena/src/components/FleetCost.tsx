
export const UNIT_PRICE = 3500

export const KARTURI_LA_PORNIRE = 6
const BARRIER_METERS = 120
const BARRIER_PER_METER = 90
// Hală luată în chirie în Botanica: anunț real, 400 m² pentru 2.300 € pe lună, contract pe 5 ani.
const HALA_MP = 400
const HALA_CHIRIE_EURO = 2300
export const HALA_CHIRIE_ANI = 5
const HELMETS_PER_KART = 2
const HELMET_PRICE = 110
const TIMING_BASE = 437
const TRANSPONDER = 85

const numarEuro = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 })
export const CURS = 20.1989
const CHIRIE_HALA = leiDinEuro(HALA_CHIRIE_EURO)
export const CAS = 0.24
const INREGISTRARE = 1149 + 485
// O singură dată, la pornire, ca lumea să afle de noi din prima lună.
export const CAMPANIE_DESCHIDERE = 30000
export const AUTOSIM_POSTURI = 3
const AUTOSIM_PRET = 1500
const MOBILIER = 2000
const SCULE = 400

// Sumele estimate se rotunjesc la sute de lei, ca să fie ușor de citit.
export function rotund(suma: number) {
  return Math.round(suma / 100) * 100
}

export function leiDinEuro(suma: number) {
  return rotund(suma * CURS)
}

export type Categorie = "utilaje" | "mobilier" | "ustensile" | "alte"

export function necessities(count: number): { label: string; amount: number; cat: Categorie }[] {
  return [
    {
      label: `Bariere de protecție pentru pistă, ${BARRIER_METERS} m`,
      amount: leiDinEuro(BARRIER_METERS * BARRIER_PER_METER),
      cat: "utilaje",
    },
    {
      label: `Căști de închiriat, ${count * HELMETS_PER_KART} bucăți`,
      amount: leiDinEuro(count * HELMETS_PER_KART * HELMET_PRICE),
      cat: "ustensile",
    },
    { label: "Sistem care măsoară timpul pe tur: aparat și program", amount: leiDinEuro(TIMING_BASE), cat: "utilaje" },
    { label: `Senzori de timp montați pe karturi, ${count} bucăți`, amount: leiDinEuro(count * TRANSPONDER), cat: "utilaje" },
    { label: "Lumini pentru pistă, 8 lămpi", amount: leiDinEuro(700), cat: "utilaje" },
    { label: "Ventilație de evacuare", amount: leiDinEuro(2000), cat: "utilaje" },
    { label: "Stingătoare și echipament contra incendiilor", amount: leiDinEuro(250), cat: "utilaje" },
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
    { label: "Unelte pentru mecanic: cric, chei, compresor", amount: leiDinEuro(SCULE), cat: "ustensile" },
    { label: "Înregistrarea societății", amount: INREGISTRARE, cat: "alte" },
    { label: `Campanie de deschidere: reclamă, bloggeri și ziua deschiderii`, amount: CAMPANIE_DESCHIDERE, cat: "alte" },
  ]
}

const numar = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 })

const SCUTIRE = 2475
const ORE_NORMA = 40
const ORE_LUCRU = 30
// Codul muncii, art. 159: ora de noapte (22:00–06:00) se plătește cu cel puțin 50% în plus.
const SPOR_NOAPTE = 0.5
export const ANGAJATI = [
  // brutIntreg = salariul brut pe normă întreagă (40 ore), comparat cu salariul mediu pe economie
  // Fondatorii lucrează normă întreagă și își iau un salariu modest la început, sub media pe economie.
  { rol: "Director general", persoane: 1, ore: ORE_NORMA, brutIntreg: 13500, fondator: true },
  { rol: "Manager pistă și marketing", persoane: 1, ore: ORE_NORMA, brutIntreg: 13500, fondator: true },
  { rol: "Instructor", persoane: 2, ore: ORE_LUCRU, brutIntreg: 15000 },
  { rol: "Mecanic", persoane: 1, ore: ORE_LUCRU, brutIntreg: 15000 },
  { rol: "Recepție", persoane: 2, ore: ORE_LUCRU, brutIntreg: 10000 },
  { rol: "Contabil", persoane: 1, ore: ORE_NORMA, brutIntreg: 13000 },
  { rol: "Menajeră", persoane: 1, ore: ORE_NORMA, brutIntreg: 8000 },
  { rol: "Paznic", persoane: 1, ore: ORE_NORMA, brutIntreg: 9000, sporNoapte: SPOR_NOAPTE },
].map((om) => ({
  ...om,
  // salariul brut al unei persoane, după orele lucrate, plus sporul pentru munca de noapte
  brut: Math.round(((om.brutIntreg * om.ore) / ORE_NORMA) * (1 + (("sporNoapte" in om && om.sporNoapte) || 0))),
}))
export const NR_ANGAJATI = ANGAJATI.reduce((sum, om) => sum + om.persoane, 0)
export const NR_FONDATORI = ANGAJATI.filter((om) => "fondator" in om).reduce((sum, om) => sum + om.persoane, 0)

/* Ca în studiul de caz: Net = Brut − PAM 9% − impozit 12% din (Brut − PAM − scutirea personală). */
export function salariuNet(brut: number) {
  const medical = brut * 0.09
  const impozit = Math.max(0, brut - SCUTIRE - medical) * 0.12
  return brut - medical - impozit
}
const BENZINA = 32.45
const LITRI_LA_PORNIRE = 528
const CURENT = rotund(800 * 3.56 * 1.2)

const zecimale = new Intl.NumberFormat("ro-RO", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
})

export type CategorieLunara = "salarii" | "materiale" | "alte"

export function cheltuieliLunare(count: number): { label: string; amount: number; cat: CategorieLunara }[] {
  const parte = count / KARTURI_LA_PORNIRE
  return [
    ...ANGAJATI.map((om) => ({
      label: `${om.rol}${om.persoane > 1 ? `, ${om.persoane} persoane` : ""}, ${om.ore} ore/săptămână, net ${zecimale.format(salariuNet(om.brut))} lei${om.persoane > 1 ? " fiecare" : ""}`,
      amount: om.brut * om.persoane,
      cat: "salarii" as const,
    })),
    {
      label: "CAS 24%, plătit de firmă pentru salarii",
      amount: Math.round(ANGAJATI.reduce((sum, om) => sum + om.brut * om.persoane, 0) * CAS),
      cat: "salarii",
    },
    { label: "Benzină", amount: rotund(LITRI_LA_PORNIRE * parte * BENZINA), cat: "materiale" },
    {
      label: `Chirie hală, ${HALA_MP} m², Botanica, contract pe ${HALA_CHIRIE_ANI} ani: ${numarEuro.format(HALA_CHIRIE_EURO)} € pe lună`,
      amount: CHIRIE_HALA,
      cat: "alte",
    },
    { label: "Energie electrică", amount: CURENT, cat: "alte" },
    { label: "Apă și canalizare", amount: 250, cat: "alte" },
    { label: "Ulei și piese", amount: rotund(2000 * parte), cat: "materiale" },
    { label: "Cagule de unică folosință, purtate sub cască", amount: 400, cat: "materiale" },
    { label: "Promovare", amount: 10000, cat: "alte" },
    { label: "Internet", amount: 300, cat: "alte" },
    { label: "Telefon", amount: 100, cat: "alte" },
    { label: "Asigurare de răspundere", amount: 800, cat: "alte" },
    { label: "Gunoi", amount: 300, cat: "alte" },
    { label: "Comision bancar", amount: 150, cat: "alte" },
  ]
}

export function lei(suma: number) {
  return `${numar.format(suma)} lei`
}

export function capitalPornire(count = KARTURI_LA_PORNIRE) {
  const fleet = count * leiDinEuro(UNIT_PRICE)
  const extra = necessities(count).reduce((sum, item) => sum + item.amount, 0)
  return fleet + extra
}

export function FleetCost() {
  return (
    <section id="cost" className="scroll-mt-14 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center text-[16px] font-medium text-link">Achiziție reală</p>
        <h2 className="mx-auto mt-3 max-w-[760px] text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
          Costul de pornire
        </h2>

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
        <p className="mt-4 text-center text-[17px]">
          <a
            href="https://secondhand-karting.co.uk/listing/105662/10x-2024-crg-centurion-gx270-kart-italy"
            className="text-link hover:underline"
          >
            Anunțul: 10 karturi CRG Centurion GX270, anul 2024
          </a>
        </p>

      </div>
    </section>
  )
}
