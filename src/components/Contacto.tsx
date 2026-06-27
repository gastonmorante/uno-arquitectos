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
      // 1. Send data to the local Express contact endpoint (triggers nodemailer)
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          projectType: "Residencial de Ultra-Lujo",
          message: msg,
          budget: "Bespoke / A medida"
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

      // 3. Prepare personalized welcome message for WhatsApp
      const welcomeText = language === "es"
        ? `Hola UNO Arquitectos, acabo de registrarme en su formulario de contacto. Mi nombre es ${name}, mi correo es ${email} y mi teléfono es ${phone}. Me interesa recibir asesoría técnica y atención inmediata para mi proyecto.`
        : `Hello UNO Arquitectos, I just filled out your contact form. My name is ${name}, my email is ${email} and my phone is ${phone}. I am interested in receiving technical advice and immediate attention for my project.`;
      
      const whatsappUrl = `https://wa.me/5219841234567?text=${encodeURIComponent(welcomeText)}`;
      
      // Open WhatsApp welcome thread in a new window/tab
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
    <section id="contacto" className="py-28 px-6 md:px-12 bg-white text-[#0a0a0a] relative border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* INFO COLUMN */}
          <div className="lg:col-span-5 text-left">
            <Logo showText={false} iconSize={44} className="mb-6 opacity-90 text-[#0B9488]" />
            <span className="text-[#0B9488] text-[10px] uppercase tracking-[0.5em] font-bold block mb-4 font-mono">
              {t("contacto.tagline")}
            </span>
            <h2 className="serif text-4xl md:text-5xl tracking-tight text-zinc-900 mb-6">
              {t("contacto.heading")}
            </h2>
            <p className="text-zinc-500 font-light text-sm leading-relaxed mb-10 max-w-md font-sans">
              {t("contacto.desc")}
            </p>

            <div className="space-y-8">
              
              {/* Off 1 - Tulum */}
              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-[#0B9488] flex-shrink-0 mt-0.5" />
                <div className="font-sans">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900">{t("contacto.showroomTulum")}</h4>
                  <p className="text-xs text-zinc-500 font-light mt-1 leading-relaxed">{t("contacto.showroomTulumAddr")}</p>
                </div>
              </div>

              {/* Off 2 - CDMX */}
              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5" />
                <div className="font-sans">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-900">{t("contacto.cdmxOffice")}</h4>
                  <p className="text-xs text-zinc-500 font-light mt-1 leading-relaxed">{t("contacto.cdmxOfficeAddr")}</p>
                </div>
              </div>

              {/* Tel & Mail */}
              <div className="pt-8 border-t border-zinc-100 space-y-4 font-mono text-xs text-zinc-650">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-zinc-400" />
                  <span>+52 (984) 123 4567 • +52 (55) 9876 5432</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <a href="mailto:hola@unoarquitectos.com" className="hover:text-[#0B9488] hover:underline">
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
          <div className="lg:col-span-7 bg-[#fcfcfc] border border-zinc-200/50 p-8 md:p-12 rounded-sm relative text-left shadow-sm overflow-hidden font-sans">
            {/* Aesthetic watermarked Logo in background */}
            <div className="absolute -right-6 -top-6 opacity-[0.03] pointer-events-none select-none">
              <Logo showText={false} iconSize={180} />
            </div>
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-[#0B9488]/10 text-[#0B9488] flex items-center justify-center mb-6 border border-[#0B9488]/20 shadow-xs">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="serif text-2xl text-zinc-900 mb-2">{t("contacto.successTitle")}</h3>
                <p className="text-zinc-500 text-sm font-light max-w-sm mx-auto leading-relaxed">
                  {t("contacto.successDesc")}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-xs font-bold uppercase tracking-widest text-[#0B9488] hover:text-[#097b70] border-b border-transparent hover:border-[#0b9488] transition-all cursor-pointer"
                >
                  {t("contacto.successAnother")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="serif text-xl text-zinc-900 mb-2">{t("contacto.formHeading")}</h3>
                <p className="text-xs text-zinc-500 font-light mb-6">{t("contacto.formSubheading")}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-mono font-bold" htmlFor="con-name">
                      {t("contacto.fullName")}
                    </label>
                    <input
                      id="con-name"
                      type="text"
                      required
                      placeholder={t("contacto.fullNamePlaceholder")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-sm py-2.5 px-4 text-sm text-black focus:outline-none focus:border-[#0B9488]/60 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-mono font-bold" htmlFor="con-tel">
                      {t("contacto.phone")}
                    </label>
                    <input
                      id="con-tel"
                      type="tel"
                      required
                      placeholder={t("contacto.phonePlaceholder")}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-zinc-200 rounded-sm py-2.5 px-4 text-sm text-black focus:outline-none focus:border-[#0B9488]/60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-mono font-bold" htmlFor="con-email">
                    {t("contacto.email")}
                  </label>
                  <input
                    id="con-email"
                    type="email"
                    required
                    placeholder={t("contacto.emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-sm py-2.5 px-4 text-sm text-black focus:outline-none focus:border-[#0B9488]/60 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-mono font-bold" htmlFor="con-msg">
                    {t("contacto.additionalMsg")}
                  </label>
                  <textarea
                    id="con-msg"
                    rows={4}
                    required
                    placeholder={t("contacto.additionalMsgPlaceholder")}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-sm p-4 text-sm text-black focus:outline-none focus:border-[#0B9488]/60 transition-colors"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full bg-[#0a0a0a] hover:bg-zinc-800 text-white py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 rounded-sm cursor-pointer shadow-md hover:shadow-lg ${isSending ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  <Send className="w-3.5 h-3.5 text-[#0B9488]" />
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
