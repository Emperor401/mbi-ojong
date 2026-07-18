"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }) {
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const groupRef = useRef(null);
  const brandMaskRef = useRef(null);
  const dotRef = useRef(null);
  const underlineRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const group = groupRef.current;
    const brandMask = brandMaskRef.current;
    const dot = dotRef.current;
    const underline = underlineRef.current;

    // Prevent the intro timeline from stalling if the tab is backgrounded
    // (throttled requestAnimationFrame) while it's still running.
    gsap.ticker.lagSmoothing(0);

    const tl = gsap.timeline({ delay: 0.3 });

    tl.set(overlay, { scaleY: 1, transformOrigin: "top" })
      .set(brandMask, { yPercent: 100 })
      .set(dot, { scale: 0, opacity: 0 })
      .set(underline, { scaleX: 0, transformOrigin: "left center" })

      .to(brandMask, { yPercent: 0, duration: 0.8, ease: "power4.out" })
      .to(dot, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }, "-=0.3")
      .to(underline, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, "-=0.15")
      .to({}, { duration: 1 })
      .to(group, { opacity: 0, y: -8, duration: 0.5, ease: "power2.in" })
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

    return () => tl.kill();
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
        <div ref={groupRef} className="flex flex-col items-center gap-5">
          <div className="flex items-start">
            <div className="overflow-hidden">
              <span
                ref={brandMaskRef}
                className="font-satoshi font-bold text-white inline-block leading-none"
                style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)" }}
              >
                Mbi Ojong
              </span>
            </div>
            <span
              ref={dotRef}
              className="w-1.5 h-1.5 rounded-full bg-white mt-1 ml-0.5 shrink-0"
            />
          </div>

          <div className="w-40 sm:w-56 h-px bg-white/15 overflow-hidden">
            <div ref={underlineRef} className="h-full w-full bg-white" />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="loader-dot w-1.5 h-1.5 rounded-full bg-white/70" style={{ animationDelay: "0s" }} />
            <span className="loader-dot w-1.5 h-1.5 rounded-full bg-white/70" style={{ animationDelay: "0.2s" }} />
            <span className="loader-dot w-1.5 h-1.5 rounded-full bg-white/70" style={{ animationDelay: "0.4s" }} />
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
