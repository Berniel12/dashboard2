import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, X, LineChart, AlertCircle, CheckCircle } from 'lucide-react';
import Image from 'next/image';

interface AnalysisResult {
  suggestedHsCodes: Array<{
    current: string;
    suggested: string;
    reason: string;
    potentialSaving: number;
  }>;
  ftaOpportunities: Array<{
    agreement: string;
    eligibility: boolean;
    potentialSaving: number;
    requirements: string[];
  }>;
  totalPotentialSavings: number;
  recommendations: string[];
}

interface ShipmentSummary {
  origin: {
    country: string;
    countryCode: string;
  };
  destination: {
    country: string;
    countryCode: string;
  };
  containerCount: number;
  containerType: string;
  bookingRef: string;
}

interface ShipmentAnalysisProps {
  shipmentId: string;
  isOpen: boolean;
  onClose: () => void;
  autoStart?: boolean;
  shipmentSummary: ShipmentSummary;
}

export function ShipmentAnalysis({ 
  shipmentId, 
  isOpen, 
  onClose,
  autoStart = true,
  shipmentSummary
}: ShipmentAnalysisProps) {
  const [analysisPhase, setAnalysisPhase] = useState<number>(0);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const phases = [
    "Analyzing shipment details...",
    "Checking HS classifications...",
    "Evaluating FTA opportunities...",
    "Calculating potential savings...",
    "Generating recommendations..."
  ];

  useEffect(() => {
    if (isOpen && autoStart) {
      runAnalysis();
    }
  }, [isOpen]);

  async function runAnalysis() {
    setError(null);
    setResults(null);
    
    try {
      // Increased delay to 1.5 seconds per phase
      for (let i = 0; i < phases.length; i++) {
        setAnalysisPhase(i);
        await new Promise(resolve => setTimeout(resolve, 1500));
      }

      const response = await fetch(`/api/shipments/${shipmentId}/analyze`);
      if (!response.ok) throw new Error('Analysis failed');
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-gray-200 pb-4 mb-6">
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-4"
              >
                <h2 className="text-2xl font-bold text-gray-900">Cost Optimization Analysis</h2>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-50 rounded-lg p-3 flex items-center justify-between"
              >
                {/* Route Information */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center">
                    <div className="flex flex-col items-center">
                      <img
                        src={`https://flagcdn.com/w80/${shipmentSummary.origin.countryCode.toLowerCase()}.png`}
                        alt={shipmentSummary.origin.country}
                        className="w-8 h-5 object-cover rounded-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                      />
                      <span className="text-xs text-gray-600 mt-1">{shipmentSummary.origin.countryCode}</span>
                    </div>
                    <div className="mx-2 flex flex-col items-center">
                      <div className="w-12 h-0.5 bg-blue-500"></div>
                      <span className="text-xs text-gray-500 mt-1">to</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <img
                        src={`https://flagcdn.com/w80/${shipmentSummary.destination.countryCode.toLowerCase()}.png`}
                        alt={shipmentSummary.destination.country}
                        className="w-8 h-5 object-cover rounded-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                      />
                      <span className="text-xs text-gray-600 mt-1">{shipmentSummary.destination.countryCode}</span>
                    </div>
                  </div>
                </div>

                {/* Shipment Details */}
                <div className="flex items-center divide-x divide-gray-300">
                  <div className="px-4">
                    <div className="text-xs text-gray-500">Shipment ID</div>
                    <div className="text-sm font-medium text-gray-900">{shipmentId}</div>
                  </div>
                  <div className="px-4">
                    <div className="text-xs text-gray-500">Containers</div>
                    <div className="text-sm font-medium text-gray-900">
                      {shipmentSummary.containerCount}x {shipmentSummary.containerType}
                    </div>
                  </div>
                  <div className="px-4">
                    <div className="text-xs text-gray-500">Booking Ref</div>
                    <div className="text-sm font-medium text-gray-900">{shipmentSummary.bookingRef}</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {!results && !error && (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center py-8 px-4"
              >
                {/* Animated Progress Circle */}
                <motion.div 
                  variants={itemVariants}
                  className="relative w-24 h-24 mb-8"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="w-16 h-16 animate-spin text-blue-500" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-12 h-12 rounded-full bg-blue-50"
                    />
                  </div>
                </motion.div>

                {/* Current Phase Display */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg font-medium text-gray-900 mb-8 text-center"
                >
                  {phases[analysisPhase]}
                </motion.div>

                {/* Progress Steps */}
                <div className="w-full max-w-md space-y-3">
                  {phases.map((phase, index) => (
                    <motion.div
                      key={phase}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { 
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.5,
                            delay: index * 0.15
                          }
                        }
                      }}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        index === analysisPhase ? 'bg-blue-50 shadow-sm' : ''
                      }`}
                      style={{
                        opacity: index < analysisPhase ? 0.9 :
                                index === analysisPhase ? 1 :
                                0.3
                      }}
                    >
                      <div className="relative flex-shrink-0">
                        {index < analysisPhase ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          </motion.div>
                        ) : index === analysisPhase ? (
                          <motion.div
                            animate={{ 
                              rotate: 360,
                              transition: { duration: 3, repeat: Infinity, ease: "linear" }
                            }}
                            className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"
                          >
                            <Loader2 className="w-4 h-4 text-blue-500" />
                          </motion.div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center opacity-30">
                            <div className="w-2 h-2 rounded-full bg-gray-200" />
                          </div>
                        )}
                        {index < phases.length - 1 && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ 
                              height: 24,
                              transition: { duration: 0.5, delay: index * 0.15 }
                            }}
                            className={`absolute left-1/2 top-full w-0.5 -translate-x-1/2 ${
                              index < analysisPhase ? 'bg-green-200' : 
                              index === analysisPhase ? 'bg-blue-200' :
                              'bg-gray-200 opacity-30'
                            }`}
                          />
                        )}
                      </div>
                      <span className={`text-sm ${
                        index === analysisPhase ? 'text-blue-600 font-medium' : 
                        index < analysisPhase ? 'text-gray-800' : 
                        'text-gray-400'
                      }`}>
                        {phase}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center py-8"
              >
                <motion.div variants={itemVariants}>
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-500">{error}</p>
                  <button
                    onClick={runAnalysis}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Retry Analysis
                  </button>
                </motion.div>
              </motion.div>
            )}

            {results && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {/* Total Savings Banner */}
                <motion.div variants={itemVariants}>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <LineChart className="w-5 h-5 text-green-600" />
                        <span className="text-green-700 font-medium">Total Potential Savings</span>
                      </div>
                      <span className="text-2xl font-bold text-green-700">
                        ${results.totalPotentialSavings.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Left Column */}
                  <motion.div variants={itemVariants}>
                    {/* HS Code Section */}
                    <div className="bg-white rounded-lg border border-gray-200 p-3">
                      <h3 className="text-sm font-semibold flex items-center space-x-2 mb-2">
                        <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                        <span>HS Code Optimization</span>
                      </h3>
                      <div className="space-y-2">
                        {results.suggestedHsCodes.map((suggestion, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-gray-50 rounded-lg p-2"
                          >
                            <div className="flex justify-between mb-1 text-xs">
                              <div className="flex flex-col">
                                <span className="text-gray-500">Current</span>
                                <span className="font-medium">{suggestion.current}</span>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-gray-500">Suggested</span>
                                <span className="font-medium text-green-600">{suggestion.suggested}</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 border-t border-gray-200 pt-1 mt-1">
                              {suggestion.reason}
                            </p>
                            <div className="flex justify-end mt-1">
                              <span className="text-xs font-medium text-green-600">
                                Save ${suggestion.potentialSaving.toLocaleString()}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Right Column */}
                  <motion.div variants={itemVariants}>
                    {/* FTA Section */}
                    <div className="bg-white rounded-lg border border-gray-200 p-3">
                      <h3 className="text-sm font-semibold flex items-center space-x-2 mb-2">
                        <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                        <span>FTA Opportunities</span>
                      </h3>
                      <div className="space-y-2">
                        {results.ftaOpportunities.map((fta, index) => (
                          <motion.div
                            key={index}
                            variants={itemVariants}
                            className="bg-gray-50 rounded-lg p-2"
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-xs">{fta.agreement}</span>
                              <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${
                                fta.eligibility 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {fta.eligibility ? 'Eligible' : 'Not Eligible'}
                              </span>
                            </div>
                            {fta.eligibility && (
                              <div className="text-xs text-green-600 font-medium mb-1">
                                Potential saving: ${fta.potentialSaving.toLocaleString()}
                              </div>
                            )}
                            <div className="text-xs text-gray-600 space-y-0.5">
                              {fta.requirements.map((req, i) => (
                                <div key={i} className="flex items-start space-x-1.5">
                                  <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5"></div>
                                  <span>{req}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Bottom Recommendations Section */}
                <motion.div variants={itemVariants}>
                  <div className="bg-white rounded-lg border border-gray-200 p-3">
                    <h3 className="text-sm font-semibold flex items-center space-x-2 mb-2">
                      <span className="w-1 h-4 bg-blue-500 rounded-full"></span>
                      <span>Key Recommendations</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {results.recommendations.map((rec, index) => (
                        <motion.div
                          key={index}
                          variants={itemVariants}
                          className="flex items-start space-x-2 bg-gray-50 p-2 rounded-lg"
                        >
                          <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                          </div>
                          <span className="text-xs text-gray-700">{rec}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 