"use client";

import { motion } from "framer-motion";
import { Section, GradientTransition } from "@/components/ui/Section";
import { BottleneckGraph } from "@/components/ui/BottleneckGraph";

export function Act2Challenge() {
  return (
    <>
      <GradientTransition from="paper" to="challenge" />

      <Section id="challenge" background="challenge" className="px-6 py-20">
        <div className="max-w-2xl mx-auto">
          {/* The role framing */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-xs text-gray-400 tracking-wide font-mono mb-6">
              the <span className="text-gray-700 font-thin font-mono text-5xl underline">Challenge</span>
            </p>
            <p className="text-gray-900 text-xl mb-6">
              TruStage needs someone to shape enterprise R&D strategy.
            </p>
            <p className="text-gray-600">
              Accelerate discovery, validation, and application of emerging technologies.
              Translate strategic priorities into a research agenda that fuels innovation
              pipelines and de-risks technology investments.
            </p>
          </motion.div>

          {/* The gap */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs text-gray-400 tracking-wide font-mono mb-4">
              the bottleneck
            </p>
            <p className="text-gray-700 mb-4">
              The real problem isn&apos;t finding good ideas. It&apos;s getting them through the pipeline.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li>Exploration generates plenty of promising concepts</li>
              <li>But validation stalls without clear criteria</li>
              <li>Pilots run long without pathways to production</li>
              <li>And 88% of R&D investment never reaches customers</li>
            </ul>
          </motion.div>

          {/* Bottleneck visualization */}
          <BottleneckGraph />

          {/* The question */}
          <motion.div
            className="mt-12 pt-8 border-t border-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-900">
              How would I approach this?
            </p>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
