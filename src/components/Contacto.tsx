import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import Logo from "./Logo";

export default function Contacto() {
  const { t, language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    setIsSending(true);

    try {
      // 1. Send data to the local Express contact endpoint
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          projectType: "Proyecto Residencial",
          message: msg,
          budget: "A medida"
        })
      });

      // 2. Also save to the leads database proxy
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          message: msg,
          source: "Formulario de Contacto"
        })
      });

      // Trigger Google Analytics 4 & Meta Pixel Tracking Events
      if (typeof window !== "undefined") {
        const win = window as any;
        if (win.gtag) {
          win.gtag('event', 'generate_lead', {
            event_category: 'contact',
            event_label: 'Formulario de Contacto',
            value: 1
          });
        }
        if (win.fbq) {
          win.fbq('track', 'Lead', {
            content_name: 'Formulario de Contacto',
            status: 'success'
          });
        }
      }

      // 3. Prepare personalized welcome message for WhatsApp
      const welcomeText = language === "es"
        ? `Hola UNO Arquitectos, me he registrado en su formulario de contacto. Mi nombre es ${name}, mi correo es ${email} y mi teléfono es ${phone}. Me interesa atención técnica para mi proyecto.`
        : `Hello UNO Arquitectos, I filled out your contact form. My name is ${name}, my email is ${email} and my phone is ${phone}. I am interested in technical consultation for my project.`;
      
      const whatsappUrl = `https://wa.me/5219841234567?text=${encodeURIComponent(welcomeText)}`;
      
      window.open(whatsappUrl, "_blank");

      setSubmitted(true);
      setName("");
      setEmail("");
      setPhone("");
      setMsg("");
    } catch (err) {
      console.error("Error submitting contact form lead:", err);
      setSubmitted(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contacto" className="py-28 md:py-36 px-6 md:px-12 bg-white text-[#4A4A4A] font-sans relative border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        
        {/* LEVEL 2 CONVERSION TAGLINE BANNER */}
        <div className="mb-16 text-center">
          <span className="text-[#00A3A3] text-sm md:text-base font-semibold uppercase tracking-[0.3em] block">
            {t("contacto.conversionTagline") || "Diseño con sentido. Construcción con criterio."}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* INFO COLUMN */}
          <div className="lg:col-span-5 text-left">
            <Logo showText={false} iconSize={40} className="mb-6 opacity-90 text-[#00A3A3]" />
            <span className="text-[#00A3A3] text-xs uppercase tracking-[0.3em] font-semibold block mb-3">
              {t("contacto.tagline")}
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0a0a0a] mb-6">
              {t("contacto.heading")}
            </h2>
            <p className="text-[#4A4A4A] text-sm leading-relaxed mb-10 max-w-md font-normal">
              {t("contacto.desc")}
            </p>

            <div className="space-y-8">
              
              {/* Off 1 - Tulum */}
              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-[#00A3A3] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#0a0a0a]">{t("contacto.showroomTulum")}</h3>
                  <p className="text-xs text-[#4A4A4A] font-normal mt-1 leading-relaxed">{t("contacto.showroomTulumAddr")}</p>
                </div>
              </div>

              {/* Off 2 - CDMX */}
              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-[#0a0a0a]">{t("contacto.cdmxOffice")}</h3>
                  <p className="text-xs text-[#4A4A4A] font-normal mt-1 leading-relaxed">{t("contacto.cdmxOfficeAddr")}</p>
                </div>
              </div>

              {/* Tel & Mail */}
              <div className="pt-8 border-t border-zinc-100 space-y-4 text-xs text-[#4A4A4A]">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#00A3A3]" />
                  <span>+52 (984) 123 4567 • +52 (55) 9876 5432</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#00A3A3]" />
                  <a href="mailto:hola@unoarquitectos.com" className="hover:text-[#00A3A3] transition-colors">
                    hola@unoarquitectos.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  <span>{t("contacto.workHours")}</span>
                </div>
              </div>

            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-7 bg-[#DDDDD9]/30 border border-zinc-200/60 p-8 md:p-12 rounded-xs relative text-left shadow-xs overflow-hidden">
            {/* Aesthetic watermarked Logo in background */}
            <div className="absolute -right-6 -top-6 opacity-[0.04] pointer-events-none select-none">
              <Logo showText={false} iconSize={180} />
            </div>
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#00A3A3]/10 text-[#00A3A3] flex items-center justify-center mb-6 border border-[#00A3A3]/30">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-[#0a0a0a] mb-2">{t("contacto.successTitle")}</h3>
                <p className="text-[#4A4A4A] text-sm max-w-sm mx-auto leading-relaxed">
                  {t("contacto.successDesc")}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-xs font-semibold uppercase tracking-widest text-[#00A3A3] hover:text-[#006666] transition-colors cursor-pointer"
                >
                  {t("contacto.successAnother")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-semibold text-[#0a0a0a] mb-2">{t("contacto.formHeading")}</h3>
                <p className="text-xs text-[#4A4A4A] mb-6">{t("contacto.formSubheading")}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#0a0a0a] mb-2 font-semibold" htmlFor="con-name">
                      {t("contacto.fullName")}
                    </label>
                    <input
                      id="con-name"
                      type="text"
                      required
                      placeholder={t("contacto.fullNamePlaceholder")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-xs py-3 px-4 text-sm text-[#0a0a0a] focus:outline-none focus:border-[#00A3A3] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#0a0a0a] mb-2 font-semibold" htmlFor="con-tel">
                      {t("contacto.phone")}
                    </label>
                    <input
                      id="con-tel"
                      type="tel"
                      required
                      placeholder={t("contacto.phonePlaceholder")}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-zinc-300 rounded-xs py-3 px-4 text-sm text-[#0a0a0a] focus:outline-none focus:border-[#00A3A3] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#0a0a0a] mb-2 font-semibold" htmlFor="con-email">
                    {t("contacto.email")}
                  </label>
                  <input
                    id="con-email"
                    type="email"
                    required
                    placeholder={t("contacto.emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-xs py-3 px-4 text-sm text-[#0a0a0a] focus:outline-none focus:border-[#00A3A3] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#0a0a0a] mb-2 font-semibold" htmlFor="con-msg">
                    {t("contacto.additionalMsg")}
                  </label>
                  <textarea
                    id="con-msg"
                    rows={4}
                    required
                    placeholder={t("contacto.additionalMsgPlaceholder")}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-xs p-4 text-sm text-[#0a0a0a] focus:outline-none focus:border-[#00A3A3] transition-colors"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full bg-[#00A3A3] hover:bg-[#006666] text-white py-4 text-xs font-semibold uppercase tracking-[0.25em] transition-all flex items-center justify-center gap-2 rounded-xs cursor-pointer shadow-md ${isSending ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  <Send className="w-4 h-4 text-white" />
                  {isSending ? (language === "es" ? "Enviando..." : "Sending...") : t("contacto.btnSubmit")}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
