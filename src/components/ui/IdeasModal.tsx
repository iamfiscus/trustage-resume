"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const allIdeas = [
  // Tech-as-a-Service
  { id: 1, text: "Self-service analytics dashboards for consultants", cluster: "Tech-as-a-Service" },
  { id: 2, text: "Automated data pipeline templates", cluster: "Tech-as-a-Service" },
  { id: 3, text: "No-code experiment builders", cluster: "Tech-as-a-Service" },
  { id: 4, text: "Pre-built ML model marketplace", cluster: "Tech-as-a-Service" },
  { id: 5, text: "API-first research tools", cluster: "Tech-as-a-Service" },
  { id: 6, text: "Containerized research environments", cluster: "Tech-as-a-Service" },
  { id: 7, text: "Real-time KPI monitoring systems", cluster: "Tech-as-a-Service" },
  // Enablement & Training
  { id: 8, text: "R&D literacy workshops for business leaders", cluster: "Enablement" },
  { id: 9, text: "\"Office hours\" for research consultation", cluster: "Enablement" },
  { id: 10, text: "Video library of research methods", cluster: "Enablement" },
  { id: 11, text: "Playbook templates for common analyses", cluster: "Enablement" },
  { id: 12, text: "Certification program for internal researchers", cluster: "Enablement" },
  { id: 13, text: "Cross-functional innovation sprints", cluster: "Enablement" },
  { id: 14, text: "Research mentorship pairing", cluster: "Enablement" },
  // Pipeline & Process
  { id: 15, text: "Stage-gate framework for R&D projects", cluster: "Pipeline" },
  { id: 16, text: "Research-to-roadmap translation protocols", cluster: "Pipeline" },
  { id: 17, text: "Quarterly portfolio review cadence", cluster: "Pipeline" },
  { id: 18, text: "Fast-fail experiment framework", cluster: "Pipeline" },
  { id: 19, text: "Proof-of-concept accelerator program", cluster: "Pipeline" },
  { id: 20, text: "Commercialization playbooks", cluster: "Pipeline" },
  { id: 21, text: "IP capture and documentation process", cluster: "Pipeline" },
  // Horizon Scanning
  { id: 22, text: "Technology radar (quarterly updates)", cluster: "Horizon" },
  { id: 23, text: "Startup scouting partnerships", cluster: "Horizon" },
  { id: 24, text: "University research partnerships", cluster: "Horizon" },
  { id: 25, text: "Conference/paper synthesis reports", cluster: "Horizon" },
  { id: 26, text: "Competitive intelligence feeds", cluster: "Horizon" },
  { id: 27, text: "Emerging tech assessment framework", cluster: "Horizon" },
  { id: 28, text: "Regulatory horizon monitoring", cluster: "Horizon" },
  // Stakeholder Engagement
  { id: 29, text: "Executive research briefings", cluster: "Stakeholder" },
  { id: 30, text: "\"Show and tell\" demo days", cluster: "Stakeholder" },
  { id: 31, text: "Business unit liaison program", cluster: "Stakeholder" },
  { id: 32, text: "Research impact scorecards", cluster: "Stakeholder" },
  { id: 33, text: "Stakeholder feedback loops", cluster: "Stakeholder" },
  { id: 34, text: "Success story documentation", cluster: "Stakeholder" },
  { id: 35, text: "Internal research newsletter", cluster: "Stakeholder" },
  // Risk & Governance
  { id: 36, text: "AI governance framework", cluster: "Governance" },
  { id: 37, text: "Responsible innovation guidelines", cluster: "Governance" },
  { id: 38, text: "Regulatory compliance checkpoints", cluster: "Governance" },
  { id: 39, text: "Data privacy impact assessments", cluster: "Governance" },
  { id: 40, text: "Vendor/partner evaluation criteria", cluster: "Governance" },
  // Meta ideas
  { id: 41, text: "Convince everyone this was their idea all along", cluster: "Stakeholder" },
  { id: 42, text: "Build something so useful they forget to ask for a status update", cluster: "Enablement" },
];

const clusterColors: Record<string, string> = {
  "Tech-as-a-Service": "text-blue-600",
  "Enablement": "text-green-600",
  "Pipeline": "text-amber-600",
  "Horizon": "text-purple-600",
  "Stakeholder": "text-rose-600",
  "Governance": "text-gray-600",
};

interface IdeasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IdeasModal({ isOpen, onClose }: IdeasModalProps) {
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
                <h2 className="text-lg font-medium text-gray-900">Diverge: Raw Ideas</h2>
                <p className="text-sm text-gray-500">42 ideas generated without judgment</p>
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
              <div className="max-w-3xl mx-auto font-mono text-sm">
                {/* Principle */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">
                    <span className="text-gray-900 font-medium">Principle:</span> Suspend judgment during divergence.
                    Criticism kills creativity. Evaluate later.
                  </p>
                </div>

                {/* Ideas list */}
                <div className="space-y-1">
                  {allIdeas.map((idea, i) => (
                    <motion.div
                      key={idea.id}
                      className="flex gap-4 py-2 border-b border-gray-100"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.02 }}
                    >
                      <span className="text-gray-300 w-6 text-right">
                        {idea.id.toString().padStart(2, '0')}
                      </span>
                      <span className="text-gray-700 flex-1">{idea.text}</span>
                      <span className={`text-xs ${clusterColors[idea.cluster]}`}>
                        {idea.cluster}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-gray-500">
                    <span className="text-gray-900">42 ideas</span> →
                    <span className="text-gray-900"> 6 clusters</span> →
                    <span className="text-gray-900"> 5 selections</span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Trigger button component
interface IdeasTriggerProps {
  count?: number;
  onClick: () => void;
}

export function IdeasTrigger({ count = 40, onClick }: IdeasTriggerProps) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-colors"
    >
      <span className="font-medium">{count} ideas generated</span>
      <span className="text-gray-400 group-hover:text-blue-400 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </span>
    </button>
  );
}
