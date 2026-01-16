"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { ShippedTerminal } from "@/components/ui/SepiaTerminal";
import { ThesisModal } from "@/components/ui/ThesisModal";
import { useRef, useState } from "react";

function ProofOfPatternContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isThesisModalOpen, setIsThesisModalOpen] = useState(false);
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
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [0, 1]) }}
      >
        <p className="text-xs text-gray-400 tracking-wide mb-4">
          <span className="text-gray-700 font-thin font-mono text-5xl font-stretch-50% tracking-tight">P</span><span className="text-gray-400 font-thin font-mono text-3xl font-stretch-150% tracking-wide italic">roven</span> <span className="text-gray-700 font-thin font-mono text-5xl font-stretch-50% tracking-tight">P</span><span className="text-gray-400 font-thin font-mono text-3xl font-stretch-150% tracking-wide italic">attern</span></p>
        <ShippedTerminal />
      </motion.div>

      {/* CTA */}
      <motion.div
        className="pt-8 mt-12 border-t border-gray-200 text-center"
        style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]) }}
      >
        <p className="text-gray-900 text-lg mb-6">
          Let&apos;s talk about which one matters most.
        </p>

        <motion.button
          onClick={() => setIsThesisModalOpen(true)}
          className="inline-block px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm rounded transition-colors cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Personal Innovation Thesis
        </motion.button>
      </motion.div>

      <ThesisModal isOpen={isThesisModalOpen} onClose={() => setIsThesisModalOpen(false)} />

      {/* Footer */}
      <motion.p
        className="text-center text-xs text-gray-900 mt-16"
        style={{ opacity: useTransform(scrollYProgress, [0.7, 0.9], [0, 1]) }}
      >
        JD Fiscus · Detroit
      </motion.p>
    </motion.div>
  );
}

export function ProofOfPattern() {
  return (
    <Section id="proof-of-pattern" background="close" className="px-6 py-20">
      <div className="max-w-2xl mx-auto">
        <ProofOfPatternContent />
      </div>
    </Section>
  );
}
