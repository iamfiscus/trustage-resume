"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { motion } from "framer-motion";

const sections = [
  { id: "paper", label: "Paper" },
  { id: "challenge", label: "Challenge" },
  { id: "pillars", label: "Pillars" },
  { id: "horizon", label: "Horizon" },
  { id: "toolkit", label: "Toolkit" },
  { id: "close", label: "Close" },
];

export function ProgressIndicator() {
  const { progress, currentSection } = useScrollProgress();

  return (
    <>
      {/* Desktop: Sidebar with labels */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3">
        {sections.map((section, index) => (
          <div key={section.id} className="flex items-center gap-2">
            <span
              className={`text-micro font-data transition-all duration-300 ${
                currentSection === index
                  ? "opacity-100"
                  : "opacity-0 translate-x-2"
              }`}
            >
              {section.label}
            </span>
            <div
              className={`w-1 h-6 rounded-full transition-all duration-300 ${
                currentSection >= index
                  ? currentSection === index
                    ? "bg-blue-600 scale-110"
                    : "bg-blue-400"
                  : "bg-gray-200"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Mobile: Bottom dots */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex lg:hidden gap-2">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSection >= index
                ? currentSection === index
                  ? "bg-blue-600 scale-125"
                  : "bg-blue-400"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Progress bar gradient (desktop only) */}
      <motion.div
        className="fixed right-2 top-1/2 -translate-y-1/2 w-1 h-48 rounded-full bg-gray-100 overflow-hidden hidden xl:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-full rounded-full"
          style={{
            height: `${progress * 100}%`,
            background: `linear-gradient(to bottom,
              #dc2626 0%,
              #2563eb 40%,
              #7c3aed 70%,
              #22c55e 100%
            )`,
          }}
        />
      </motion.div>
    </>
  );
}
