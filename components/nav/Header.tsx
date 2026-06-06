"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { site } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Desktop dropdown + mobile accordion: track the open group by label.
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu and any open dropdown on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setOpenMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-night/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="container-x flex h-16 items-center justify-between gap-4"
      >
        <Link
          href="/#top"
          className="group flex items-center gap-2.5"
          aria-label="Matt Martelli — home"
        >
          <Image
            src="/brand/matt-mm-monogram-primary.svg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
          <span className="font-display text-sm font-semibold tracking-tight">
            Matt Martelli
          </span>
        </Link>

        {/* Desktop dropdowns */}
        <ul className="hidden items-center gap-1 lg:flex">
          {site.nav.groups.map((g) => {
            const menuOpen = openMenu === g.label;
            return (
              <li
                key={g.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(g.label)}
                onMouseLeave={() =>
                  setOpenMenu((m) => (m === g.label ? null : m))
                }
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  onClick={() => setOpenMenu(menuOpen ? null : g.label)}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm text-ink-muted transition-colors hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60"
                >
                  {g.label}
                  <ChevronDown
                    size={14}
                    aria-hidden
                    className={`transition-transform ${
                      menuOpen ? "rotate-180 text-accent-cyan" : ""
                    }`}
                  />
                </button>
                {menuOpen && (
                  <div className="absolute left-0 top-full min-w-[220px] rounded-xl border border-line bg-surface-elevated/95 p-1.5 shadow-elevated backdrop-blur-md">
                    <ul className="flex flex-col">
                      {g.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={`/${l.href}`}
                            onClick={() => setOpenMenu(null)}
                            className="block rounded-md px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-surface-raised hover:text-ink"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={site.nav.cta.recruiter.href}
            className="hidden rounded-md border border-line-strong px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan sm:inline-flex"
          >
            {site.nav.cta.recruiter.label}
          </Link>
          <Link
            href={`/${site.nav.cta.contact.href}`}
            className="hidden rounded-md bg-accent-gradient px-3.5 py-2 text-sm font-semibold text-night shadow-glow transition-transform hover:scale-[1.03] sm:inline-flex"
          >
            {site.nav.cta.contact.label}
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — grouped accordions */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-line bg-night/95 backdrop-blur-md lg:hidden"
        >
          <ul className="container-x flex flex-col gap-1 py-4">
            {site.nav.groups.map((g) => {
              const groupOpen = openMobileGroup === g.label;
              return (
                <li key={g.label}>
                  <button
                    type="button"
                    aria-expanded={groupOpen}
                    onClick={() =>
                      setOpenMobileGroup(groupOpen ? null : g.label)
                    }
                    className="flex w-full items-center justify-between rounded-md px-2 py-2.5 text-base text-ink hover:bg-surface-raised"
                  >
                    {g.label}
                    <ChevronDown
                      size={16}
                      aria-hidden
                      className={`transition-transform ${
                        groupOpen ? "rotate-180 text-accent-cyan" : ""
                      }`}
                    />
                  </button>
                  {groupOpen && (
                    <ul className="mt-0.5 flex flex-col gap-0.5 pb-1 pl-3">
                      {g.links.map((l) => (
                        <li key={l.href}>
                          <Link
                            href={`/${l.href}`}
                            onClick={() => {
                              setOpen(false);
                              setOpenMobileGroup(null);
                            }}
                            className="block rounded-md px-2 py-2 text-sm text-ink-muted hover:bg-surface-raised hover:text-ink"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
            <li className="mt-2 flex flex-col gap-2">
              <Link
                href={site.nav.cta.recruiter.href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-between rounded-md border border-line-strong px-3.5 py-2.5 text-sm font-medium"
              >
                {site.nav.cta.recruiter.label}
                <ArrowUpRight size={16} />
              </Link>
              <Link
                href={`/${site.nav.cta.contact.href}`}
                onClick={() => setOpen(false)}
                className="rounded-md bg-accent-gradient px-3.5 py-2.5 text-center text-sm font-semibold text-night"
              >
                {site.nav.cta.contact.label}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
