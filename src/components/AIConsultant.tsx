import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import {
  Send,
  X,
  Sparkles,
  User,
  Bot,
  MessageCircle
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const renderUnoIcon = (size: number, className = "") => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className}`}
  >
    {/* TOP-LEFT SEGMENT */}
    <g transform="translate(-3, -2)">
      <path
        d="M 100 20 L 30.72 60 L 30.72 140 L 69.69 117.5 L 69.69 82.5 L 100 65 Z"
        fill="currentColor"
      />
    </g>

    {/* TOP-RIGHT SEGMENT */}
    <g transform="translate(3, -2)">
      <path
        d="M 100 20 L 169.28 60 L 169.28 140 L 130.31 117.5 L 130.31 82.5 L 100 65 Z"
        fill="currentColor"
      />
    </g>

    {/* BOTTOM SEGMENT */}
    <g transform="translate(0, 4)">
      <path
        d="M 30.72 140 L 100 180 L 169.28 140 L 130.31 117.5 L 100 135 L 69.69 117.5 Z"
        fill="currentColor"
      />
    </g>
  </svg>
);

export default function AIConsultant() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Conversational onboarding state variables
  const [onboardingStep, setOnboardingStep] = useState<"name" | "email" | "completed">("name");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");

  // Cursor tracking motion variables
  const bgLogoX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 - 100 : 200);
  const bgLogoY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 - 100 : 200);
  
  const smoothBgX = useSpring(bgLogoX, { damping: 40, stiffness: 80 });
  const smoothBgY = useSpring(bgLogoY, { damping: 40, stiffness: 80 });

  const [isMoving, setIsMoving] = useState(false);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    bgLogoX.set(window.innerWidth / 2 - 100);
    bgLogoY.set(window.innerHeight / 2 - 100);

    const handleMove = (clientX: number, clientY: number) => {
      bgLogoX.set(clientX - 100);
      bgLogoY.set(clientY - 100);
      
      setIsMoving(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 500);
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [bgLogoX, bgLogoY]);

  // Initialize first greeting message depending on selected language
  useEffect(() => {
    const greetingMsg =
      language === "es"
        ? "Bienvenido a la consulta de UNO Arquitectos. Soy su Asesor de Arquitectura e Ingeniería AI.\n\nPara brindarle atención personalizada, por favor compártame su **Nombre Completo**:"
        : "Welcome to UNO Arquitectos. I am your AI Architecture & Engineering Advisor.\n\nTo give you personalized service, please share your **Full Name**:";

    setMessages([
      {
        role: "assistant",
        content: greetingMsg,
        timestamp: new Date()
      }
    ]);
    
    setOnboardingStep("name");
    setLeadName("");
    setLeadEmail("");
  }, [language]);

  // Listen to open-ai-chat custom event
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-ai-chat", handleOpenChat);
    return () => window.removeEventListener("open-ai-chat", handleOpenChat);
  }, []);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const quickPrompts =
    language === "es"
      ? [
          { label: "¿Qué normativas rigen en Tulum?", prompt: "¿Cuáles son las regulaciones ecológicas, COS/CUS y conservación de selva en Tulum?" },
          { label: "Ventajas del Chukum y Tzalam", prompt: "Explícame el uso del Chukum natural y madera de Tzalam en clima tropical." },
          { label: "Cimentación en suelo kárstico", prompt: "¿Cómo calculan las cimentaciones sobre suelo kárstico o cenotes?" }
        ]
      : [
          { label: "Tulum regulations", prompt: "What are the environmental permits and land ratios required in Tulum?" },
          { label: "Chukum & local woods", prompt: "Tell me about Chukum and Tzalam wood advantages in tropical climates." },
          { label: "Karst foundations", prompt: "How do you handle structural foundations on karst soil near cenotes?" }
        ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    // STEP 1: CAPTURE NAME
    if (onboardingStep === "name") {
      const nameVal = text.trim();
      setLeadName(nameVal);
      setOnboardingStep("email");
      setIsLoading(false);

      setTimeout(() => {
        const nextPrompt =
          language === "es"
            ? `Gracias, **${nameVal}**. ¿Me proporcionaría su **Correo Electrónico** para vincular su consulta?`
            : `Thank you, **${nameVal}**. Could you please provide your **Email Address** to connect your inquiry?`;

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: nextPrompt,
            timestamp: new Date()
          }
        ]);
      }, 600);
      return;
    }

    // STEP 2: CAPTURE EMAIL & SUBMIT LEAD
    if (onboardingStep === "email") {
      const emailVal = text.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        setIsLoading(false);
        const errorPrompt =
          language === "es"
            ? "Por favor, ingrese un correo electrónico válido (ejemplo@correo.com):"
            : "Please enter a valid email address (example@domain.com):";

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: errorPrompt,
            timestamp: new Date()
          }
        ]);
        return;
      }

      setLeadEmail(emailVal);
      setOnboardingStep("completed");

      // Trigger Tracking Events
      if (typeof window !== "undefined") {
        const win = window as any;
        if (win.gtag) {
          win.gtag('event', 'generate_lead', { event_category: 'ai_chat', event_label: 'Consultor AI Onboarding', value: 1 });
        }
        if (win.fbq) {
          win.fbq('track', 'Lead', { content_name: 'Consultor AI Onboarding', status: 'success' });
        }
      }

      try {
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: leadName,
            email: emailVal,
            phone: "",
            message: "Registrado desde el Asesor AI",
            source: "Asesor AI Chatbot"
          })
        });

        const waText = language === "es"
          ? `Hola UNO Arquitectos, acabo de consultar en su Asesor AI. Mi nombre es ${leadName}, mi correo es ${emailVal}. Me interesa recibir atención directa.`
          : `Hello UNO Arquitectos, I consulted your AI Advisor. My name is ${leadName}, my email is ${emailVal}. I would like direct support.`;
        
        const waUrl = `https://wa.me/5219841234567?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, "_blank");

      } catch (err) {
        console.error("Error submitting lead:", err);
      }

      setIsLoading(false);
      setTimeout(() => {
        const welcomeCompletePrompt =
          language === "es"
            ? `¡Excelente, **${leadName}**! Su consulta está abierta.\n\n¿En qué tema puedo asesorarle hoy sobre normativas, materiales locales o ingeniería estructural?`
            : `Great, **${leadName}**! Your inquiry session is active.\n\nWhat topic can I assist you with today regarding regulations, local materials, or structural engineering?`;

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: welcomeCompletePrompt,
            timestamp: new Date()
          }
        ]);
      }, 600);
      return;
    }

    // STEP 3: STANDARD AI CHAT
    try {
      const nonOnboardingMessages = messages.filter((_, idx) => idx >= 4);
      const history = [...nonOnboardingMessages, userMsg].map((m) => ({
        sender: m.role === "user" ? "user" : "assistant",
        text: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history, language })
      });

      if (!res.ok) {
        throw new Error("Failed to connect to assistant.");
      }

      const data = await res.json();
      
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.text || "No se pudo obtener respuesta.",
          timestamp: new Date()
        }
      ]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            language === "es"
              ? "Servidor ocupado. Por favor contáctenos directamente por WhatsApp o formulario de contacto."
              : "Server busy. Please contact us directly via WhatsApp or contact form.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatText = (text: string) => {
    return text.split("\n").map((line, lineIdx) => {
      const isBullet = line.trim().startsWith("•") || line.trim().startsWith("*");
      let cleanLine = line;
      if (isBullet) {
        cleanLine = line.replace(/^[•*]\s*/, "");
      }

      const parts = cleanLine.split(/\*\*([\s\S]*?)\*\*/g);
      const formattedParts = parts.map((part, partIdx) => {
        if (partIdx % 2 === 1) {
          return <strong key={partIdx} className="font-semibold text-[#0a0a0a]">{part}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={lineIdx} className="ml-4 list-disc pl-1 mb-1 text-[#4A4A4A] font-normal leading-relaxed text-xs">
            {formattedParts}
          </li>
        );
      }

      return (
        <p key={lineIdx} className={`mb-2 text-[#4A4A4A] font-normal leading-relaxed text-xs ${cleanLine === "" ? "h-2" : ""}`}>
          {formattedParts}
        </p>
      );
    });
  };

  const whatsappLink =
    language === "es"
      ? "https://wa.me/5219841234567?text=Hola%20UNO%20Arquitectos,%20me%20interesa%20recibir%20asesor%C3%ADa%20técnica%20para%20un%20proyecto."
      : "https://wa.me/5219841234567?text=Hello%20UNO%20Arquitectos,%20I%20would%20like%20technical%20advice%20for%20a%20project.";

  return (
    <>
      {/* PERSISTENT FLOATING WHATSAPP BUTTON (BOTTOM RIGHT) */}
      <div id="float-whatsapp" className="fixed bottom-6 right-6 z-40 flex flex-col items-end font-sans">
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-[#046A38] hover:bg-[#03512b] text-white p-4 rounded-full shadow-lg flex items-center justify-center cursor-pointer border border-[#046a38]/30 group"
          aria-label="WhatsApp Contact"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="absolute right-14 bg-[#0a0a0a] text-white text-xs font-semibold uppercase tracking-wider py-1.5 px-3 rounded-xs whitespace-nowrap shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
            {language === "es" ? "WhatsApp Directo" : "WhatsApp Chat"}
          </span>
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
        </motion.a>
      </div>

      {/* FLOATING AI CONSULTANT (BOTTOM LEFT) */}
      <div id="float-ai-consultant" className="fixed bottom-6 left-6 z-40 flex flex-col items-start font-sans">
        <AnimatePresence>
          {isOpen ? (
            /* EXPANDED CHAT PANEL */
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="bg-white border border-zinc-200/80 shadow-2xl rounded-xs overflow-hidden w-[92vw] sm:w-[380px] h-[520px] flex flex-col mb-4"
            >
              {/* Header */}
              <div className="bg-[#0a0a0a] text-white py-3.5 px-4 flex items-center justify-between border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#00A3A3]/20 border border-[#00A3A3]/40 flex items-center justify-center text-[#00A3A3]">
                    {renderUnoIcon(16)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold tracking-wide text-white">Asesor AI</h4>
                    <span className="text-[10px] tracking-wider text-[#00A3A3] uppercase block flex items-center gap-1 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00A3A3] inline-block animate-pulse"></span>
                      {language === "es" ? "Ingeniería & Arquitectura" : "Engineering & Architecture"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Messages viewport */}
              <div className="flex-1 overflow-y-auto p-4 bg-[#FFFFFF] space-y-4">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex gap-2.5 items-start ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs border ${
                        m.role === "user"
                          ? "bg-[#00A3A3] border-[#00A3A3] text-white"
                          : "bg-[#00A3A3]/10 border-[#00A3A3]/20 text-[#00A3A3]"
                      }`}
                    >
                      {m.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div className="max-w-[82%]">
                      <div
                        className={`p-3 rounded-xs text-xs text-left leading-relaxed shadow-xs ${
                          m.role === "user"
                            ? "bg-[#00A3A3] text-white font-medium"
                            : "bg-[#DDDDD9]/30 border border-zinc-200/60 text-[#4A4A4A]"
                        }`}
                      >
                        {m.role === "user" ? (
                          <p className="whitespace-pre-wrap">{m.content}</p>
                        ) : (
                          <div className="space-y-0.5">{formatText(m.content)}</div>
                        )}
                      </div>
                      <span className="text-[9px] text-zinc-400 block mt-1 px-1">
                        {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-2.5 items-start animate-pulse">
                    <div className="w-7 h-7 rounded-full bg-[#00A3A3]/10 border border-[#00A3A3]/20 flex items-center justify-center text-[#00A3A3]">
                      {renderUnoIcon(14)}
                    </div>
                    <div className="bg-[#DDDDD9]/30 border border-zinc-200/60 p-3 rounded-xs max-w-[80%] text-left">
                      <div className="flex space-x-1.5 items-center py-1">
                        <div className="w-2 h-2 bg-[#00A3A3] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#00A3A3] rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-[#00A3A3] rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt suggestions */}
              {onboardingStep === "completed" && messages.length <= 2 && !isLoading && (
                <div className="px-4 py-2 bg-[#DDDDD9]/20 border-t border-zinc-200/60">
                  <p className="text-[9px] font-semibold tracking-wider text-zinc-500 uppercase mb-2 text-left">
                    {language === "es" ? "Sugerencias de Consulta" : "Suggested Queries"}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {quickPrompts.map((qp, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(qp.prompt)}
                        className="text-xs bg-white border border-zinc-300 hover:border-[#00A3A3] hover:text-[#00A3A3] text-[#4A4A4A] px-2.5 py-1.5 rounded-xs transition-all cursor-pointer text-left"
                      >
                        {qp.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="p-3 border-t border-zinc-200 bg-white flex gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    language === "es"
                      ? "Pregunte sobre permisos, materiales, costos..."
                      : "Ask about permits, materials, costs..."
                  }
                  className="flex-1 bg-zinc-50 border border-zinc-300 rounded-xs px-3.5 py-2 text-xs text-[#0a0a0a] focus:outline-none focus:border-[#00A3A3] focus:bg-white transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className={`px-3.5 bg-[#00A3A3] hover:bg-[#006666] text-white rounded-xs flex items-center justify-center transition-colors cursor-pointer ${
                    isLoading || !inputValue.trim() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* FLOATING TRIGGER BUTTON (BOTTOM LEFT) */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#0a0a0a] hover:bg-zinc-900 border border-zinc-800 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer group"
          aria-label="Toggle AI consultant chatbot"
        >
          <Sparkles className="w-6 h-6 text-[#00A3A3] group-hover:rotate-12 transition-transform duration-300" />
          
          <span className="absolute left-14 bg-[#0a0a0a] text-white text-xs font-semibold tracking-wider py-1.5 px-3 rounded-xs whitespace-nowrap shadow-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
            {language === "es" ? "Asesor AI" : "AI Advisor"}
          </span>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A3A3] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#00A3A3]"></span>
          </span>
        </motion.button>
      </div>

      {/* CURSOR-TRACKING FLOATING SEMI-TRANSPARENT LOGO */}
      <motion.div
        style={{ x: smoothBgX, y: smoothBgY }}
        animate={{
          color: isMoving ? "rgba(200, 200, 200, 0.15)" : "rgba(0, 163, 163, 0.22)"
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut"
        }}
        className="fixed top-0 left-0 pointer-events-none z-30 select-none"
      >
        {renderUnoIcon(200, "animate-rotate-spinning")}
      </motion.div>
    </>
  );
}
