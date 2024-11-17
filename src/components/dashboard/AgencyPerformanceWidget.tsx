import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Users,
  BarChart2
} from 'lucide-react';

interface AgencyMetrics {
  totalDeclarations: number;
  avgProcessingTime: number;
  successRate: number;
  activeBrokers: number;
  complianceScore: number;
  monthlyGrowth: number;
}

const AgencyPerformanceWidget = () => {
  const [metrics, setMetrics] = useState<AgencyMetrics>({
    totalDeclarations: 0,
    avgProcessingTime: 0,
    successRate: 0,
    activeBrokers: 0,
    complianceScore: 0,
    monthlyGrowth: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        // Simulated data - replace with actual API call
        const mockData: AgencyMetrics = {
          totalDeclarations: 1250,
          avgProcessingTime: 2.5,
          successRate: 96.5,
          activeBrokers: 15,
          complianceScore: 98,
          monthlyGrowth: 12.3
        };
        setMetrics(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching agency metrics:', error);
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const MetricCard = ({ 
    title, 
    value, 
    icon: Icon, 
    suffix, 
    trend 
  }: { 
    title: string; 
    value: number; 
    icon: any; 
    suffix?: string;
    trend?: number;
  }) => (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600 text-sm">{title}</span>
        <Icon className="w-5 h-5 text-blue-500" />
      </div>
      <div className="flex items-end justify-between">
        <div className="text-2xl font-semibold">
          {value.toLocaleString()}{suffix}
        </div>
        {trend !== undefined && (
          <div className={`flex items-center text-sm ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return <div className="animate-pulse">Loading metrics...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <MetricCard
        title="Total Declarations"
        value={metrics.totalDeclarations}
        icon={BarChart2}
        trend={metrics.monthlyGrowth}
      />
      <MetricCard
        title="Average Processing Time"
        value={metrics.avgProcessingTime}
        icon={Clock}
        suffix=" days"
      />
      <MetricCard
        title="Success Rate"
        value={metrics.successRate}
        icon={CheckCircle}
        suffix="%"
      />
      <MetricCard
        title="Active Brokers"
        value={metrics.activeBrokers}
        icon={Users}
      />
      <MetricCard
        title="Compliance Score"
        value={metrics.complianceScore}
        icon={AlertTriangle}
        suffix="%"
      />
      <MetricCard
        title="Monthly Growth"
        value={metrics.monthlyGrowth}
        icon={TrendingUp}
        suffix="%"
        trend={metrics.monthlyGrowth}
      />
    </div>
  );
};

export default AgencyPerformanceWidget; 