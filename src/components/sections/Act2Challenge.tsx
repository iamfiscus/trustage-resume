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
            <div className="text-left mb-6">
              <p className="text-left">
                <span className="text-gray-400 text-xl md:text-3xl italic" style={{ fontFamily: 'var(--font-serif)' }}>&ldquo;It&apos;s in the </span>
                <span className="text-gray-900 font-black text-2xl md:text-4xl uppercase tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>hardest</span>
                <span className="text-gray-400 text-lg md:text-2xl font-light" style={{ fontFamily: 'var(--font-mono)' }}> times</span>
              </p>
              <p className="mt-1 text-right">
                <span className="text-gray-400 text-xl md:text-3xl" style={{ fontFamily: 'var(--font-sans)' }}>we grow the </span>
                <span className="text-gray-900 text-2xl md:text-4xl italic font-thin tracking-stretch-150%" style={{ fontFamily: 'var(--font-serif)' }}>most </span>
                <span className="text-gray-400 text-lg md:text-2xl" style={{ fontFamily: 'var(--font-mono)' }}>&rdquo;</span>
              </p>
            </div>
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
            className="mb-4"
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
            <div className="space-y-3 text-center">
              <p className="px-0">
                <span className="text-gray-900 text-xl md:text-2xl italic" style={{ fontFamily: 'var(--font-serif)' }}>Exploration</span>
                <span className="text-gray-500 text-sm md:text-base ml-2" style={{ fontFamily: 'var(--font-mono)' }}>generates plenty of promising concepts</span>
              </p>
              <p className="px-4 md:px-8">
                <span className="text-gray-400 text-xs uppercase tracking-[0.2em]" style={{ fontFamily: 'var(--font-sans)' }}>but validation </span>
                <span className="text-gray-900 font-bold text-lg md:text-xl" style={{ fontFamily: 'var(--font-mono)' }}>stalls</span>
                <span className="text-gray-500 text-sm italic ml-1" style={{ fontFamily: 'var(--font-serif)' }}> without clear criteria</span>
              </p>
              <p className="px-8 md:px-16">
                <span className="text-gray-500 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>pilots run </span>
                <span className="text-gray-700 tracking-[0.3em] font-light" style={{ fontFamily: 'var(--font-mono)' }}>long</span>
                <span className="text-gray-500 text-sm italic" style={{ fontFamily: 'var(--font-serif)' }}> without pathways to </span>
                <span className="text-gray-900 font-semibold" style={{ fontFamily: 'var(--font-sans)' }}>production</span>
              </p>
              <p className="px-12 md:px-24">
                <span className="text-gray-400 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>and </span>
                <span className="text-gray-900 font-black text-2xl md:text-3xl" style={{ fontFamily: 'var(--font-sans)' }}>88%</span>
                <span className="text-gray-500 text-xs" style={{ fontFamily: 'var(--font-serif)' }}> never reaches customers</span>
              </p>
            </div>
          </motion.div>

          {/* Bottleneck visualization */}
          <BottleneckGraph />

          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <p className="mx-auto max-w-md mt-4 text-sm text-gray-500 italic pl-4 border-l-2 border-gray-200">
              The other 12% is mostly PowerPoints that became <br />real by accident.
            </p>
          </motion.div>

          {/* Quote */}
          <motion.div
            className="mt-12 pt-8 border-t border-gray-200"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-center">
              <span className="text-gray-400 text-xl md:text-3xl" style={{ fontFamily: 'var(--font-sans)' }}>Good ideas don&apos;t die in the </span>
              <span className="text-gray-900 font-black text-2xl md:text-4xl uppercase tracking-tight" style={{ fontFamily: 'var(--font-sans)' }}>market.</span>
            </p>
            <p className="text-center mt-1">
              <span className="text-gray-400 text-xl md:text-3xl italic" style={{ fontFamily: 'var(--font-serif)' }}>They die in </span>
              <span className="text-gray-900 text-3xl md:text-5xl font-semibold" style={{ fontFamily: 'var(--font-serif)' }}>committee.</span>
            </p>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
