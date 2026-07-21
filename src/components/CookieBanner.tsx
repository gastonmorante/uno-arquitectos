import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function CookieBanner() {
  const { language } = useLanguage();
  const isEs = language === "es";

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("uno_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3200); // Elegant delay after preloader completes
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("uno_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleOpenPrivacy = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-legal", { detail: { tab: "privacy" } }));
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-6 right-6 left-6 md:left-auto md:max-w-md z-40 bg-[#0a0a0a] text-white border border-zinc-800 p-5 rounded-xs shadow-2xl font-sans"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 text-[#00A3A3]">
              <Cookie className="w-5 h-5" />
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                {isEs ? "Privacidad & Cookies" : "Privacy & Cookie Preferences"}
              </h4>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-zinc-500 hover:text-white transition-colors cursor-pointer p-1"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-zinc-400 font-normal leading-relaxed mb-4 text-left">
            {isEs
              ? "Utilizamos cookies y tecnologías esenciales para mejorar su experiencia de navegación, optimizar el rendimiento del Asesor AI y garantizar la seguridad según nuestro Aviso de Privacidad."
              : "We use essential cookies and technologies to enhance your experience, optimize AI Advisor performance, and ensure privacy according to Mexican regulations."}
          </p>

          <div className="flex items-center justify-between gap-3 border-t border-zinc-800/80 pt-3">
            <button
              onClick={handleOpenPrivacy}
              className="text-[11px] text-zinc-400 hover:text-[#00A3A3] underline transition-colors cursor-pointer flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {isEs ? "Aviso de Privacidad" : "Privacy Notice"}
            </button>

            <button
              onClick={handleAccept}
              className="px-4 py-2 bg-[#00A3A3] hover:bg-[#006666] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer shadow-xs"
            >
              {isEs ? "Aceptar" : "Accept All"}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
