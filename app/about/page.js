"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const expertise = [
  "AML Investigations & Consumer Transaction Monitoring",
  "Suspicious Activity Detection, Escalation & SAR Reporting",
  "Enhanced Customer Due Diligence (EDD / RCDD / CDD)",
  "PEP Screening, Sanctions & Adverse Media Monitoring",
  "AML Typologies, Risk Trends & Regulatory Developments",
  "Multilingual Compliance Services — English & French",
];

const faqs = [
  {
    question: "What AML investigation experience do you bring?",
    answer:
      "I have hands-on experience conducting complex AML investigations at Guidehouse, where I detect suspicious consumer behavior and financial crimes using multiple investigative tools and data sources. Prior to that, I performed KYC and CDD/EDD reviews at Western Union across a high-volume global customer base.",
  },
  {
    question: "What industries and environments have you worked in?",
    answer:
      "I have worked within large-scale financial services environments — Western Union (global payment processing) and Guidehouse (professional AML services) — giving me practical exposure to fintech, payments, banking compliance, and high-risk customer monitoring.",
  },
  {
    question: "Can you work with clients in French as well as English?",
    answer:
      "Yes — I am fluent in both English and French (native level), and have conducted KYC and due diligence reviews in both languages across global customer portfolios at Western Union.",
  },
  {
    question: "Do you offer remote consulting or advisory services?",
    answer:
      "Yes. While based in Vilnius, Lithuania, I work with clients globally. I offer remote consulting, compliance advisory, and investigation support services with flexible engagement models tailored to your needs.",
  },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const missionRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero heading
      gsap.fromTo(
        heroRef.current.querySelectorAll(".reveal-word"),
        { y: 120, opacity: 0, skewY: 5 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1,
          ease: "power4.out",
          stagger: 0.08,
          delay: 0.5,
        }
      );

      // Image reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: "inset(100% 0% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.4,
          ease: "power4.out",
          delay: 0.8,
        }
      );

      // Mission Vision
      gsap.fromTo(
        missionRef.current.querySelectorAll(".mission-card"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 80%",
          },
        }
      );

      // FAQ items
      gsap.fromTo(
        faqRef.current.querySelectorAll(".faq-item"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: faqRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const toggleFaq = (index) => {
    const items = faqRef.current.querySelectorAll(".faq-answer");
    const arrows = faqRef.current.querySelectorAll(".faq-arrow");
    const item = items[index];
    const arrow = arrows[index];
    const isOpen = item.style.height && item.style.height !== "0px";

    // Close all
    items.forEach((el, i) => {
      gsap.to(el, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
      gsap.to(arrows[i], { rotate: 0, duration: 0.3 });
    });

    // Open clicked if it was closed
    if (!isOpen) {
      gsap.set(item, { height: "auto" });
      const height = item.offsetHeight;
      gsap.fromTo(
        item,
        { height: 0, opacity: 0 },
        { height, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.to(arrow, { rotate: 45, duration: 0.3 });
    }
  };

  return (
    <div className="bg-black min-h-screen">

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-10 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div ref={heroRef} className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="w-8 h-px bg-white" />
              <span className="font-satoshi text-sm text-white tracking-[0.3em] uppercase font-semibold">
                Who I Am
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-word inline-block font-bebas text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[10vw] text-white leading-none tracking-tight">
                ABOUT ME
              </span>
            </div>
            <div className="overflow-hidden -mt-2 md:-mt-4">
              <span className="reveal-word inline-block font-satoshi italic text-white text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[4vw] font-bold">
                Mbi Ojong
              </span>
            </div>
          </div>

          {/* Hero Image */}
          <div
            ref={imageRef}
            className="relative w-full aspect-[16/7] bg-zinc-900 rounded-2xl md:rounded-3xl overflow-hidden"
          >
            <img
              src="/aboutimg.png"
              alt="Mbi Ojong Jiles Agbor"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Left */}
          <div>
            <h2 className="font-bebas text-[7vw] sm:text-[6vw] md:text-[4vw] lg:text-[3vw] text-white leading-tight tracking-tight mb-6">
              DELIVERING PRECISE AML INVESTIGATIONS AND PROACTIVE RISK
              IDENTIFICATION TO PROTECT FINANCIAL INTEGRITY WORLDWIDE.
            </h2>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-5 md:gap-6">
            <p className="font-satoshi text-white/60 text-sm leading-relaxed">
              Result-driven AML professional with proven experience at Western
              Union and Guidehouse in Vilnius, Lithuania. I specialise in
              consumer transaction monitoring, financial crime investigation,
              and risk-based decision-making — managing high-volume, complex
              caseloads with attention to detail and analytical precision.
              Fluent in English and French.
            </p>

            {/* Expertise List */}
            <div className="flex flex-col gap-3 mt-2 md:mt-4">
              {expertise.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-white mt-0.5 shrink-0" />
                  <span className="font-satoshi text-white/70 text-sm font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={missionRef} className="py-16 md:py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10 md:mb-16">
            <div className="w-8 h-px bg-white" />
            <span className="font-satoshi text-sm text-white tracking-[0.3em] uppercase font-semibold">
              Purpose
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Mission */}
            <div className="mission-card bg-black border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white transition-all duration-500">
              <div className="mb-5 md:mb-6">
                <div className="overflow-hidden">
                  <span className="inline-block font-bebas text-4xl md:text-5xl text-white leading-none tracking-tight">
                    MISSION
                  </span>
                </div>
                <div className="overflow-hidden -mt-1">
                  <span className="inline-block font-satoshi italic text-white text-xl md:text-2xl font-bold">
                    goal
                  </span>
                </div>
              </div>
              <p className="font-satoshi text-white/60 text-sm leading-relaxed">
                To conduct thorough, evidence-based AML investigations and
                consumer monitoring that identify and disrupt financial crime —
                applying risk-based decision-making and the highest standards
                of integrity to keep businesses compliant, protected, and
                trusted.
              </p>
            </div>

            {/* Vision */}
            <div className="mission-card bg-black border border-white/10 rounded-2xl p-6 md:p-8 hover:border-white transition-all duration-500">
              <div className="mb-5 md:mb-6">
                <div className="overflow-hidden">
                  <span className="inline-block font-bebas text-4xl md:text-5xl text-white leading-none tracking-tight">
                    VISION
                  </span>
                </div>
                <div className="overflow-hidden -mt-1">
                  <span className="inline-block font-satoshi italic text-white text-xl md:text-2xl font-bold">
                    direction
                  </span>
                </div>
              </div>
              <p className="font-satoshi text-white/60 text-sm leading-relaxed">
                To grow as a leading AML professional — continuously advancing
                knowledge of evolving financial crime typologies, emerging
                regulations, and next-generation investigative tools — and to
                be a trusted partner for institutions that demand precision,
                integrity, and results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <div className="w-8 h-px bg-white" />
            <span className="font-satoshi text-sm text-white tracking-[0.3em] uppercase font-semibold">
              FAQ
            </span>
          </div>

          <div className="overflow-hidden mb-10 md:mb-16">
            <span className="inline-block font-bebas text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] text-white leading-none tracking-tight">
              FREQUENTLY ASKED
            </span>
            <br />
            <span className="inline-block font-satoshi italic text-white text-[6vw] sm:text-[5vw] md:text-[3.5vw] lg:text-[2.5vw] font-bold -mt-2">
              questions
            </span>
          </div>

          <div ref={faqRef} className="flex flex-col">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="faq-item border-b border-white/10 hover:border-white/30 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-4"
                >
                  <span className="font-satoshi text-white font-semibold text-sm md:text-base leading-snug">
                    {faq.question}
                  </span>
                  <span className="faq-arrow text-white text-2xl font-light shrink-0">
                    +
                  </span>
                </button>
                <div
                  className="faq-answer overflow-hidden"
                  style={{ height: 0, opacity: 0 }}
                >
                  <p className="font-satoshi text-white/50 text-sm leading-relaxed pb-5 md:pb-6">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
