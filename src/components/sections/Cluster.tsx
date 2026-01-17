"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Section, GradientTransition } from "@/components/ui/Section";
import { ClusterGraph } from "@/components/ui/ClusterGraph";
import { useRef } from "react";

function ClusterContent() {
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
        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]) }}
      >
        step 3: <span className="text-gray-700 font-thin font-mono text-5xl underline">Cluster</span>
      </motion.p>

      {/* Simple Math */}
      <motion.div
        className="mb-8"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]) }}
      >
        <p className="text-gray-400 font-mono text-3xl md:text-6xl font-thin tracking-[0.3em] md:tracking-[0.5em] uppercase w-full font-stretch-50%">
          Simple...
        </p>
        <p className="text-right mt-2">
          <span className="text-gray-400 text-xs md:text-sm italic">It&apos;s just </span>
          <span className="text-gray-900 font-bold text-4xl md:text-6xl">Math.</span>
        </p>
      </motion.div>

      {/* Instruction */}
      <motion.div
        className="mb-10"
        style={{ opacity: useTransform(scrollYProgress, [0.03, 0.1], [0, 1]) }}
      >
        <p className="text-gray-900 mb-2">
          Group 40 ideas into distinct themes.
        </p>
        <p className="text-gray-500 text-xs">
          Click each cluster to explore the ideas within.
        </p>
      </motion.div>

      {/* Interactive Cluster Graph */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0.1, 0.2], [0, 1]) }}
      >
        <ClusterGraph />
      </motion.div>

      {/* Pattern recognition */}
      <motion.div
        className="mt-6 pt-8 border-t border-gray-200"
        style={{ opacity: useTransform(scrollYProgress, [0.6, 0.75], [0, 1]) }}
      >
        <p className="text-xs text-gray-400 tracking-wide mb-3">pattern</p>
        <p className="text-gray-600 mb-2">
          4 of 6 clusters map to something I&apos;ve already built and shipped.
        </p>
        <p className="text-gray-500 text-sm italic text-right mb-2">
          The other 2 are on my list.
        </p>
        <p className="text-gray-900">
          Usually early to whatever&apos;s coming next.
        </p>
      </motion.div>

      {/* Summary */}
      <motion.div
        className="mt-8 p-4 bg-gray-50 rounded-lg"
        style={{ opacity: useTransform(scrollYProgress, [0.75, 0.85], [0, 1]) }}
      >
        <p className="text-gray-600 text-xs">
          <span className="text-gray-900">42 ideas</span> →
          <span className="text-gray-900"> 6 clusters</span> →
          Now the fun part: <span className="italic">killing your darlings.</span>
        </p>
      </motion.div>
    </motion.div>
  );
}

export function Cluster() {
  return (
    <>
      <GradientTransition from="pillars" to="cluster" />

      <Section id="cluster" background="cluster" className="px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <ClusterContent />
        </div>
      </Section>
    </>
  );
}
