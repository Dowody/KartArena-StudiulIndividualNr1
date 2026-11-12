import { CAMPANIE_DESCHIDERE } from "./FleetCost"
import { CULORI_BARA } from "./SplitBar"

// Linkul formularului Google Forms cu chestionarul.
const FORMULAR_URL = "https://forms.gle/DNrEeHWK9Gb9QpnD8"

const promovare = [
  {
    title: "Rețele sociale",
    cost: 6000,
    text: "Filmăm cursele, timpii record și reacțiile clienților și le punem pe Instagram și TikTok. Plătim reclamă pentru tinerii din Chișinău între 16 și 35 de ani. Este canalul unde publicul nostru stă zilnic, iar un video cu karturi se vede bine.",
  },
  {
    title: "Ziua deschiderii și clasamentul lunii",
    cost: 2500,
    text: "La deschidere facem o zi cu reducere de 50% și un concurs. Apoi, în fiecare lună, cel mai bun timp primește o cursă gratuită și apare pe pagina noastră. Clienții revin ca să își bată recordul și îi aduc pe prieteni.",
  },
  {
    title: "Parteneriate cu școli și companii",
    cost: 1500,
    text: "Mergem la liceele, colegiile și firmele din Botanica cu oferta de evenimente de grup și cu o reducere pentru elevi. Pe Google Maps adăugăm poze și cerem recenzii. Un singur parteneriat aduce un grup întreg, nu un client.",
  },
]

const numar = new Intl.NumberFormat("ro-RO", { maximumFractionDigits: 0 })
const bugetPromovare = promovare.reduce((total, item) => total + item.cost, 0)
const culori = CULORI_BARA

export function Market() {
  return (
    <section id="piata" className="scroll-mt-14 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center text-[16px] font-medium text-link">Cercetarea pieței</p>
        <h2 className="mx-auto mt-3 max-w-[860px] text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
          Chestionar pentru clienți
        </h2>
        <div className="mt-10 text-center">
          <a
            href={FORMULAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 glass-dark glass-hover rounded-full px-7 py-3.5 text-[17px] font-medium text-white"
          >
            Completează chestionarul
            <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M4 2.5h5.5V8M9.5 2.5 2.5 9.5" />
            </svg>
          </a>
        </div>

        <div id="promovare" className="scroll-mt-14">
          <p className="mt-32 text-center text-[16px] font-medium text-link">Promovarea</p>
          <h2 className="mx-auto mt-3 max-w-[860px] text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
            Cum ne facem cunoscuți
          </h2>
          <div className="mx-auto mt-14 max-w-[820px]">
            <div className="flex items-baseline justify-between gap-6">
              <p className="text-[17px] text-muted">Bugetul de promovare</p>
              <p className="text-[28px] font-semibold tracking-tight text-ink">
                {numar.format(bugetPromovare)} lei pe lună
              </p>
            </div>
            <div className="mt-4 flex h-3 gap-1 overflow-hidden rounded-full" aria-hidden="true">
              {promovare.map((item, i) => (
                <span
                  key={item.title}
                  className={`${culori[i]} first:rounded-l-full last:rounded-r-full`}
                  style={{ width: `${(item.cost / bugetPromovare) * 100}%` }}
                />
              ))}
            </div>

            <p className="mt-4 text-[17px] leading-relaxed text-muted">
              Înainte de deschidere facem o campanie de {numar.format(CAMPANIE_DESCHIDERE)} lei, o singură
              dată: reclamă pe Instagram și TikTok, bloggeri din Chișinău invitați pe pistă și ziua
              deschiderii cu reducere și concurs.
            </p>

            <ul className="mt-10">
              {promovare.map((item, i) => (
                <li key={item.title} className="border-t border-black/[0.08] py-6">
                  <div className="flex items-baseline justify-between gap-6">
                    <h3 className="flex items-center gap-3 text-[22px] font-semibold tracking-tight text-ink">
                      <span className={`size-3 shrink-0 rounded-full ${culori[i]}`} aria-hidden="true" />
                      {item.title}
                    </h3>
                    <p className="text-[19px] font-semibold tracking-tight whitespace-nowrap text-ink">
                      {numar.format(item.cost)} lei
                    </p>
                  </div>
                  <p className="mt-2 pl-6 text-[17px] leading-relaxed text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
