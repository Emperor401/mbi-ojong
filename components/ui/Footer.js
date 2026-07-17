"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const marqueeRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const marquee = marqueeRef.current;
      const totalWidth = marquee.scrollWidth / 2;

      gsap.to(marquee, {
        x: -totalWidth,
        duration: 20,
        ease: "none",
        repeat: -1,
      });

      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer className="relative z-10 bg-black overflow-hidden">
      {/* Top Footer */}
      <div ref={footerRef} className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-3 h-3 bg-white rotate-45 inline-block" />
              <span className="font-bebas text-white text-xl tracking-widest uppercase">
                Mbi Ojong
              </span>
            </div>
            <p className="font-satoshi text-white/80 text-sm leading-relaxed">
              AML Investigation Analyst specialising in consumer transaction
              monitoring, financial crime detection, and compliance risk
              assessment — based in Vilnius, serving clients globally.
            </p>
          </div>

          {/* Contact */}
          <div>
            <p className="font-satoshi text-white/30 text-xs tracking-widest uppercase mb-4">
              Get In Touch
            </p>
            <ul className="flex flex-col gap-3">
              <li className="font-satoshi text-sm text-white/70">
                Mbiojong06@gmail.com
              </li>
              <li className="font-satoshi text-sm text-white/70">
                +370 688 45465
              </li>
              <li className="font-satoshi text-sm text-white/70">Worldwide</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="font-satoshi text-white/70 text-xs">
            © 2026 Jiles Agbor Mbi Ojong. All rights reserved.
          </p>
          <p className="font-satoshi text-white/70 text-xs">
            AML Investigation Analyst &mdash; Vilnius, Lithuania
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden py-6 border-t border-white/10">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center">
              <span className="font-bebas text-[8vw] text-white tracking-tight mr-8">
                EMPOWERING FINANCIAL
              </span>
              <span className="font-script italic text-[8vw] text-white mr-8">
                integrity
              </span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
