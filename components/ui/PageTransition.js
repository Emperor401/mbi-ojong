"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const markRef = useRef(null);
  const brandMaskRef = useRef(null);
  const subtitleRef = useRef(null);
  const barFillRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const mark = markRef.current;
    const brandMask = brandMaskRef.current;
    const subtitle = subtitleRef.current;
    const barFill = barFillRef.current;
    const counter = counterRef.current;

    const tl = gsap.timeline({ delay: 0.3 });

    tl.set(overlay, { scaleY: 1, transformOrigin: "top" })
      .set(mark, { scale: 0, rotate: 0, opacity: 0 })
      .set(brandMask, { yPercent: 100 })
      .set(subtitle, { opacity: 0, y: 6 })
      .set(barFill, { scaleX: 0, transformOrigin: "left center" })
      .set(counter, { innerText: 0 })

      .to(mark, { scale: 1, rotate: 45, opacity: 1, duration: 0.7, ease: "back.out(1.7)" })
      .to(brandMask, { yPercent: 0, duration: 0.9, ease: "power4.out" }, "-=0.15")
      .to(subtitle, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" }, "-=0.1")
      .to(
        barFill,
        { scaleX: 1, duration: 1.5, ease: "power1.inOut" },
        "+=0.15"
      )
      .to(
        counter,
        {
          innerText: 100,
          duration: 1.5,
          ease: "power1.inOut",
          snap: { innerText: 1 },
        },
        "<"
      )
      .to({}, { duration: 0.5 })
      .to([mark, brandMask, subtitle, barFill.parentElement.parentElement], {
        opacity: 0,
        y: -8,
        duration: 0.5,
        ease: "power2.in",
      })
      .to(
        overlay,
        {
          scaleY: 0,
          transformOrigin: "top",
          duration: 1.1,
          ease: "power4.inOut",
        },
        "+=0.1"
      )
      .fromTo(
        content,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", clearProps: "transform" },
        "-=0.4"
      );
  }, [pathname]);

  return (
    <div className="relative">
      {/* Loader overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-[9998] pointer-events-none flex flex-col items-center justify-center"
        style={{ transformOrigin: "top" }}
      >
        {/* Branding */}
        <div className="flex flex-col items-center gap-4">
          <span
            ref={markRef}
            className="w-3 h-3 bg-white inline-block"
          />

          <div className="flex flex-col items-center gap-2">
            <div className="overflow-hidden">
              <span
                ref={brandMaskRef}
                className="font-bebas text-white tracking-[0.5em] uppercase inline-block"
                style={{ fontSize: "clamp(1rem, 3vw, 1.4rem)" }}
              >
                Mbi Ojong
              </span>
            </div>
            <span
              ref={subtitleRef}
              className="font-satoshi text-white/30 tracking-[0.3em] uppercase"
              style={{ fontSize: "clamp(0.55rem, 1.2vw, 0.65rem)" }}
            >
              AML Investigation Analyst
            </span>
          </div>

          {/* Progress bar + percentage */}
          <div className="flex items-center gap-3 mt-2">
            <div className="w-24 sm:w-32 h-px bg-white/15 overflow-hidden">
              <div ref={barFillRef} className="h-full w-full bg-white" />
            </div>
            <span className="font-satoshi text-white/50 text-xs tabular-nums tracking-widest">
              <span ref={counterRef}>00</span>%
            </span>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
