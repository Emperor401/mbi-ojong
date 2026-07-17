"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  {
    title: "Analytic Investigations (Intermediate Level)",
    short: "ANALYTIC INVESTIGATIONS",
    issuer: "Udemy",
    instructor: "Eugene Matthews",
    length: "1 total hour",
    category: "Fintech",
    image: "/cert1.jpeg",
  },
  {
    title: "The Complete Guide To Anti Money Laundering (AML) Compliance",
    short: "AML COMPLIANCE",
    issuer: "Udemy",
    instructor: "SIA Global Security",
    length: "2 total hours",
    category: "AML",
    image: "/cert2.png",
  },
  {
    title: "Financial Crime: Processes & Technology - Masterclass",
    short: "FINANCIAL CRIME MASTERCLASS",
    issuer: "Udemy",
    instructor: "Rian Chapman",
    length: "10 total hours",
    category: "Financial Crime",
    image: "/cert3.png",
  },
  {
    title: "Professional Certificate in Regulatory Compliance",
    short: "REGULATORY COMPLIANCE",
    issuer: "Udemy",
    instructor: "MTF Institute of Management, Technology and Finance",
    length: "2 total hours",
    category: "Compliance",
    image: "/cert4.png",
  },
  {
    title: "Anti Money Laundering & Countering of Terrorist Financing",
    short: "AML & CTF",
    issuer: "Udemy",
    instructor: "ComplyFin DWC LLC",
    length: "31 total mins",
    category: "CTF",
    image: "/cert4i.jpg",
  },
  {
    title: "Professional Certificate in Regulatory Compliance",
    short: "REGULATORY COMPLIANCE",
    issuer: "Udemy",
    instructor: "MTF Institute of Management, Technology and Finance",
    length: "2 total hours",
    category: "Compliance",
    image: "/cert5.jpg",
  },
  {
    title: "Anti-Money Laundering Concepts: AML, KYC and Compliance",
    short: "AML, KYC & COMPLIANCE",
    issuer: "Udemy",
    instructor: "GenMan Solutions",
    length: "2 total hours",
    category: "KYC",
    image: "/cert6.jpg",
  },
  {
    title: "Risk, Payments and Fraud",
    short: "RISK, PAYMENTS & FRAUD",
    issuer: "Udemy",
    instructor: "Rush Consulting Ltd Academy",
    length: "1.5 total hours",
    category: "Fraud",
    image: "/cert7.jpg",
  },
  {
    title: "Financial Crime: Processes & Technology - Masterclass",
    short: "FINANCIAL CRIME MASTERCLASS",
    issuer: "Udemy",
    instructor: "Rian Chapman",
    length: "10 total hours",
    category: "Financial Crime",
    image: "/cert8.jpg",
  },
  {
    title: "Certified Anti-Money Laundering and Compliance Expert (CAML)",
    short: "CAML EXPERT",
    issuer: "Udemy",
    instructor: "YouAccel Training",
    length: "18.5 total hours",
    category: "AML",
    image: "/cert9.jpg",
  },
  {
    title: "Anti Money Laundering & Countering of Terrorist Financing",
    short: "AML & CTF",
    issuer: "Udemy",
    instructor: "ComplyFin DWC LLC",
    length: "31 total mins",
    category: "CTF",
    image: "/cert10.jpg",
  },
  {
    title: "The Complete Guide To Anti Money Laundering (AML) Compliance",
    short: "AML COMPLIANCE",
    issuer: "Udemy",
    instructor: "SIA Global Security",
    length: "2 total hours",
    category: "AML",
    image: "/cert11.jpg",
  },
];

export default function CertificatesPage() {
  const heroRef = useRef(null);
  const gridRef = useRef(null);
  const counterRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current.querySelectorAll(".reveal-word"),
        { y: 120, opacity: 0, skewY: 5 },
        {
          y: 0, opacity: 1, skewY: 0, duration: 1, ease: "power4.out",
          stagger: 0.08, delay: 0.5,
        }
      );

      gsap.fromTo(
        counterRef.current,
        { innerText: 0 },
        {
          innerText: certificates.length, duration: 2.5, ease: "power2.out",
          snap: { innerText: 1 }, delay: 0.8,
        }
      );

      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 2.5, ease: "power2.out", delay: 0.8, transformOrigin: "left center" }
      );

      // Background grid parallax
      gsap.to(".certs-grid-bg", {
        backgroundPosition: "60px 60px",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Card entrance with internal title/issuer stagger — triggered as each card scrolls into view
      gsap.utils.toArray(".cert-card").forEach((card) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });
        tl.fromTo(
          card,
          { y: 80, opacity: 0, rotateX: -55, scale: 0.85 },
          { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.1, ease: "power4.out" }
        )
          .fromTo(
            card.querySelector(".cert-badge"),
            { opacity: 0, scale: 0.6 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.5)" },
            "-=0.5"
          )
          .fromTo(
            card.querySelectorAll(".cert-text-line"),
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, stagger: 0.08, ease: "power3.out" },
            "-=0.6"
          )
          .fromTo(
            card.querySelector(".cert-shine"),
            { xPercent: -150 },
            { xPercent: 250, duration: 1, ease: "power2.inOut" },
            "-=0.9"
          );
      });
    });

    // 3D cursor-tracking tilt + glare sweep
    const cards = gridRef.current.querySelectorAll(".cert-card");
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
    <div className="bg-black min-h-screen">

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-10 px-6 overflow-hidden">
        {/* Background grid */}
        <div
          className="certs-grid-bg absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            backgroundPosition: "0px 0px",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <div ref={heroRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8">

            <div>
              <div className="flex items-center gap-3 mb-5 md:mb-6">
                <div className="w-8 h-px bg-white" />
                <span className="font-satoshi text-sm text-white tracking-[0.3em] uppercase font-semibold">
                  Credentials
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="reveal-word inline-block font-bebas text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw] text-white leading-none tracking-tight">
                  CERTIFIED
                </span>
              </div>
              <div className="overflow-hidden -mt-2 md:-mt-4">
                <span className="reveal-word inline-block font-satoshi italic text-white text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[4vw] font-bold">
                  excellence
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3 mb-0 md:mb-4">
              <div className="flex items-end gap-2">
                <span
                  ref={counterRef}
                  className="font-bebas text-[16vw] sm:text-[12vw] md:text-[8vw] text-white leading-none"
                >
                  0
                </span>
                <div className="flex flex-col mb-1 md:mb-2">
                  <span className="font-bebas text-2xl md:text-3xl text-white">/{certificates.length}</span>
                  <span className="font-satoshi text-xs text-white/30 tracking-widest uppercase">
                    Certificates
                  </span>
                </div>
              </div>
              <div className="w-full max-w-[220px] h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full w-full bg-white rounded-full"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="px-6 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
            style={{ perspective: "1400px" }}
          >
            {certificates.map((cert, i) => (
              <div
                key={i}
                className="cert-card group rounded-2xl md:rounded-3xl overflow-hidden bg-black"
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
                  {/* Entrance shine sweep */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div
                      className="cert-shine absolute top-0 left-0 h-full w-1/3"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                        transform: "translateX(-150%) skewX(-12deg)",
                      }}
                    />
                  </div>
                  {/* Cursor-tracking glare */}
                  <div
                    className="cert-glare absolute top-0 left-0 w-[220px] h-[220px] rounded-full pointer-events-none opacity-0"
                    style={{
                      background: "radial-gradient(circle, rgba(255,255,255,0.55) 0%, transparent 70%)",
                    }}
                  />
                  {/* Category badge */}
                  <span className="cert-badge absolute top-4 right-4 md:top-5 md:right-5 font-satoshi text-[10px] tracking-widest uppercase text-white bg-black/60 border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                    {cert.category}
                  </span>
                  <div className="absolute bottom-0 left-0 right-0">
                    <div className="h-8 md:h-10 bg-gradient-to-t from-black to-transparent" />
                    <div className="bg-black px-4 md:px-5 pt-2 pb-4 md:pb-5">
                      <h3 className="cert-text-line font-bebas text-white text-[clamp(1.4rem,3vw,2.8rem)] leading-[1] uppercase tracking-wide">
                        {cert.short}
                      </h3>
                      <p className="cert-text-line font-satoshi text-white/50 text-xs mt-1 tracking-widest uppercase">
                        {cert.issuer}
                      </p>
                      <p className="cert-text-line font-satoshi text-white text-xs mt-2 leading-relaxed font-medium">
                        {cert.instructor} · {cert.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
