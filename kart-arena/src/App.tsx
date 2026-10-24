import { FleetCost } from "./components/FleetCost"
import { links, Nav } from "./components/Nav"

const idea = [
  { label: "Denumire", value: "„Kart Arena” S.R.L." },
  { label: "Fondatori", value: "Borș Bogdan și Covali Alexandru" },
  {
    label: "Amplasare",
    value: "Chișinău, sectorul Botanica, într-un spațiu încăpător, ușor de găsit și cu parcare.",
  },
  {
    label: "Scopul",
    value:
      "Să oferim tinerilor și adulților un loc unde se pot distra, concura cu prietenii și încerca kartingul în siguranță.",
  },
]

const description = [
  {
    label: "Calitatea",
    value: "Karturi electrice moderne, echipamente de protecție și o pistă amenajată pentru curse sigure.",
  },
  {
    label: "Asortimentul",
    value: "Curse de 8–10 minute, întreceri între prieteni, evenimente de grup și jocuri arcade.",
  },
  {
    label: "Destinația",
    value: "Pentru tineri, adulți, grupuri de prieteni și pasionați de mașini.",
  },
  {
    label: "Ambalajul",
    value: "Fiind un serviciu, vom oferi bilete, vouchere cadou și pachete pentru grupuri.",
  },
]

const steps = [
  "Clientul rezervă o cursă.",
  "Primește casca și instrucțiunile de siguranță.",
  "Intră pe pistă.",
  "La final își poate vedea timpul obținut.",
]

const swot = [
  {
    title: "Puncte tari",
    note: "Strengths",
    dark: true,
    points: [
      "Karturi electrice, fără fum.",
      "Activitate distractivă în orice anotimp.",
      "Posibilitatea de a organiza competiții.",
    ],
  },
  {
    title: "Puncte slabe",
    note: "Weaknesses",
    dark: false,
    points: [
      "Investiție mare la început.",
      "Cheltuieli pentru chirie și întreținere.",
      "Afacerea nu este încă cunoscută.",
    ],
  },
  {
    title: "Oportunități",
    note: "Opportunities",
    dark: false,
    points: [
      "Organizarea de evenimente pentru grupuri.",
      "Colaborări cu școli și companii.",
      "Adăugarea unor jocuri și simulatoare noi.",
    ],
  },
  {
    title: "Riscuri",
    note: "Threats",
    dark: true,
    points: [
      "Creșterea costurilor.",
      "Apariția altor centre de karting.",
      "Număr mai mic de clienți în anumite perioade.",
    ],
  },
]

function Specs({ items }: { items: { label: string; value: string }[] }) {
  return (
    <dl className="mx-auto mt-14 max-w-[820px]">
      {items.map((item) => (
        <div
          key={item.label}
          className="grid gap-1 border-t border-black/10 py-6 sm:grid-cols-[180px_1fr] sm:gap-8"
        >
          <dt className="text-[14px] text-muted">{item.label}</dt>
          <dd className="text-[19px] leading-snug tracking-tight text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function App() {
  return (
    <>
      <a
        href="#continut"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Sari la conținut
      </a>
      <Nav />
      <main id="continut">
        <section
          id="top"
          className="relative flex min-h-[100svh] scroll-mt-14 flex-col items-center justify-center overflow-hidden bg-black px-6 text-center text-white"
        >
          <img
            src="/Modern%20Indoor%20Go-Kart%20Arena.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80" />
          <div className="relative">
            <h1 className="max-w-[920px] text-[56px] leading-none font-semibold tracking-[-0.03em] sm:text-[80px] lg:text-[96px]">
              Kart Arena S.R.L.
            </h1>
            <p className="mx-auto mt-5 max-w-[640px] text-[19px] leading-snug text-[#d2d2d7] sm:text-[24px]">
              O pistă de curse și o zonă de relaxare. Chișinău, sectorul Botanica.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[19px]">
              <a href="#ideea" className="text-link-on-dark hover:underline">
                Ideea de afacere
              </a>
              <a href="#serviciu" className="text-link-on-dark hover:underline">
                Produsul
              </a>
            </div>
          </div>
        </section>

        <section id="ideea" className="scroll-mt-14 bg-canvas px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-[820px] text-center">
            <h2 className="text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
              Ideea de afacere
            </h2>
            <p className="mt-6 text-[19px] leading-relaxed text-ink sm:text-[21px]">
              Deschiderea unui centru de karting electric indoor, Kart Arena, cu o pistă de curse
              și o zonă de relaxare.
            </p>
          </div>
          <div className="mx-auto mt-20 max-w-[820px]">
            <h3 className="text-center text-[28px] font-semibold tracking-tight text-ink sm:text-[32px]">
              Descrierea ideii de afacere
            </h3>
            <Specs items={idea} />
          </div>
        </section>

        <section id="serviciu" className="scroll-mt-14 bg-black px-6 py-24 text-center text-white sm:py-32">
          <p className="text-[14px] text-[#86868b]">Prezentarea produsului / serviciului</p>
          <h2 className="mx-auto mt-3 max-w-[860px] text-[40px] leading-[1.07] font-semibold tracking-tight sm:text-[56px]">
            Curse de karting electric indoor, jocuri arcade și zonă de relaxare.
          </h2>
          <figure className="mx-auto mt-14 max-w-[1100px]">
            <img
              src="/track-concept.jpg"
              alt="Conceptul pistei: circuit indoor cu bariere de protecție, două karturi electrice și ecranul de rezultate."
              className="w-full rounded-[28px]"
            />
          </figure>
          <p className="mx-auto mt-8 max-w-[640px] text-[15px] leading-relaxed text-[#86868b]">
            O pistă de karting în interior, cu bariere de protecție, karturi electrice și un ecran
            care arată rezultatele curselor.
          </p>
        </section>

        <section id="descriere" className="scroll-mt-14 bg-white px-6 py-24 sm:py-32">
          <h2 className="text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
            Descrierea produsului
          </h2>
          <Specs items={description} />
          <div className="mx-auto mt-8 max-w-[820px] border-t border-black/10 pt-10">
            <h3 className="text-[14px] text-muted">Procesul tehnologic</h3>
            <p className="mt-3 max-w-[640px] text-[19px] leading-snug text-ink">
              Clientul rezervă o cursă, primește casca și instrucțiunile de siguranță, apoi intră
              pe pistă. La final își poate vedea timpul obținut.
            </p>
            <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <li key={step}>
                  <span className="text-[13px] text-muted">0{index + 1}</span>
                  <p className="mt-2 text-[17px] leading-snug text-ink">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <FleetCost />

        <section id="localitate" className="scroll-mt-14 bg-white px-6 py-24 text-center sm:py-36">
          <h2 className="mx-auto max-w-[860px] text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
            De ce ideea este bună pentru localitate
          </h2>
          <p className="mx-auto mt-8 max-w-[680px] text-[21px] leading-snug text-ink sm:text-[28px]">
            În Chișinău sunt mulți tineri care caută activități noi. Un centru de karting indoor ar
            fi o opțiune de distracție în orice anotimp.
          </p>
        </section>

        <section id="swot" className="scroll-mt-14 bg-[#e8e8ed] px-3 pt-20 pb-3 sm:pt-28">
          <h2 className="px-4 pb-12 text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
            Analiza SWOT
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {swot.map((block) => (
              <article
                key={block.title}
                className={`min-h-[320px] rounded-[28px] px-8 py-12 sm:px-12 ${
                  block.dark ? "bg-black text-white" : "bg-white text-ink"
                }`}
              >
                <h3 className="text-[32px] font-semibold tracking-tight">{block.title}</h3>
                <p className={`mt-1 text-[14px] ${block.dark ? "text-[#86868b]" : "text-muted"}`}>
                  {block.note}
                </p>
                <ul className="mt-8 space-y-3 text-[17px] leading-snug">
                  {block.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-black px-6 pt-20 pb-10 text-white">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[32px] font-semibold tracking-tight">Kart Arena</p>
              <p className="mt-2 text-[17px] text-[#86868b]">Chișinău, sectorul Botanica</p>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-3 text-[14px]">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[#d2d2d7] hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-14 border-t border-white/15 pt-6 text-[12px] text-[#86868b]">
            „Kart Arena” S.R.L. · Fondatori: Borș Bogdan și Covali Alexandru
          </p>
        </div>
      </footer>
    </>
  )
}
