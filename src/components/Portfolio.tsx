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
    <section id="portfolio" className="py-24 px-6 md:px-12 bg-[#fafafa] text-zinc-900 border-t border-zinc-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-left">
          <span className="text-[#0B9488] text-[10px] uppercase tracking-[0.5em] font-bold block mb-3 font-mono animate-fadeIn">
            {t("portfolio.tagline")}
          </span>
          <h2 className="serif text-4xl md:text-5xl tracking-tight text-zinc-950 animate-slideUp">
            {t("portfolio.heading")}
          </h2>
          <p className="text-zinc-550 font-light text-xs mt-3 uppercase tracking-widest font-mono">
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
                className="group bg-white border border-zinc-200/50 rounded-xs overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between"
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
                      className="bg-white/90 hover:bg-white text-black p-3.5 rounded-full shadow-lg cursor-pointer transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                      aria-label="Ver detalles"
                    >
                      <Maximize2 className="w-5 h-5 text-zinc-900" />
                    </button>
                  </div>
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 text-[8px] font-mono font-bold tracking-widest text-zinc-900 uppercase shadow-xs">
                    {language === "es" ? "Residencial de Lujo" : "Luxury Residential"}
                  </span>
                </div>

                <div className="p-6 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="serif text-xl text-zinc-950 mb-2 group-hover:text-[#0B9488] transition-colors">
                      {language === "es" ? item.titleEs : item.titleEn}
                    </h3>
                    <p className="text-zinc-550 font-light text-xs mb-4">
                      {language === "es" ? item.locationEs : item.locationEn}
                    </p>
                    <p className="text-zinc-600 font-light text-xs leading-relaxed mb-6 font-sans">
                      {language === "es" ? item.descEs : item.descEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-wider font-bold text-zinc-400">
                      {item.area}
                    </span>
                    <button
                      onClick={() => handleSelectProject(item)}
                      className="text-xs font-bold uppercase tracking-widest text-[#0B9488] group-hover:underline flex items-center gap-1.5 cursor-pointer"
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
            className="fixed inset-0 bg-black/95 z-50 overflow-y-auto flex justify-center items-start py-10 px-4 md:px-12 backdrop-blur-md"
          >
            <div className="relative w-full max-w-6xl bg-white text-zinc-900 rounded-sm overflow-hidden my-auto shadow-2xl">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 bg-black/5 hover:bg-black/10 text-zinc-800 p-2.5 rounded-full transition-colors cursor-pointer animate-pulse"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Visual Viewport with Thumbnail Gallery */}
                <div className="lg:col-span-7 bg-zinc-950 relative flex flex-col justify-between min-h-[450px]">
                  <div className="flex-1 w-full h-[380px] md:h-[450px] relative overflow-hidden">
                    <img
                      src={activeImage || selectedProject.image}
                      alt={language === "es" ? selectedProject.titleEs : selectedProject.titleEn}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 text-white text-[10px] font-mono tracking-wider">
                      {language === "es" ? selectedProject.locationEs : selectedProject.locationEn}
                    </div>
                  </div>

                  {/* Interiores / Exterior Selector */}
                  <div className="bg-zinc-950 p-4 flex gap-3 overflow-x-auto border-t border-zinc-900 justify-start items-center">
                    {selectedProject.gallery.map((img, i) => {
                      const isSelected = (activeImage || selectedProject.image) === img.url;
                      return (
                        <button
                          key={i}
                          onClick={() => setActiveImage(img.url)}
                          className={`flex-shrink-0 w-16 h-12 border rounded-xs overflow-hidden transition-all duration-300 relative group cursor-pointer ${
                            isSelected ? "border-[#0B9488] scale-105 ring-1 ring-[#0B9488]" : "border-zinc-800 hover:border-zinc-500"
                          }`}
                        >
                          <img src={img.url} alt={img.name} loading="lazy" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors"></div>
                          <span className="absolute bottom-0 left-0 right-0 bg-black/85 text-[7px] text-white font-mono text-center truncate py-0.5 tracking-widest uppercase">
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
                    <span className="text-[#0B9488] text-[9px] uppercase tracking-[0.4em] font-mono font-bold block mb-3 animate-fadeIn">
                      {language === "es" ? "Residencial de Lujo" : "Luxury Residential"}
                    </span>
                    <h3 className="serif text-3xl text-zinc-950 mb-3 animate-slideUp">
                      {language === "es" ? selectedProject.titleEs : selectedProject.titleEn}
                    </h3>
                    <p className="text-zinc-600 font-light text-xs leading-relaxed mb-8 font-sans">
                      {language === "es" ? selectedProject.descEs : selectedProject.descEn}
                    </p>

                    <div className="space-y-4 border-t border-b border-zinc-100 py-6 mb-8 font-mono text-xs text-zinc-650">
                      <div className="flex justify-between">
                        <span className="text-zinc-400 uppercase tracking-widest text-[9px] font-bold">Area:</span>
                        <span className="text-zinc-800 font-semibold">{selectedProject.area}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400 uppercase tracking-widest text-[9px] font-bold">{language === "es" ? "Material Destacado:" : "Featured Material:"}</span>
                        <span className="text-zinc-800 font-semibold">{selectedProject.materials}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400 uppercase tracking-widest text-[9px] font-bold">{language === "es" ? "Tipo de Obra:" : "Build Type:"}</span>
                        <span className="text-zinc-800 font-semibold">{selectedProject.type}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-[10px] uppercase tracking-widest font-mono font-bold text-zinc-400 mb-1">
                        {language === "es" ? "Especificaciones Estructurales:" : "Structural Highlights:"}
                      </h4>
                      {(language === "es" ? selectedProject.specsEs : selectedProject.specsEn).map((spec, i) => (
                        <div key={i} className="flex gap-2 items-start text-xs text-zinc-600 font-light">
                          <CheckCircle2 className="w-4 h-4 text-[#0B9488] flex-shrink-0 mt-0.5" />
                          <span className="font-sans">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-zinc-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        const event = new CustomEvent("open-ai-chat");
                        window.dispatchEvent(event);
                      }}
                      className="bg-zinc-950 hover:bg-zinc-800 text-white px-6 py-3.5 text-[10px] uppercase font-bold tracking-widest rounded-sm transition-colors cursor-pointer w-full text-center font-mono"
                    >
                      {language === "es" ? "Cotizar Proyecto Similar" : "Quote Similar Build"}
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
