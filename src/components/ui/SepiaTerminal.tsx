"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TerminalLine {
  type: "prompt" | "output" | "blank" | "cursor";
  text?: string;
  delay?: number;
}

interface SepiaTerminalProps {
  lines: TerminalLine[];
  title?: string;
  className?: string;
}

export function SepiaTerminal({ lines, title = "~/terminal", className = "" }: SepiaTerminalProps) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= lines.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [isInView, lines.length]);

  return (
    <motion.div
      className={`bg-[#faf8f5] border border-stone-200 rounded-lg overflow-hidden font-mono ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => setIsInView(true)}
    >
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-stone-100/50 border-b border-stone-200">
        <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
        <span className="ml-3 text-xs text-stone-400">{title}</span>
      </div>

      {/* Terminal content */}
      <div className="p-5 text-sm min-h-[200px]">
        {lines.slice(0, visibleLines).map((line, i) => {
          if (line.type === "blank") {
            return <div key={i} className="h-4" />;
          }

          if (line.type === "prompt") {
            return (
              <motion.div
                key={i}
                className="text-stone-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="text-stone-400">$</span> {line.text}
              </motion.div>
            );
          }

          if (line.type === "output") {
            return (
              <motion.div
                key={i}
                className="text-stone-700 pl-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {line.text}
              </motion.div>
            );
          }

          if (line.type === "cursor") {
            return (
              <div key={i} className="text-stone-600 flex items-center">
                <span className="text-stone-400">$</span>
                <motion.span
                  className="ml-1 w-2 h-4 bg-stone-400"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </div>
            );
          }

          return null;
        })}
      </div>
    </motion.div>
  );
}

// Preset terminal for "shipped" proof
export function ShippedTerminal() {
  const lines: TerminalLine[] = [
    { type: "prompt", text: "jd --shipped" },
    { type: "blank" },
    { type: "output", text: "n8n-nodes-mcp      4.8M downloads     one sleepless night" },
    { type: "output", text: "mcp-d3-server      D3 via MCP         data viz for agents" },
    { type: "output", text: "questionable       transformer.js     WebAI in browser" },
    { type: "output", text: "ai-labs @ rvo      built from 0       research → roadmap" },
    { type: "blank" },
    { type: "output", text: "Usually early to whatever's coming next." },
    { type: "blank" },
    { type: "cursor" },
  ];

  return <SepiaTerminal lines={lines} title="~/proof" />;
}

// Preset terminal for brainstorm output
export function BrainstormTerminal() {
  const lines: TerminalLine[] = [
    { type: "prompt", text: "brainstorm --diverge-converge" },
    { type: "blank" },
    { type: "output", text: "Topic: Director of R&D approach" },
    { type: "output", text: "Ideas generated: 36" },
    { type: "output", text: "Clusters formed: 6" },
    { type: "output", text: "Top selections: 5" },
    { type: "blank" },
    { type: "output", text: "Quality score: 4.2/5.0 ✓" },
    { type: "blank" },
    { type: "cursor" },
  ];

  return <SepiaTerminal lines={lines} title="~/brainstorm" />;
}
