"use client";

import { motion, AnimatePresence } from "framer-motion";

// Forecast data extracted from markdown files
export const forecastData: Record<string, ForecastData> = {
  webai: {
    title: "WebAI Technology Forecast",
    date: "January 15, 2026",
    methodology: "5-Phase Pipeline (Outside View, Decomposition, Bayesian Update, Premortem, Debias)",
    summary: [
      { forecast: "WebAI mainstream by 2027", probability: "10%", ci: "3-22%", confidence: "Medium" },
      { forecast: "WebAI surpasses cloud (use cases) 2028", probability: "72%", ci: "55-85%", confidence: "Medium-High" },
      { forecast: "WebNN full browser support 2026", probability: "18%", ci: "8-35%", confidence: "Medium" },
      { forecast: "Privacy-preserving new categories", probability: "38%", ci: "20-55%", confidence: "Low-Medium" },
    ],
    keyInsights: [
      "Reference class: WebGL, WebRTC, WebAssembly adoption—5-7 years from spec to mainstream",
      "Safari is the critical blocker for full browser support (25% probability by end 2026)",
      "Mobile edge AI (Core ML, NNAPI) already succeeded—WebAI follows similar pattern",
      "Business model viability is bottleneck for privacy-preserving apps (45%)",
    ],
    killCriteria: [
      "If Apple announces WebNN support → Increase mainstream to 25%",
      "If Chrome deprecates WebNN → Drop to 2%",
      "If LLM costs drop 90% by 2026 → Drop to 5%",
    ],
    failureModes: [
      { mode: "Cloud AI Too Good/Cheap", probability: "30%" },
      { mode: "Browser Fragmentation", probability: "20%" },
      { mode: "Hardware Diversity Nightmare", probability: "15%" },
      { mode: "LLM Dominance", probability: "25%" },
    ],
  },
  mcp: {
    title: "MCP (Model Context Protocol) Forecast",
    date: "January 15, 2026 (REVISED)",
    methodology: "5-Phase Pipeline with Bayesian update from new evidence",
    summary: [
      { forecast: "MCP dominant standard by 2028", probability: "58%", ci: "40-75%", confidence: "Medium-High" },
      { forecast: "Major providers (2+) adopt by 2027", probability: "92%", ci: "82-97%", confidence: "High" },
      { forecast: "10K servers by 2026", probability: "78%", ci: "60-90%", confidence: "Medium-High" },
      { forecast: "F500 >30% adoption by 2028", probability: "45%", ci: "28-62%", confidence: "Medium" },
    ],
    keyInsights: [
      "OpenAI + Linux Foundation adoption triggered original kill criteria—forecasts updated 7%→58%",
      "Major provider adoption effectively resolved: OpenAI confirmed, Google 65%, Meta 75%",
      "MCP now on OAuth/OpenAPI trajectory—foundation governance + competitor adoption pattern",
      "Google's decision (adopt/compete/ignore) is now the highest-impact remaining unknown",
    ],
    killCriteria: [
      "Google announces MCP support → Dominant increases to 75%",
      "Google announces competing protocol → Dominant drops to 35%",
      "Major MCP security breach → All forecasts -30%",
    ],
    failureModes: [
      { mode: "Google/Microsoft competing standard", probability: "15%" },
      { mode: "Fragmentation (MCP forks)", probability: "12%" },
      { mode: "AI architecture shift", probability: "12%" },
      { mode: "Security/compliance disaster", probability: "10%" },
    ],
  },
  agentic: {
    title: "Agentic Commerce Forecast",
    date: "January 15, 2026",
    methodology: "5-Phase Pipeline anchored by voice commerce failure precedent",
    summary: [
      { forecast: ">10% of online retail by 2030", probability: "12%", ci: "5-25%", confidence: "Low" },
      { forecast: "Major retailers deploy by 2027", probability: "68%", ci: "45-85%", confidence: "Medium" },
      { forecast: "B2B >$100B by 2028", probability: "33%", ci: "15-55%", confidence: "Low" },
      { forecast: "Human-level complex purchases by 2028", probability: "12%", ci: "4-28%", confidence: "Low" },
    ],
    keyInsights: [
      "Voice commerce is closest analogue and failed despite favorable predictions",
      "Consumer trust (35%) is KEY BOTTLENECK—not technology",
      "Major retailers WILL experiment (high confidence), but adoption uncertain",
      "B2B adoption will lag consumer due to ERP integration complexity",
    ],
    killCriteria: [
      "Major AI-agent security breach (>$100M) → 10% retail drops to 3%",
      "FTC/EU bans autonomous purchasing → Drops to 2%",
      "Amazon discontinues Rufus by end 2026 → Retailers deploy drops to 35%",
    ],
    failureModes: [
      { mode: "The Trust Chasm", probability: "35%" },
      { mode: "Last Mile Problem (fails on 20% that matter)", probability: "25%" },
      { mode: "Adversarial Environment (Agent SEO)", probability: "20%" },
      { mode: "Liability Uncertainty", probability: "15%" },
    ],
  },
  security: {
    title: "AI Security/Infrastructure Forecast",
    date: "January 15, 2026",
    methodology: "5-Phase Pipeline with definition sensitivity analysis",
    summary: [
      { forecast: "AI security tools >60% by 2027", probability: "62%", ci: "45-78%", confidence: "Medium" },
      { forecast: "Autonomous SOC >20% by 2028", probability: "6%", ci: "2-15%", confidence: "Low" },
      { forecast: "AI > Human CVEs by 2029", probability: "25%", ci: "12-40%", confidence: "Low" },
      { forecast: "Major AI outage by 2027", probability: "55%", ci: "35-72%", confidence: "Medium" },
    ],
    keyInsights: [
      "Legal liability is primary blocker for autonomous SOC—no precedent exists",
      "AI security tools adoption driven by vendor push + CISO intent, blocked by skills gap",
      "CVE tracking methodology for AI-discovered vulnerabilities doesn't exist yet",
      "CrowdStrike 2024 outage demonstrates cascade risk from AIOps",
    ],
    killCriteria: [
      "Major AI security breach → Tools adoption drops to 45%",
      "EU explicitly bans autonomous security decisions → SOC drops to 2%",
      "MITRE rejects AI-discovered CVE category → CVE forecast drops to 5%",
    ],
    failureModes: [
      { mode: "Economic recession", probability: "15%" },
      { mode: "Major AI security breach", probability: "20%" },
      { mode: "Integration complexity stalls pilots", probability: "25%" },
      { mode: "Talent shortage", probability: "20%" },
    ],
  },
};

export interface ForecastSummary {
  forecast: string;
  probability: string;
  ci: string;
  confidence: string;
}

export interface FailureMode {
  mode: string;
  probability: string;
}

export interface ForecastData {
  title: string;
  date: string;
  methodology: string;
  summary: ForecastSummary[];
  keyInsights: string[];
  killCriteria: string[];
  failureModes: FailureMode[];
}

interface ForecastModalProps {
  isOpen: boolean;
  onClose: () => void;
  forecastId: string | null;
}

export function ForecastModal({ isOpen, onClose, forecastId }: ForecastModalProps) {
  const data = forecastId ? forecastData[forecastId] : null;

  if (!data) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-10 bg-white rounded-lg shadow-2xl z-50 overflow-hidden flex flex-col"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div>
                <h2 className="text-lg font-medium text-gray-900">{data.title}</h2>
                <p className="text-sm text-gray-500">{data.date} · {data.methodology}</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="max-w-4xl mx-auto font-mono text-sm space-y-8">
                {/* Executive Summary */}
                <section>
                  <h3 className="text-xs text-gray-400 tracking-wide mb-4">EXECUTIVE SUMMARY</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="pb-2 pr-4 text-gray-600 font-medium">Forecast</th>
                          <th className="pb-2 pr-4 text-gray-600 font-medium text-right">Probability</th>
                          <th className="pb-2 pr-4 text-gray-600 font-medium text-right">80% CI</th>
                          <th className="pb-2 text-gray-600 font-medium">Confidence</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.summary.map((row, i) => (
                          <tr key={i} className="border-b border-gray-100">
                            <td className="py-3 pr-4 text-gray-700">{row.forecast}</td>
                            <td className="py-3 pr-4 text-right font-semibold text-gray-900">{row.probability}</td>
                            <td className="py-3 pr-4 text-right text-gray-500">{row.ci}</td>
                            <td className="py-3 text-gray-500">{row.confidence}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                {/* Key Insights */}
                <section>
                  <h3 className="text-xs text-gray-400 tracking-wide mb-4">KEY INSIGHTS</h3>
                  <ul className="space-y-2">
                    {data.keyInsights.map((insight, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="text-gray-300">→</span>
                        <span className="text-gray-700">{insight}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Kill Criteria */}
                <section>
                  <h3 className="text-xs text-gray-400 tracking-wide mb-4">KILL CRITERIA</h3>
                  <div className="bg-red-50 rounded-lg p-4 space-y-2">
                    {data.killCriteria.map((criterion, i) => (
                      <p key={i} className="text-gray-700 text-sm">
                        <span className="text-red-500 mr-2">⚠</span>
                        {criterion}
                      </p>
                    ))}
                  </div>
                </section>

                {/* Failure Modes */}
                <section>
                  <h3 className="text-xs text-gray-400 tracking-wide mb-4">PREMORTEM: FAILURE MODES</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {data.failureModes.map((mode, i) => (
                      <div key={i} className="bg-gray-50 rounded-lg p-3">
                        <p className="text-gray-700 text-sm mb-1">{mode.mode}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gray-500 rounded-full"
                              style={{ width: mode.probability }}
                            />
                          </div>
                          <span className="text-xs text-gray-500 tabular-nums">{mode.probability}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
