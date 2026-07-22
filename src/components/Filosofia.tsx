import React from "react";
import { Trees, ShieldCheck, HeartHandshake } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Filosofia() {
  const { t } = useLanguage();

  return (
    <section id="filosofia" className="relative py-28 md:py-36 px-6 md:px-12 bg-white text-[#4A4A4A] font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* BRAND PURPOSE LEVEL 0 HERO BLOCK */}
        <div className="mb-20 text-center max-w-4xl mx-auto border-b border-zinc-100 pb-16">
          <span className="text-[#00A3A3] text-xs uppercase tracking-[0.4em] font-semibold block mb-4">
            {t("filosofia.tagline")}
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1E1E1E] leading-tight tracking-tight mb-6">
            "{t("filosofia.purpose")}"
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* Left Column - Clean Architectural Image */}
          <div className="lg:col-span-5 text-left order-2 lg:order-1">
            <div className="overflow-hidden border border-zinc-200/50 bg-zinc-100 shadow-md relative group rounded-xs">
              <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&h=1400&q=95" 
                className="w-full object-cover h-[45vh] md:h-[60vh] group-hover:scale-105 transition-transform duration-700" 
                alt="UNO Arquitectos Detalle Constructivo"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          {/* Right Column - Philosophy & Values */}
          <div className="lg:col-span-7 text-left order-1 lg:order-2">
            <h3 className="text-2xl md:text-4xl font-semibold text-[#1E1E1E] leading-snug mb-6 tracking-tight">
              {t("filosofia.heading")}
            </h3>
            
            <div className="space-y-5 text-[#4A4A4A] text-sm md:text-base font-normal leading-relaxed mb-10">
              <p>{t("filosofia.p1")}</p>
              <p>{t("filosofia.p2")}</p>
              <p>{t("filosofia.p3")}</p>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-zinc-200/60 pt-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#00A3A3]/10 flex items-center justify-center text-[#00A3A3]">
                    <Trees className="w-4 h-4 stroke-[2]" />
                  </div>
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#1E1E1E]">
                    {t("filosofia.valSust")}
                  </h4>
                </div>
                <p className="text-xs text-[#4A4A4A] font-normal leading-relaxed">
                  {t("filosofia.valSustDesc")}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#00A3A3]/10 flex items-center justify-center text-[#00A3A3]">
                    <HeartHandshake className="w-4 h-4 stroke-[2]" />
                  </div>
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#1E1E1E]">
                    {t("filosofia.valIntegr")}
                  </h4>
                </div>
                <p className="text-xs text-[#4A4A4A] font-normal leading-relaxed">
                  {t("filosofia.valIntegrDesc")}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-[#00A3A3]/10 flex items-center justify-center text-[#00A3A3]">
                    <ShieldCheck className="w-4 h-4 stroke-[2]" />
                  </div>
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[#1E1E1E]">
                    {t("filosofia.valIng")}
                  </h4>
                </div>
                <p className="text-xs text-[#4A4A4A] font-normal leading-relaxed">
                  {t("filosofia.valIngDesc")}
                </p>
              </div>
            </div>

            <div className="h-[2px] w-20 bg-[#00A3A3] mt-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
