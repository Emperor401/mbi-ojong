"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const featured = [
  { title: "Analytic Investigations (Intermediate Level)", short: "ANALYTIC INVESTIGATIONS", issuer: "Udemy", image: "/cert1.jpeg" },
  { title: "AML Compliance", short: "AML COMPLIANCE", issuer: "Udemy", image: "/cert2.png" },
  { title: "Financial Crime Masterclass", short: "FINANCIAL CRIME MASTERCLASS", issuer: "Udemy", image: "/cert3.png" },
  { title: "Regulatory Compliance", short: "REGULATORY COMPLIANCE", issuer: "Udemy", image: "/cert4.png" },
];

export default function CertificatesPreview() {
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const counterRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current.querySelectorAll(".reveal-word"),
        { y: 100, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power4.out", stagger: 0.08,
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        counterRef.current,
        { innerText: 0 },
        {
          innerText: 12, duration: 2.5, ease: "power2.out", snap: { innerText: 1 },
          scrollTrigger: { trigger: counterRef.current, start: "top 80%" },
        }
      );

      const cards = cardsRef.current.querySelectorAll(".cert-card");

      // Dramatic 3D flip-up entrance
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0, rotateX: -55, scale: 0.85 },
        {
          y: 0, opacity: 1, rotateX: 0, scale: 1,
          duration: 1.1, ease: "power4.out", stagger: 0.12,
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        }
      );
    });

    // 3D cursor-tracking tilt + glare sweep
    const cards = cardsRef.current.querySelectorAll(".cert-card");
    const cleanupFns = [];

    cards.forEach((card) => {
      const inner = card.querySelector(".cert-inner");
      const glare = card.querySelector(".cert-glare");

      const setRotateX = gsap.quickTo(inner, "rotateX", { duration: 0.5, ease: "power3.out" });
      const setRotateY = gsap.quickTo(inner, "rotateY", { duration: 0.5, ease: "power3.out" });
      const setGlareX = gsap.quickTo(glare, "x", { duration: 0.3, ease: "power3.out" });
      const setGlareY = gsap.quickTo(glare, "y", { duration: 0.3, ease: "power3.out" });

      const handleMove = (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        setRotateY((px - 0.5) * 18);
        setRotateX(-(py - 0.5) * 18);
        setGlareX(px * rect.width - 110);
        setGlareY(py * rect.height - 110);

        gsap.to(glare, { opacity: 0.4, duration: 0.3 });
        gsap.to(inner, { scale: 1.03, duration: 0.4, ease: "power3.out" });
      };

      const handleLeave = () => {
        setRotateX(0);
        setRotateY(0);
        gsap.to(glare, { opacity: 0, duration: 0.4 });
        gsap.to(inner, { scale: 1, duration: 0.5, ease: "power3.out" });
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);
      cleanupFns.push(() => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => {
      ctx.revert();
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  return (
    <section className="relative z-10 bg-zinc-950 py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-white" />
              <span className="font-satoshi text-sm text-white tracking-[0.3em] uppercase font-semibold">Credentials</span>
            </div>
            <div ref={headingRef}>
              <div className="overflow-hidden">
                <span className="reveal-word inline-block font-bebas text-[12vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] text-white leading-none tracking-tight">
                  CERTIFIED
                </span>
              </div>
              <div className="overflow-hidden -mt-2">
                <span className="reveal-word inline-block font-satoshi italic text-white text-[7vw] sm:text-[5vw] md:text-[3.5vw] lg:text-[2.5vw] font-bold">
                  excellence
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-end gap-2">
            <span ref={counterRef} className="font-bebas text-[12vw] sm:text-[8vw] md:text-[6vw] text-white leading-none">0</span>
            <div className="flex flex-col mb-2">
              <span className="font-bebas text-xl md:text-2xl text-white">/12</span>
              <span className="font-satoshi text-xs text-white/30 tracking-widest uppercase">Certificates</span>
            </div>
          </div>
        </div>

        {/* Certificate Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
          style={{ perspective: "1400px" }}
        >
          {featured.map((cert, i) => (
            <div
              key={i}
              className="cert-card group rounded-3xl overflow-hidden bg-black"
              style={{ perspective: "1000px" }}
            >
              <div
                className="cert-inner relative"
                style={{ transformStyle: "preserve-3d", willChange: "transform" }}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-auto block pointer-events-none"
                />
                {/* Cursor-tracking glare */}
                <div
                  className="cert-glare absolute top-0 left-0 w-[220px] h-[220px] rounded-full pointer-events-none opacity-0"
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 70%)",
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="h-8 md:h-10 bg-gradient-to-t from-black to-transparent" />
                  <div className="bg-black px-4 md:px-5 pt-2 pb-4 md:pb-5">
                    <h3 className="font-bebas text-white text-[clamp(1.4rem,3vw,2.8rem)] leading-[1] uppercase tracking-wide">
                      {cert.short}
                    </h3>
                    <p className="font-satoshi text-white/50 text-xs mt-1 tracking-widest uppercase">{cert.issuer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10 md:mt-14">
          <Link
            href="/certificates"
            className="group flex items-center gap-1.5 font-satoshi text-xs tracking-[0.2em] uppercase border border-white/25 bg-black/30 text-white px-5 py-3 rounded-full backdrop-blur-[32px] hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            View All 12 Certificates
            <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
