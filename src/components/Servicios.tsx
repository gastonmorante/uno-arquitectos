import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Hammer, Landmark, Award, Eye } from "lucide-react";

export default function Servicios() {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="py-32 px-6 md:px-12 bg-[#0a0a0a] text-white relative overflow-hidden">
      {/* Decorative dark background mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(#0B9488/0.03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-50"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-6 text-left">
          <div className="space-y-2">
            <span className="text-[#0B9488] text-[10px] uppercase tracking-[0.5em] font-bold block font-mono">
              {t("servicios.tagline")}
            </span>
            <h2 className="serif text-5xl md:text-8xl font-normal leading-tight">
              {t("servicios.heading")} <span className="text-[#0B9488] italic">Elite</span>.
            </h2>
          </div>
          <p className="text-zinc-500 max-w-sm text-xs uppercase tracking-[0.2em] leading-loose font-mono">
            {t("servicios.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 rounded-sm overflow-hidden text-left shadow-2xl">
          
          {/* SERVICIO 01 */}
          <div className="bg-[#0a0a0a] p-12 group hover:bg-zinc-900/80 transition-all duration-500 flex flex-col justify-between min-h-[420px] relative">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[#0B9488] font-mono text-sm font-bold tracking-widest block">01.</span>
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-[#0B9488] flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:border-[#0B9488]/40 transition-all duration-500 shadow-sm">
                  <Hammer className="w-3.5 h-3.5" />
                </div>
              </div>
              <h4 className="serif text-2xl mt-12 mb-6 text-zinc-100 group-hover:text-[#0B9488] transition-colors">
                {t("servicios.phases.f1")}
              </h4>
              <p className="text-zinc-400 font-light text-xs leading-relaxed mb-8 font-sans">
                {t("servicios.phases.f1Desc")}
              </p>
            </div>
            <div className="w-0 group-hover:w-full h-[1.5px] bg-[#0B9488] transition-all duration-500"></div>
          </div>

          {/* SERVICIO 02 */}
          <div className="bg-[#0a0a0a] p-12 group hover:bg-zinc-900/80 transition-all duration-500 flex flex-col justify-between min-h-[420px] relative">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[#0B9488] font-mono text-sm font-bold tracking-widest block">02.</span>
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-[#0B9488] flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:border-[#0B9488]/40 transition-all duration-500 shadow-sm">
                  <Landmark className="w-3.5 h-3.5" />
                </div>
              </div>
              <h4 className="serif text-2xl mt-12 mb-6 text-zinc-100 group-hover:text-[#0B9488] transition-colors">
                {t("servicios.phases.f2")}
              </h4>
              <p className="text-zinc-400 font-light text-xs leading-relaxed mb-8 font-sans">
                {t("servicios.phases.f2Desc")}
              </p>
            </div>
            <div className="w-0 group-hover:w-full h-[1.5px] bg-[#0B9488] transition-all duration-500"></div>
          </div>

          {/* SERVICIO 03 */}
          <div className="bg-[#0a0a0a] p-12 group hover:bg-zinc-900/80 transition-all duration-500 flex flex-col justify-between min-h-[420px] relative">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[#0B9488] font-mono text-sm font-bold tracking-widest block">03.</span>
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-[#0B9488] flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:border-[#0B9488]/40 transition-all duration-500 shadow-sm">
                  <Award className="w-3.5 h-3.5" />
                </div>
              </div>
              <h4 className="serif text-2xl mt-12 mb-6 text-zinc-100 group-hover:text-[#0B9488] transition-colors">
                {t("servicios.phases.f3")}
              </h4>
              <p className="text-zinc-400 font-light text-xs leading-relaxed mb-8 font-sans">
                {t("servicios.phases.f3Desc")}
              </p>
            </div>
            <div className="w-0 group-hover:w-full h-[1.5px] bg-[#0B9488] transition-all duration-500"></div>
          </div>

          {/* SERVICIO 04 */}
          <div className="bg-[#0a0a0a] p-12 group hover:bg-zinc-900/80 transition-all duration-500 flex flex-col justify-between min-h-[420px] relative">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[#0B9488] font-mono text-sm font-bold tracking-widest block">04.</span>
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-[#0B9488] flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:border-[#0B9488]/40 transition-all duration-500 shadow-sm">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>
              <h4 className="serif text-2xl mt-12 mb-6 text-zinc-100 group-hover:text-[#0B9488] transition-colors">
                {t("servicios.phases.f4")}
              </h4>
              <p className="text-zinc-400 font-light text-xs leading-relaxed mb-8 font-sans">
                {t("servicios.phases.f4Desc")}
              </p>
            </div>
            <div className="w-0 group-hover:w-full h-[1.5px] bg-[#0B9488] transition-all duration-500"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
