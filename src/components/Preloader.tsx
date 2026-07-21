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
          className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col justify-center items-center font-sans"
        >
          {/* GEOMETRIC UNO APERTURE ANIMATION */}
          <div className="relative mb-12 flex items-center justify-center">
            {/* Pulsing Backlight */}
            <div className="absolute w-32 h-32 rounded-full bg-[#00A3A3]/10 blur-xl animate-pulse"></div>

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
                fill="#00A3A3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.95, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
              />

              {/* SEGMENT 2 - TOP RIGHT */}
              <motion.path
                d="M 100 20 L 169.28 60 L 169.28 140 L 130.31 117.5 L 130.31 82.5 L 100 65 Z"
                fill="#00A3A3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.95, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              />

              {/* SEGMENT 3 - BOTTOM */}
              <motion.path
                d="M 30.72 140 L 100 180 L 169.28 140 L 130.31 117.5 L 100 135 L 69.69 117.5 Z"
                fill="#00A3A3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.95, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              />

              {/* CENTRAL 3D ISOMETRIC CUBE */}
              <motion.g
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              >
                <path
                  d="M 100 77 L 119.92 88.5 L 119.92 111.5 L 100 123 L 80.08 111.5 L 80.08 88.5 Z"
                  fill="#FFFFFF"
                  stroke="#00A3A3"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M 100 100 L 100 123 M 100 100 L 80.08 88.5 M 100 100 L 119.92 88.5"
                  stroke="#00A3A3"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </motion.g>
            </svg>
          </div>

          {/* LOAD STATUS INDICATOR */}
          <div className="text-center font-sans">
            <h2 className="text-white text-sm tracking-[0.5em] uppercase mb-2">
              <span className="font-semibold text-white">UNO</span>{" "}
              <span className="font-light text-zinc-400">ARQUITECTOS</span>
            </h2>
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-zinc-400 tracking-widest">
              <span>{Math.min(percent, 100)}%</span>
              <span className="text-[#00A3A3]">•</span>
              <span className="uppercase text-[10px] tracking-[0.25em] text-zinc-400 font-light">
                {percent < 40 ? "Cargando proyecto..." : percent < 80 ? "Procesando ingeniería..." : "Renderizando espacio..."}
              </span>
            </div>

            {/* Micro loading track */}
            <div className="w-48 h-[2px] bg-zinc-800 mx-auto mt-4 overflow-hidden relative rounded-full">
              <motion.div
                className="h-full bg-[#00A3A3]"
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
