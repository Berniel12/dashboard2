'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, ChevronRight, Search } from 'lucide-react';

interface HSCodeItem {
  name: string;
  description: string;
  hs_code: string;
  confidence: string;
}

interface AnalysisDisplayProps {
  item: HSCodeItem;
  filePreview?: string;
  fileType: string;
}

const HSCodeBreakdown = ({ hsCode, description }: { hsCode: string; description: string }) => {
  const getChapterDescription = (chapter: string) => {
    const descriptions: { [key: string]: string } = {
      '19': 'Preparations of cereals, flour, starch or milk; pastrycooks products',
      '20': 'Preparations of vegetables, fruit, nuts or other parts of plants',
      '21': 'Miscellaneous edible preparations',
      '29': 'Organic chemicals',
      '30': 'Pharmaceutical products',
      '31': 'Fertilisers',
      // Add more as needed
    };
    return descriptions[chapter] || 'Description not available';
  };

  const getHeadingDescription = (heading: string) => {
    const descriptions: { [key: string]: string } = {
      // Chapter 30 - Pharmaceutical products
      '3001': 'Glands and other organs for organo-therapeutic uses; extracts thereof',
      '3002': 'Human blood; animal blood; antisera, vaccines, toxins, cultures of micro-organisms',
      '3003': 'Medicaments (not in measured doses, nor in forms/packings for retail sale)',
      '3004': 'Medicaments (in measured doses, or in forms/packings for retail sale)',
      '3005': 'Wadding, gauze, bandages and similar articles',
      '3006': 'Pharmaceutical goods specified in Note 4 to Chapter 30',

      // Chapter 29 - Organic chemicals
      '2901': 'Acyclic hydrocarbons',
      '2902': 'Cyclic hydrocarbons',
      '2903': 'Halogenated derivatives of hydrocarbons',
      '2904': 'Sulphonated, nitrated or nitrosated derivatives of hydrocarbons',
      '2905': 'Acyclic alcohols and their derivatives',
      '2906': 'Cyclic alcohols and their derivatives',
      '2907': 'Phenols; phenol-alcohols',
      '2908': 'Derivatives of phenols or phenol-alcohols',
      '2909': 'Ethers, ether-alcohols, ether-phenols, alcohol peroxides',
      '2910': 'Epoxides, epoxyalcohols, epoxyphenols and their derivatives',

      // Previous food-related headings
      '1901': 'Malt extract; food preparations of flour, meal, starch or malt extract',
      '1902': 'Pasta, couscous and similar farinaceous products',
      // ... other existing food headings
    };
    return descriptions[heading] || 'Description not available';
  };

  const getSubheadingDescription = (subheading: string) => {
    const descriptions: { [key: string]: string } = {
      // Pharmaceutical subheadings
      '300410': 'Containing penicillins or derivatives thereof',
      '300420': 'Containing other antibiotics',
      '300431': 'Containing insulin',
      '300432': 'Containing corticosteroid hormones',
      '300439': 'Containing other hormones',
      '300440': 'Containing alkaloids or derivatives thereof',
      '300450': 'Other medicaments containing vitamins or other products',
      '300490': 'Other medicaments for therapeutic or prophylactic uses',

      // Previous food subheadings
      '190110': 'Preparations for infant use, retail sale',
      '190120': 'Mixes and doughs for preparation of bakers wares',
      // ... other existing subheadings
    };
    return descriptions[subheading.replace('.', '')] || description;
  };

  const chapter = hsCode.slice(0, 2);
  const heading = hsCode.slice(0, 4);
  const subheading = hsCode.replace(/\./g, '');

  return (
    <motion.div 
      className="space-y-4 mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div 
        className="p-4 rounded-lg bg-blue-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center space-x-2">
          <ChevronRight className="text-blue-500" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg font-bold text-blue-700">{chapter}</span>
              <span className="text-gray-700">-</span>
              <span className="text-gray-700">{getChapterDescription(chapter)}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="p-4 rounded-lg bg-blue-100 ml-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.9 }}
      >
        <div className="flex items-center space-x-2">
          <ChevronRight className="text-blue-500" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg font-bold text-blue-700">{heading}</span>
              <span className="text-gray-700">-</span>
              <span className="text-gray-700">{getHeadingDescription(heading)}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="p-4 rounded-lg bg-blue-200 ml-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.1 }}
      >
        <div className="flex items-center space-x-2">
          <ChevronRight className="text-blue-500" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-lg font-bold text-blue-700">{hsCode}</span>
              <span className="text-gray-700">-</span>
              <span className="text-gray-700">{getSubheadingDescription(subheading)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AnalysisDisplay = ({ item, filePreview, fileType }: AnalysisDisplayProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-start space-x-6">
        {filePreview && (
          <motion.div 
            className="w-48 h-48 rounded-lg overflow-hidden shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {fileType.startsWith('image/') ? (
              <img 
                src={filePreview} 
                alt="Uploaded file preview" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </motion.div>
        )}

        <div className="flex-1">
          <AnimatePresence>
            {isAnalyzing ? (
              <motion.div 
                className="flex items-center space-x-2 text-blue-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Search className="w-5 h-5 animate-pulse" />
                <span>Analyzing document...</span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <HSCodeBreakdown 
                  hsCode={item.hs_code} 
                  description={item.description}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AnalysisDisplay; 