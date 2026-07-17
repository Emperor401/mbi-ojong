"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Shield, Search, AlertTriangle, Globe, Bitcoin, FileCheck } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    icon: Search,
    title: "AML Investigation & Analysis",
    description:
      "Evidence-based AML investigations detecting suspicious consumer behavior and financial crimes using multi-source data intelligence and investigative tools.",
  },
  {
    number: "02",
    icon: AlertTriangle,
    title: "Suspicious Activity Reporting",
    description:
      "Expert identification, escalation, and SAR preparation in full compliance with AML/CFT requirements and internal regulatory policies.",
  },
  {
    number: "03",
    icon: Shield,
    title: "Transaction Monitoring (CDD/EDD)",
    description:
      "In-depth Customer Due Diligence and Enhanced Due Diligence monitoring frameworks for financial institutions and high-risk client portfolios.",
  },
  {
    number: "04",
    icon: Globe,
    title: "PEP & Sanctions Screening",
    description:
      "Comprehensive Politically Exposed Persons and sanctions screening with global database access, adverse media monitoring, and MUDB compliance.",
  },
  {
    number: "05",
    icon: FileCheck,
    title: "KYC & Customer Due Diligence",
    description:
      "End-to-end KYC review and due diligence services across high-volume global customer bases, delivered in English and French.",
  },
  {
    number: "06",
    icon: Bitcoin,
    title: "AML Risk Assessment",
    description:
      "Enterprise AML risk assessments identifying emerging typologies, compliance vulnerabilities, and providing actionable remediation recommendations.",
  },
];

export default function ServicesPreview() {
  const headingRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current.querySelectorAll(".reveal-word"),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        cardsRef.current.querySelectorAll(".service-card"),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative z-10 bg-black py-20 md:py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-white" />
              <span className="font-satoshi text-sm text-white tracking-[0.3em] uppercase font-semibold">
                What I Do
              </span>
            </div>
            <div ref={headingRef} className="overflow-hidden">
              <div className="overflow-hidden">
                <span className="reveal-word inline-block font-bebas text-[12vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] text-white leading-none tracking-tight">
                  SERVICES
                </span>
              </div>
              <div className="overflow-hidden -mt-2">
                <span className="reveal-word inline-block font-satoshi italic text-white text-[7vw] sm:text-[5vw] md:text-[3.5vw] lg:text-[2.5vw] font-bold">
                  specialized
                </span>
              </div>
            </div>
          </div>

          {/* Counter */}
          <div className="flex items-center gap-3">
            <span className="font-bebas text-5xl md:text-6xl text-white/10">06</span>
            <span className="font-satoshi text-xs text-white/30 tracking-widest uppercase">
              Core Services
            </span>
          </div>
        </div>

        {/* Services Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className="service-card group bg-black p-6 md:p-8 hover:bg-zinc-950 transition-all duration-500 cursor-pointer relative overflow-hidden"
              >
                {/* Hover line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-500" />

                {/* Number */}
                <span className="font-bebas text-5xl md:text-6xl text-white/5 group-hover:text-white/10 transition-all duration-300 absolute top-4 right-5 md:right-6">
                  {service.number}
                </span>

                {/* Icon */}
                <div className="w-11 h-11 md:w-12 md:h-12 border border-white/20 group-hover:border-white rounded-full flex items-center justify-center mb-5 md:mb-6 transition-all duration-300">
                  <Icon size={18} className="text-white/60 group-hover:text-white transition-colors duration-300" />
                </div>

                {/* Title */}
                <h3 className="font-bebas text-xl md:text-2xl text-white tracking-wide mb-2 md:mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-satoshi text-white/80 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="mt-5 md:mt-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="font-satoshi text-xs text-white tracking-widest uppercase">
                    Learn More
                  </span>
                  <ArrowUpRight size={14} className="text-white" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-10 md:mt-12">
          <Link
            href="/services"
            className="group flex items-center gap-1.5 font-satoshi text-xs tracking-[0.2em] uppercase border border-white/25 bg-black/30 text-white px-5 py-3 rounded-full backdrop-blur-[32px] hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            View All Services
            <ArrowUpRight
              size={16}
              className="group-hover:rotate-45 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
