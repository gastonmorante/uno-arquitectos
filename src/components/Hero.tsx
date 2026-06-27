import React from "react";
import { MoveDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { language, t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const heading1 = language === "es" ? "La Pureza" : language === "en" ? "The Purity" : language === "it" ? "La Purezza" : "La Pureté";
  const heading2 = language === "es" ? "de lo Esencial" : language === "en" ? "of the Essential" : language === "it" ? "dell'Essenziale" : "de l'Essentiel";
  const btn1 = language === "es" ? "Comenzar Proyecto" : language === "en" ? "Start Project" : language === "it" ? "Inizia Progetto" : "Commencer Projet";
  const btn2 = t("nav.portfolio");
  const scrollText = language === "es" ? "Deslizar para explorar" : language === "en" ? "Scroll to explore" : language === "it" ? "Scorri per esplorare" : "Faites défiler pour explorer";

  return (
    <section
      id="inicio"
      className="relative h-screen w-full flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Background Image with Ken Burns Zoom */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=95"
          className="w-full h-full object-cover opacity-60 scale-105"
          id="hero-img"
          alt="Luxury Tropical Brutalist Architecture by Leica SL2 35mm"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-zinc-950/95"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl">
        <div className="overflow-hidden mb-6">
          <span className="hero-stagger block text-[#0B9488] text-[10px] md:text-xs uppercase tracking-[0.6em] font-mono font-bold">
            {t("hero.tagline")}
          </span>
        </div>
        
        <h1 className="serif text-white text-5xl md:text-8xl leading-[1.05] tracking-tight mb-10">
          {heading1} <span className="italic font-light text-zinc-300">{language === "es" ? "de" : language === "en" ? "of" : language === "it" ? "de" : "de"}</span> <br />
          <span className="text-[#0B9488]">{heading2}.</span>
        </h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-12">
          <p className="text-zinc-300 max-w-md text-sm font-light leading-relaxed text-center md:text-left">
            {t("hero.subheading")}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={() => scrollToSection("contacto")}
              className="px-10 py-5 bg-[#0B9488] hover:bg-[#097b70] text-white text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-300 rounded-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0b9488]/20 cursor-pointer"
            >
              {btn1}
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="px-10 py-5 border border-white/20 hover:border-white text-white text-[10px] uppercase tracking-[0.4em] font-bold transition-all duration-300 rounded-sm hover:bg-white hover:text-black cursor-pointer"
            >
              {btn2}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator on Left */}
      <div 
        onClick={() => scrollToSection("filosofia")}
        className="absolute bottom-10 left-12 hidden md:flex items-center gap-3 cursor-pointer group z-20"
      >
        <div className="flex items-center gap-3 bg-black/70 hover:bg-black/90 border border-zinc-700/50 hover:border-[#0B9488]/60 px-5 py-3 rounded-full transition-all duration-300 shadow-xl backdrop-blur-md">
          <span className="w-1.5 h-1.5 bg-[#0B9488] rounded-full animate-ping"></span>
          <span className="text-zinc-100 hover:text-white text-[10px] tracking-[0.4em] uppercase font-mono font-semibold transition-colors">
            {scrollText}
          </span>
          <MoveDown className="w-3.5 h-3.5 text-[#0B9488] animate-bounce transition-transform group-hover:translate-y-0.5" />
        </div>
      </div>
    </section>
  );
}
