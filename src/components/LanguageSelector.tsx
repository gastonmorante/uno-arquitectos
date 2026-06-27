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
  const textColor = isDarkText ? "text-zinc-700 hover:text-zinc-950" : "text-white/80 hover:text-white";
  const borderColor = isDarkText ? "border-zinc-200" : "border-white/10";

  return (
    <div className="relative font-mono text-[10px] tracking-widest uppercase">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 border rounded-sm transition-all duration-300 cursor-pointer ${borderColor} ${textColor}`}
      >
        <Globe className="w-3.5 h-3.5 text-[#0B9488]" />
        <span>{language}</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1.5 bg-slate-950 border border-slate-900 rounded-sm py-1.5 min-w-[70px] shadow-2xl z-50 text-left">
          {languages.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                setLanguage(l.id);
                setIsOpen(false);
              }}
              className={`block w-full px-4 py-1.5 text-[9px] font-mono text-left hover:bg-slate-900 transition-colors ${
                language === l.id ? "text-[#0B9488] font-bold" : "text-zinc-400"
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
