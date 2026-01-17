"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Section, GradientTransition } from "@/components/ui/Section";
import { useRef } from "react";

// Evaluation criteria from brainstorm
const evaluationCriteria = [
  { name: "Impact", weight: 30, description: "Measurable business value" },
  { name: "Feasibility", weight: 25, description: "Available resources" },
  { name: "Alignment", weight: 20, description: "Strategic priorities" },
  { name: "Speed", weight: 15, description: "Time to first value" },
  { name: "Risk", weight: 10, description: "Regulatory profile" },
];

// Top 5 selections with actual scores from brainstorm
const topSelections = [
  { rank: 1, name: "Enablement & Translation", score: 8.3, insight: "Addresses root cause of R&D-business gap" },
  { rank: 2, name: "Tech-as-a-Service", score: 8.1, insight: "Creates compounding leverage" },
  { rank: 3, name: "Stakeholder Architecture", score: 8.0, insight: "Enables all other initiatives" },
  { rank: 4, name: "Pipeline Management", score: 7.6, insight: "Fixes the leaky pipeline problem" },
  { rank: 5, name: "Horizon Scanning", score: 7.6, insight: "Maintains future-focused perspective" },
];

// Score bar component
function ScoreBar({ score, maxScore = 10, delay = 0 }: { score: number; maxScore?: number; delay?: number }) {
  const percentage = (score / maxScore) * 100;

  return (
    <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden w-full">
      <motion.div
        className="h-full bg-stone-600 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      />
    </div>
  );
}

// Criteria weights visualization
function CriteriaWeights() {
  return (
    <div className="flex gap-1 items-end h-8">
      {evaluationCriteria.map((criterion, i) => (
        <motion.div
          key={criterion.name}
          className="bg-stone-400 rounded-sm"
          style={{ width: `${criterion.weight}%` }}
          initial={{ height: 0 }}
          whileInView={{ height: `${criterion.weight * 1.2}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          title={`${criterion.name}: ${criterion.weight}%`}
        />
      ))}
    </div>
  );
}

function ConvergeContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  return (
    <motion.div
      ref={containerRef}
      className="font-mono text-sm leading-relaxed"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Step label */}
      <motion.p
        className="text-gray-400 text-xs tracking-wide mb-4"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
      >
        step 4: <span className="text-gray-700 font-thin font-mono text-5xl underline">Converge</span>
      </motion.p>

      {/* Deadpan */}
      <motion.div
        className="mb-8 flex flex-col items-end"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
      >
        <p className="text-blue-400 text-xs md:text-sm uppercase tracking-[0.5em]" style={{ fontFamily: 'var(--font-mono)' }}>
          now we get
        </p>
        <p className="text-gray-900 text-4xl md:text-6xl font-black uppercase -mt-1" style={{ fontFamily: 'var(--font-sans)' }}>
          brutal.
        </p>
      </motion.div>

      {/* Evaluation criteria */}
      <motion.div
        className="mb-10"
        style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2], [0, 1]) }}
      >
        <p className="text-xs text-gray-400 tracking-wide mb-1">evaluation criteria</p>
        <p className="text-xs text-gray-500 italic mb-3">weighted by reality</p>

        {/* Mini criteria visualization */}
        <div className="mb-4">
          <CriteriaWeights />
          <div className="flex gap-1 mt-1 text-[9px] text-stone-400">
            {evaluationCriteria.map((c) => (
              <div key={c.name} style={{ width: `${c.weight}%` }} className="truncate">
                {c.weight}%
              </div>
            ))}
          </div>
        </div>

        {/* Criteria labels */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
          {evaluationCriteria.map((c) => (
            <span key={c.name}>
              <span className="text-stone-700">{c.name}</span>
              <span className="text-stone-400 ml-1">({c.weight}%)</span>
            </span>
          ))}
        </div>
      </motion.div>

      {/* Top 5 selections with scores */}
      <motion.div
        className="mb-10"
        style={{ opacity: useTransform(scrollYProgress, [0.25, 0.35], [0, 1]) }}
      >
        <p className="text-xs text-gray-400 tracking-wide mb-4">top selections</p>

        <div className="space-y-4">
          {topSelections.map((selection, i) => (
            <motion.div
              key={selection.name}
              className="group"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-stone-400 text-xs w-4">{selection.rank}.</span>
                <span className="text-stone-800 flex-1">{selection.name}</span>
                <span className="text-stone-600 font-medium tabular-nums">{selection.score.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4" />
                <div className="flex-1">
                  <ScoreBar score={selection.score} delay={i * 0.1} />
                </div>
                <span className="w-8" />
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="w-4" />
                <p className="text-[11px] text-stone-400 flex-1">{selection.insight}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Top selection callout */}
        <motion.p
          className="mt-6 text-sm text-stone-600 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          Enablement & Translation wins. Not because it&apos;s flashy.{" "}
          <span className="text-stone-900 font-medium">Because it fixes the actual problem.</span>
        </motion.p>
      </motion.div>

    </motion.div>
  );
}

export function Converge() {
  return (
    <>
      <GradientTransition from="cluster" to="converge" />

      <Section id="converge" background="converge" className="px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <ConvergeContent />
        </div>
      </Section>
    </>
  );
}
