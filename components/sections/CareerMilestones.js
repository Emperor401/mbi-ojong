"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    title: "AML Investigation Analyst",
    institution: "Guidehouse — Vilnius, Lithuania",
    period: "Oct 2023 – Present",
    type: "Experience",
  },
  {
    title: "AML Associate – KYC Department",
    institution: "Western Union — Vilnius, Lithuania",
    period: "Jul 2021 – Oct 2023",
    type: "Experience",
  },
  {
    title: "Bachelor in Business Management",
    institution: "International School of Law and Business, Vilnius",
    period: "Graduated",
    type: "Education",
  },
  {
    title: "Stopping Fraud in New and Legacy Payment Channels",
    institution: "ACAMS",
    period: "Certified",
    type: "Certification",
  },
  {
    title: "Tackling Evolving AML Risks with Next-Gen AI",
    institution: "ACAMS",
    period: "Certified",
    type: "Certification",
  },
  {
    title: "Anti-Money Laundering & Countering of Terrorist Financing",
    institution: "ACAMS",
    period: "Certified",
    type: "Certification",
  },
  {
    title: "Professional Certificate in Regulatory Compliance",
    institution: "University of Pennsylvania",
    period: "Certified",
    type: "Certification",
  },
  {
    title: "Enhancing Financial Inclusion with a Risk-Based Approach",
    institution: "ACAMS",
    period: "Certified",
    type: "Certification",
  },
];

const typeColors = {
  Experience: "text-white border-white/40",
  Education: "text-white/60 border-white/20",
  Certification: "text-white/40 border-white/10",
};

export default function CareerMilestones() {
  const headingRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading
      gsap.fromTo(
        headingRef.current.querySelectorAll(".reveal-word"),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );

      // List items stagger
      gsap.fromTo(
        listRef.current.querySelectorAll(".milestone-item"),
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: listRef.current,
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
                Journey
              </span>
            </div>
            <div ref={headingRef}>
              <div className="overflow-hidden">
                <span className="reveal-word inline-block font-bebas text-[12vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] text-white leading-none tracking-tight">
                  MY CAREER
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="reveal-word inline-block font-bebas text-[12vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] text-white leading-none tracking-tight">
                  MILESTONES
                </span>
              </div>
              <div className="overflow-hidden -mt-2">
                <span className="reveal-word inline-block font-satoshi italic text-white text-[7vw] sm:text-[5vw] md:text-[3.5vw] lg:text-[2.5vw] font-bold">
                  journey
                </span>
              </div>
            </div>
          </div>

          {/* Count */}
          <div className="flex items-center gap-3">
            <span className="font-bebas text-5xl md:text-6xl text-white/10">
              {String(milestones.length).padStart(2, "0")}
            </span>
            <span className="font-satoshi text-xs text-white/30 tracking-widest uppercase">
              Milestones
            </span>
          </div>
        </div>

        {/* Milestones List */}
        <div ref={listRef} className="flex flex-col">
          {milestones.map((item, i) => (
            <div
              key={i}
              className="milestone-item group flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-4 py-5 md:py-6 border-b border-white/10 hover:border-white/40 transition-all duration-300"
            >
              {/* Left */}
              <div className="flex items-start gap-3 md:gap-4">
                {/* Number */}
                <span className="font-bebas text-xl md:text-2xl text-white/20 group-hover:text-white transition-colors duration-300 min-w-[2rem] shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Check Icon */}
                <CheckCircle
                  size={16}
                  className="text-white mt-0.5 shrink-0"
                />

                {/* Title */}
                <h3 className="font-satoshi text-white text-sm font-semibold leading-snug">
                  {item.title}
                </h3>
              </div>

              {/* Right */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 ml-[3.25rem] md:ml-0 shrink-0">
                <span className="font-satoshi text-white/30 text-xs tracking-wide">
                  {item.period}
                </span>
                <span
                  className={`font-satoshi text-xs tracking-widest uppercase border px-3 py-1 rounded-full ${typeColors[item.type]}`}
                >
                  {item.type}
                </span>
                <span className="font-satoshi text-white/40 text-xs text-right max-w-[180px]">
                  {item.institution}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
