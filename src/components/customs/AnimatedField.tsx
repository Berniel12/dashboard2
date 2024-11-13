import React from 'react';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedFieldProps {
  label: string;
  value: string;
  delay?: number;
}

export function AnimatedField({ label, value, delay = 0 }: AnimatedFieldProps) {
  const [displayValue, setDisplayValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Start the typing animation after the specified delay
    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (currentIndex <= value.length) {
          setDisplayValue(value.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setIsComplete(true);
        }
      }, 50); // Typing speed

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [value, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      className="relative"
    >
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={displayValue}
          readOnly
          className="w-full px-4 py-2 border rounded-md bg-gray-50"
        />
        
        {/* Typing cursor */}
        {isTyping && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-2 h-4 bg-blue-500 animate-pulse" />
          </div>
        )}
        
        {/* Completion line */}
        {isComplete && (
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 h-0.5 bg-green-500"
          />
        )}
      </div>
    </motion.div>
  );
} 