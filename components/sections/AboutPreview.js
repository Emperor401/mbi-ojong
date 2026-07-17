"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPreview() {
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current.querySelectorAll(".reveal-word"),
        { y: 100, opacity: 0, skewY: 3 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );

      // Text reveal
      gsap.fromTo(
        textRef.current.querySelectorAll("p"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        }
      );

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
          },
        }
      );

      // Stats counter animation
      const statElements = statsRef.current.querySelectorAll(".stat-number");
      statElements.forEach((el) => {
        const target = parseInt(el.getAttribute("data-target"));
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const words = [
    "RESULT-DRIVEN", "AML", "INVESTIGATOR", "WITH", "HANDS-ON",
    "EXPERIENCE", "AT", "WESTERN", "UNION", "AND", "GUIDEHOUSE,",
    "DETECTING", "FINANCIAL", "CRIME", "AND", "SAFEGUARDING",
    "COMPLIANCE", "INTEGRITY", "WORLDWIDE.",
  ];

  return (
    <section className="relative z-10 bg-zinc-950 py-20 md:py-32 px-6 overflow-hidden rounded-t-[32px] md:rounded-t-[56px] shadow-[0_-30px_60px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto">

        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-10 md:mb-12">
          <div className="w-8 h-px bg-white" />
          <span className="font-satoshi text-sm text-white tracking-[0.3em] uppercase font-semibold">
            About Me
          </span>
        </div>

        {/* Big Statement Heading */}
        <div ref={headingRef} className="mb-12 md:mb-16 overflow-hidden">
          <div className="flex flex-wrap gap-x-3 md:gap-x-4 gap-y-1 md:gap-y-2">
            {words.map((word, i) => (
              <div key={i} className="overflow-hidden">
                <span className="reveal-word inline-block font-bebas text-[7vw] md:text-[4.5vw] lg:text-[3.2vw] text-white leading-tight tracking-tight">
                  {word}
                </span>
              </div>
            ))}
          </div>
          <div className="overflow-hidden mt-2">
            <span className="reveal-word inline-block font-satoshi italic text-white text-[5vw] md:text-[3.5vw] lg:text-[2.5vw] font-bold">
              — about me
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left - Image */}
          <div
            ref={imageRef}
            className="relative aspect-[4/5] sm:aspect-[3/4] bg-zinc-900 rounded-2xl overflow-hidden"
          >
            <img
              src="/image3.jpeg"
              alt="Mbi Ojong Jiles Agbor"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Right - Text */}
          <div ref={textRef} className="flex flex-col gap-5 md:gap-6">
            <p className="font-satoshi text-white/70 text-base leading-relaxed">
              Jiles Agbor Mbi Ojong is a result-driven AML professional with
              proven expertise in consumer transaction monitoring, financial
              crime investigation, and risk-based decision-making — built
              through hands-on roles at Western Union and Guidehouse in
              Vilnius, Lithuania.
            </p>
            <p className="font-satoshi text-white/50 text-sm leading-relaxed">
              Recognised for strong analytical thinking, attention to detail,
              and the ability to manage high-volume, complex caseloads under
              pressure. Fluent in English and French.
            </p>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 md:gap-3 mt-2">
              {[
                "AML Investigations",
                "Transaction Monitoring",
                "CDD / EDD",
                "PEP & Sanctions Screening",
                "SAR Preparation",
                "KYC Review",
              ].map((skill, i) => (
                <span
                  key={i}
                  className="font-satoshi text-xs tracking-wider uppercase border border-white/20 text-white/60 px-3 md:px-4 py-1.5 md:py-2 rounded-full hover:border-white hover:text-white transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/10"
            >
              {[
                { target: 3, suffix: "+", label: "Years Experience" },
                { target: 12, suffix: "", label: "Certificates" },
                { target: 50, suffix: "+", label: "Clients Served" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="font-bebas text-3xl md:text-4xl text-white">
                    <span className="stat-number" data-target={stat.target}>
                      0
                    </span>
                    {stat.suffix}
                  </p>
                  <p className="font-satoshi text-white/75 text-[10px] md:text-xs tracking-wider uppercase mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 font-satoshi text-sm tracking-widest uppercase text-white border-b border-white/30 pb-1 hover:border-white transition-all duration-300 w-fit mt-3 md:mt-4"
            >
              Full Story
              <ArrowUpRight
                size={16}
                className="group-hover:rotate-45 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
