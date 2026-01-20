"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

const keywords = [
  "Gather Requirements",
  "Diverge",
  "Cluster",
  "Converge",
  "Survive",
];

export function Act1Paper() {
  return (
    <Section id="paper" background="paper" className="flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto py-20">
        {/* Research Paper Container */}
        <motion.div
          className="bg-white border border-gray-200 shadow-sm p-8 md:p-12 rounded-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Title */}
          <motion.h1
            className="text-h1 md:text-display font-headline font-semibold leading-tight text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            I skipped the pitch deck.
          </motion.h1>

          {/* Decorative line */}
          <motion.div
            className="w-full h-[2px] bg-gray-900 my-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{ originX: 0 }}
          />

          {/* Author info */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <p className="text-body text-gray-600">JD Fiscus</p>
            <p className="text-caption text-gray-500">
              For Jeff Voorhees, VP Technology Innovation
            </p>
            <p className="text-caption text-gray-400 italic mt-1">
              who doesn&apos;t need another one
            </p>
          </motion.div>

          {/* Divider */}
          <motion.div
            className="w-full h-px bg-gray-200 my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
          />

          {/* Abstract */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <p className="section-marker mb-3">Abstract</p>
            <p className="text-body leading-relaxed text-gray-700">
              You&apos;ve seen enough LinkedIn optimizers. This is how I actually think.
              No slides. No buzzwords. Just the process and the receipts.
            </p>
            {/* <hr className="my-4 border-gray-200" /> */}
            <p className="mt-4 text-body leading-relaxed text-gray-700 border-l-2 border-gray-200 pl-4">
              <span className="text-gray-700 font-thin font-mono text-5xl font-stretch-50% tracking-tight">W</span><span className="text-gray-400 font-thin font-mono text-3xl font-stretch-150% tracking-wide italic">ay more interesting</span>.
            </p>
          </motion.div>

          {/* Method */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p className="section-marker mb-3">Method</p>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <motion.span
                  key={keyword}
                  className="text-caption font-medium text-blue-700 bg-blue-50 px-3 py-1 rounded-full"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Actions - Under the paper */}
        <motion.div
          className="mt-8 text-center space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          {/* Main CTAs */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => document.getElementById("proof-of-pattern")?.scrollIntoView({ behavior: "smooth" })}
              className="px-4 py-2 text-sm bg-gray-900 hover:bg-gray-800 text-white rounded transition-colors"
            >
              Try the Terminal →
            </button>
            <a
              href="https://github.com/iamfiscus/research-to-roadmap"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              View Source
            </a>
          </div>

        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <motion.div
            className="inline-flex flex-col items-center text-gray-400 cursor-pointer"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => {
              document.getElementById("challenge")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="text-caption mb-2 font-mono">It gets weirder from here</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
