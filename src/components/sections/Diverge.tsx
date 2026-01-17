"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Section, GradientTransition } from "@/components/ui/Section";
import { IdeasModal, IdeasTrigger } from "@/components/ui/IdeasModal";
import { useRef, useState } from "react";

// Preview of ideas (first 12)
const previewIdeas = [
  "Self-service analytics dashboards",
  "No-code experiment builders",
  "R&D literacy workshops",
  "Stage-gate framework",
  "Technology radar",
  "Executive research briefings",
  "AI governance framework",
  "Research mentorship pairing",
  "Fast-fail experiment framework",
  "University partnerships",
  "Stakeholder feedback loops",
  "Containerized research environments",
];

function DivergeContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  return (
    <>
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
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]) }}
        >
          step 2: <span className="text-gray-700 font-thin font-mono text-5xl underline">Diverge</span>
        </motion.p>

        {/* Deadpan */}
        <motion.p
          className="text-center mb-8"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]) }}
        >
          <span className="text-gray-900 font-black text-xl md:text-2xl lowercase tracking-tight">no bad ideas.</span>
          <span className="text-gray-400 font-light text-lg md:text-xl italic ml-2">yet.</span>
        </motion.p>

        {/* Prompt */}
        <motion.div
          className="mb-8"
          style={{ opacity: useTransform(scrollYProgress, [0.03, 0.1], [0, 1]) }}
        >
          <p className="text-gray-900 mb-2">
            What are all the ways to build leverage in enterprise R&D?
          </p>
          <p className="text-gray-500 text-xs">
            Generate ideas without judgment. Quantity over quality.
          </p>
        </motion.div>

        {/* Ideas preview */}
        <motion.div
          className="mb-10"
          style={{ opacity: useTransform(scrollYProgress, [0.1, 0.15], [0, 1]) }}
        >
          <p className="text-xs text-gray-400 tracking-wide mb-4">raw ideas (preview)</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {previewIdeas.map((idea, i) => (
              <motion.div
                key={i}
                className="py-1"
                style={{
                  opacity: useTransform(
                    scrollYProgress,
                    [0.15 + i * 0.015, 0.17 + i * 0.015],
                    [0, 1]
                  ),
                }}
              >
                <span className="text-gray-400 text-xs mr-2">{(i + 1).toString().padStart(2, '0')}</span>
                <span className="text-gray-700">{idea}</span>
              </motion.div>
            ))}
          </div>

          {/* More indicator */}
          <motion.p
            className="text-gray-400 text-xs mt-4"
            style={{ opacity: useTransform(scrollYProgress, [0.35, 0.4], [0, 1]) }}
          >
            + 30 more ideas...
          </motion.p>
        </motion.div>

        {/* Diverge principle */}
        <motion.div
          className="mb-10 p-4 bg-gray-50 rounded-lg"
          style={{ opacity: useTransform(scrollYProgress, [0.45, 0.55], [0, 1]) }}
        >
          <p className="text-xs text-gray-400 tracking-wide mb-2">principle</p>
          <p className="text-gray-600">
            Suspend judgment during divergence. Criticism kills creativity.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Save the criticism for converge. That&apos;s what it&apos;s for.
          </p>
        </motion.div>

        {/* Output with clickable modal */}
        <motion.div
          className="pt-8 border-t border-gray-200"
          style={{ opacity: useTransform(scrollYProgress, [0.65, 0.8], [0, 1]) }}
        >
          <p className="text-xs text-gray-400 tracking-wide mb-3">output</p>
          <IdeasTrigger count={42} onClick={() => setModalOpen(true)} />
          <p className="text-gray-500 mt-3">
            Now cluster by theme.
          </p>
        </motion.div>
      </motion.div>

      {/* Full ideas modal */}
      <IdeasModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export function Diverge() {
  return (
    <>
      <GradientTransition from="pillars" to="pillars" />

      <Section id="diverge" background="pillars" className="px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <DivergeContent />
        </div>
      </Section>
    </>
  );
}
