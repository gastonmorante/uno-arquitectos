import React from "react";
import { motion } from "motion/react";

interface LogoProps {
  className?: string;
  animated?: boolean;
  showText?: boolean;
  iconSize?: number;
  isScrolled?: boolean;
  theme?: "adaptive" | "light" | "dark";
  textSize?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "h-8", 
  animated = true,
  showText = true,
  iconSize = 32,
  isScrolled = false,
  theme = "adaptive",
  textSize = "text-sm"
}) => {
  // Determine color based on scroll state and theme
  const isAdaptiveDark = theme === "adaptive" && isScrolled;
  const strokeColor = isAdaptiveDark ? "text-zinc-900" : "text-white";
  const titleColor = isAdaptiveDark ? "text-zinc-950" : "text-white";
  const subtitleColor = isAdaptiveDark ? "text-stone-600" : "text-stone-400";
  const circleStroke = isAdaptiveDark ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.15)";

  if (!animated) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <svg
          viewBox="0 0 100 100"
          className="stroke-current fill-none"
          style={{ width: iconSize, height: iconSize }}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Círculo Exterior Sutil */}
          <circle cx="50" cy="50" r="45" strokeOpacity="0.15" />
          
          {/* El número "1" estilizado y minimalista */}
          <path d="M40,35 L55,25 L55,75 M45,75 L65,75" className={strokeColor} />
        </svg>
        {showText && (
          <div className="flex flex-col leading-none text-left">
            <span className={`font-light tracking-[0.4em] ${textSize} ${titleColor}`}>UNO</span>
            <span className={`font-extralight tracking-[0.55em] text-[7px] mt-1 uppercase ${subtitleColor}`}>
              Arquitectos
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative" style={{ width: iconSize, height: iconSize }}>
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full stroke-current fill-none ${strokeColor}`}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Círculo sutil animándose */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke={circleStroke}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Trazos principales del "1" */}
          <motion.path
            d="M40,35 L55,25 L55,75"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
          />

          {/* Base del "1" */}
          <motion.path
            d="M45,75 L65,75"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none text-left font-sans">
          <motion.span
            className={`font-light tracking-[0.4em] ${textSize} ${titleColor}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            UNO
          </motion.span>
          <motion.span
            className={`font-extralight tracking-[0.55em] text-[7px] mt-1 uppercase ${subtitleColor}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            Arquitectos
          </motion.span>
        </div>
      )}
    </div>
  );
};

export default Logo;
