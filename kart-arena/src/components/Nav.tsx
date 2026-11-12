import { useEffect, useState } from "react"

export const links = [
  { href: "#ideea", label: "Ideea" },
  { href: "#serviciu", label: "Serviciu" },
  { href: "#localitate", label: "Localitate" },
  { href: "#swot", label: "Analiză" },
  { href: "#echipa", label: "Echipa" },
  { href: "#cost", label: "Cost" },
  { href: "#finantare", label: "Bani" },
  { href: "#prognoza", label: "Profit" },
  { href: "#piata", label: "Piața" },
];

export function Nav() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > 100) { // if scroll down and past initial offset
        setShowNavbar(false);
      } else { // if scroll up
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [lastScrollY]);

  return (
    <header className={`fixed inset-x-0 top-3 z-50 px-3 text-white transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${showNavbar ? 'translate-y-0' : '-translate-y-[150%]'}`}>
      <nav
        aria-label="Secțiuni"
        className="glass-dark mx-auto flex h-14 max-w-[1100px] items-center justify-between gap-4 rounded-full px-5 sm:px-7"
      >
        <a href="#top" className="shrink-0 text-lg font-semibold tracking-tight">
          Kart Arena
        </a>
        <ul className="flex min-w-0 items-center gap-4 overflow-x-auto text-[17px] whitespace-nowrap [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden">
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
  );
}
