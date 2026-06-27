import React from "react";
import { Trees, ShieldCheck, HeartHandshake } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Filosofia() {
  const { language, t } = useLanguage();

  const headerText = language === "es" 
    ? <>Arquitectura que <span className="italic text-zinc-400 font-light">respira</span> con el entorno.</>
    : language === "en"
    ? <>Architecture that <span className="italic text-zinc-400 font-light">breathes</span> with the environment.</>
    : language === "it"
    ? <>Architettura che <span className="italic text-zinc-400 font-light">respira</span> con l'ambiente.</>
    : <>Une architecture qui <span className="italic text-zinc-400 font-light">respire</span> avec l'environnement.</>;

  return (
    <section id="filosofia" className="relative py-28 md:py-44 px-6 md:px-12 bg-[#fcfcfc] text-[#0a0a0a]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* Left Column - High-End Real Estate Portrait Image */}
        <div className="lg:col-span-5 text-left order-2 lg:order-1">
          <div className="overflow-hidden border border-zinc-200/60 bg-zinc-100 shadow-2xl relative group">
            <div className="absolute top-4 right-4 z-10 bg-black/70 backdrop-blur-md text-white text-[8px] font-mono tracking-widest uppercase py-1 px-2.5 rounded-xs">
              Leica SL2 • Noctilux 50mm
            </div>
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&h=1400&q=95" 
              className="w-full object-cover h-[50vh] md:h-[65vh] hover:scale-105 transition-transform duration-[1.5s]" 
              alt="High-End Real Estate Architectural Detail"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        
        {/* Right Column - Text Details */}
        <div className="lg:col-span-7 text-left order-1 lg:order-2">
          <span className="text-[#0B9488] text-[10px] uppercase tracking-[0.5em] font-bold block mb-6 font-mono">
            {t("filosofia.tagline")}
          </span>
          
          <h2 className="serif text-4xl md:text-6xl leading-[1.15] mb-8 text-[#0a0a0a]">
            {headerText}
          </h2>
          
          <div className="space-y-6 text-zinc-600 text-sm md:text-base font-light leading-relaxed mb-10 font-sans">
            <p>{t("filosofia.p1")}</p>
            <p>{t("filosofia.p2")}</p>
            <p>{t("filosofia.p3")}</p>
          </div>

          {/* Premium Visual Icons and Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-zinc-200/80 pt-8 font-sans">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#0B9488]/10 flex items-center justify-center text-[#0B9488] border border-[#0B9488]/20 shadow-xs">
                  <Trees className="w-4 h-4 stroke-[2]" />
                </div>
                <h4 className="font-semibold text-xs uppercase tracking-widest text-[#0a0a0a]">
                  {t("filosofia.valSust")}
                </h4>
              </div>
              <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
                {t("filosofia.valSustDesc")}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#0B9488]/10 flex items-center justify-center text-[#0B9488] border border-[#0B9488]/20 shadow-xs">
                  <HeartHandshake className="w-4 h-4 stroke-[2]" />
                </div>
                <h4 className="font-semibold text-xs uppercase tracking-widest text-[#0a0a0a]">
                  {t("filosofia.valIntegr")}
                </h4>
              </div>
              <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
                {t("filosofia.valIntegrDesc")}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-[#0B9488]/10 flex items-center justify-center text-[#0B9488] border border-[#0B9488]/20 shadow-xs">
                  <ShieldCheck className="w-4 h-4 stroke-[2]" />
                </div>
                <h4 className="font-semibold text-xs uppercase tracking-widest text-[#0a0a0a]">
                  {t("filosofia.valIng")}
                </h4>
              </div>
              <p className="text-[11px] text-zinc-500 font-light leading-relaxed">
                {t("filosofia.valIngDesc")}
              </p>
            </div>
          </div>

          <div className="h-[1px] w-24 bg-[#0B9488] mt-10"></div>
        </div>

      </div>
    </section>
  );
}
