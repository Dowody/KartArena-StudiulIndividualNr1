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

const COUNT = KARTURI_LA_PORNIRE
const sum = (rows: { amount: number }[]) => rows.reduce((total, row) => total + row.amount, 0)

/* Sarcina 5: personalul */
export const personal = ANGAJATI.map((om) => ({
  functia: om.rol,
  persoane: 1,
  brut: om.brut,
  cas: Math.round(om.brut * CAS),
}))
export const salariiBrut = personal.reduce((total, om) => total + om.brut, 0)
export const salariiCas = personal.reduce((total, om) => total + om.cas, 0)

/* Sarcina 8: capitalul necesar */
const lunar = cheltuieliLunare(COUNT)
const investitii = [
  { label: `Karturi CRG Centurion GX270, ${COUNT} bucăți`, amount: leiDinEuro(COUNT * UNIT_PRICE), cat: "utilaje" as Categorie },
  ...necessities(COUNT),
]

function grup(cat: Categorie) {
  const items = investitii.filter((item) => item.cat === cat)
  return { items, amount: sum(items) }
}

const alteInvestitii = grup("alte")
const alteLunare = lunar.filter((item) => item.cat === "alte")

export const capital = [
  { title: "Teren și hală (în loc de arendă și reparație)", ...grup("imobil") },
  { title: "Utilaje", ...grup("utilaje") },
  { title: "Mobilier", ...grup("mobilier") },
  { title: "Ustensile", ...grup("ustensile") },
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
export const DOBANDA_CREDIT = 24.49
export const propriiProcent = 30
export const proprii = Math.round((capitalTotal * propriiProcent) / 100 / 10_000) * 10_000
export const imprumut = capitalTotal - proprii

/* Sarcina 9: prognoza cheltuielilor */
// Prima trimestrială de 1.000 lei × 3 angajați = 1.000 lei pe lună, plus 5% din 8 evenimente de 2.500 lei.
export const PRIME_LUNAR = Math.round((1000 + 8 * 2500 * 0.05) * (1 + CAS))
export const dobandaAn = Math.round((imprumut * DOBANDA_CREDIT) / 100)
export const cheltuieli = [
  { label: `Salarii brute, ${personal.length} angajați`, lunar: salariiBrut },
  ...lunar.filter((item) => !item.label.includes(", net ")).map((item) => ({ label: item.label, lunar: item.amount })),
  { label: "Prime și bonusuri pentru angajați, cu CAS", lunar: PRIME_LUNAR },
  { label: `Dobânda la credit, ${DOBANDA_CREDIT.toString().replace(".", ",")}% pe an`, lunar: Math.round(dobandaAn / 12) },
].map((row) => ({ ...row, anual: row.lunar * 12 }))
export const cheltuieliLuna = cheltuieli.reduce((total, row) => total + row.lunar, 0)
export const cheltuieliAn = cheltuieli.reduce((total, row) => total + row.anual, 0)

/* Sarcina 10: prognoza veniturilor */
export const PRET_CURSA = 300
export const venituri = [
  { produs: "Cursă de karting, 10 minute", unitate: "curse", cantitate: 600, pret: PRET_CURSA },
  { produs: "Autosim, 15 minute", unitate: "sesiuni", cantitate: 300, pret: 80 },
  { produs: "Eveniment de grup: 8 persoane, o cursă fiecare și o oră în zona de relaxare", unitate: "evenimente", cantitate: 8, pret: 2500 },
  { produs: "Tichet cadou pentru o cursă", unitate: "tichete", cantitate: 40, pret: PRET_CURSA },
].map((row) => ({ ...row, venitLunar: row.cantitate * row.pret, venitAnual: row.cantitate * row.pret * 12 }))
export const venitLuna = venituri.reduce((total, row) => total + row.venitLunar, 0)
export const venitAn = venitLuna * 12

/* Sarcina 11: rezultatul financiar */
export const IMPOZIT_PROFIT = 12
export const profitAn = venitAn - cheltuieliAn
export const impozitAn = profitAn > 0 ? Math.round((profitAn * IMPOZIT_PROFIT) / 100) : 0
export const profitNetAn = profitAn - impozitAn
