"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  ["/", "Home"], ["/announcements", "Announcements"], ["/meetings", "Meetings"],
  ["/events", "Events"], ["/volunteer", "Volunteer"], ["/about", "About"],
];

export function Header({ school }: { school: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-line bg-surface">
      <div className="site-width flex flex-wrap items-center justify-between gap-x-6 py-4">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">N</span>
          <span className="grid text-sm font-bold leading-tight">
            NTHS Chapter
            <span className="mt-1 font-medium text-muted">{school}</span>
          </span>
        </Link>
        <button type="button" className="menu-button md:hidden" aria-expanded={open}
          aria-controls="site-nav" onClick={() => setOpen(!open)}>
          <span aria-hidden="true" className="text-lg leading-none">☰</span> Menu
        </button>
        <nav id="site-nav" aria-label="Main navigation"
          className={`${open ? "block" : "hidden"} w-full pt-4 md:block md:w-auto md:pt-0`}
          onKeyDown={(event) => {
            if (event.key === "Escape" && open) {
              setOpen(false);
              document.querySelector<HTMLButtonElement>(".menu-button")?.focus();
            }
          }}>
          <ul className="flex flex-col gap-1 md:flex-row">
            {links.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="nav-link" aria-current={pathname === href ? "page" : undefined}
                  onClick={() => setOpen(false)}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
