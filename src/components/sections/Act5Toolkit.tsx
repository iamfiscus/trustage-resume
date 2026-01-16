"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader, GradientTransition } from "@/components/ui/Section";
import { useState, useEffect } from "react";

const terminalLines = [
  { type: "prompt", text: "$ jd --capabilities" },
  { type: "blank", text: "" },
  { type: "project", name: "n8n-nodes-mcp", stat: "4.8M downloads", note: "built in one sleepless night" },
  { type: "project", name: "mcp-d3-server", stat: "D3 via MCP", note: "data viz for agents" },
  { type: "project", name: "questionable", stat: "transformer.js", note: "AI runs in the browser" },
  { type: "project", name: "ai-labs @ rvo", stat: "built from 0", note: "research to roadmap" },
  { type: "blank", text: "" },
  { type: "output", text: "Usually early to whatever's coming next." },
  { type: "blank", text: "" },
  { type: "cursor", text: "$ _" },
];

function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= terminalLines.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <motion.div
      className="bg-white border border-stone-200 rounded-lg overflow-hidden shadow-sm max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onViewportEnter={() => setIsInView(true)}
    >
      {/* Terminal header - subtle */}
      <div className="flex items-center gap-2 px-4 py-3 bg-stone-50 border-b border-stone-200">
        <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
        <span className="ml-4 text-xs text-stone-400 font-mono">
          ~/capabilities
        </span>
      </div>

      {/* Terminal content */}
      <div className="p-6 font-mono text-sm min-h-[280px] bg-stone-50/50">
        {terminalLines.slice(0, visibleLines).map((line, index) => {
          if (line.type === "blank") {
            return <div key={index} className="h-4" />;
          }

          if (line.type === "prompt") {
            return (
              <motion.div
                key={index}
                className="text-stone-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {line.text}
              </motion.div>
            );
          }

          if (line.type === "project") {
            return (
              <motion.div
                key={index}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 text-stone-700 pl-2 py-1"
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-stone-900 font-medium min-w-[140px]">{line.name}</span>
                <span className="text-stone-500 text-xs">{line.stat}</span>
                <span className="text-stone-400 text-xs italic hidden sm:inline">&quot;{line.note}&quot;</span>
              </motion.div>
            );
          }

          if (line.type === "output") {
            return (
              <motion.div
                key={index}
                className="text-stone-500 italic pl-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {line.text}
              </motion.div>
            );
          }

          if (line.type === "cursor") {
            return (
              <motion.div
                key={index}
                className="text-stone-600 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                $ <motion.span
                  className="ml-1 w-2 h-4 bg-stone-400"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </motion.div>
            );
          }

          return null;
        })}
      </div>
    </motion.div>
  );
}

export function Act5Toolkit() {
  return (
    <>
      <GradientTransition from="horizon" to="toolkit" />

      <Section id="toolkit" background="toolkit" className="px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            marker="Section IV"
            title="The Proof"
            subtitle="What I&apos;ve shipped."
          />

          {/* Simple intro */}
          <motion.p
            className="text-lead text-stone-600 mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            I build tools that multiply people.
            Here&apos;s the recent work.
          </motion.p>

          {/* Terminal */}
          <Terminal />

          {/* Simple closing note */}
          <motion.p
            className="text-center text-caption text-stone-400 mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 2 }}
          >
            This page was built with Claude Code.
          </motion.p>
        </div>
      </Section>
    </>
  );
}
