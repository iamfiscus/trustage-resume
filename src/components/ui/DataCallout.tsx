"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { motion } from "framer-motion";

interface DataCalloutProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  color?: "challenge" | "pillars" | "horizon" | "toolkit";
  source?: string;
}

const colorClasses = {
  challenge: "text-red-600",
  pillars: "text-blue-600",
  horizon: "text-purple-600",
  toolkit: "text-green-500",
};

export function DataCallout({
  value,
  label,
  suffix = "",
  prefix = "",
  color = "pillars",
  source,
}: DataCalloutProps) {
  const { count, ref, hasStarted } = useCountUp({ target: value });

  return (
    <div ref={ref} className="text-center py-12">
      <motion.div
        className={`data-callout ${colorClasses[color]}`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={hasStarted ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </motion.div>

      <motion.p
        className="data-label mt-4"
        initial={{ opacity: 0, y: 10 }}
        animate={hasStarted ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {label}
      </motion.p>

      {source && (
        <motion.p
          className="margin-note mt-6 max-w-md mx-auto text-left"
          initial={{ opacity: 0 }}
          animate={hasStarted ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Source: {source}
        </motion.p>
      )}
    </div>
  );
}
