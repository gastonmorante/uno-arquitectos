import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronDown, MessageSquare, ArrowUpRight, HelpCircle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { faqsData, FAQItem } from "../data/faqs";

export default function Faqs() {
  const { language } = useLanguage();
  const isEs = language === "es";

  const [activeCategory, setActiveCategory] = useState<"all" | "general" | "services" | "finance">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const categories = [
    { id: "all", label: isEs ? "Todas las Preguntas" : "All Questions" },
    { id: "general", label: isEs ? "Estudio & Proyectos" : "Studio & Projects" },
    { id: "services", label: isEs ? "Servicios & Construcción" : "Services & Turnkey" },
    { id: "finance", label: isEs ? "Costos, Sostenibilidad & Proceso" : "Costs & Process" },
  ];

  const filteredFaqs = useMemo(() => {
    return faqsData.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const qText = isEs ? item.question.es : item.question.en;
      const aText = isEs ? item.answer.es : item.answer.en;
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        query === "" ||
        qText.toLowerCase().includes(query) ||
        aText.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, isEs]);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleOpenAiChat = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-ai-chat"));
    }
  };

  return (
    <section id="faqs" className="py-24 px-6 md:px-12 bg-white text-[#4A4A4A] font-sans border-t border-zinc-100 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3A3]/10 border border-[#00A3A3]/20 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#00A3A3]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00A3A3]">
              {isEs ? "Resolviendo Dudas Con Criterio" : "Clear Answers & Technical Criteria"}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#0a0a0a] mb-6">
            {isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
          </h2>
          <p className="text-sm md:text-base text-[#4A4A4A] font-normal leading-relaxed">
            {isEs
              ? "Respuestas claras sobre nuestro proceso de trabajo, costos, gestoría y cómo cuidamos tu inversión en la Riviera Maya."
              : "Clear answers regarding our work process, budgeting, environmental permitting, and how we protect your investment in the Riviera Maya."}
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="mb-12 space-y-6">
          {/* Search Input */}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isEs
                  ? "Buscar pregunta por palabra clave (ej. llave en mano, Tulum, costos)..."
                  : "Search questions by keyword (e.g. turnkey, permits, costs)..."
              }
              className="w-full bg-[#DDDDD9]/20 border border-zinc-200 focus:border-[#00A3A3] focus:bg-white rounded-xs pl-11 pr-4 py-3 text-xs text-[#0a0a0a] placeholder:text-zinc-400 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-[#00A3A3]"
              >
                {isEs ? "Limpiar" : "Clear"}
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-4 py-2 text-xs font-medium tracking-wide rounded-xs transition-all cursor-pointer border ${
                  activeCategory === cat.id
                    ? "bg-[#00A3A3] text-white border-[#00A3A3] shadow-xs"
                    : "bg-white text-[#4A4A4A] border-zinc-200 hover:border-[#00A3A3] hover:text-[#00A3A3]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id;
              const questionText = isEs ? faq.question.es : faq.question.en;
              const answerText = isEs ? faq.answer.es : faq.answer.en;

              return (
                <div
                  key={faq.id}
                  className={`border transition-all duration-300 rounded-xs overflow-hidden ${
                    isOpen
                      ? "border-[#00A3A3] bg-zinc-50/50 shadow-xs"
                      : "border-zinc-200/80 bg-white hover:border-zinc-300"
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm md:text-base font-semibold text-[#0a0a0a] group-hover:text-[#00A3A3] transition-colors pr-4">
                      <span className="text-[#00A3A3] mr-3 font-mono text-xs opacity-75">
                        {String(index + 1).padStart(2, "0")}.
                      </span>
                      {questionText}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-zinc-400 group-hover:text-[#00A3A3] flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 text-xs md:text-sm text-[#4A4A4A] leading-relaxed border-t border-zinc-100 whitespace-pre-line font-normal">
                          {answerText}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-zinc-50 border border-dashed border-zinc-200 rounded-xs">
              <p className="text-xs text-zinc-500 mb-2">
                {isEs
                  ? "No se encontraron preguntas que coincidan con tu búsqueda."
                  : "No questions found matching your search term."}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-xs font-semibold text-[#00A3A3] hover:underline"
              >
                {isEs ? "Ver todas las preguntas" : "View all questions"}
              </button>
            </div>
          )}
        </div>

        {/* Bottom Conversion Banner */}
        <div className="mt-16 bg-[#0a0a0a] text-white p-8 md:p-12 rounded-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-zinc-800">
          <div className="relative z-10 text-left max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#00A3A3] block mb-2">
              {isEs ? "Atención Personalizada" : "Personalized Assistance"}
            </span>
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white mb-3">
              {isEs ? "¿Tienes una duda específica sobre tu terreno o proyecto?" : "Have a specific question about your plot or project?"}
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-normal">
              {isEs
                ? "Consulta directamente con nuestro Asesor AI o programa una revisión presencial con nuestros directores de obra."
                : "Consult directly with our AI Advisor or schedule an in-person review with our site directors."}
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleOpenAiChat}
              className="px-6 py-3.5 bg-[#00A3A3] hover:bg-[#006666] text-white text-xs font-semibold tracking-wider uppercase rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              {isEs ? "Consultar al Asesor AI" : "Ask AI Advisor"}
            </button>
            <a
              href="#contacto"
              className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-semibold tracking-wider uppercase rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              {isEs ? "Cita Técnica" : "Technical Appointment"}
              <ArrowUpRight className="w-4 h-4 text-[#00A3A3]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
