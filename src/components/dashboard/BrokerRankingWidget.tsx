import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Users
} from 'lucide-react';

interface BrokerRanking {
  id: string;
  name: string;
  avatarUrl: string;
  metrics: {
    successRate: number;
    declarationsCount: number;
    processingTime: number;
    performanceTrend: number;
    activeClients: number;
    complianceScore: number;
    pendingDeclarations: number;
    recentIssues: number;
  };
}

const BrokerRankingWidget = () => {
  const [brokers, setBrokers] = useState<BrokerRanking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrokers = async () => {
      try {
        // Simulated data - replace with actual API call
        const mockData: BrokerRanking[] = [
          {
            id: '1',
            name: 'Michael Chen',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
            metrics: {
              successRate: 98.5,
              declarationsCount: 156,
              processingTime: 2.1,
              performanceTrend: 12,
              activeClients: 45,
              complianceScore: 99,
              pendingDeclarations: 8,
              recentIssues: 0
            }
          },
          {
            id: '2',
            name: 'John Doe',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
            metrics: {
              successRate: 97.2,
              declarationsCount: 142,
              processingTime: 2.3,
              performanceTrend: 8,
              activeClients: 38,
              complianceScore: 97,
              pendingDeclarations: 12,
              recentIssues: 1
            }
          },
          {
            id: '3',
            name: 'Sarah Johnson',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
            metrics: {
              successRate: 96.8,
              declarationsCount: 138,
              processingTime: 2.4,
              performanceTrend: 5,
              activeClients: 35,
              complianceScore: 96,
              pendingDeclarations: 10,
              recentIssues: 2
            }
          },
          {
            id: '4',
            name: 'David Kim',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
            metrics: {
              successRate: 95.5,
              declarationsCount: 125,
              processingTime: 2.6,
              performanceTrend: -2,
              activeClients: 30,
              complianceScore: 94,
              pendingDeclarations: 15,
              recentIssues: 3
            }
          },
          {
            id: '5',
            name: 'Emily Brown',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
            metrics: {
              successRate: 94.2,
              declarationsCount: 118,
              processingTime: 2.8,
              performanceTrend: -4,
              activeClients: 28,
              complianceScore: 93,
              pendingDeclarations: 18,
              recentIssues: 4
            }
          }
        ];
        setBrokers(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching broker rankings:', error);
        setLoading(false);
      }
    };

    fetchBrokers();
  }, []);

  const getRankBadgeColor = (index: number): string => {
    switch (index) {
      case 0:
        return 'bg-yellow-500';
      case 1:
        return 'bg-gray-400';
      case 2:
        return 'bg-amber-600';
      default:
        return 'bg-gray-200 text-gray-600';
    }
  };

  const MetricItem = ({ icon: Icon, value, label, trend, suffix = '' }: {
    icon: any;
    value: number;
    label: string;
    trend?: number;
    suffix?: string;
  }) => (
    <div className="flex items-center gap-1 text-sm" title={label}>
      <Icon className="w-4 h-4 text-gray-400" />
      <span className="font-medium">{value}{suffix}</span>
      {trend !== undefined && (
        <span className={trend >= 0 ? 'text-green-500' : 'text-red-500'}>
          {trend >= 0 ? '↑' : '↓'}
        </span>
      )}
    </div>
  );

  if (loading) {
    return <div className="animate-pulse">Loading rankings...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-3">Broker Rankings</h2>
      <div className="space-y-3">
        {brokers.map((broker, index) => (
          <div 
            key={broker.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded-full ${getRankBadgeColor(index)} flex items-center justify-center text-white font-semibold text-sm`}>
                {index + 1}
              </div>
              <img
                src={broker.avatarUrl}
                alt={broker.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="min-w-[120px]">
                <div className="font-medium text-sm">{broker.name}</div>
                <div className="text-xs text-gray-500">
                  {broker.metrics.activeClients} clients
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              <MetricItem 
                icon={CheckCircle}
                value={broker.metrics.successRate}
                label="Success Rate"
                suffix="%"
                trend={broker.metrics.performanceTrend}
              />
              <MetricItem 
                icon={FileText}
                value={broker.metrics.declarationsCount}
                label="Declarations"
              />
              <MetricItem 
                icon={Clock}
                value={broker.metrics.processingTime}
                label="Avg. Processing Time"
                suffix="d"
              />
              <MetricItem 
                icon={AlertTriangle}
                value={broker.metrics.complianceScore}
                label="Compliance Score"
                suffix="%"
              />
              <div className="flex gap-2 ml-2 border-l pl-2 border-gray-200">
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                  {broker.metrics.pendingDeclarations} pending
                </span>
                {broker.metrics.recentIssues > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    {broker.metrics.recentIssues} issues
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrokerRankingWidget; 