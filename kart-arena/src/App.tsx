import { useEffect, useRef } from "react"
import { Finance } from "./components/Finance"
import { FleetCost } from "./components/FleetCost"
import { Forecast } from "./components/Forecast"
import { Market } from "./components/Market"
import { Team } from "./components/Team"
import { links } from "./components/Nav"

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
    value: "Karturi CRG din 2024, recondiționate de fabrică, echipamente de protecție și o pistă amenajată pentru curse sigure.",
  },
  {
    label: "Asortimentul",
    value: "Curse de 8–10 minute, întreceri între prieteni, evenimente de grup și autosim.",
  },
  {
    label: "Destinația",
    value: "Pentru tineri, adulți, grupuri de prieteni și pasionați de mașini.",
  },
  {
    label: "Ambalajul",
    value: "Fiind un serviciu, vom oferi bilete, tichete cadou și pachete pentru grupuri.",
  },
]

const productPhotos = [
  {
    src: "section 1/rpm-race-racing-photo-2025-1.webp",
    alt: "Cursă de karting 2025",
  },
  {
    src: "section 1/423166-1-worlds-largest-indoor-multi-level-karting-track-edison.jpg",
    alt: "Exteriorul unui centru modern de karting",
  },
  {
    src: "section 1/How-to-design-a-go-kart-track-layout-without-flow-breaking-corners.jpg.webp",
    alt: "Layout pistă de karting",
  },
  {
    src: "section 1/sim-racing.webp",
    alt: "Autosim",
  },
  {
    src: "section 1/lounge-zone.jpg.png",
    alt: "Zona lounge",
  },
  {
    src: "section 1/dsc7293-enhanced-nr-scaled.jpg.webp",
    alt: "Piloți concurând pe o pistă interioară",
  },
  {
    src: "section 1/K1-Speed-Indoor-Go-Kart-Racing-scaled.jpg",
    alt: "Karturi în timpul unei curse",
  },
  {
    src: "section 1/SuperleggeroKart-1024x576.jpg",
    alt: "Pilot echipat într-un kart",
  },
]

const steps = [
  { title: "Rezervare", text: "Clientul rezervă o cursă." },
  { title: "Echipare", text: "Primește casca și instrucțiunile de siguranță." },
  { title: "Pe pistă", text: "Intră pe pistă." },
  { title: "Rezultat", text: "La final își poate vedea timpul obținut." },
]

const swot = [
  {
    title: "Puncte tari",
    note: "Intern · ce ne ajută",
    points: [
      "Karturi CRG din 2024, recondiționate de fabrică.",
      "Activitate distractivă în orice anotimp.",
      "Posibilitatea de a organiza competiții.",
    ],
  },
  {
    title: "Puncte slabe",
    note: "Intern · ce ne lipsește",
    points: [
      "Investiție mare la început.",
      "Cheltuieli lunare pentru benzină, salarii și energie.",
      "Afacerea nu este încă cunoscută.",
    ],
  },
  {
    title: "Oportunități",
    note: "Extern · ce putem folosi",
    points: [
      "Organizarea de evenimente pentru grupuri.",
      "Colaborări cu școli și companii.",
      "Adăugarea unor autosimuri noi.",
    ],
  },
  {
    title: "Riscuri",
    note: "Extern · ce ne poate afecta",
    points: [
      "Creșterea costurilor.",
      "Apariția altor centre de karting.",
      "Număr mai mic de clienți în anumite perioade.",
    ],
  },
]

function PhotoSlider() {
  const trackRef = useRef<HTMLDivElement>(null)
  const current = useRef(0)
  const paused = useRef(false)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const scrollTo = (idx: number) => {
      current.current = idx
      const card = track.children[idx] as HTMLElement
      if (!card) return
      // Scroll only the track strip — never the page
      const offset = card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2
      track.scrollTo({ left: offset, behavior: "smooth" })
    }

    const timer = setInterval(() => {
      if (!paused.current) {
        scrollTo((current.current + 1) % productPhotos.length)
      }
    }, 3000)

    let resumeTimer: ReturnType<typeof setTimeout>
    const onInteract = () => {
      paused.current = true
      clearTimeout(resumeTimer)
      resumeTimer = setTimeout(() => { paused.current = false }, 6000)
    }

    track.addEventListener("pointerdown", onInteract, { passive: true })
    track.addEventListener("wheel", onInteract, { passive: true })

    return () => {
      clearInterval(timer)
      clearTimeout(resumeTimer)
      track.removeEventListener("pointerdown", onInteract)
      track.removeEventListener("wheel", onInteract)
    }
  }, [])

  return (
    <div className="-mx-6 mt-14">
      <div
        ref={trackRef}
        role="list"
        aria-label="Galerie Kart Arena"
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[7vw] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {productPhotos.map((photo, i) => (
          <figure
            key={photo.src}
            role="listitem"
            className="w-[86vw] shrink-0 snap-center overflow-hidden rounded-xl bg-[#111]"
          >
            <img
              src={`${import.meta.env.BASE_URL}${encodeURI(photo.src)}`}
              alt={photo.alt}
              loading={i === 0 ? "eager" : "lazy"}
              className="h-[65vh] w-full object-cover"
            />
          </figure>
        ))}
      </div>
    </div>
  )
}

function Specs({
  items,
  compact = false,
}: {
  items: { label: string; value: string }[]
  compact?: boolean
}) {
  return (
    <dl className={`mx-auto ${compact ? "mt-10 max-w-[1040px] lg:mt-8" : "mt-14 max-w-[820px]"}`}>
      {items.map((item) => (
        <div
          key={item.label}
          className={`grid gap-1 border-t border-black/10 sm:grid-cols-[180px_1fr] sm:gap-8 ${
            compact ? "py-5 lg:py-3.5" : "py-6"
          }`}
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
      <main id="continut">
        <section
          id="top"
          className="relative flex min-h-[100svh] scroll-mt-14 flex-col items-center justify-center overflow-hidden bg-black px-6 text-center text-white"
        >
          <video
            src={`${import.meta.env.BASE_URL}${encodeURI("TKI Torino Kart Indoor Training Session Cinematic 4K.mp4")}`}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/80" />
          <div className="relative">
            <h1 className="max-w-[920px] text-[56px] leading-none font-semibold tracking-[-0.03em] sm:text-[80px] lg:text-[96px]">
              Kart Arena S.R.L.
            </h1>
            <p className="mx-auto mt-5 max-w-[640px] text-[19px] leading-snug text-[#d2d2d7] sm:text-[24px]">
              O pistă de curse și o zonă de relaxare. Chișinău
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
              Deschiderea unui centru de karting în interior, Kart Arena, cu o pistă de curse
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
          <p className="text-[14px] text-[#86868b]">Prezentarea serviciului</p>
          <h2 className="mx-auto mt-3 max-w-[860px] text-[40px] leading-[1.07] font-semibold tracking-tight sm:text-[56px]">
            Curse de karting în interior, autosim și zonă de relaxare.
          </h2>
          <PhotoSlider />
        </section>

        <section
          id="descriere"
          className="flex scroll-mt-14 flex-col justify-center bg-white px-6 py-24 sm:py-32 lg:min-h-svh lg:pt-20 lg:pb-12"
        >
          <h2 className="text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
            Descrierea produsului
          </h2>
          <Specs items={description} compact />
          <div className="mx-auto mt-8 w-full max-w-[1040px] border-t border-black/10 pt-10 lg:mt-4 lg:pt-8">
            <p className="text-[14px] text-muted">Procesul tehnologic</p>
            <h3 className="mt-2 text-[28px] font-semibold tracking-tight text-ink sm:text-[32px]">
              Cum decurge o vizită
            </h3>
            <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:mt-6 lg:grid-cols-4">
              {steps.map((step, index) => (
                <li key={step.title} className="rounded-[28px] bg-canvas px-8 py-8">
                  <span className="text-[14px] text-muted">0{index + 1}</span>
                  <h4 className="mt-2 text-[22px] font-semibold tracking-tight text-ink">{step.title}</h4>
                  <p className="mt-3 text-[17px] leading-relaxed text-ink">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="localitate" className="scroll-mt-14 bg-canvas px-6 py-24 text-center sm:py-36">
          <h2 className="mx-auto max-w-[860px] text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
            De ce ideea este bună pentru localitate
          </h2>
          <p className="mx-auto mt-8 max-w-[680px] text-[21px] leading-snug text-ink sm:text-[28px]">
            În Chișinău sunt mulți tineri care caută activități noi. Un centru de karting în interior ar
            fi o opțiune de distracție în orice anotimp.
          </p>
        </section>

        <section id="swot" className="scroll-mt-14 bg-white px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-[1100px]">
            <p className="text-center text-[14px] text-muted">Analiza SWOT</p>
            <h2 className="mx-auto mt-3 max-w-[860px] text-center text-[40px] leading-[1.07] font-semibold tracking-tight text-ink sm:text-[56px]">
              Analiza afacerii
            </h2>
            <div className="mt-14 grid gap-3 md:grid-cols-2">
              {swot.map((block) => (
                <article key={block.title} className="rounded-[28px] bg-canvas px-8 py-10 sm:px-12">
                  <p className="text-[14px] text-muted">{block.note}</p>
                  <h3 className="mt-1 text-[28px] font-semibold tracking-tight text-ink">{block.title}</h3>
                  <ul className="mt-6 space-y-3 text-[17px] leading-snug text-ink">
                    {block.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
        <Team />
        <FleetCost />
        <Finance />
        <Forecast />
        <Market />
      </main>

      <footer className="bg-black px-6 pt-20 pb-10 text-white">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[32px] font-semibold tracking-tight">Kart Arena</p>
              <p className="mt-2 text-[17px] text-[#86868b]">Chișinău</p>
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
