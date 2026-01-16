"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useMemo } from "react";

// Full cluster data with ideas
const clusterData = [
  {
    id: "tech",
    name: "Tech-as-a-Service",
    count: 7,
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    position: { x: 50, y: 15 },
    ideas: [
      "Self-service analytics dashboards",
      "Automated data pipeline templates",
      "No-code experiment builders",
      "Pre-built ML model marketplace",
      "API-first research tools",
      "Containerized research environments",
      "Real-time KPI monitoring systems",
    ],
    built: { project: "n8n-nodes-mcp", result: "4.8M downloads", context: "one sleepless night" },
  },
  {
    id: "enablement",
    name: "Enablement",
    count: 10,
    color: "#22C55E",
    bgColor: "#F0FDF4",
    position: { x: 15, y: 35 },
    ideas: [
      "R&D literacy workshops",
      "Office hours for consultation",
      "Video library of methods",
      "Playbook templates",
      "Certification program",
      "Cross-functional sprints",
      "Research mentorship pairing",
      "Knowledge base system",
      "Onboarding curriculum",
      "Lunch & learn series",
    ],
    built: { project: "mcp-d3-server", result: "D3 via MCP", context: "data viz for agents" },
  },
  {
    id: "pipeline",
    name: "Pipeline",
    count: 7,
    color: "#F59E0B",
    bgColor: "#FFFBEB",
    position: { x: 85, y: 35 },
    ideas: [
      "Stage-gate framework",
      "Research-to-roadmap protocols",
      "Quarterly portfolio review",
      "Fast-fail experiment framework",
      "POC accelerator program",
      "Commercialization playbooks",
      "IP capture process",
    ],
    built: { project: "ai-labs @ rvo", result: "built from 0", context: "research → roadmap" },
  },
  {
    id: "horizon",
    name: "Horizon",
    count: 7,
    color: "#A855F7",
    bgColor: "#FAF5FF",
    position: { x: 20, y: 70 },
    ideas: [
      "Technology radar",
      "Startup scouting partnerships",
      "University research partnerships",
      "Conference synthesis reports",
      "Competitive intelligence feeds",
      "Emerging tech assessment",
      "Regulatory horizon monitoring",
    ],
    built: { project: "questionable", result: "transformer.js", context: "WebAI in browser" },
  },
  {
    id: "stakeholder",
    name: "Stakeholder",
    count: 7,
    color: "#F43F5E",
    bgColor: "#FFF1F2",
    position: { x: 80, y: 70 },
    ideas: [
      "Executive research briefings",
      "Show and tell demo days",
      "Business unit liaison program",
      "Research impact scorecards",
      "Stakeholder feedback loops",
      "Success story documentation",
      "Internal research newsletter",
    ],
    built: null,
  },
  {
    id: "governance",
    name: "Governance",
    count: 5,
    color: "#6B7280",
    bgColor: "#F9FAFB",
    position: { x: 50, y: 85 },
    ideas: [
      "AI governance framework",
      "Responsible innovation guidelines",
      "Regulatory compliance checkpoints",
      "Data privacy impact assessments",
      "Vendor evaluation criteria",
    ],
    built: null,
  },
];

// Seeded random for deterministic values (avoids hydration mismatch)
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Generate idea dots for each cluster
function generateIdeaDots(cluster: typeof clusterData[0], clusterIndex: number) {
  const dots = [];
  const startY = 0;
  const startX = 50;

  // Round to fixed precision to avoid hydration mismatches
  const round = (n: number, decimals = 2) => Math.round(n * Math.pow(10, decimals)) / Math.pow(10, decimals);

  for (let i = 0; i < cluster.count; i++) {
    const spreadAngle = ((i - (cluster.count - 1) / 2) / cluster.count) * 0.8;
    const initialX = startX + spreadAngle * 20;
    
    // Use deterministic seed based on cluster and dot index
    const seed = clusterIndex * 100 + i;

    dots.push({
      id: `${clusterIndex}-${i}`,
      startX: round(initialX),
      startY: startY,
      endX: round(cluster.position.x + (seededRandom(seed) - 0.5) * 8),
      endY: round(cluster.position.y + (seededRandom(seed + 0.5) - 0.5) * 6),
      delay: i * 0.05 + clusterIndex * 0.1,
      color: cluster.color,
    });
  }
  return dots;
}

export function ClusterGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCluster, setSelectedCluster] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  // Generate all idea dots (memoized for consistent server/client rendering)
  const allDots = useMemo(
    () => clusterData.flatMap((cluster, idx) => generateIdeaDots(cluster, idx)),
    []
  );

  const selected = clusterData.find(c => c.id === selectedCluster);

  return (
    <div className="mb-12">
      {/* Animated cluster graph */}
      <motion.div
        ref={containerRef}
        className="relative w-full h-[400px] rounded-lg overflow-hidden mb-6"
        style={{
          background: "linear-gradient(to bottom, #FAFAF9, #F5F5F4)",
          border: "1px solid #E7E5E4",
        }}
      >
        {/* SVG for connection lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {allDots.map((dot) => {
            const pathProgress = useTransform(
              scrollYProgress,
              [0.1 + dot.delay * 0.3, 0.4 + dot.delay * 0.3],
              [0, 1]
            );

            return (
              <motion.line
                key={`line-${dot.id}`}
                x1={`${dot.startX}%`}
                y1={`${dot.startY}%`}
                x2={`${dot.endX}%`}
                y2={`${dot.endY}%`}
                stroke={dot.color}
                strokeWidth="1"
                strokeOpacity="0.15"
                style={{
                  pathLength: pathProgress,
                }}
              />
            );
          })}
        </svg>

        {/* Idea dots flowing to clusters */}
        {allDots.map((dot) => {
          const dotX = useTransform(
            scrollYProgress,
            [0.1 + dot.delay * 0.3, 0.4 + dot.delay * 0.3],
            [`${dot.startX}%`, `${dot.endX}%`]
          );
          const dotY = useTransform(
            scrollYProgress,
            [0.1 + dot.delay * 0.3, 0.4 + dot.delay * 0.3],
            [`${dot.startY}%`, `${dot.endY}%`]
          );
          const dotOpacity = useTransform(
            scrollYProgress,
            [0.05, 0.1 + dot.delay * 0.3, 0.4 + dot.delay * 0.3, 0.5 + dot.delay * 0.3],
            [0, 1, 1, 0.6]
          );

          return (
            <motion.div
              key={`dot-${dot.id}`}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: dotX,
                top: dotY,
                backgroundColor: dot.color,
                opacity: dotOpacity,
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
            />
          );
        })}

        {/* Clickable cluster nodes */}
        {clusterData.map((cluster, idx) => {
          const clusterOpacity = useTransform(
            scrollYProgress,
            [0.3 + idx * 0.05, 0.45 + idx * 0.05],
            [0, 1]
          );
          const clusterScale = useTransform(
            scrollYProgress,
            [0.3 + idx * 0.05, 0.45 + idx * 0.05],
            [0.8, 1]
          );

          return (
            <motion.button
              key={cluster.id}
              className="absolute flex flex-col items-center cursor-pointer"
              style={{
                left: `${cluster.position.x}%`,
                top: `${cluster.position.y}%`,
                transform: "translate(-50%, -50%)",
                opacity: clusterOpacity,
                scale: clusterScale,
                zIndex: 3,
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCluster(
                selectedCluster === cluster.id ? null : cluster.id
              )}
            >
              {/* Cluster circle */}
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-medium shadow-sm transition-all"
                animate={{
                  backgroundColor: selectedCluster === cluster.id ? cluster.color : cluster.bgColor,
                  color: selectedCluster === cluster.id ? "white" : cluster.color,
                  boxShadow: selectedCluster === cluster.id
                    ? `0 0 20px ${cluster.color}40`
                    : "0 1px 3px rgba(0,0,0,0.1)",
                }}
                style={{
                  border: `2px solid ${cluster.color}`,
                }}
              >
                {cluster.count}
              </motion.div>
              {/* Cluster label */}
              <div
                className="mt-2 text-xs font-mono whitespace-nowrap transition-colors"
                style={{
                  color: selectedCluster === cluster.id ? cluster.color : "#78716C",
                  fontWeight: selectedCluster === cluster.id ? 600 : 400,
                }}
              >
                {cluster.name}
              </div>
            </motion.button>
          );
        })}

        {/* Center label */}
        <motion.div
          className="absolute left-1/2 top-4 -translate-x-1/2 text-center"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]),
            zIndex: 4,
          }}
        >
          <div className="text-xs font-mono text-stone-400">40 ideas</div>
        </motion.div>

      </motion.div>

      {/* Click to explore - underneath graph */}
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-xs font-mono text-stone-400">
          {selectedCluster ? "click another cluster or same to close" : "click a cluster to explore"}
        </span>
      </motion.div>

      {/* Expanded cluster detail with carousel */}
      <AnimatePresence mode="wait">
        {selected && (
          <ClusterDetail
            cluster={selected}
            onClose={() => setSelectedCluster(null)}
          />
        )}
      </AnimatePresence>

      {/* Summary when nothing selected */}
      <AnimatePresence>
        {!selectedCluster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-sm text-gray-400 font-mono"
          >
            40 ideas → 6 clusters
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Carousel detail component
function ClusterDetail({ cluster, onClose }: { cluster: typeof clusterData[0]; onClose: () => void }) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(cluster.ideas.length / itemsPerPage);

  const currentIdeas = cluster.ideas.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = useCallback(() => {
    setCurrentPage((p) => (p + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((p) => (p - 1 + totalPages) % totalPages);
  }, [totalPages]);

  return (
    <motion.div
      key={cluster.id}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden"
    >
      <div
        className="p-6 rounded-lg"
        style={{
          backgroundColor: cluster.bgColor,
          border: `1px solid ${cluster.color}30`,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: cluster.color }}
            />
            <h3 className="text-lg font-medium text-gray-900">
              {cluster.name}
            </h3>
            <span className="text-sm text-gray-400">
              {cluster.count} ideas
            </span>
          </div>

          {/* Carousel arrows */}
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <button
                onClick={prevPage}
                className="p-1.5 rounded-full hover:bg-white/50 transition-colors"
                style={{ color: cluster.color }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-xs text-gray-400 tabular-nums">
                {currentPage + 1}/{totalPages}
              </span>
              <button
                onClick={nextPage}
                className="p-1.5 rounded-full hover:bg-white/50 transition-colors"
                style={{ color: cluster.color }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Ideas with carousel animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-2 mb-6 min-h-[120px]"
          >
            {currentIdeas.map((idea, i) => (
              <motion.div
                key={idea}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.2 }}
                className="flex items-center gap-3 text-sm"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cluster.color }}
                />
                <span className="text-gray-700">{idea}</span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* I've built this */}
        {cluster.built && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-4 border-t"
            style={{ borderColor: `${cluster.color}30` }}
          >
            <p className="text-xs font-mono mb-2 text-gray-500">
              I&apos;ve built this
            </p>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-900 font-medium">{cluster.built.project}</span>
              <span className="text-gray-400">→</span>
              <span className="text-gray-700">{cluster.built.result}</span>
              <span className="text-gray-400 text-xs">({cluster.built.context})</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
