import React, { useState } from "react";
import { Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { Language } from "../types";

interface LanguageSelectorProps {
  isScrolled: boolean;
  theme?: "adaptive" | "light" | "dark";
}

export default function LanguageSelector({ isScrolled, theme = "adaptive" }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages: { id: Language; label: string }[] = [
    { id: "es", label: "ES" },
    { id: "en", label: "EN" },
    { id: "it", label: "IT" },
    { id: "fr", label: "FR" }
  ];

  const isDarkText = theme === "adaptive" && isScrolled;
  const textColor = isDarkText ? "text-[#4A4A4A] hover:text-[#1E1E1E]" : "text-white/80 hover:text-white";
  const borderColor = isDarkText ? "border-zinc-200" : "border-white/20";

  return (
    <div className="relative font-sans text-xs tracking-wider uppercase">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 border rounded-xs transition-all duration-300 cursor-pointer ${borderColor} ${textColor}`}
      >
        <Globe className="w-3.5 h-3.5 text-[#00A3A3]" />
        <span className="font-semibold">{language}</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 bg-[#1E1E1E] border border-zinc-800 rounded-xs py-1.5 min-w-[70px] shadow-xl z-50 text-left font-sans">
          {languages.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setLanguage(l.id);
                setIsOpen(false);
              }}
              className={`block w-full px-4 py-1.5 text-xs text-left hover:bg-zinc-800 transition-colors ${
                language === l.id ? "text-[#00A3A3] font-semibold" : "text-zinc-400"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
