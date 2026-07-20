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
  textSize = "text-base"
}) => {
  // Determine color based on scroll state and theme per brand guide
  const isDarkBg = theme === "dark" || (theme === "adaptive" && !isScrolled);
  
  const iconColor = "#00A3A3"; // Strictly Teal UNO (#00A3A3)
  const titleColor = isDarkBg ? "text-white" : "text-[#0a0a0a]";
  const subtitleColor = isDarkBg ? "text-zinc-300" : "text-[#4A4A4A]";

  const renderApertureSegments = () => {
    if (!animated) {
      return (
        <svg
          viewBox="0 0 200 200"
          className="fill-current text-[#00A3A3]"
          style={{ width: iconSize, height: iconSize }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* TOP-LEFT SEGMENT */}
          <g transform="translate(-3, -2)">
            <path d="M 100 20 L 30.72 60 L 30.72 140 L 69.69 117.5 L 69.69 82.5 L 100 65 Z" fill={iconColor} />
          </g>

          {/* TOP-RIGHT SEGMENT */}
          <g transform="translate(3, -2)">
            <path d="M 100 20 L 169.28 60 L 169.28 140 L 130.31 117.5 L 130.31 82.5 L 100 65 Z" fill={iconColor} />
          </g>

          {/* BOTTOM SEGMENT */}
          <g transform="translate(0, 4)">
            <path d="M 30.72 140 L 100 180 L 169.28 140 L 130.31 117.5 L 100 135 L 69.69 117.5 Z" fill={iconColor} />
          </g>
        </svg>
      );
    }

    return (
      <svg
        viewBox="0 0 200 200"
        className="fill-current text-[#00A3A3]"
        style={{ width: iconSize, height: iconSize }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* TOP-LEFT SEGMENT */}
        <g transform="translate(-3, -2)">
          <motion.path
            d="M 100 20 L 30.72 60 L 30.72 140 L 69.69 117.5 L 69.69 82.5 L 100 65 Z"
            fill={iconColor}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.95, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </g>

        {/* TOP-RIGHT SEGMENT */}
        <g transform="translate(3, -2)">
          <motion.path
            d="M 100 20 L 169.28 60 L 169.28 140 L 130.31 117.5 L 130.31 82.5 L 100 65 Z"
            fill={iconColor}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.95, scale: 1 }}
            transition={{ duration: 1, delay: 0.25, ease: "easeOut" }}
          />
        </g>

        {/* BOTTOM SEGMENT */}
        <g transform="translate(0, 4)">
          <motion.path
            d="M 30.72 140 L 100 180 L 169.28 140 L 130.31 117.5 L 100 135 L 69.69 117.5 Z"
            fill={iconColor}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.95, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          />
        </g>
      </svg>
    );
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        {renderApertureSegments()}
      </div>

      {showText && (
        <div className="flex flex-col leading-none text-left font-sans select-none">
          <motion.span
            className={`font-semibold tracking-[0.35em] ${textSize} ${titleColor}`}
            initial={animated ? { opacity: 0, x: -6 } : false}
            animate={animated ? { opacity: 1, x: 0 } : false}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            UNO
          </motion.span>
          <motion.span
            className={`font-normal tracking-[0.45em] text-[9px] mt-1 lowercase ${subtitleColor}`}
            initial={animated ? { opacity: 0 } : false}
            animate={animated ? { opacity: 1 } : false}
            transition={{ duration: 1, delay: 1 }}
          >
            arquitectos
          </motion.span>
        </div>
      )}
    </div>
  );
};

export default Logo;
