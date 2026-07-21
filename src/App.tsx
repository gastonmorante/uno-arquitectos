import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Filosofia from './components/Filosofia';
import Metrics from './components/Metrics';
import Servicios from './components/Servicios';
import Portfolio from './components/Portfolio';
import Faqs from './components/Faqs';
import AIConsultant from './components/AIConsultant';
import Contacto from './components/Contacto';
import Preloader from './components/Preloader';
import LegalNotice from './components/LegalNotice';
import CookieBanner from './components/CookieBanner';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  const openLegalModal = (tab: "privacy" | "terms") => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-legal", { detail: { tab } }));
    }
  };

  return (
    <LanguageProvider>
      {loading ? (
        <Preloader />
      ) : (
        <div id="app-root" className="min-h-screen bg-white text-[#4A4A4A] selection:bg-[#00A3A3] selection:text-white font-sans transition-colors duration-300">
          <Navbar />
          <main id="main-content">
            <section id="inicio">
              <Hero />
            </section>
            <section id="filosofia">
              <Filosofia />
            </section>
            <Metrics />
            <section id="servicios">
              <Servicios />
            </section>
            <section id="portfolio">
              <Portfolio />
            </section>
            <section id="faqs">
              <Faqs />
            </section>
            <section id="consulta-ia" className="relative z-10">
              <AIConsultant />
            </section>
            <section id="contacto">
              <Contacto />
            </section>
          </main>

          <footer id="main-footer" className="bg-[#0a0a0a] border-t border-zinc-800 py-10 text-center text-xs text-zinc-400 font-sans">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="font-normal text-zinc-400">
                © {new Date().getFullYear()} <span className="font-semibold text-white">UNO Arquitectos Mx</span>. Todos los derechos reservados.
              </p>
              <div className="flex gap-6 text-xs text-zinc-400 flex-wrap justify-center items-center">
                <a href="#filosofia" className="hover:text-[#00A3A3] transition-colors">Filosofía</a>
                <a href="#servicios" className="hover:text-[#00A3A3] transition-colors">Servicios</a>
                <a href="#portfolio" className="hover:text-[#00A3A3] transition-colors">Portafolio</a>
                <a href="#faqs" className="hover:text-[#00A3A3] transition-colors">FAQs</a>
                <a href="#contacto" className="hover:text-[#00A3A3] transition-colors">Contacto</a>
                <span className="text-zinc-700 hidden sm:inline">|</span>
                <button
                  onClick={() => openLegalModal("privacy")}
                  className="hover:text-[#00A3A3] transition-colors cursor-pointer"
                >
                  Aviso de Privacidad
                </button>
                <button
                  onClick={() => openLegalModal("terms")}
                  className="hover:text-[#00A3A3] transition-colors cursor-pointer"
                >
                  Términos de Servicio
                </button>
              </div>
            </div>
          </footer>

          {/* GLOBAL LEGAL COMPLIANCE & COOKIE CONSENT MODULES */}
          <LegalNotice />
          <CookieBanner />
        </div>
      )}
    </LanguageProvider>
  );
}
