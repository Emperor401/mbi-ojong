"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function CallToAction() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      gsap.to(bgRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

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
          stagger: 0.08,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        }
      );

      // Content fade in
      gsap.fromTo(
        contentRef.current.querySelectorAll(".fade-in"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-black py-20 md:py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 md:gap-12">

          {/* Left - Heading */}
          <div ref={headingRef} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="w-8 h-px bg-white" />
              <span className="font-satoshi text-sm text-white tracking-[0.3em] uppercase font-semibold">
                Work Together
              </span>
            </div>

            <div className="overflow-hidden">
              <span className="reveal-word inline-block font-bebas text-[14vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] text-white leading-none tracking-tight">
                LET&apos;S WORK
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-word inline-block font-bebas text-[14vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] text-white leading-none tracking-tight">
                TOGETHER
              </span>
            </div>
            <div className="overflow-hidden -mt-2">
              <span className="reveal-word inline-block font-satoshi italic text-white text-[8vw] sm:text-[6vw] md:text-[4vw] lg:text-[3vw] font-bold">
                let&apos;s connect
              </span>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="flex flex-col gap-5 md:gap-6 w-full lg:max-w-sm">
            <p className="fade-in font-satoshi text-white/60 text-sm leading-relaxed">
              Ready to discuss AML investigations, compliance advisory, or
              transaction monitoring support? Let&apos;s connect and explore how my
              experience at Western Union and Guidehouse can strengthen your
              financial crime defences.
            </p>

            {/* Contact Options */}
            <div className="fade-in flex flex-col gap-3">
              {[
                { label: "Email", value: "Mbiojong06@gmail.com" },
                { label: "Phone", value: "+370 688 45465" },
                { label: "Location", value: "Vilnius, Lithuania" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-3 border-b border-white/10"
                >
                  <span className="font-satoshi text-xs text-white/30 tracking-widest uppercase">
                    {item.label}
                  </span>
                  <span className="font-satoshi text-white/70 text-sm text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="fade-in group flex items-center justify-center gap-1.5 font-satoshi text-xs tracking-[0.2em] uppercase border border-white/25 bg-black/30 text-white px-5 py-3 rounded-full backdrop-blur-[32px] hover:bg-white hover:text-black hover:border-white transition-all duration-300 w-full text-center"
            >
              Book a Consultation
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
