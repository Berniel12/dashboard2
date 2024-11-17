import { Card, List, Avatar, Badge, Tooltip } from 'antd';
import { TrophyOutlined, RiseOutlined, FallOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';

interface BrokerPerformance {
  id: string;
  name: string;
  avatar?: string;
  successRate: number;
  declarationsCompleted: number;
  averageProcessingTime: number;
  trend: 'up' | 'down' | 'stable';
}

const BrokerPerformanceWidget = () => {
  const [brokers, setBrokers] = useState<BrokerPerformance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchBrokers = async () => {
      try {
        // Simulated data - replace with actual API call
        const mockData: BrokerPerformance[] = [
          {
            id: '1',
            name: 'John Smith',
            successRate: 98,
            declarationsCompleted: 145,
            averageProcessingTime: 2.3,
            trend: 'up',
          },
          {
            id: '2',
            name: 'Sarah Johnson',
            successRate: 95,
            declarationsCompleted: 132,
            averageProcessingTime: 2.5,
            trend: 'stable',
          },
          {
            id: '3',
            name: 'Michael Brown',
            successRate: 92,
            declarationsCompleted: 128,
            averageProcessingTime: 2.8,
            trend: 'down',
          },
        ];
        setBrokers(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching broker performance:', error);
        setLoading(false);
      }
    };

    fetchBrokers();
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <RiseOutlined className="text-green-500" />;
      case 'down':
        return <FallOutlined className="text-red-500" />;
      default:
        return null;
    }
  };

  const getRankingColor = (index: number) => {
    switch (index) {
      case 0:
        return 'gold';
      case 1:
        return 'silver';
      case 2:
        return 'bronze';
      default:
        return 'default';
    }
  };

  return (
    <Card 
      title={
        <div className="flex items-center gap-2">
          <TrophyOutlined className="text-yellow-500" />
          <span>Top Performing Brokers</span>
        </div>
      }
      className="shadow-md"
    >
      <List
        loading={loading}
        dataSource={brokers}
        renderItem={(broker, index) => (
          <List.Item className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge count={index + 1} style={{ backgroundColor: getRankingColor(index) }}>
                <Avatar src={broker.avatar} size="large">
                  {broker.name.charAt(0)}
                </Avatar>
              </Badge>
              <div>
                <div className="font-medium">{broker.name}</div>
                <div className="text-sm text-gray-500">
                  {broker.declarationsCompleted} declarations
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Tooltip title="Success Rate">
                <div className="text-sm">
                  {broker.successRate}%
                  {getTrendIcon(broker.trend)}
                </div>
              </Tooltip>
              <Tooltip title="Average Processing Time">
                <div className="text-sm text-gray-500">
                  {broker.averageProcessingTime} days
                </div>
              </Tooltip>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default BrokerPerformanceWidget; 