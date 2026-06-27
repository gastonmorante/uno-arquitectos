import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Filosofia from './components/Filosofia';
import Servicios from './components/Servicios';
import Portfolio from './components/Portfolio';
import AIConsultant from './components/AIConsultant';
import Contacto from './components/Contacto';
import Preloader from './components/Preloader';
import { LanguageProvider } from './context/LanguageContext';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos un tiempo de carga elegante para la inicialización
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      {loading ? (
        <Preloader />
      ) : (
        <div id="app-root" className="min-h-screen bg-slate-950 text-slate-100 selection:bg-teal-500 selection:text-slate-950 transition-colors duration-300">
          <Navbar />
          <main id="main-content">
            <section id="inicio">
              <Hero />
            </section>
            <section id="filosofia">
              <Filosofia />
            </section>
            <section id="servicios">
              <Servicios />
            </section>
            <section id="portfolio">
              <Portfolio />
            </section>
            <section id="consulta-ia" className="relative z-10">
              <AIConsultant />
            </section>
            <section id="contacto">
              <Contacto />
            </section>
          </main>
          <footer id="main-footer" className="bg-slate-950 border-t border-slate-900/50 py-8 text-center text-xs text-slate-500 font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p>© {new Date().getFullYear()} UNO Arquitectos Mx. Todos los derechos reservados.</p>
            </div>
          </footer>
        </div>
      )}
    </LanguageProvider>
  );
}
