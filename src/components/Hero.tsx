import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { language, t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const btn1 = language === "es" ? "Comenzar Proyecto" : language === "en" ? "Start Project" : language === "it" ? "Inizia Progetto" : "Commencer Projet";
  const btn2 = t("nav.portfolio");

  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] overflow-hidden font-sans pt-24 pb-16"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=95"
          className="w-full h-full object-cover opacity-50 scale-105"
          id="hero-img"
          alt="UNO Arquitectos Riviera Maya"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0a0a0a]"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-12">
        <div className="overflow-hidden mb-6">
          <span className="inline-block text-[#00A3A3] text-xs md:text-sm uppercase tracking-[0.4em] font-semibold">
            {t("hero.tagline")}
          </span>
        </div>
        
        <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-tight mb-8">
          UNO Arquitectos
        </h1>
        
        <p className="text-zinc-200 max-w-2xl text-base md:text-lg font-normal leading-relaxed mx-auto mb-12">
          {t("hero.subheading")}
        </p>
          
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <button
            onClick={() => scrollToSection("contacto")}
            className="w-full sm:w-auto px-8 py-4 bg-[#00A3A3] hover:bg-[#006666] text-white text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 rounded-xs cursor-pointer shadow-md"
          >
            {btn1}
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="w-full sm:w-auto px-8 py-4 border border-white/30 hover:border-white text-white text-xs font-semibold uppercase tracking-[0.25em] transition-all duration-300 rounded-xs hover:bg-white/10 cursor-pointer"
          >
            {btn2}
          </button>
        </div>
      </div>
    </section>
  );
}
