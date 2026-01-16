"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
  background?: "paper" | "challenge" | "pillars" | "cluster" | "horizon" | "toolkit" | "converge" | "close";
}

const bgClasses = {
  paper: "bg-act-paper",
  challenge: "bg-act-challenge",
  pillars: "bg-act-pillars",
  cluster: "bg-act-cluster",
  horizon: "bg-act-horizon",
  converge: "bg-act-converge",
  toolkit: "bg-act-toolkit",
  close: "bg-act-close",
};

export function Section({ id, className = "", children, background = "paper" }: SectionProps) {
  return (
    <section
      id={id}
      className={`min-h-screen relative ${bgClasses[background]} ${className}`}
    >
      {children}
    </section>
  );
}

interface GradientTransitionProps {
  from: "paper" | "challenge" | "pillars" | "cluster" | "horizon" | "toolkit";
  to: "challenge" | "pillars" | "cluster" | "horizon" | "toolkit" | "converge" | "close";
}

export function GradientTransition({ from, to }: GradientTransitionProps) {
  return (
    <div
      className={`h-32 md:h-48 gradient-${from}-to-${to}`}
      aria-hidden="true"
    />
  );
}

interface SectionHeaderProps {
  marker?: string;
  title: string;
  subtitle?: string;
}

export function SectionHeader({ marker, title, subtitle }: SectionHeaderProps) {
  const words = title.split(" ");

  return (
    <div className="mb-12">
      {marker && (
        <motion.p
          className="section-marker mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          {marker}
        </motion.p>
      )}

      <h2 className="text-h1 font-headline font-semibold leading-tight">
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-[0.25em]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              delay: index * 0.05,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {subtitle && (
        <motion.p
          className="text-lead text-gray-600 mt-4 max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: words.length * 0.05 + 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        className="w-24 h-1 bg-current mt-6 rounded-full"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: words.length * 0.05 + 0.3 }}
        style={{ originX: 0 }}
      />
    </div>
  );
}
