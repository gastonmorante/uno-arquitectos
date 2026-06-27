import React, { useState, useEffect } from "react";
import { Compass, Menu, X } from "lucide-react";
import Logo from "./Logo";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      id="navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md py-4 border-zinc-200/40 shadow-sm text-zinc-950"
          : "bg-transparent py-6 border-transparent text-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* LEFT GROUP: LANGUAGE SELECTOR & LOGO */}
        <div className="flex items-center gap-4 md:gap-6">
          <LanguageSelector isScrolled={isScrolled} theme="adaptive" />
          
          <div 
            onClick={() => scrollToSection("inicio")}
            className="cursor-pointer group"
          >
            <Logo 
              isScrolled={isScrolled} 
              theme="adaptive" 
              iconSize={32} 
              textSize="text-sm sm:text-base md:text-lg lg:text-xl" 
            />
          </div>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-10 text-[10px] font-semibold uppercase tracking-[0.4em]">
          <button
            onClick={() => scrollToSection("filosofia")}
            className={`transition-colors cursor-pointer ${
              isScrolled ? "text-zinc-600 hover:text-accent" : "text-white/80 hover:text-accent"
            }`}
          >
            {t("nav.filosofia")}
          </button>
          <button
            onClick={() => scrollToSection("servicios")}
            className={`transition-colors cursor-pointer ${
              isScrolled ? "text-zinc-600 hover:text-accent" : "text-white/80 hover:text-accent"
            }`}
          >
            {t("nav.servicios")}
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className={`transition-colors cursor-pointer ${
              isScrolled ? "text-zinc-600 hover:text-accent" : "text-white/80 hover:text-accent"
            }`}
          >
            {t("nav.portfolio")}
          </button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("open-ai-chat"))}
            className="text-accent hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-1.5 font-bold"
          >
            <Compass className="w-3.5 h-3.5 animate-spin-slow" />
            {t("nav.planner")}
          </button>
          <button
            onClick={() => scrollToSection("contacto")}
            className={`transition-all duration-300 px-6 py-2 border text-[10px] font-bold uppercase tracking-widest rounded-sm cursor-pointer ${
              isScrolled
                ? "border-zinc-900/10 hover:bg-accent hover:text-white hover:border-accent text-zinc-900"
                : "border-white/20 hover:bg-accent hover:text-white hover:border-accent text-white"
            }`}
          >
            {t("nav.contacto")}
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`focus:outline-none transition-colors cursor-pointer p-1 ${
              isScrolled ? "text-zinc-950" : "text-white"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[73px] left-0 w-full bg-white border-b border-zinc-150 py-8 px-8 flex flex-col space-y-5 animate-fadeIn z-40 shadow-xl text-zinc-950">
          <button
            onClick={() => scrollToSection("filosofia")}
            className="text-left text-xs uppercase tracking-[0.3em] font-semibold text-zinc-700 hover:text-accent"
          >
            {t("nav.filosofia")}
          </button>
          <button
            onClick={() => scrollToSection("servicios")}
            className="text-left text-xs uppercase tracking-[0.3em] font-semibold text-zinc-700 hover:text-accent"
          >
            {t("nav.servicios")}
          </button>
          <button
            onClick={() => scrollToSection("portfolio")}
            className="text-left text-xs uppercase tracking-[0.3em] font-semibold text-zinc-700 hover:text-accent"
          >
            {t("nav.portfolio")}
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              window.dispatchEvent(new CustomEvent("open-ai-chat"));
            }}
            className="text-left text-xs uppercase tracking-[0.3em] font-bold text-accent flex items-center gap-2"
          >
            <Compass className="w-4 h-4 animate-spin-slow" />
            {t("nav.planner")}
          </button>
          <button
            onClick={() => scrollToSection("contacto")}
            className="text-center bg-accent text-white py-3 px-6 text-xs font-bold uppercase tracking-widest"
          >
            {t("nav.contacto")}
          </button>
        </div>
      )}
    </nav>
  );
}
