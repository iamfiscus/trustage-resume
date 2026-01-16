"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";

const keywords = [
  "Gather Requirements",
  "Diverge",
  "Cluster",
  "Converge",
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
            Accelerating TruStage&apos;s Technology Future
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
              This page shows how I would approach the Director of R&D role
              at TruStage. Rather than list qualifications, I&apos;ll demonstrate
              my thinking process: how I break down problems, generate approaches,
              and converge on solutions.
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
            <span className="text-caption mb-2">Continue reading</span>
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
