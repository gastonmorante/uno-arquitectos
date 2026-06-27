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
  const brandColor = isAdaptiveDark ? "text-zinc-900" : "text-[#0B9488]";
  const titleColor = isAdaptiveDark ? "text-zinc-950" : "text-white";
  const subtitleColor = isAdaptiveDark ? "text-stone-600" : "text-stone-400";

  const renderApertureSegments = () => {
    if (!animated) {
      return (
        <svg
          viewBox="0 0 200 200"
          className={`fill-current ${brandColor}`}
          style={{ width: iconSize, height: iconSize }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* TOP-LEFT SEGMENT */}
          <g transform="translate(-3, -2)">
            <path d="M 100 20 L 30.72 60 L 30.72 140 L 69.69 117.5 L 69.69 82.5 L 100 65 Z" />
          </g>

          {/* TOP-RIGHT SEGMENT */}
          <g transform="translate(3, -2)">
            <path d="M 100 20 L 169.28 60 L 169.28 140 L 130.31 117.5 L 130.31 82.5 L 100 65 Z" />
          </g>

          {/* BOTTOM SEGMENT */}
          <g transform="translate(0, 4)">
            <path d="M 30.72 140 L 100 180 L 169.28 140 L 130.31 117.5 L 100 135 L 69.69 117.5 Z" />
          </g>
        </svg>
      );
    }

    return (
      <svg
        viewBox="0 0 200 200"
        className={`fill-current ${brandColor}`}
        style={{ width: iconSize, height: iconSize }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* TOP-LEFT SEGMENT */}
        <g transform="translate(-3, -2)">
          <motion.path
            d="M 100 20 L 30.72 60 L 30.72 140 L 69.69 117.5 L 69.69 82.5 L 100 65 Z"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.95, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </g>

        {/* TOP-RIGHT SEGMENT */}
        <g transform="translate(3, -2)">
          <motion.path
            d="M 100 20 L 169.28 60 L 169.28 140 L 130.31 117.5 L 130.31 82.5 L 100 65 Z"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.95, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          />
        </g>

        {/* BOTTOM SEGMENT */}
        <g transform="translate(0, 4)">
          <motion.path
            d="M 30.72 140 L 100 180 L 169.28 140 L 130.31 117.5 L 100 135 L 69.69 117.5 Z"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.95, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </g>
      </svg>
    );
  };

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      <div className="relative flex items-center justify-center">
        {renderApertureSegments()}
      </div>

      {showText && (
        <div className="flex flex-col leading-none text-left font-sans select-none">
          <motion.span
            className={`font-light tracking-[0.4em] ${textSize} ${titleColor}`}
            initial={animated ? { opacity: 0, x: -8 } : false}
            animate={animated ? { opacity: 1, x: 0 } : false}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            UNO
          </motion.span>
          <motion.span
            className={`font-extralight tracking-[0.55em] text-[7px] mt-1 uppercase ${subtitleColor}`}
            initial={animated ? { opacity: 0 } : false}
            animate={animated ? { opacity: 1 } : false}
            transition={{ duration: 1, delay: 1 }}
          >
            Arquitectos
          </motion.span>
        </div>
      )}
    </div>
  );
};

export default Logo;
