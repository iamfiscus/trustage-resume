"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { InteractiveTerminal, TerminalHandle } from "@/components/ui/InteractiveTerminal";
import { ThesisModal } from "@/components/ui/ThesisModal";
import { useRef, useState } from "react";

const QUICK_COMMANDS = [
  { label: "/about-jd", command: "/about-jd" },
  { label: "/r2r-workflow", command: "/r2r-workflow" },
  { label: "/show-draft", command: "/show-draft" },
  { label: "/r2r-demo", command: "/r2r-demo" },
  { label: "/show-assessment", command: "/show-assessment" },
];

function ProofOfPatternContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<TerminalHandle>(null);
  const [isThesisModalOpen, setIsThesisModalOpen] = useState(false);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const handleQuickCommand = (command: string) => {
    terminalRef.current?.setInputAndFocus(command);
  };

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
          <span className="text-gray-700 font-thin font-mono text-5xl font-stretch-50% tracking-tight">
            P
          </span>
          <span className="text-gray-400 font-thin font-mono text-3xl font-stretch-150% tracking-wide italic">
            roven
          </span>{" "}
          <span className="text-gray-700 font-thin font-mono text-5xl font-stretch-50% tracking-tight">
            P
          </span>
          <span className="text-gray-400 font-thin font-mono text-3xl font-stretch-150% tracking-wide italic">
            attern
          </span>
        </p>

        {/* Instructions & Technical Overview */}
        <div className="mb-6 space-y-4 text-stone-600">
          <p className="text-sm">
            This is a live Claude Code sandbox. Enter the password, then chat with Claude
            who knows about me and has my Research-to-Roadmap plugin installed.
          </p>

          <div className="text-xs space-y-2 bg-stone-50 border border-stone-200 rounded-lg p-4">
            <p className="font-medium text-stone-700">How it works:</p>
            <ul className="space-y-1 text-stone-500">
              <li>• <span className="text-stone-600">E2B sandbox</span> spins up an isolated container</li>
              <li>• <span className="text-stone-600">Claude Code CLI</span> runs with my custom plugins</li>
              <li>• <span className="text-stone-600">/about-jd</span> skill has my background, voice, and answers</li>
              <li>• <span className="text-stone-600">/r2r-*</span> skills demo the Research-to-Roadmap plugin</li>
            </ul>
            <p className="text-stone-400 pt-2 border-t border-stone-200 mt-2 italic">
              Most R&amp;D dies in PowerPoint. This one shipped.
            </p>
          </div>
        </div>

        <InteractiveTerminal ref={terminalRef} title="~/sandbox" />

        {/* Quick command buttons - under the terminal */}
        <div className="mt-4 space-y-3">
          <p className="text-xs text-stone-500">
            Connect above, then try:
          </p>
          <div className="flex flex-wrap gap-2">
            {QUICK_COMMANDS.map((cmd) => (
              <button
                key={cmd.label}
                onClick={() => handleQuickCommand(cmd.command)}
                className="px-3 py-1.5 text-xs bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full border border-stone-200 transition-colors font-mono"
              >
                {cmd.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="pt-8 mt-12 border-t border-gray-200 text-center"
        style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]) }}
      >
        <p className="text-gray-900 text-lg mb-6">
          Let&apos;s talk. I promise not to use the word &apos;synergy.&apos;
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

      <ThesisModal
        isOpen={isThesisModalOpen}
        onClose={() => setIsThesisModalOpen(false)}
      />

      {/* Footer */}
      <motion.p
        className="text-center text-xs text-gray-900 mt-16"
        style={{ opacity: useTransform(scrollYProgress, [0.7, 0.9], [0, 1]) }}
      >
        JD Fiscus · Detroit · Still debugging
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
