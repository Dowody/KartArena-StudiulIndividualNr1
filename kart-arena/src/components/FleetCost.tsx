import { useState } from "react"

const UNIT_PRICE = 3500
const AVAILABLE = 10

const NECESSITIES = [
  { label: "Bariere modulare și protecții", amount: 7000 },
  { label: "Echipamente de siguranță", amount: 2000 },
  { label: "Cronometrare și software", amount: 3500 },
  { label: "Podea pentru pistă", amount: 2500 },
  { label: "Iluminat", amount: 1500 },
  { label: "Ventilație", amount: 2000 },
  { label: "Stingătoare și echipament PSI", amount: 500 },
  { label: "Licențe, autorizații și avize", amount: 1000 },
]

const necessitiesTotal = NECESSITIES.reduce((sum, item) => sum + item.amount, 0)

const euro = new Intl.NumberFormat("ro-RO", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
})

export function FleetCost() {
  const [count, setCount] = useState(AVAILABLE)
  const fleet = count * UNIT_PRICE
  const total = fleet + necessitiesTotal

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
          Flota din calcul este un anunț real: 10 karturi CRG Centurion GX270, anul 2024. Sunt
          karturi pe benzină, recondiționate de fabrică, cu motor GX270 nou și anvelope MITAS noi.
        </p>

        <div className="mt-14 grid gap-3 md:grid-cols-[1.4fr_1fr]">
          <img
            src="/CRG%20Racing%20Kart%20Studio%20Showcase.png"
            alt="Kartul CRG Centurion GX270, negru cu roșu, cu motor Honda și scaun negru."
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
            secondhand-karting.co.uk — 10× 2024 CRG Centurion GX270
          </a>
        </p>

        <div className="mx-auto mt-3 grid max-w-[1100px] gap-3 rounded-[28px] bg-white p-8 sm:p-12 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="text-[14px] text-muted">Preț pe bucată, fără TVA</p>
            <p className="mt-1 text-[32px] font-semibold tracking-tight text-ink">
              {euro.format(UNIT_PRICE)}
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
              {euro.format(fleet)}
            </p>
            <p className="mt-2 text-[15px] text-muted">
              {count} × {euro.format(UNIT_PRICE)}
            </p>
          </div>

          <div className="border-t border-black/10 pt-8 md:col-span-2">
            <p className="text-[14px] text-muted">Necesar ca să deschizi pista</p>
            <ul className="mt-4">
              {NECESSITIES.map((item) => (
                <li
                  key={item.label}
                  className="flex items-baseline justify-between gap-6 border-t border-black/10 py-3 text-[17px]"
                >
                  <span>{item.label}</span>
                  <span className="shrink-0 font-semibold tracking-tight">
                    {euro.format(item.amount)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <p className="text-[14px] text-muted">Flotă + necesar</p>
              <p className="text-[40px] font-semibold tracking-tight text-ink sm:text-[56px]">
                {euro.format(total)}
              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-[680px] text-center text-[13px] leading-relaxed text-muted">
          Anunțul are {AVAILABLE} bucăți. Prețul nu include transportul; ridicarea este din Lonato
          del Garda, Italia. Celelalte sume sunt din planul de pornire și acoperă doar ce trebuie ca
          pista să funcționeze: protecție, cronometrare, podea, lumină, ventilație și avize. Lounge,
          arcade, automat de snack-uri, sunet, branding și promovare rămân pe mai târziu.{" "}
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
