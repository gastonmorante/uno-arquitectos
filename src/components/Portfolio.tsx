import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { portfolioItems } from "../data/portfolio";

export default function Portfolio() {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<typeof portfolioItems[0] | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const handleSelectProject = (project: typeof portfolioItems[0]) => {
    setSelectedProject(project);
    setActiveImage(project.image);
  };

  return (
    <section id="portfolio" className="py-28 md:py-36 px-6 md:px-12 bg-[#FFFFFF] text-[#4A4A4A] font-sans border-t border-zinc-100">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-left">
          <span className="text-[#00A3A3] text-xs uppercase tracking-[0.4em] font-semibold block mb-3 animate-fadeIn">
            {t("portfolio.tagline")}
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1E1E1E] animate-slideUp">
            {t("portfolio.heading")}
          </h2>
          <p className="text-[#4A4A4A] text-sm mt-3 font-normal max-w-xl">
            {t("portfolio.desc")}
          </p>
        </div>

        {/* PORTFOLIO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {portfolioItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group bg-[#FFFFFF] border border-zinc-200/60 rounded-xs overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                  <img
                    src={item.image}
                    alt={language === "es" ? item.titleEs : item.titleEn}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => handleSelectProject(item)}
                      className="bg-white hover:bg-[#00A3A3] text-black hover:text-white p-3.5 rounded-full shadow-lg cursor-pointer transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      aria-label="Ver detalles"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[10px] font-medium tracking-wider text-[#1E1E1E] uppercase shadow-xs">
                    {language === "es" ? "Proyecto Residencial" : "Residential Project"}
                  </span>
                </div>

                <div className="p-6 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-[#1E1E1E] mb-2 group-hover:text-[#00A3A3] transition-colors">
                      {language === "es" ? item.titleEs : item.titleEn}
                    </h3>
                    <p className="text-[#00A3A3] font-medium text-xs mb-3">
                      {language === "es" ? item.locationEs : item.locationEn}
                    </p>
                    <p className="text-[#4A4A4A] text-sm leading-relaxed mb-6 font-normal">
                      {language === "es" ? item.descEs : item.descEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#C8B89A]/30 flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-wider text-[#4A4A4A]">
                      {item.area}
                    </span>
                    <button
                      onClick={() => handleSelectProject(item)}
                      className="text-xs font-semibold uppercase tracking-widest text-[#00A3A3] hover:text-[#006666] flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      {language === "es" ? "Explorar Ficha" : "Explore Case"}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1E1E1E]/90 z-50 overflow-y-auto flex justify-center items-start py-10 px-4 md:px-12 backdrop-blur-md font-sans"
          >
            <div className="relative w-full max-w-6xl bg-white text-[#4A4A4A] rounded-xs overflow-hidden my-auto shadow-2xl">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 bg-black/10 hover:bg-black/20 text-[#1E1E1E] p-2.5 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Visual Viewport with Thumbnail Gallery */}
                <div className="lg:col-span-7 bg-[#1E1E1E] relative flex flex-col justify-between min-h-[450px]">
                  <div className="flex-1 w-full h-[380px] md:h-[450px] relative overflow-hidden">
                    <img
                      src={activeImage || selectedProject.image}
                      alt={language === "es" ? selectedProject.titleEs : selectedProject.titleEn}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                    <div className="absolute bottom-4 left-4 bg-[#1E1E1E]/85 backdrop-blur-md px-4 py-2 text-white text-xs font-medium tracking-wider">
                      {language === "es" ? selectedProject.locationEs : selectedProject.locationEn}
                    </div>
                  </div>

                  {/* Interiores / Exterior Selector */}
                  <div className="bg-[#1E1E1E] p-4 flex gap-3 overflow-x-auto border-t border-zinc-800 justify-start items-center">
                    {selectedProject.gallery.map((img, i) => {
                      const isSelected = (activeImage || selectedProject.image) === img.url;
                      return (
                        <button
                          key={i}
                          onClick={() => setActiveImage(img.url)}
                          className={`flex-shrink-0 w-16 h-12 border rounded-xs overflow-hidden transition-all duration-300 relative group cursor-pointer ${
                            isSelected ? "border-[#00A3A3] scale-105 ring-1 ring-[#00A3A3]" : "border-zinc-800 hover:border-zinc-600"
                          }`}
                        >
                          <img src={img.url} alt={img.name} loading="lazy" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                          <span className="absolute bottom-0 left-0 right-0 bg-black/85 text-[8px] text-white font-medium text-center truncate py-0.5 tracking-wider uppercase">
                            {img.name}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Technical / Info Panel */}
                <div className="lg:col-span-5 p-8 md:p-12 text-left flex flex-col justify-between">
                  <div>
                    <span className="text-[#00A3A3] text-xs uppercase tracking-[0.3em] font-semibold block mb-3">
                      {language === "es" ? "Ficha Técnica de Proyecto" : "Technical Project File"}
                    </span>
                    <h3 className="text-3xl font-semibold text-[#1E1E1E] mb-3">
                      {language === "es" ? selectedProject.titleEs : selectedProject.titleEn}
                    </h3>
                    <p className="text-[#4A4A4A] text-sm leading-relaxed mb-8">
                      {language === "es" ? selectedProject.descEs : selectedProject.descEn}
                    </p>

                    <div className="space-y-4 border-t border-b border-[#C8B89A]/30 py-6 mb-8 text-xs text-[#4A4A4A]">
                      <div className="flex justify-between">
                        <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">Área:</span>
                        <span className="text-[#1E1E1E] font-semibold">{selectedProject.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">{language === "es" ? "Material Principal:" : "Main Material:"}</span>
                        <span className="text-[#1E1E1E] font-semibold">{selectedProject.materials}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500 uppercase tracking-wider text-[10px] font-semibold">{language === "es" ? "Tipo de Proyecto:" : "Project Type:"}</span>
                        <span className="text-[#1E1E1E] font-semibold">{selectedProject.type}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1E1E1E] mb-2">
                        {language === "es" ? "Especificaciones Estructurales:" : "Structural Highlights:"}
                      </h4>
                      {(language === "es" ? selectedProject.specsEs : selectedProject.specsEn).map((spec, i) => (
                        <div key={i} className="flex gap-2.5 items-start text-xs text-[#4A4A4A]">
                          <CheckCircle2 className="w-4 h-4 text-[#00A3A3] flex-shrink-0 mt-0.5" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-[#C8B89A]/30 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        const event = new CustomEvent("open-ai-chat");
                        window.dispatchEvent(event);
                      }}
                      className="bg-[#00A3A3] hover:bg-[#006666] text-white px-6 py-3.5 text-xs uppercase font-semibold tracking-widest rounded-xs transition-colors cursor-pointer w-full text-center"
                    >
                      {language === "es" ? "Consultar Proyecto Similar" : "Consult Similar Project"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
