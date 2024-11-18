import { useState, useEffect } from 'react';
import { 
  DollarSign, 
  Package, 
  TrendingUp, 
  Clock,
  Building2
} from 'lucide-react';

interface ClientMetrics {
  id: string;
  name: string;
  metrics: {
    revenue: number;
    declarationsCount: number;
    growthRate: number;
    avgProcessingTime: number;
  };
}

interface MetricItemProps {
  icon: any;
  value: number;
  label: string;
  trend?: number;
  isCurrency?: boolean;
  suffix?: string;
}

const TopClientsWidget = () => {
  const [clients, setClients] = useState<ClientMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        // Simulated data - replace with actual API call
        const mockData: ClientMetrics[] = [
          {
            id: '1',
            name: 'Tech Global Industries',
            metrics: {
              revenue: 125000,
              declarationsCount: 45,
              growthRate: 15,
              avgProcessingTime: 2.1,
            }
          },
          {
            id: '2',
            name: 'Import Masters Ltd',
            metrics: {
              revenue: 98000,
              declarationsCount: 38,
              growthRate: 8,
              avgProcessingTime: 2.3,
            }
          },
          {
            id: '3',
            name: 'Global Trade Co',
            metrics: {
              revenue: 85000,
              declarationsCount: 32,
              growthRate: 12,
              avgProcessingTime: 2.4,
            }
          },
          {
            id: '4',
            name: 'Logistics Plus',
            metrics: {
              revenue: 76000,
              declarationsCount: 28,
              growthRate: -2,
              avgProcessingTime: 2.6,
            }
          },
          {
            id: '5',
            name: 'Fast Freight Inc',
            metrics: {
              revenue: 65000,
              declarationsCount: 25,
              growthRate: 5,
              avgProcessingTime: 2.8,
            }
          }
        ];
        setClients(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching client metrics:', error);
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const MetricItem = ({ icon: Icon, value, label, trend, isCurrency, suffix }: MetricItemProps) => (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
        <Icon className="w-4 h-4 text-gray-600" />
      </div>
      <div>
        <div className="text-sm text-gray-600">{label}</div>
        <div className="font-semibold">
          {isCurrency && '$'}
          {value.toLocaleString()}
          {suffix && suffix}
          {trend !== undefined && (
            <span className={`ml-1 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="animate-pulse">Loading client metrics...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-3">Top Clients</h2>
      <div className="space-y-3">
        {clients.map((client, index) => (
          <div 
            key={client.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-blue-600" />
              </div>
              <div className="min-w-[150px]">
                <div className="font-medium text-sm">{client.name}</div>
                <div className="text-xs text-gray-500">
                  {client.metrics.declarationsCount} declarations
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-xs">
              <MetricItem 
                icon={DollarSign}
                value={client.metrics.revenue}
                label="Revenue"
                isCurrency={true}
              />
              <MetricItem 
                icon={TrendingUp}
                value={client.metrics.growthRate}
                label="Growth Rate"
                trend={client.metrics.growthRate}
                suffix="%"
              />
              <MetricItem 
                icon={Clock}
                value={client.metrics.avgProcessingTime}
                label="Avg. Processing Time"
                suffix="d"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopClientsWidget; 