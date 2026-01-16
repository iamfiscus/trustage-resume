"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface BottleneckGraphProps {
  className?: string;
}

export function BottleneckGraph({ className = "" }: BottleneckGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  // Pipeline stages with their conversion rates
  const stages = [
    { label: "exploration", count: 100, color: "#9ca3af" },
    { label: "validation", count: 65, color: "#9ca3af" },
    { label: "pilot", count: 30, color: "#f59e0b" },
    { label: "production", count: 12, color: "#ef4444" },
  ];

  return (
    <motion.div
      ref={containerRef}
      className={`py-12 ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-md mx-auto">
        {/* SVG Funnel */}
        <svg viewBox="0 0 400 280" className="w-full h-auto">
          {/* Funnel shape - clean lines */}
          <motion.path
            d="M 40 30 L 360 30 L 260 120 L 260 250 L 140 250 L 140 120 Z"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2"
            style={{
              pathLength: useTransform(scrollYProgress, [0, 0.3], [0, 1]),
            }}
          />

          {/* Stage lines */}
          {stages.map((stage, i) => {
            const y = 50 + i * 55;
            const leftX = 40 + (i * 25);
            const rightX = 360 - (i * 25);

            return (
              <g key={stage.label}>
                {/* Horizontal fill bar */}
                <motion.rect
                  x={leftX}
                  y={y - 8}
                  width={rightX - leftX}
                  height={16}
                  fill={stage.color}
                  opacity={0.2}
                  rx={2}
                  style={{
                    scaleX: useTransform(
                      scrollYProgress,
                      [0.1 + i * 0.15, 0.2 + i * 0.15],
                      [0, 1]
                    ),
                    transformOrigin: "left",
                  }}
                />

                {/* Stage label */}
                <motion.text
                  x={20}
                  y={y + 4}
                  fontSize="11"
                  fill="#9ca3af"
                  fontFamily="var(--font-mono)"
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [0.1 + i * 0.15, 0.18 + i * 0.15],
                      [0, 1]
                    ),
                  }}
                >
                  {stage.label}
                </motion.text>

                {/* Count */}
                <motion.text
                  x={380}
                  y={y + 4}
                  fontSize="11"
                  fill={stage.color}
                  fontFamily="var(--font-mono)"
                  textAnchor="end"
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [0.15 + i * 0.15, 0.22 + i * 0.15],
                      [0, 1]
                    ),
                  }}
                >
                  {stage.count}%
                </motion.text>
              </g>
            );
          })}

          {/* Leak indicators */}
          <motion.g
            style={{
              opacity: useTransform(scrollYProgress, [0.6, 0.75], [0, 1]),
            }}
          >
            {/* Arrow showing leak */}
            <path
              d="M 270 90 L 290 90 L 290 100"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <text x="295" y="95" fontSize="9" fill="#ef4444" fontFamily="var(--font-mono)">
              -35%
            </text>

            <path
              d="M 265 145 L 285 145 L 285 155"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <text x="290" y="150" fontSize="9" fill="#ef4444" fontFamily="var(--font-mono)">
              -54%
            </text>

            <path
              d="M 260 200 L 280 200 L 280 210"
              fill="none"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <text x="285" y="205" fontSize="9" fill="#ef4444" fontFamily="var(--font-mono)">
              -60%
            </text>
          </motion.g>
        </svg>

        {/* Caption */}
        <motion.div
          className="text-center mt-6"
          style={{
            opacity: useTransform(scrollYProgress, [0.75, 0.9], [0, 1]),
          }}
        >
          <p className="text-sm text-gray-500 font-mono">
            88% of R&D never reaches production.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            The pipeline leaks at every stage.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
