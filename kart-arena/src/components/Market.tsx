// Linkul formularului Google Forms cu chestionarul.
const FORMULAR_URL = "https://forms.gle/INLOCUIESTE-CU-LINKUL-TAU"

const promovare = [
  {
    title: "Rețele sociale",
    cost: "1.200 lei pe lună",
    text: "Filmăm cursele, timpii record și reacțiile clienților și le punem pe Instagram și TikTok. Plătim reclamă pentru tinerii din Chișinău între 16 și 35 de ani. Este canalul unde publicul nostru stă zilnic, iar un video cu karturi se vede bine.",
  },
  {
    title: "Ziua deschiderii și clasamentul lunii",
    cost: "500 lei pe lună",
    text: "La deschidere facem o zi cu reducere de 50% și un concurs. Apoi, în fiecare lună, cel mai bun timp primește o cursă gratuită și apare pe pagina noastră. Clienții revin ca să își bată recordul și îi aduc pe prieteni.",
  },
  {
    title: "Parteneriate cu școli și companii",
    cost: "300 lei pe lună",
    text: "Mergem la liceele, colegiile și firmele din Botanica cu oferta de evenimente de grup și cu o reducere pentru elevi. Pe Google Maps adăugăm poze și cerem recenzii. Un singur parteneriat aduce un grup întreg, nu un client.",
  },
]

export function Market() {
  return (
    <section id="piata" className="scroll-mt-14 bg-white px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <p className="text-center text-[14px] text-muted">Cercetarea pieței</p>
        <h2 className="mx-auto mt-3 max-w-[860px] text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
          Chestionar pentru clienți
        </h2>
        <p className="mx-auto mt-6 max-w-[680px] text-center text-[19px] leading-relaxed text-ink">
          Scopul este să aflăm ce preferă clienții: cât ar plăti, cu cine ar veni și ce îi interesează
          în afară de cursă. Chestionarul are 12 întrebări și durează cam două minute.
        </p>
        <div className="mt-10 text-center">
          <a
            href={FORMULAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-[17px] font-medium text-white transition-colors hover:bg-black"
          >
            Completează chestionarul
            <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M4 2.5h5.5V8M9.5 2.5 2.5 9.5" />
            </svg>
          </a>
          <p className="mt-3 text-[14px] text-muted">Se deschide în Google Forms, într-o filă nouă.</p>
        </div>

        <div id="promovare" className="scroll-mt-14">
          <p className="mt-32 text-center text-[14px] text-muted">Promovarea</p>
          <h2 className="mx-auto mt-3 max-w-[860px] text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
            Cum ne facem cunoscuți
          </h2>
          <p className="mx-auto mt-6 max-w-[680px] text-center text-[19px] leading-relaxed text-ink">
            Avem 2.000 de lei pe lună pentru promovare, împărțiți între trei metode.
          </p>
          <div className="mt-14 grid gap-3 md:grid-cols-3">
            {promovare.map((item, i) => (
              <article
                key={item.title}
                className={`rounded-[28px] px-8 py-10 ${i === 0 ? "bg-black text-white" : "bg-canvas text-ink"}`}
              >
                <span className={`text-[14px] ${i === 0 ? "text-[#86868b]" : "text-muted"}`}>0{i + 1}</span>
                <h3 className="mt-2 text-[28px] leading-tight font-semibold tracking-tight">{item.title}</h3>
                <p className={`mt-1 text-[14px] ${i === 0 ? "text-[#86868b]" : "text-muted"}`}>{item.cost}</p>
                <p className={`mt-6 text-[17px] leading-relaxed ${i === 0 ? "text-[#d2d2d7]" : "text-ink"}`}>
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
