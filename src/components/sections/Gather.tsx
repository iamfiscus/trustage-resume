"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Section, GradientTransition } from "@/components/ui/Section";
import { useRef } from "react";

function GatherRequirements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const strategicRows = [
    { says: "Define enterprise R&D strategy", means: "Build a system, not a backlog" },
    { says: "Assess emerging technologies", means: "Separate signal from noise" },
    { says: "Balanced portfolio (H1/H2/H3)", means: "Know when to ship vs. explore" },
  ];

  const portfolioRows = [
    { says: "Oversee R&D project execution", means: "Make research legible to business" },
    { says: "Partner with AI, Automation teams", means: "Bridge the translation gap" },
    { says: "Track exploration → production", means: "Fix the leaky pipeline" },
  ];

  const stakeholderRows = [
    { says: "Lead stakeholder engagement", means: "Sell research without selling" },
    { says: "Champion R&D literacy", means: "Teach others to fish" },
    { says: "Communicate to non-technical", means: "Make PhDs legible to execs" },
  ];

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
        className="text-gray-400 text-xs tracking-wide mb-8"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]) }}
      >
        step 1: <span className="text-gray-700 font-thin font-mono text-5xl underline">Gather Requirements</span>
      </motion.p>

      {/* Strategic Leadership */}
      <motion.div
        className="mb-10"
        style={{ opacity: useTransform(scrollYProgress, [0.05, 0.1], [0, 1]) }}
      >
        <p className="text-xs text-gray-400 tracking-wide mb-4">strategic leadership</p>
        <div className="grid grid-cols-2 gap-8 pb-2 border-b border-gray-200">
          <span className="text-xs text-gray-400">what the job says</span>
          <span className="text-xs text-gray-400">what it actually means</span>
        </div>
        {strategicRows.map((row, i) => (
          <motion.div
            key={i}
            className="grid grid-cols-2 gap-8 py-3 border-b border-gray-100"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [0.1 + i * 0.04, 0.14 + i * 0.04],
                [0, 1]
              ),
            }}
          >
            <span className="text-gray-500">{row.says}</span>
            <span className="text-gray-900">{row.means}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Portfolio Management */}
      <motion.div
        className="mb-10"
        style={{ opacity: useTransform(scrollYProgress, [0.25, 0.3], [0, 1]) }}
      >
        <p className="text-xs text-gray-400 tracking-wide mb-4">portfolio management</p>
        <div className="grid grid-cols-2 gap-8 pb-2 border-b border-gray-200">
          <span className="text-xs text-gray-400">what the job says</span>
          <span className="text-xs text-gray-400">what it actually means</span>
        </div>
        {portfolioRows.map((row, i) => (
          <motion.div
            key={i}
            className="grid grid-cols-2 gap-8 py-3 border-b border-gray-100"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [0.3 + i * 0.04, 0.34 + i * 0.04],
                [0, 1]
              ),
            }}
          >
            <span className="text-gray-500">{row.says}</span>
            <span className="text-gray-900">{row.means}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Stakeholder Management */}
      <motion.div
        className="mb-10"
        style={{ opacity: useTransform(scrollYProgress, [0.45, 0.5], [0, 1]) }}
      >
        <p className="text-xs text-gray-400 tracking-wide mb-4">stakeholder management</p>
        <div className="grid grid-cols-2 gap-8 pb-2 border-b border-gray-200">
          <span className="text-xs text-gray-400">what the job says</span>
          <span className="text-xs text-gray-400">what it actually means</span>
        </div>
        {stakeholderRows.map((row, i) => (
          <motion.div
            key={i}
            className="grid grid-cols-2 gap-8 py-3 border-b border-gray-100"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [0.5 + i * 0.04, 0.54 + i * 0.04],
                [0, 1]
              ),
            }}
          >
            <span className="text-gray-500">{row.says}</span>
            <span className="text-gray-900">{row.means}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Pattern recognition */}
      <motion.div
        className="mt-10"
        style={{ opacity: useTransform(scrollYProgress, [0.7, 0.8], [0, 1]) }}
      >
        <p className="text-xs text-gray-400 tracking-wide mb-3">pattern</p>
        <p className="text-gray-600 mb-2">
          Every requirement is about <span className="text-gray-900 font-medium">multiplication</span>, not addition.
        </p>
        <p className="text-gray-600">
          The role isn&apos;t doing research. It&apos;s <span className="text-gray-900 font-medium">building leverage</span>.
        </p>
      </motion.div>

      {/* Constraint */}
      <motion.div
        className="mt-10 pt-8 border-t border-gray-200"
        style={{ opacity: useTransform(scrollYProgress, [0.85, 0.95], [0, 1]) }}
      >
        <p className="text-xs text-gray-400 tracking-wide mb-3">constraint</p>
        <p className="text-gray-900">
          Regulated industry. Insurance and financial services.
        </p>
        <p className="text-gray-500 mt-2">
          Research needs to translate into business value while navigating governance.
        </p>
      </motion.div>
    </motion.div>
  );
}

export function Gather() {
  return (
    <>
      <GradientTransition from="challenge" to="pillars" />

      <Section id="clarify" background="pillars" className="px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <GatherRequirements />
        </div>
      </Section>
    </>
  );
}
