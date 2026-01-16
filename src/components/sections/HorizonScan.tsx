"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Section, GradientTransition } from "@/components/ui/Section";
import { useRef, useState } from "react";
import { ForecastModal } from "@/components/ui/ForecastModal";

// Forecaster output data
const horizonItems = [
  {
    id: "webai",
    name: "WebAI",
    tagline: "ML in the browser",
    horizon: "H2",
    horizonLabel: "Pilot",
    status: "production-ready",
    stats: [
      { label: "Speed", value: "20-60 tok/s" },
      { label: "Speedup", value: "19× WebGPU" },
    ],
    insight: "Privacy-first AI for member-facing apps. No data leaves device.",
    relevance: "Underwriting previews, claims triage in-browser",
    color: "purple",
  },
  {
    id: "mcp",
    name: "MCP",
    tagline: "Model Context Protocol",
    horizon: "H1",
    horizonLabel: "Core",
    status: "industry standard",
    stats: [
      { label: "Downloads", value: "8M+" },
      { label: "Insurance", value: "Sure MCP" },
    ],
    insight: "The USB-C of AI. Every major platform adopting.",
    relevance: "Agent-to-system integration, tool orchestration",
    color: "blue",
  },
  {
    id: "agentic",
    name: "Agentic Commerce",
    tagline: "Autonomous transactions",
    horizon: "H2",
    horizonLabel: "Pilot",
    status: "early adoption",
    stats: [
      { label: "Traffic", value: "+4,700% YoY" },
      { label: "Automation", value: "30-40%" },
    ],
    insight: "Members' AI will shop insurance. Optimize for agents.",
    relevance: "Claims automation, policy management agents",
    color: "amber",
  },
  {
    id: "security",
    name: "AI Security",
    tagline: "Governance infrastructure",
    horizon: "H1",
    horizonLabel: "Core",
    status: "critical",
    stats: [
      { label: "Defense", value: "35% ready" },
      { label: "Colorado", value: "Feb 2026" },
    ],
    insight: "Prompt injection is permanent. Detection > prevention.",
    relevance: "Mandatory before production AI deployment",
    color: "red",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  purple: {
    bg: "bg-purple-50/50",
    border: "border-purple-200",
    text: "text-purple-600",
    badge: "bg-purple-100 text-purple-700",
  },
  blue: {
    bg: "bg-blue-50/50",
    border: "border-blue-200",
    text: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
  },
  amber: {
    bg: "bg-amber-50/50",
    border: "border-amber-200",
    text: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
  },
  red: {
    bg: "bg-red-50/50",
    border: "border-red-200",
    text: "text-red-600",
    badge: "bg-red-100 text-red-700",
  },
};

function HorizonCard({ item, index, onClick }: { item: typeof horizonItems[0]; index: number; onClick: () => void }) {
  const colors = colorMap[item.color];

  return (
    <motion.div
      className={`group relative p-5 rounded-xl border ${colors.bg} ${colors.border} cursor-pointer hover:shadow-lg transition-shadow`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
    >
      {/* Horizon badge */}
      <div className="absolute -top-3 right-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
          {item.horizon} · {item.horizonLabel}
        </span>
      </div>

      {/* Header */}
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.tagline}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {item.stats.map((stat) => (
          <div key={stat.label} className="text-center p-2 bg-white/60 rounded-lg">
            <p className={`text-lg font-semibold ${colors.text}`}>{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Insight */}
      <p className="text-sm text-gray-600 mb-3 italic">
        &ldquo;{item.insight}&rdquo;
      </p>

      {/* Relevance */}
      <div className="pt-3 border-t border-gray-200/50">
        <p className="text-xs text-gray-400 mb-1">TruStage relevance</p>
        <p className="text-sm text-gray-700">{item.relevance}</p>
      </div>

      {/* Click hint */}
      <div className="absolute bottom-2 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-gray-400">Click for forecast →</span>
      </div>
    </motion.div>
  );
}

function HorizonContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedForecast, setSelectedForecast] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  return (
    <>
    <ForecastModal
      isOpen={!!selectedForecast}
      onClose={() => setSelectedForecast(null)}
      forecastId={selectedForecast}
    />
    <motion.div
      ref={containerRef}
      className="font-mono text-sm"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Section header */}
      <motion.div
        className="mb-12"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]) }}
      >
        <p className="text-gray-400 text-xs tracking-wide mb-4"><span className="text-gray-700 font-thin font-mono text-5xl font-stretch-50% tracking-tight">H</span><span className="text-gray-400 font-thin font-mono text-3xl font-stretch-150% tracking-wide italic">orizon</span> <span className="text-gray-700 font-thin font-mono text-5xl font-stretch-50% tracking-tight">S</span><span className="text-gray-400 font-thin font-mono text-3xl font-stretch-150% tracking-wide italic">can</span></p>
        <h2 className="text-2xl font-light text-gray-900 mb-3">
          What&apos;s coming next
        </h2>
        <p className="text-gray-600">
          Four technologies shaping enterprise R&D in the next 12-18 months.
        </p>
      </motion.div>

      {/* Horizon matrix legend */}
      <motion.div
        className="flex gap-6 mb-8 text-xs"
        style={{ opacity: useTransform(scrollYProgress, [0.05, 0.15], [0, 1]) }}
      >
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-400" />
          <span className="text-gray-600">H1 Core (Now)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="text-gray-600">H2 Pilot (12-18mo)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-purple-400" />
          <span className="text-gray-600">H3 Watch (18mo+)</span>
        </div>
      </motion.div>

      {/* Cards grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {horizonItems.map((item, i) => (
          <HorizonCard
            key={item.id}
            item={item}
            index={i}
            onClick={() => setSelectedForecast(item.id)}
          />
        ))}
      </div>

      {/* Pattern recognition */}
      <motion.div
        className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl"
        style={{ opacity: useTransform(scrollYProgress, [0.7, 0.85], [0, 1]) }}
      >
        <p className="text-xs text-gray-400 tracking-wide mb-3">pattern</p>
        <p className="text-gray-700 mb-4">
          All four technologies share a common thread:{" "}
          <span className="text-gray-900 font-medium">
            AI moving from capability to infrastructure.
          </span>
        </p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500 mb-1">Opportunity</p>
            <p className="text-gray-900">First-mover advantage in regulated AI</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Risk</p>
            <p className="text-gray-900">Compliance deadlines accelerating</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
    </>
  );
}

export function HorizonScan() {
  return (
    <>
      <GradientTransition from="horizon" to="close" />

      <Section id="horizon" background="close" className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <HorizonContent />
        </div>
      </Section>
    </>
  );
}
