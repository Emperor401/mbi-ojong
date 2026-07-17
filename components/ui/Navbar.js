"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Certificates", href: "/certificates" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);
  const menuRef = useRef(null);

  // Close menu whenever the route changes (adjust state during render, not in an effect)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.4 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open; close if viewport expands to desktop
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("resize", handleResize);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [menuOpen]);

  return (
    <>
      {/* Floating navbar: main pill (logo + links) + separate CTA pill */}
      <div ref={navRef} className="fixed top-5 inset-x-0 z-50 px-4 md:px-8">
        <nav className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          {/* Main pill */}
          <div
            className={`flex items-center justify-between md:justify-start gap-6 sm:gap-8 rounded-full px-4 sm:px-5 py-3 border flex-1 md:flex-initial transition-all duration-500 ${
              scrolled
                ? "bg-black/60 border-white/15 backdrop-blur-[40px]"
                : "bg-black/40 border-white/10 backdrop-blur-[32px]"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 bg-white rotate-45 inline-block flex-shrink-0" />
              <span className="font-bebas text-white text-base sm:text-lg tracking-widest uppercase">
                Mbi Ojong
              </span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-satoshi text-xs tracking-[0.2em] uppercase transition-colors duration-300 hover:text-white ${
                    pathname === link.href ? "text-white" : "text-white/55"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Hamburger (mobile only) */}
            <button
              className="md:hidden flex flex-col gap-[5px] z-50 p-1"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>

          {/* Separate outlined CTA pill */}
          <Link
            href="/contact"
            className={`hidden md:inline-flex items-center gap-1.5 shrink-0 font-satoshi text-xs tracking-[0.2em] uppercase px-5 py-3 rounded-full border backdrop-blur-[32px] transition-all duration-300 hover:bg-white hover:text-black hover:border-white ${
              pathname === "/contact"
                ? "bg-white border-white text-black"
                : "bg-black/30 border-white/25 text-white"
            }`}
          >
            Book a Call ↗
          </Link>
        </nav>
      </div>

      {/* Mobile fullscreen menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 sm:gap-8 px-6"
          style={{ background: "rgba(0,0,0,0.97)", backdropFilter: "blur(24px)" }}
        >
          {[...navLinks, { label: "Contact", href: "/contact" }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-bebas text-4xl sm:text-5xl tracking-widest uppercase transition-colors duration-300 hover:text-white ${
                pathname === link.href ? "text-white" : "text-white/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
