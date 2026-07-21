import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, animate } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

interface MetricCounterProps {
  valueStr: string;
  title: string;
  desc: string;
}

const MetricCounter: React.FC<MetricCounterProps> = ({ valueStr, title, desc }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayNum, setDisplayNum] = useState(0);

  // Parse prefix, target number and suffix
  const prefixMatch = valueStr.match(/^[^\d]+/);
  const prefix = prefixMatch ? prefixMatch[0] : "";
  const numberMatch = valueStr.match(/\d+/);
  const targetNumber = numberMatch ? parseInt(numberMatch[0], 10) : 0;
  const suffix = valueStr.substring(prefix.length + (numberMatch ? numberMatch[0].length : 0));

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, targetNumber, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1], // Smooth easeOut curve
        onUpdate(latest) {
          setDisplayNum(Math.floor(latest));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, targetNumber]);

  return (
    <div
      ref={ref}
      className="bg-zinc-50/50 border border-zinc-200/60 rounded-xs p-8 flex flex-col justify-between relative group overflow-hidden transition-all duration-300 hover:shadow-md h-full text-left font-sans"
    >
      {/* Brand color subtle hover glow */}
      <div className="absolute inset-0 bg-[#00A3A3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="text-5xl md:text-6xl font-semibold tracking-tight text-[#00A3A3] mb-4">
          {prefix}{displayNum}{suffix}
        </div>
        <h3 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#0a0a0a] mb-2">
          {title}
        </h3>
        <p className="text-xs text-zinc-500 font-normal leading-relaxed">
          {desc}
        </p>
      </div>
      <div className="w-8 group-hover:w-full h-[2px] bg-[#00A3A3] transition-all duration-500 mt-6 relative z-10"></div>
    </div>
  );
};

export default function Metrics() {
  const { t } = useLanguage();

  const metricsData = [
    {
      val: t("metrics.m1Val") || "15+",
      title: t("metrics.m1Title") || "Años de Trayectoria",
      desc: t("metrics.m1Desc") || "Liderando alta ingeniería en el sureste mexicano.",
    },
    {
      val: t("metrics.m2Val") || "80K+",
      title: t("metrics.m2Title") || "m² Proyectados",
      desc: t("metrics.m2Desc") || "Diseñados, calculados y construidos.",
    },
    {
      val: t("metrics.m3Val") || "100%",
      title: t("metrics.m3Title") || "Viabilidad Legal",
      desc: t("metrics.m3Desc") || "Aprobación y gestoría ágil de licencias.",
    },
    {
      val: t("metrics.m4Val") || "+150",
      title: t("metrics.m4Title") || "Clientes de Élite",
      desc: t("metrics.m4Desc") || "Propiedades residenciales exclusivas.",
    },
  ];

  return (
    <section id="metricas" className="py-20 md:py-24 px-6 md:px-12 bg-white border-t border-b border-zinc-100 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
            >
              <MetricCounter
                valueStr={item.val}
                title={item.title}
                desc={item.desc}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
