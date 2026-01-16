"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Section, SectionHeader, GradientTransition } from "@/components/ui/Section";
import { useRef } from "react";

function TimelineCompression() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  // Before bar shrinks, after bar grows
  const beforeWidth = useTransform(scrollYProgress, [0, 0.5], ["100%", "16%"]);
  const beforeOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0.3]);
  const afterOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const afterWidth = useTransform(scrollYProgress, [0.5, 0.8], ["0%", "16%"]);
  const labelOpacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);

  return (
    <motion.div
      ref={containerRef}
      className="py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-lg mx-auto space-y-8">
        {/* Before - 6 months */}
        <motion.div style={{ opacity: beforeOpacity }}>
          <p className="text-caption text-gray-400 mb-2 font-mono">before</p>
          <motion.div
            className="h-10 bg-gray-300 rounded flex items-center justify-between px-4 overflow-hidden"
            style={{ width: beforeWidth }}
          >
            <span className="text-caption text-gray-600 font-mono whitespace-nowrap">M1</span>
            <span className="text-caption text-gray-600 font-mono whitespace-nowrap">M6</span>
          </motion.div>
          <motion.p
            className="text-caption text-gray-500 mt-2 line-through"
            style={{ textDecorationColor: "#dc2626" }}
          >
            180 days from idea to insight
          </motion.p>
        </motion.div>

        {/* After - 2 weeks */}
        <motion.div style={{ opacity: afterOpacity }}>
          <p className="text-caption text-blue-600 mb-2 font-mono">after</p>
          <motion.div
            className="h-10 bg-blue-600 rounded flex items-center justify-center overflow-hidden"
            style={{ width: afterWidth }}
          >
            <span className="text-caption text-white font-mono">W1-W2</span>
          </motion.div>
          <p className="text-caption text-blue-700 mt-2 font-medium">
            14 days from idea to insight
          </p>
        </motion.div>

        {/* Multiplier */}
        <motion.div
          className="text-center pt-4"
          style={{ opacity: labelOpacity }}
        >
          <span className="inline-block bg-blue-600 text-white text-h3 font-mono font-bold px-4 py-2 rounded">
            12x faster
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

function DiffView() {
  const lines = [
    { type: "remove", text: "// wait 6 months for data team" },
    { type: "remove", text: "const report = await waitForDataTeam(request);" },
    { type: "remove", text: "// hope it's what you needed" },
    { type: "context", text: "" },
    { type: "add", text: "// self-service analytics" },
    { type: "add", text: "const report = await toolkit.analyze(data);" },
    { type: "add", text: "// iterate in minutes, not months" },
  ];

  return (
    <motion.div
      className="py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-lg mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
          <span className="text-caption text-gray-500 font-mono">consultant-workflow.ts</span>
        </div>
        <div className="p-4 space-y-1">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              className={`diff-line ${
                line.type === "remove" ? "diff-remove" :
                line.type === "add" ? "diff-add" : "diff-context"
              }`}
              initial={{ opacity: 0, x: line.type === "remove" ? -10 : line.type === "add" ? 10 : 0 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {line.type === "remove" && <span className="mr-2">-</span>}
              {line.type === "add" && <span className="mr-2">+</span>}
              {line.text || "\u00A0"}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface ApproachProps {
  title: string;
  description: string;
  points: string[];
}

function Approach({ title, description, points }: ApproachProps) {
  return (
    <motion.div
      className="py-8 border-b border-gray-100 last:border-b-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-h3 font-headline font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-body text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {points.map((point, i) => (
          <motion.li
            key={i}
            className="flex items-start gap-3 text-caption text-gray-500"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <span className="text-blue-600 mt-0.5">-</span>
            {point}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Act3Pillars() {
  return (
    <>
      <GradientTransition from="challenge" to="pillars" />

      <Section id="pillars" background="pillars" className="px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            marker="Section II"
            title="The Approach"
            subtitle="Three shifts that change the math."
          />

          {/* Intro text */}
          <motion.p
            className="text-lead text-gray-600 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            The goal isn&apos;t to work harder. It&apos;s to build leverage.
          </motion.p>

          {/* Timeline compression viz */}
          <TimelineCompression />

          {/* The three approaches */}
          <Approach
            title="Tech-as-a-Service"
            description="Transform the data team from bottleneck to enabler."
            points={[
              "Service catalog with clear SLAs",
              "Intake process that respects business urgency",
              "Transparent prioritization",
            ]}
          />

          <Approach
            title="Enablement"
            description="Arm consultants with tools to self-serve."
            points={[
              "Build tools, not dependencies",
              "Train advocates who train others",
              "Measure adoption, not just delivery",
            ]}
          />

          <Approach
            title="Rapid Prototyping"
            description="PhD partnerships for fast exploration."
            points={[
              "Time-boxed experiments (2 weeks, not 6 months)",
              "Clear kill/scale criteria before starting",
              "PhD talent as exploration engine, not labor arbitrage",
            ]}
          />

          {/* Diff view - the transformation in code */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-caption text-gray-400 mb-4 font-mono text-center">
              what this looks like in practice
            </p>
            <DiffView />
          </motion.div>
        </div>
      </Section>
    </>
  );
}
