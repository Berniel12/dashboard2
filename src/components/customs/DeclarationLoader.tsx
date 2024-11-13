import React from 'react';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CheckCircle2, FileText, Search, Loader2, Database } from "lucide-react";

interface DeclarationLoaderProps {
  onComplete: () => void;
}

const steps = [
  {
    id: 1,
    title: "Scanning Document",
    description: "Analyzing document structure and content...",
    icon: Search,
    duration: 1500,
  },
  {
    id: 2,
    title: "Extracting Data",
    description: "Identifying key declaration information...",
    icon: FileText,
    duration: 1500,
  },
  {
    id: 3,
    title: "Processing Information",
    description: "Processing extracted data...",
    icon: Database,
    duration: 1500,
  },
  {
    id: 4,
    title: "Validating Information",
    description: "Verifying extracted data accuracy...",
    icon: CheckCircle2,
    duration: 1500,
  },
];

export function DeclarationLoader({ onComplete }: DeclarationLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let stepTimer: NodeJS.Timeout;
    let completionTimer: NodeJS.Timeout;

    if (currentStep < steps.length) {
      const currentDuration = steps[currentStep].duration;
      
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2;
        });
      }, currentDuration / 50);

      stepTimer = setTimeout(() => {
        if (currentStep < steps.length - 1) {
          setCurrentStep(prev => prev + 1);
          setProgress(0);
        } else {
          setProgress(100);
          // Wait for the progress bar to complete
          setTimeout(() => {
            // Set the last step as completed first
            setCurrentStep(prev => prev + 1);
            // Then show completion message after a delay
            setTimeout(() => {
              setCompleted(true);
              // Add delay before calling onComplete
              completionTimer = setTimeout(() => {
                onComplete();
              }, 2000);
            }, 1000);
          }, 1000);
        }
      }, currentDuration);
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimer);
      clearTimeout(completionTimer);
    };
  }, [currentStep, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl"
      >
        <div className="space-y-6">
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isPast = index < currentStep;
            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`flex items-start space-x-4 ${
                  isPast ? "text-green-600" : isActive ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {isPast ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : isActive ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{step.title}</h3>
                  <p className="text-sm text-gray-500">{step.description}</p>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-2 h-1 bg-gray-200 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-blue-600"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {completed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 text-center text-green-600"
          >
            <CheckCircle2 className="w-12 h-12 mx-auto mb-2" />
            <p className="font-medium">Data Extraction Complete!</p>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
} 