'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface DashboardWidget {
  id: string;
  title: string;
  description: string;
  size: 'small' | 'medium' | 'large';
  category: 'metrics' | 'charts' | 'lists' | 'activity';
  enabled: boolean;
  order: number;
}

interface DashboardContextType {
  widgets: DashboardWidget[];
  updateWidgets: (newWidgets: DashboardWidget[]) => void;
  resetToDefault: () => void;
}

const defaultWidgets: DashboardWidget[] = [
  {
    id: 'revenue',
    title: 'Monthly Revenue',
    description: 'Shows your monthly revenue with trend',
    size: 'small',
    category: 'metrics',
    enabled: true,
    order: 0,
  },
  {
    id: 'declarations',
    title: 'Active Declarations',
    description: 'Number of declarations in progress',
    size: 'small',
    category: 'metrics',
    enabled: true,
    order: 1,
  },
  {
    id: 'shipments',
    title: 'Active Shipments',
    description: 'Overview of current shipments',
    size: 'large',
    category: 'lists',
    enabled: true,
    order: 2,
  },
  {
    id: 'compliance',
    title: 'Compliance Overview',
    description: 'Compliance metrics and risk assessment',
    size: 'medium',
    category: 'charts',
    enabled: true,
    order: 3,
  },
  {
    id: 'messages',
    title: 'Message Inbox',
    description: 'Recent messages and notifications',
    size: 'medium',
    category: 'activity',
    enabled: true,
    order: 4,
  },
  {
    id: 'quick-actions',
    title: 'Quick Actions',
    description: 'Frequently used actions',
    size: 'small',
    category: 'activity',
    enabled: true,
    order: 5,
  },
  {
    id: 'recent-declarations',
    title: 'Recent Declarations',
    description: 'Latest declaration activities',
    size: 'medium',
    category: 'lists',
    enabled: true,
    order: 6,
  },
  {
    id: 'compliance-alerts',
    title: 'Compliance Alerts',
    description: 'Important compliance notifications',
    size: 'medium',
    category: 'activity',
    enabled: true,
    order: 7,
  },
  {
    id: 'upcoming-tasks',
    title: 'Upcoming Tasks',
    description: 'Schedule of upcoming activities',
    size: 'medium',
    category: 'activity',
    enabled: true,
    order: 8,
  },
];

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [widgets, setWidgets] = useState<DashboardWidget[]>(defaultWidgets);

  useEffect(() => {
    // Load saved configuration on mount
    const savedConfig = localStorage.getItem('dashboardConfig');
    if (savedConfig) {
      try {
        const parsedConfig = JSON.parse(savedConfig);
        setWidgets(parsedConfig);
      } catch (error) {
        console.error('Error loading dashboard configuration:', error);
      }
    }
  }, []);

  const updateWidgets = (newWidgets: DashboardWidget[]) => {
    setWidgets(newWidgets);
    localStorage.setItem('dashboardConfig', JSON.stringify(newWidgets));
  };

  const resetToDefault = () => {
    setWidgets(defaultWidgets);
    localStorage.setItem('dashboardConfig', JSON.stringify(defaultWidgets));
  };

  return (
    <DashboardContext.Provider value={{ widgets, updateWidgets, resetToDefault }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
} 