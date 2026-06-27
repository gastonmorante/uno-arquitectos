import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col justify-center items-center"
        >
          {/* GEOMETRIC UNO APERTURE ANIMATION */}
          <div className="relative mb-12 flex items-center justify-center">
            {/* Pulsing Backlight */}
            <div className="absolute w-32 h-32 rounded-full bg-[#0B9488]/5 blur-xl animate-pulse"></div>

            <svg
              width="100"
              height="100"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative z-10"
            >
              {/* SEGMENT 1 - TOP LEFT */}
              <motion.path
                d="M 100 20 L 30.72 60 L 30.72 140 L 69.69 117.5 L 69.69 82.5 L 100 65 Z"
                fill="#0B9488"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.9, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              />

              {/* SEGMENT 2 - TOP RIGHT */}
              <motion.path
                d="M 100 20 L 169.28 60 L 169.28 140 L 130.31 117.5 L 130.31 82.5 L 100 65 Z"
                fill="#0B9488"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              />

              {/* SEGMENT 3 - BOTTOM */}
              <motion.path
                d="M 30.72 140 L 100 180 L 169.28 140 L 130.31 117.5 L 100 135 L 69.69 117.5 Z"
                fill="#0B9488"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.75, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              />
            </svg>
          </div>

          {/* LOAD STATUS INDICATOR */}
          <div className="text-center font-mono">
            <h2 className="text-white text-xs tracking-[0.6em] font-light uppercase mb-2">
              UNO ARQUITECTOS
            </h2>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-zinc-500 tracking-widest font-bold">
              <span>{Math.min(percent, 100)}%</span>
              <span className="text-[#0B9488]/60">•</span>
              <span className="uppercase text-[8px] tracking-[0.2em]">
                {percent < 40 ? "Initializing engine..." : percent < 80 ? "Structuring blueprints..." : "Rendering environments..."}
              </span>
            </div>

            {/* Micro loading track */}
            <div className="w-40 h-[1px] bg-zinc-900 mx-auto mt-4 overflow-hidden relative">
              <motion.div
                className="h-full bg-[#0B9488]"
                style={{ width: `${Math.min(percent, 100)}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
