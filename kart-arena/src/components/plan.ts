import {
  ANGAJATI,
  CAS,
  cheltuieliLunare,
  KARTURI_LA_PORNIRE,
  leiDinEuro,
  necessities,
  UNIT_PRICE,
  type Categorie,
} from "./FleetCost"

const numar = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 })
const COUNT = KARTURI_LA_PORNIRE
const sum = (rows: { amount: number }[]) => rows.reduce((total, row) => total + row.amount, 0)

/* Sarcina 5: personalul */
// brut și cas sunt pentru toate persoanele de pe funcție; brutPersoana este pentru una singură
export const personal = ANGAJATI.map((om) => ({
  functia: om.rol,
  persoane: om.persoane,
  brutPersoana: om.brut,
  brut: om.brut * om.persoane,
  cas: Math.round(om.brut * om.persoane * CAS),
}))
export const nrAngajati = personal.reduce((total, om) => total + om.persoane, 0)
export const salariiBrut = personal.reduce((total, om) => total + om.brut, 0)
export const salariiCas = personal.reduce((total, om) => total + om.cas, 0)

/* Sarcina 8: capitalul necesar */
const lunar = cheltuieliLunare(COUNT)
const investitii = [
  { label: `Karturi CRG Centurion GX270, ${COUNT} bucăți × ${numar.format(leiDinEuro(UNIT_PRICE))} lei`, amount: COUNT * leiDinEuro(UNIT_PRICE), cat: "utilaje" as Categorie },
  ...necessities(COUNT),
]

function grup(cat: Categorie) {
  const items = investitii.filter((item) => item.cat === cat)
  return { items, amount: sum(items) }
}

const alteInvestitii = grup("alte")
const esteChirie = (item: { label: string }) => item.label.startsWith("Chirie hală")
const chirieLunara = lunar.filter(esteChirie)
const alteLunare = lunar.filter((item) => item.cat === "alte" && !esteChirie(item))

export const capital = [
  { title: "Utilaje", ...grup("utilaje") },
  { title: "Mobilier", ...grup("mobilier") },
  { title: "Echipament", ...grup("ustensile") },
  {
    title: "Cheltuieli cu salarizarea (+CAS), prima lună",
    items: [],
    amount: sum(lunar.filter((item) => item.cat === "salarii")),
  },
  {
    title: "Materie primă și materiale, prima lună",
    items: lunar.filter((item) => item.cat === "materiale"),
    amount: sum(lunar.filter((item) => item.cat === "materiale")),
  },
  {
    title: "Chiria halei, prima lună",
    items: [],
    amount: sum(chirieLunara),
  },
  {
    title: "Alte cheltuieli",
    items: [
      ...alteInvestitii.items,
      { label: "Cheltuieli curente din prima lună: curent, apă, promovare și altele", amount: sum(alteLunare) },
    ],
    amount: alteInvestitii.amount + sum(alteLunare),
  },
]
export const capitalTotal = sum(capital)

/* Sursele de finanțare */
// Microinvest: dobânda fixă este între 14,5% și 50% pe an; negociem capătul de jos cu planul de afaceri.
export const DOBANDA_CREDIT = 14.5
export const propriiProcent = 30
export const proprii = Math.round((capitalTotal * propriiProcent) / 100 / 10_000) * 10_000
export const imprumut = capitalTotal - proprii

// Creditul pentru active fixe (karturi și utilaje): Microinvest dă până la 10 ani.
// Rată lunară egală (anuitate): dobânda scade în timp, partea din credit crește.
export const TERMEN_CREDIT_ANI = 5
const dobandaLunara = DOBANDA_CREDIT / 100 / 12
const nrRate = TERMEN_CREDIT_ANI * 12
export const rataLunara = Math.round((imprumut * dobandaLunara) / (1 - (1 + dobandaLunara) ** -nrRate))
export const totalPlatitCredit = rataLunara * nrRate

/* Sarcina 9: prognoza cheltuielilor */
// grup = categoria din bara de deasupra tabelului
const grupCheltuiala = (item: { label: string; cat: string }) =>
  item.cat === "salarii"
    ? "Salarii și CAS"
    : item.cat === "materiale"
      ? "Benzină și materiale"
      : item.label.startsWith("Chirie hală")
        ? "Chiria halei"
        : "Alte cheltuieli"
export const cheltuieli = [
  { label: `Salarii brute, ${nrAngajati} angajați`, lunar: salariiBrut, grup: "Salarii și CAS" },
  ...lunar
    .filter((item) => !item.label.includes(", net "))
    .map((item) => ({ label: item.label, lunar: item.amount, grup: grupCheltuiala(item) })),
  // Rata întreagă: dobânda plus partea care întoarce creditul.
  {
    label: `Rata creditului, ${TERMEN_CREDIT_ANI} ani, ${DOBANDA_CREDIT.toString().replace(".", ",")}% pe an: dobândă și credit`,
    lunar: rataLunara,
    grup: "Rata creditului",
  },
].map((row) => ({ ...row, anual: row.lunar * 12 }))
const GRUPURI = ["Salarii și CAS", "Chiria halei", "Rata creditului", "Benzină și materiale", "Alte cheltuieli"]
export const cheltuieliPeGrupuri = GRUPURI.map((grup) => ({
  label: grup,
  value: cheltuieli.filter((row) => row.grup === grup).reduce((total, row) => total + row.lunar, 0),
}))
export const cheltuieliLuna = cheltuieli.reduce((total, row) => total + row.lunar, 0)
export const cheltuieliAn = cheltuieli.reduce((total, row) => total + row.anual, 0)

/* Sarcina 10: prognoza veniturilor */
export const PRET_CURSA = 350
export const venituri = [
  { produs: "Cursă de karting, 10 minute", scurt: "Curse de karting", unitate: "curse", cantitate: 600, pret: PRET_CURSA },
  { produs: "Autosim, o oră", scurt: "Autosim", unitate: "sesiuni", cantitate: 300, pret: 240 },
  { produs: "Eveniment de grup: 8 persoane, o cursă fiecare și o oră în zona de relaxare", scurt: "Evenimente de grup", unitate: "evenimente", cantitate: 8, pret: 2500 },
  { produs: "Tichet cadou pentru o cursă", scurt: "Tichete cadou", unitate: "tichete", cantitate: 40, pret: PRET_CURSA },
].map((row) => ({ ...row, venitLunar: row.cantitate * row.pret, venitAnual: row.cantitate * row.pret * 12 }))
export const venitLuna = venituri.reduce((total, row) => total + row.venitLunar, 0)
export const venitAn = venitLuna * 12

/* Sarcina 11: rezultatul financiar */
export const IMPOZIT_PROFIT = 12
export const profitAn = venitAn - cheltuieliAn
export const impozitAn = profitAn > 0 ? Math.round((profitAn * IMPOZIT_PROFIT) / 100) : 0
export const profitNetAn = profitAn - impozitAn
