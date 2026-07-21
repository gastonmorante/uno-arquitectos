import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ShieldCheck, FileText, Lock, Scale } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function LegalNotice() {
  const { language } = useLanguage();
  const isEs = language === "es";

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"privacy" | "terms">("privacy");

  useEffect(() => {
    const handleOpenLegal = (e: CustomEvent | Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail && (detail.tab === "privacy" || detail.tab === "terms")) {
        setActiveTab(detail.tab);
      } else {
        setActiveTab("privacy");
      }
      setIsOpen(true);
    };

    window.addEventListener("open-legal", handleOpenLegal as EventListener);
    return () => window.removeEventListener("open-legal", handleOpenLegal as EventListener);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-sans">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative bg-white border border-zinc-200 shadow-2xl rounded-xs w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden z-10 text-[#4A4A4A]"
          >
            {/* Header */}
            <div className="bg-[#0a0a0a] text-white px-6 py-4 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#00A3A3]" />
                <h3 className="text-sm font-semibold tracking-wide uppercase text-white">
                  {isEs ? "Documentación Legal & Privacidad" : "Legal & Privacy Documentation"}
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
                aria-label="Close legal modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Selectors */}
            <div className="flex border-b border-zinc-200 bg-zinc-50 px-6 pt-3 gap-2">
              <button
                onClick={() => setActiveTab("privacy")}
                className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-t-xs transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
                  activeTab === "privacy"
                    ? "border-[#00A3A3] text-[#00A3A3] bg-white font-bold"
                    : "border-transparent text-zinc-500 hover:text-[#0a0a0a]"
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                {isEs ? "Aviso de Privacidad (LFPDPPP)" : "Privacy Policy"}
              </button>

              <button
                onClick={() => setActiveTab("terms")}
                className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-t-xs transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
                  activeTab === "terms"
                    ? "border-[#00A3A3] text-[#00A3A3] bg-white font-bold"
                    : "border-transparent text-zinc-500 hover:text-[#0a0a0a]"
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                {isEs ? "Términos de Servicio & Deslinde AI" : "Terms of Service & AI Disclaimer"}
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs leading-relaxed text-[#4A4A4A]">
              {activeTab === "privacy" ? (
                /* PRIVACY NOTICE (LFPDPPP) */
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-[#00A3A3]/10 border border-[#00A3A3]/20 rounded-xs mb-4">
                    <p className="font-semibold text-[#00A3A3] text-[11px] uppercase tracking-wider">
                      {isEs
                        ? "Cumplimiento Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP)"
                        : "Compliance with Mexican Federal Law on Protection of Personal Data (LFPDPPP)"}
                    </p>
                  </div>

                  <h4 className="font-bold text-[#0a0a0a] text-sm">
                    {isEs ? "1. Identidad y Domicilio del Responsable" : "1. Responsible Party Identity & Location"}
                  </h4>
                  <p>
                    {isEs
                      ? "UNO Arquitectos Mx (Grupo SVAD), con domicilio operativo en Av. Boca Paila Km 4.5, Zona Costera, Tulum, Quintana Roo, México, es responsable del tratamiento de sus datos personales recolectados a través de esta plataforma digital y herramientas de consulta conversacional."
                      : "UNO Arquitectos Mx (Grupo SVAD), located at Av. Boca Paila Km 4.5, Coastal Zone, Tulum, Quintana Roo, Mexico, is responsible for the processing of personal data collected through this website and AI conversational tools."}
                  </p>

                  <h4 className="font-bold text-[#0a0a0a] text-sm">
                    {isEs ? "2. Datos Personales Recabados" : "2. Collected Personal Data"}
                  </h4>
                  <p>
                    {isEs
                      ? "Para la atención técnica, evaluación paramétrica de lotes y agendamiento de citas, recabamos: Nombre Completo, Correo Electrónico, Teléfono/WhatsApp, Ubicación del terreno y especificaciones del proyecto deseado."
                      : "For technical advisory, parametric lot assessments, and appointment scheduling, we collect: Full Name, Email Address, Phone/WhatsApp number, plot location, and desired project specifications."}
                  </p>

                  <h4 className="font-bold text-[#0a0a0a] text-sm">
                    {isEs ? "3. Finalidad del Tratamiento" : "3. Purpose of Processing"}
                  </h4>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>{isEs ? "Elaboración de presupuestos paramétricos y análisis de viabilidad técnica." : "Preparation of parametric budgets and technical feasibility assessments."}</li>
                    <li>{isEs ? "Coordinación de consultas con directores de obra y especialistas en ingeniería." : "Coordinating technical consultations with site directors and structural engineers."}</li>
                    <li>{isEs ? "Envío de reportes en PDF y seguimiento a distancia para clientes e inversionistas." : "Dispatching PDF concept reports and remote tracking for international clients."}</li>
                  </ul>

                  <h4 className="font-bold text-[#0a0a0a] text-sm">
                    {isEs ? "4. Derechos ARCO y Contacto" : "4. ARCO Rights & Direct Contact"}
                  </h4>
                  <p>
                    {isEs
                      ? "Usted puede ejercer sus derechos de Acceso, Rectificación, Cancelación u Oposición (ARCO) enviando una solicitud formal al correo electrónico: info@unoarquitectos.com o al WhatsApp corporativo."
                      : "You may exercise your Access, Rectification, Cancellation, or Opposition (ARCO) rights by sending a request to: info@unoarquitectos.com or via corporate WhatsApp."}
                  </p>
                </div>
              ) : (
                /* TERMS OF SERVICE & AI DISCLAIMER */
                <div className="space-y-4 text-left">
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xs mb-4">
                    <p className="font-semibold text-amber-700 text-[11px] uppercase tracking-wider">
                      {isEs
                        ? "Deslinde de Responsabilidad sobre Herramientas de Inteligencia Artificial (AI Advisor)"
                        : "Disclaimer on Artificial Intelligence Advisory Tools (AI Advisor)"}
                    </p>
                  </div>

                  <h4 className="font-bold text-[#0a0a0a] text-sm">
                    {isEs ? "1. Carácter Informativo y Paramétrico de las Herramientas AI" : "1. Parametric & Informational Nature of AI Tools"}
                  </h4>
                  <p>
                    {isEs
                      ? "Las estimaciones, presupuestos paramétricos, listas de materiales sugeridos y conceptos generados por nuestro Asesor AI (Planner) tienen carácter estrictamente preliminar e informativo. No constituyen un contrato ni una cotización vinculante hasta la realización formal del estudio geotécnico de suelo kárstico, proyecto ejecutivo y firma de contrato formal."
                      : "All estimates, parametric budgets, material lists, and conceptual Dossiers generated by our AI Advisor are strictly preliminary and informational. They do not constitute a binding quote or contract until a formal geotechnical karst study, executive engineering, and contract signing take place."}
                  </p>

                  <h4 className="font-bold text-[#0a0a0a] text-sm">
                    {isEs ? "2. Propiedad Intelectual y Arquitectura de Autor" : "2. Intellectual Property & Original Architecture"}
                  </h4>
                  <p>
                    {isEs
                      ? "Todos los diseños, marcas, esquemas de ingeniería sismorresistente, logotipo en perspectiva isométrica y contenidos del sitio web son propiedad exclusiva de UNO Arquitectos Mx. Queda prohibida la reproducción parcial o total no autorizada."
                      : "All designs, trademarks, seismic engineering schematics, isometric logo assets, and website contents are the exclusive property of UNO Arquitectos Mx. Unauthorized reproduction is strictly prohibited."}
                  </p>

                  <h4 className="font-bold text-[#0a0a0a] text-sm">
                    {isEs ? "3. Jurisdicción y Legislación Aplicable" : "3. Governing Jurisdiction"}
                  </h4>
                  <p>
                    {isEs
                      ? "Los presentes Términos de Servicio se rigen por las leyes aplicables en el Estado de Quintana Roo y los Estados Unidos Mexicanos."
                      : "These Terms of Service are governed by the applicable laws of the State of Quintana Roo and the United Mexican States."}
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-zinc-50 border-t border-zinc-200 px-6 py-3 flex justify-between items-center text-[11px] text-zinc-500">
              <span>UNO Arquitectos Mx © {new Date().getFullYear()}</span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 bg-[#00A3A3] hover:bg-[#006666] text-white font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
              >
                {isEs ? "Entendido & Aceptar" : "Acknowledge & Close"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
