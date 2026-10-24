export const links = [
  { href: "#ideea", label: "Ideea" },
  { href: "#serviciu", label: "Serviciu" },
  { href: "#cost", label: "Cost" },
  { href: "#finantare", label: "Bani" },
  { href: "#localitate", label: "Localitate" },
  { href: "#swot", label: "Analiză" },
]

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/90 text-white backdrop-blur-2xl">
      <nav
        aria-label="Secțiuni"
        className="mx-auto flex h-12 max-w-[1100px] items-center justify-between gap-3 px-4 sm:px-5"
      >
        <a href="#top" className="text-[14px] font-semibold tracking-tight">
          Kart Arena
        </a>
        <ul className="flex items-center gap-3 text-[11px] sm:gap-6 sm:text-[12px]">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[#d2d2d7] transition-colors hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
