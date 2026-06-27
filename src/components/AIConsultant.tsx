import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import {
  Send,
  X,
  Sparkles,
  User,
  Bot,
  MessageCircle,
  CheckCircle2
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
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Conversational onboarding state variables
  const [onboardingStep, setOnboardingStep] = useState<"name" | "email" | "completed">("name");
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");

  // Cursor tracking motion variables for the transparent background logo
  const bgLogoX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 - 100 : 200);
  const bgLogoY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 - 100 : 200);
  
  // Configure spring dynamics for premium organic lag effect (damping/stiffness)
  const smoothBgX = useSpring(bgLogoX, { damping: 40, stiffness: 80 });
  const smoothBgY = useSpring(bgLogoY, { damping: 40, stiffness: 80 });

  const [isMoving, setIsMoving] = useState(false);
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    // Set sensible initial centered state to prevent any sudden jumping
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

  // Initialize first greeting message depending on the selected language and prompt for Name first
  useEffect(() => {
    const greetingMsg =
      language === "es"
        ? "Bienvenido a la consulta privada de UNO Arquitectos. Soy su Consultor de Arquitectura AI, especializado en proyectos de ultra-lujo y alta ingeniería en la Riviera Maya.\n\nPara iniciar su asesoría técnica personalizada y registrar su perfil de prioridad en nuestro sistema, por favor indíqueme su **Nombre Completo**:"
        : "Welcome to UNO Arquitectos' private consultation. I am your AI Architectural Consultant, specialized in ultra-luxury developments and premium structural engineering in the Riviera Maya.\n\nTo begin your personalized technical consultation and register your priority profile in our system, please enter your **Full Name**:";

    setMessages([
      {
        role: "assistant",
        content: greetingMsg,
        timestamp: new Date()
      }
    ]);
    
    // Reset onboarding when language changes
    setOnboardingStep("name");
    setLeadName("");
    setLeadEmail("");
  }, [language]);

  // Listen to open-ai-chat custom event to trigger opening from Navbar / Footer
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
          { label: "¿Qué permisos pide Tulum?", prompt: "¿Cuáles son las regulaciones ecológicas, el COS/CUS y los porcentajes de conservación de selva nativa en Tulum?" },
          { label: "¿Qué es el Chukum y materiales locales?", prompt: "Explícame qué materiales locales recomiendan como el Chukum, la madera de Tzalam y sus beneficios tropicales." },
          { label: "Cimentación sobre cenotes", prompt: "¿Cómo manejan la ingeniería estructural y cimentación en suelos con cenotes o ríos subterráneos?" }
        ]
      : [
          { label: "Tulum regulations & permits", prompt: "What are the environmental permits, COS/CUS ratios, and jungle preservation percentages required in Tulum?" },
          { label: "Chukum & local materials", prompt: "Tell me about the native materials you recommend like Chukum, Tzalam wood, and their tropical advantages." },
          { label: "Foundations on Cenotes", prompt: "How do you handle structural engineering and foundations on karst soil near cenotes or underwater rivers?" }
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

    // 1. STEP 1: CAPTURE NAME
    if (onboardingStep === "name") {
      const nameVal = text.trim();
      setLeadName(nameVal);
      setOnboardingStep("email");
      setIsLoading(false);

      setTimeout(() => {
        const nextPrompt =
          language === "es"
            ? `Mucho gusto, **${nameVal}**. Para continuar y registrar su sesión prioritaria de consulta en nuestro sistema, ¿podría proporcionarme su **Correo Electrónico**?`
            : `Pleased to meet you, **${nameVal}**. To continue and register your priority consultation session in our system, could you please provide your **Email Address**:`;

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: nextPrompt,
            timestamp: new Date()
          }
        ]);
      }, 700);
      return;
    }

    // 2. STEP 2: CAPTURE EMAIL & SUBMIT LEAD TO GHL CRM
    if (onboardingStep === "email") {
      const emailVal = text.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailVal)) {
        setIsLoading(false);
        const errorPrompt =
          language === "es"
            ? "Por favor, proporcione un correo electrónico con formato válido (ejemplo@correo.com):"
            : "Please provide a valid email format (example@domain.com):";

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

      try {
        // Send data to GHL-ready CRM backend route
        await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: leadName,
            email: emailVal,
            phone: "",
            message: "Registrado e iniciado sesión desde el Consultor de Obra AI",
            source: "Asesor AI Chatbot"
          })
        });

        // Prepare welcome WhatsApp link
        const waText = language === "es"
          ? `Hola UNO Arquitectos, acabo de registrarme en su Consultor de Obra AI. Mi nombre es ${leadName}, mi correo es ${emailVal}. Me interesa recibir atención inmediata por WhatsApp.`
          : `Hello UNO Arquitectos, I just registered on your AI Advisor. My name is ${leadName}, my email is ${emailVal}. I'm interested in receiving immediate attention on WhatsApp.`;
        
        const waUrl = `https://wa.me/5219841234567?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, "_blank");

      } catch (err) {
        console.error("Error submitting lead:", err);
      }

      setIsLoading(false);
      setTimeout(() => {
        const welcomeCompletePrompt =
          language === "es"
            ? `¡Gracias, **${leadName}**! Su perfil de prioridad ha sido registrado y conectado con nuestro sistema. También hemos abierto un chat directo para enviarle una bienvenida inmediata a su WhatsApp.\n\nSu sesión de consulta ilimitada ahora está **completamente desbloqueada**.\n\n¿En qué puedo asesorarle hoy sobre permisos ecológicos de Tulum, materiales regionales como el Chukum, o cimentaciones en cenotes?`
            : `Thank you, **${leadName}**! Your priority profile has been fully registered and connected with our system. We have also prepared an immediate WhatsApp support channel for you.\n\nYour unlimited consulting session is now **fully unlocked**.\n\nWhat would you like to ask about environmental permits, native Chukum, or structural foundations on karst soils?`;

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: welcomeCompletePrompt,
            timestamp: new Date()
          }
        ]);
      }, 700);
      return;
    }

    // 3. STEP 3: STANDARD AI CHAT ONCE ONBOARDING IS COMPLETED
    try {
      // Create request payload including the conversation history and language context
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
        throw new Error("Failed to connect to the assistant.");
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
              ? "Lo sentimos, el servidor de consulta está experimentando una alta demanda. Por favor envíe su consulta a través de nuestro formulario de contacto o WhatsApp para atención inmediata."
              : "We apologize, the consulting server is currently experiencing high demand. Please submit your inquiry through our contact form or WhatsApp for immediate assistance.",
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Safe and clean formatting helper for bullet points, bold text, etc.
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
          return <strong key={partIdx} className="font-semibold text-zinc-900">{part}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={lineIdx} className="ml-4 list-disc pl-1 mb-1.5 text-zinc-650 font-light leading-relaxed text-xs">
            {formattedParts}
          </li>
        );
      }

      return (
        <p key={lineIdx} className={`mb-3 text-zinc-650 font-light leading-relaxed text-xs ${cleanLine === "" ? "h-2" : ""}`}>
          {formattedParts}
        </p>
      );
    });
  };

  const whatsappLink =
    language === "es"
      ? "https://wa.me/5219841234567?text=Hola%20UNO%20Arquitectos,%20me%20interesa%20recibir%20asesor%C3%ADa%20técnica%20para%20un%20proyecto%20en%20la%20Riviera%20Maya."
      : "https://wa.me/5219841234567?text=Hello%20UNO%20Arquitectos,%20I%20would%20like%20to%20get%20technical%20advice%20for%20a%20construction%20project%20in%20the%20Riviera%20Maya.";

  return (
    <>
      {/* PERSISTENT FLOATING WHATSAPP BUTTON (BOTTOM RIGHT) */}
      <div id="float-whatsapp" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative bg-[#046A38] hover:bg-[#03512b] text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer border border-[#046a38]/30 group"
          aria-label="WhatsApp Contact"
        >
          <span className="absolute inset-0 rounded-full border-2 border-[#046A38] animate-ping opacity-40 group-hover:animate-none"></span>
          <MessageCircle className="w-6 h-6 text-white" />
          
          <span className="absolute right-14 bg-zinc-950 text-white text-[9px] font-mono tracking-[0.2em] uppercase py-1.5 px-3 rounded-sm whitespace-nowrap shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none font-sans">
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
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white border border-zinc-200 shadow-2xl rounded-sm overflow-hidden w-[92vw] sm:w-[400px] h-[550px] flex flex-col mb-4"
            >
              {/* Header */}
              <div className="bg-[#0a0a0a] text-white py-4 px-5 flex items-center justify-between border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0B9488]/25 border border-[#0B9488]/40 flex items-center justify-center shadow-inner overflow-hidden text-[#0B9488]">
                    {renderUnoIcon(16, "animate-rotate-spinning")}
                  </div>
                  <div>
                    <h4 className="serif text-sm tracking-wide font-medium text-white">UNO Asesor AI</h4>
                    <span className="text-[8px] font-mono tracking-widest text-[#0B9488] uppercase block flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0B9488] inline-block animate-pulse"></span>
                      {language === "es" ? "Especialista en Riviera Maya" : "Riviera Maya Specialist"}
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
              <div className="flex-1 overflow-y-auto p-5 bg-[#fcfcfc] space-y-4">
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex gap-3 items-start ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs border ${
                        m.role === "user"
                          ? "bg-zinc-100 border-zinc-200 text-zinc-700"
                          : "bg-[#0B9488]/10 border-[#0B9488]/20 text-[#0B9488]"
                      }`}
                    >
                      {m.role === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div className="max-w-[80%]">
                      <div
                        className={`p-3.5 rounded-sm shadow-2xs text-[11px] text-left leading-relaxed ${
                          m.role === "user"
                            ? "bg-[#0B9488] text-white font-medium"
                            : "bg-white border border-zinc-100 text-zinc-800"
                        }`}
                      >
                        {m.role === "user" ? (
                          <p className="whitespace-pre-wrap">{m.content}</p>
                        ) : (
                          <div className="space-y-0.5">{formatText(m.content)}</div>
                        )}
                      </div>
                      <span className="text-[7px] font-mono tracking-wider text-zinc-400 block mt-1 px-1">
                        {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex gap-3 items-start animate-pulse">
                    <div className="w-7 h-7 rounded-full bg-[#0B9488]/10 border border-[#0B9488]/20 flex items-center justify-center overflow-hidden text-[#0B9488]">
                      {renderUnoIcon(14, "animate-rotate-spinning")}
                    </div>
                    <div className="bg-white border border-zinc-150 p-4 rounded-sm shadow-2xs max-w-[80%] text-left">
                      <div className="flex space-x-1.5 items-center py-1">
                        <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-zinc-300 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt suggestions */}
              {onboardingStep === "completed" && messages.length <= 2 && !isLoading && (
                <div className="px-5 py-2 bg-zinc-50 border-t border-zinc-100">
                  <p className="text-[8px] font-mono font-bold tracking-widest text-zinc-400 uppercase mb-2 text-left">
                    {language === "es" ? "Sugerencias de Consulta" : "Suggested Queries"}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {quickPrompts.map((qp, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(qp.prompt)}
                        className="text-[9px] bg-white border border-zinc-200/80 hover:border-[#0B9488]/60 hover:text-[#0B9488] text-zinc-600 px-2.5 py-1.5 rounded-xs tracking-wider transition-all cursor-pointer text-left font-sans"
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
                className="p-3 border-t border-zinc-150 bg-white flex gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    language === "es"
                      ? "Pregunte sobre materiales, Chukum, permisos..."
                      : "Ask about materials, Chukum, permits..."
                  }
                  className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xs px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-[#0B9488]/60 focus:bg-white transition-all font-sans"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className={`px-4 bg-[#0a0a0a] hover:bg-zinc-800 text-[#0B9488] rounded-xs flex items-center justify-center transition-colors cursor-pointer ${
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
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#0a0a0a] hover:bg-zinc-900 border border-zinc-800 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer group"
          aria-label="Toggle AI consultant chatbot"
        >
          <Sparkles className="w-6 h-6 text-[#0B9488] group-hover:rotate-12 transition-transform duration-300" />
          
          <span className="absolute left-14 bg-zinc-950 text-white text-[9px] font-mono tracking-[0.2em] uppercase py-1.5 px-3 rounded-sm whitespace-nowrap shadow-lg opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none font-sans">
            {language === "es" ? "Consultor de Obra AI" : "AI Construction Consultant"}
          </span>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0B9488] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#0B9488]"></span>
          </span>
        </motion.button>
      </div>

      {/* CURSOR-TRACKING FLOATING SEMI-TRANSPARENT UNO LOGO IN BACKGROUND (MEDIUM LAG) */}
      <motion.div
        style={{ x: smoothBgX, y: smoothBgY }}
        animate={{
          color: isMoving ? "rgba(228, 228, 231, 0.16)" : "rgba(11, 148, 136, 0.28)"
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
