import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { FileText, Hammer, Landmark, Award, Eye } from "lucide-react";

export default function Servicios() {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="py-28 md:py-36 px-6 md:px-12 bg-[#DDDDD9] text-[#1E1E1E] relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-6 text-left">
          <div className="space-y-2">
            <span className="text-[#00A3A3] text-xs uppercase tracking-[0.4em] font-semibold block">
              {t("servicios.tagline")}
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-[#1E1E1E]">
              {t("servicios.heading")}
            </h2>
          </div>
          <p className="text-[#4A4A4A] max-w-md text-sm leading-relaxed font-normal">
            {t("servicios.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 text-left">
          
          {/* SERVICIO 01 */}
          <div className="bg-[#FFFFFF] p-8 md:p-10 rounded-xs shadow-xs border border-zinc-200/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[380px] group">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[#00A3A3] text-sm font-semibold tracking-widest block">01</span>
                <div className="w-10 h-10 rounded-full bg-[#00A3A3]/10 text-[#00A3A3] flex items-center justify-center group-hover:bg-[#00A3A3] group-hover:text-white transition-all duration-300">
                  <FileText className="w-4 h-4 stroke-[2]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1E1E1E] group-hover:text-[#00A3A3] transition-colors">
                {t("servicios.phases.f0")}
              </h3>
              <p className="text-[#4A4A4A] text-sm font-normal leading-relaxed">
                {t("servicios.phases.f0Desc")}
              </p>
            </div>
            <div className="w-12 group-hover:w-full h-[2px] bg-[#00A3A3] transition-all duration-500 mt-6"></div>
          </div>

          {/* SERVICIO 02 */}
          <div className="bg-[#FFFFFF] p-8 md:p-10 rounded-xs shadow-xs border border-zinc-200/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[380px] group">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[#00A3A3] text-sm font-semibold tracking-widest block">02</span>
                <div className="w-10 h-10 rounded-full bg-[#00A3A3]/10 text-[#00A3A3] flex items-center justify-center group-hover:bg-[#00A3A3] group-hover:text-white transition-all duration-300">
                  <Hammer className="w-4 h-4 stroke-[2]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1E1E1E] group-hover:text-[#00A3A3] transition-colors">
                {t("servicios.phases.f1")}
              </h3>
              <p className="text-[#4A4A4A] text-sm font-normal leading-relaxed">
                {t("servicios.phases.f1Desc")}
              </p>
            </div>
            <div className="w-12 group-hover:w-full h-[2px] bg-[#00A3A3] transition-all duration-500 mt-6"></div>
          </div>

          {/* SERVICIO 03 */}
          <div className="bg-[#FFFFFF] p-8 md:p-10 rounded-xs shadow-xs border border-zinc-200/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[380px] group">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[#00A3A3] text-sm font-semibold tracking-widest block">03</span>
                <div className="w-10 h-10 rounded-full bg-[#00A3A3]/10 text-[#00A3A3] flex items-center justify-center group-hover:bg-[#00A3A3] group-hover:text-white transition-all duration-300">
                  <Landmark className="w-4 h-4 stroke-[2]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1E1E1E] group-hover:text-[#00A3A3] transition-colors">
                {t("servicios.phases.f2")}
              </h3>
              <p className="text-[#4A4A4A] text-sm font-normal leading-relaxed">
                {t("servicios.phases.f2Desc")}
              </p>
            </div>
            <div className="w-12 group-hover:w-full h-[2px] bg-[#00A3A3] transition-all duration-500 mt-6"></div>
          </div>

          {/* SERVICIO 04 */}
          <div className="bg-[#FFFFFF] p-8 md:p-10 rounded-xs shadow-xs border border-zinc-200/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[380px] group">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[#00A3A3] text-sm font-semibold tracking-widest block">04</span>
                <div className="w-10 h-10 rounded-full bg-[#00A3A3]/10 text-[#00A3A3] flex items-center justify-center group-hover:bg-[#00A3A3] group-hover:text-white transition-all duration-300">
                  <Award className="w-4 h-4 stroke-[2]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1E1E1E] group-hover:text-[#00A3A3] transition-colors">
                {t("servicios.phases.f3")}
              </h3>
              <p className="text-[#4A4A4A] text-sm font-normal leading-relaxed">
                {t("servicios.phases.f3Desc")}
              </p>
            </div>
            <div className="w-12 group-hover:w-full h-[2px] bg-[#00A3A3] transition-all duration-500 mt-6"></div>
          </div>

          {/* SERVICIO 05 */}
          <div className="bg-[#FFFFFF] p-8 md:p-10 rounded-xs shadow-xs border border-zinc-200/60 hover:shadow-md transition-all duration-300 flex flex-col justify-between min-h-[380px] group">
            <div>
              <div className="flex justify-between items-start">
                <span className="text-[#00A3A3] text-sm font-semibold tracking-widest block">05</span>
                <div className="w-10 h-10 rounded-full bg-[#00A3A3]/10 text-[#00A3A3] flex items-center justify-center group-hover:bg-[#00A3A3] group-hover:text-white transition-all duration-300">
                  <Eye className="w-4 h-4 stroke-[2]" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-8 mb-4 text-[#1E1E1E] group-hover:text-[#00A3A3] transition-colors">
                {t("servicios.phases.f4")}
              </h3>
              <p className="text-[#4A4A4A] text-sm font-normal leading-relaxed">
                {t("servicios.phases.f4Desc")}
              </p>
            </div>
            <div className="w-12 group-hover:w-full h-[2px] bg-[#00A3A3] transition-all duration-500 mt-6"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
