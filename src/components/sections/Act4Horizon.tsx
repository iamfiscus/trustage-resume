"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Section, SectionHeader, GradientTransition } from "@/components/ui/Section";
import { useRef } from "react";

function ResearchPath() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  // Path draws itself as you scroll
  const pathLength = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);
  const node1Opacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1]);
  const node2Opacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const node3Opacity = useTransform(scrollYProgress, [0.55, 0.65], [0, 1]);
  const labelsOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);

  return (
    <motion.div
      ref={containerRef}
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-lg mx-auto">
        <svg viewBox="0 0 400 120" className="w-full h-auto">
          {/* The connecting path */}
          <motion.path
            d="M 50 60 L 200 60 L 350 60"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ pathLength }}
          />

          {/* Node 1 - Research */}
          <motion.g style={{ opacity: node1Opacity }}>
            <circle cx="50" cy="60" r="12" fill="#7c3aed" />
            <text x="50" y="95" textAnchor="middle" className="fill-gray-600" fontSize="11" fontFamily="var(--font-sans)">
              Research
            </text>
          </motion.g>

          {/* Node 2 - Prototype */}
          <motion.g style={{ opacity: node2Opacity }}>
            <circle cx="200" cy="60" r="12" fill="#7c3aed" />
            <text x="200" y="95" textAnchor="middle" className="fill-gray-600" fontSize="11" fontFamily="var(--font-sans)">
              Prototype
            </text>
          </motion.g>

          {/* Node 3 - Production */}
          <motion.g style={{ opacity: node3Opacity }}>
            <circle cx="350" cy="60" r="12" fill="#7c3aed" />
            <text x="350" y="95" textAnchor="middle" className="fill-gray-600" fontSize="11" fontFamily="var(--font-sans)">
              Production
            </text>
          </motion.g>

          {/* Sub-labels */}
          <motion.g style={{ opacity: labelsOpacity }}>
            <text x="50" y="25" textAnchor="middle" className="fill-gray-400" fontSize="9" fontFamily="var(--font-mono)">
              hypothesis
            </text>
            <text x="200" y="25" textAnchor="middle" className="fill-gray-400" fontSize="9" fontFamily="var(--font-mono)">
              test fast
            </text>
            <text x="350" y="25" textAnchor="middle" className="fill-gray-400" fontSize="9" fontFamily="var(--font-mono)">
              scale what works
            </text>
          </motion.g>
        </svg>
      </div>
    </motion.div>
  );
}

function HorizonCard({ title, tagline, points }: { title: string; tagline: string; points: string[] }) {
  return (
    <motion.div
      className="bg-white border border-purple-100 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-h3 font-headline font-semibold text-gray-900 mb-1">
        {title}
      </h3>
      <p className="text-body text-purple-600 mb-4">{tagline}</p>
      <ul className="space-y-2">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-caption text-gray-600">
            <span className="text-purple-400 mt-0.5">-</span>
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Act4Horizon() {
  return (
    <>
      <GradientTransition from="pillars" to="horizon" />

      <Section id="horizon" background="horizon" className="px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            marker="Section III"
            title="The Horizon"
            subtitle="R&D isn&apos;t just about today&apos;s problems."
          />

          {/* Deadpan */}
          <motion.div
            className="mb-12 flex items-baseline gap-2 md:gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-300 text-3xl md:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>Bet</span>
            <span className="text-gray-900 font-black text-4xl md:text-6xl uppercase tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>early.</span>
            <span className="text-gray-400 text-lg md:text-2xl italic ml-2" style={{ fontFamily: 'var(--font-mono)' }}>Adjust often.</span>
          </motion.div>

          {/* Intro */}
          <motion.div
            className="space-y-4 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-lead text-gray-600">
              Two technologies will reshape insurance within 3 years.
              I&apos;ve been building in both.
            </p>
            <p className="text-gray-500 italic">
              Not because I&apos;m a visionary. Because I got tired of waiting.
            </p>
          </motion.div>

          {/* The research path visualization */}
          <ResearchPath />

          {/* Two horizon cards - no emojis */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <HorizonCard
              title="Web AI"
              tagline="AI that runs in the browser"
              points={[
                "Privacy - data never leaves the device. Compliance teams everywhere just exhaled.",
                "Speed - no network latency",
                "Cost - zero API calls",
              ]}
            />

            <HorizonCard
              title="Agentic Systems"
              tagline="Agents that work autonomously"
              points={[
                "Scale - compare thousands of options",
                "Personalization - tailored recommendations",
                "Speed - days reduced to minutes",
              ]}
            />
          </div>

          {/* Why this matters */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-body text-gray-500">
              Building capability now creates advantage later.
            </p>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
