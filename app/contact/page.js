"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, Phone, MapPin, Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Blockchain AML Programs",
  "Crypto Wallet Tracking",
  "Transaction Monitoring (CDD/EDD)",
  "PEP Screening & RBO Verification",
  "Regulatory Alignment",
  "AML Risk Assessment",
];

export default function ContactPage() {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const detailsRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    "bot-field": "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
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

      // Form fields animation
      gsap.fromTo(
        formRef.current.querySelectorAll(".form-field"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        }
      );

      // Details animation
      gsap.fromTo(
        detailsRef.current.querySelectorAll(".detail-item"),
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: detailsRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const encodeForm = (data) =>
    Object.keys(data)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
      )
      .join("&");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;

    if (formData["bot-field"]) return;

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Name and email are required.");
      return;
    }

    setError("");
    setSending(true);

    gsap.to(".submit-btn", { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm({ "form-name": "contact", ...formData }),
      });

      if (!res.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-black min-h-screen">

      {/* Hero */}
      <section className="relative pt-28 sm:pt-32 pb-10 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div ref={heroRef}>
            <div className="flex items-center gap-3 mb-5 md:mb-6">
              <div className="w-8 h-px bg-white" />
              <span className="font-satoshi text-sm text-white tracking-[0.3em] uppercase font-semibold">
                Get In Touch
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="reveal-word inline-block font-bebas text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] text-white leading-none tracking-tight">
                CONTACT
              </span>
            </div>
            <div className="overflow-hidden -mt-2 md:-mt-4">
              <span className="reveal-word inline-block font-satoshi italic text-white text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[4vw] font-bold">
                connect
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 px-6 pb-20 md:pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">

          {/* Left — contact details */}
          <div ref={detailsRef} className="flex flex-col gap-7 md:gap-8">
            <p className="detail-item font-satoshi text-white/60 text-sm leading-relaxed max-w-sm">
              Get in touch to discuss AML investigations, transaction monitoring
              advisory, KYC/CDD support, or compliance consultation. Based in
              Vilnius — available to clients worldwide in English and French.
            </p>

            {/* Contact Details */}
            <div className="detail-item">
              <p className="font-bebas text-xl md:text-2xl text-white tracking-widest mb-5 md:mb-6">
                CONTACT DETAILS
              </p>
              <div className="flex flex-col gap-3 md:gap-4">
                {[
                  { icon: Mail, label: "Email", value: "Mbiojong06@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+370 688 45465" },
                  { icon: MapPin, label: "Location", value: "Vilnius, Lithuania — Globally Available" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-4 py-3 md:py-4 border-b border-white/10"
                    >
                      <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="font-satoshi text-xs text-white/30 tracking-widest uppercase mb-1">
                          {item.label}
                        </p>
                        <p className="font-satoshi text-white/80 text-sm break-all">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Availability */}
            <div className="detail-item flex items-center gap-3">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
              <span className="font-satoshi text-xs text-white/50 tracking-widest uppercase">
                Available for new projects
              </span>
            </div>
          </div>

          {/* Right — form */}
          <div ref={formRef}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-6 py-16 md:py-20">
                <div className="w-20 h-20 border border-white rounded-full flex items-center justify-center">
                  <ArrowUpRight size={32} className="text-white" />
                </div>
                <h3 className="font-bebas text-3xl md:text-4xl text-white tracking-widest text-center">
                  MESSAGE SENT!
                </h3>
                <p className="font-satoshi text-white/50 text-sm text-center max-w-xs">
                  Thank you for reaching out. I&apos;ll get back to you within 24
                  hours.
                </p>
              </div>
            ) : (
              <form
                name="contact"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 md:gap-5"
              >
                <input type="hidden" name="form-name" value="contact" />
                <input
                  type="text"
                  name="bot-field"
                  value={formData["bot-field"]}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {/* Name */}
                <div className="form-field flex flex-col gap-2">
                  <label className="font-satoshi text-xs text-white/40 tracking-widest uppercase">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="bg-zinc-950 border border-white/10 text-white font-satoshi text-sm px-4 py-4 rounded-xl focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/20"
                  />
                </div>

                {/* Email */}
                <div className="form-field flex flex-col gap-2">
                  <label className="font-satoshi text-xs text-white/40 tracking-widest uppercase">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="bg-zinc-950 border border-white/10 text-white font-satoshi text-sm px-4 py-4 rounded-xl focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/20"
                  />
                </div>

                {/* Phone */}
                <div className="form-field flex flex-col gap-2">
                  <label className="font-satoshi text-xs text-white/40 tracking-widest uppercase">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+00 000 000 0000"
                    className="bg-zinc-950 border border-white/10 text-white font-satoshi text-sm px-4 py-4 rounded-xl focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/20"
                  />
                </div>

                {/* Service */}
                <div className="form-field flex flex-col gap-2">
                  <label className="font-satoshi text-xs text-white/40 tracking-widest uppercase">
                    Service
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="bg-zinc-950 border border-white/10 text-white/60 font-satoshi text-sm px-4 py-4 rounded-xl focus:outline-none focus:border-white transition-colors duration-300 appearance-none"
                  >
                    <option value="">Select a Service</option>
                    {services.map((s, i) => (
                      <option key={i} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="form-field flex flex-col gap-2">
                  <label className="font-satoshi text-xs text-white/40 tracking-widest uppercase">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your needs..."
                    rows={5}
                    className="bg-zinc-950 border border-white/10 text-white font-satoshi text-sm px-4 py-4 rounded-xl focus:outline-none focus:border-white transition-colors duration-300 placeholder:text-white/20 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="submit-btn form-field group flex items-center justify-center gap-1.5 font-satoshi text-xs tracking-[0.2em] uppercase border border-white/25 bg-black/30 text-white px-5 py-3 rounded-full backdrop-blur-[32px] hover:bg-white hover:text-black hover:border-white transition-all duration-300 w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-black/30 disabled:hover:text-white"
                >
                  {sending ? "Sending..." : "Send Message"}
                  <Send
                    size={16}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>

                {error && (
                  <p className="form-field font-satoshi text-red-400 text-xs text-center -mt-1">
                    {error}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
