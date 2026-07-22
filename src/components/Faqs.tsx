import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronDown, MessageSquare, ArrowUpRight, HelpCircle, Layers, Building2, Calculator, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { faqsData } from "../data/faqs";

export default function Faqs() {
  const { language } = useLanguage();
  const isEs = language === "es";

  // State: selectedCategory is null initially until user selects a category option
  const [selectedCategory, setSelectedCategory] = useState<"general" | "services" | "finance" | "all" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = [
    {
      id: "general",
      title: isEs ? "Estudio & Proyectos" : "Studio & Projects",
      subtitle: isEs ? "Alcance boutique, equipo, ubicación y seguimiento a distancia" : "Boutique scope, team, location, and remote investor tracking",
      icon: Layers,
      count: 8,
    },
    {
      id: "services",
      title: isEs ? "Servicios & Construcción" : "Services & Turnkey",
      subtitle: isEs ? "Servicio llave en mano, etapas de diseño y control de obra" : "Turnkey execution, design phases, and site supervision",
      icon: Building2,
      count: 6,
    },
    {
      id: "finance",
      title: isEs ? "Costos, Sostenibilidad & Proceso" : "Costs & Process",
      subtitle: isEs ? "Criterio de costos, sostenibilidad bioclimática e inversión" : "Budgeting criteria, bioclimatics, and investment security",
      icon: Calculator,
      count: 6,
    },
  ];

  const filteredFaqs = useMemo(() => {
    if (!selectedCategory && !searchQuery.trim()) return [];

    return faqsData.filter((item) => {
      const matchesCategory =
        !selectedCategory || selectedCategory === "all" || item.category === selectedCategory;
      const qText = isEs ? item.question.es : item.question.en;
      const aText = isEs ? item.answer.es : item.answer.en;
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch =
        query === "" ||
        qText.toLowerCase().includes(query) ||
        aText.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, isEs]);

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
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00A3A3]/10 border border-[#00A3A3]/20 mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#00A3A3]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00A3A3]">
              {isEs ? "Resolviendo Dudas Con Criterio" : "Clear Answers & Technical Criteria"}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1E1E1E] mb-6">
            {isEs ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
          </h2>
          <p className="text-sm md:text-base text-[#4A4A4A] font-normal leading-relaxed">
            {isEs
              ? "Seleccione una categoría de consulta para desplegar las preguntas correspondientes y conocer nuestro proceso técnico."
              : "Select a category option below to display the corresponding FAQs and review our technical process."}
          </p>
        </div>

        {/* Category Option Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as any);
                  setOpenId(null);
                }}
                className={`p-6 text-left border rounded-xs transition-all duration-300 cursor-pointer relative group overflow-hidden ${
                  isSelected
                    ? "border-[#00A3A3] bg-zinc-50 shadow-md ring-1 ring-[#00A3A3]"
                    : "border-zinc-200 bg-white hover:border-[#00A3A3]/50 hover:bg-zinc-50/50"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xs flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-[#00A3A3] text-white"
                        : "bg-[#00A3A3]/10 text-[#00A3A3] group-hover:bg-[#00A3A3] group-hover:text-white"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-[#00A3A3]" />}
                </div>
                <h3 className="text-base font-semibold text-[#1E1E1E] mb-1.5 group-hover:text-[#00A3A3] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-zinc-500 font-normal leading-relaxed mb-4">
                  {cat.subtitle}
                </p>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1 ${
                    isSelected ? "text-[#00A3A3]" : "text-zinc-400 group-hover:text-[#00A3A3]"
                  }`}
                >
                  {isSelected
                    ? isEs ? "Categoría Activa" : "Active Category"
                    : isEs ? "Desplegar Preguntas →" : "View Questions →"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & View All Toggle (Visible once a category or search is active) */}
        <div className="mb-10 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!selectedCategory && e.target.value.trim()) {
                  setSelectedCategory("all");
                }
              }}
              placeholder={
                isEs
                  ? "Buscar pregunta por palabra clave (ej. llave en mano, Tulum, costos)..."
                  : "Search questions by keyword (e.g. turnkey, permits, costs)..."
              }
              className="w-full bg-[#DDDDD9]/20 border border-zinc-200 focus:border-[#00A3A3] focus:bg-white rounded-xs pl-11 pr-4 py-3 text-xs text-[#1E1E1E] placeholder:text-zinc-400 focus:outline-none transition-all"
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

          {selectedCategory && (
            <div className="flex justify-center items-center gap-3 text-xs text-zinc-500">
              <span>
                {isEs ? "Mostrando preguntas de:" : "Showing questions for:"}{" "}
                <strong className="text-[#1E1E1E] font-semibold uppercase tracking-wider">
                  {selectedCategory === "all"
                    ? isEs ? "Todas las Categorías" : "All Categories"
                    : categories.find((c) => c.id === selectedCategory)?.title}
                </strong>
              </span>
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-[#00A3A3] font-semibold hover:underline"
              >
                {isEs ? "(Ver Todas)" : "(View All)"}
              </button>
            </div>
          )}
        </div>

        {/* FAQ Accordion List (Deployed only when selectedCategory is set or search is active) */}
        <AnimatePresence mode="wait">
          {selectedCategory ? (
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="space-y-4"
            >
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
                        <span className="text-sm md:text-base font-semibold text-[#1E1E1E] group-hover:text-[#00A3A3] transition-colors pr-4">
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
                      setSelectedCategory("all");
                    }}
                    className="text-xs font-semibold text-[#00A3A3] hover:underline"
                  >
                    {isEs ? "Ver todas las preguntas" : "View all questions"}
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            /* Prompt state before category selection */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 px-6 bg-zinc-50/50 border border-dashed border-zinc-200 rounded-xs"
            >
              <HelpCircle className="w-8 h-8 text-[#00A3A3] mx-auto mb-3 opacity-60" />
              <h4 className="text-sm font-semibold text-[#1E1E1E] mb-1">
                {isEs ? "Seleccione una categoría arriba para ver las preguntas" : "Select a category above to view questions"}
              </h4>
              <p className="text-xs text-zinc-500 font-normal">
                {isEs
                  ? "Haga clic en cualquiera de las 3 opciones principales para desplegar las respuestas oficiales del estudio."
                  : "Click any of the 3 primary options above to reveal our official responses."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Conversion Banner */}
        <div className="mt-16 bg-[#1E1E1E] text-white p-8 md:p-12 rounded-xs relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-zinc-800">
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
