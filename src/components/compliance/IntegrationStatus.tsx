'use client';

import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface IntegrationSystem {
  name: string;
  status: 'connected' | 'disconnected' | 'issues';
  lastSync?: string;
  logoUrl: string;
  description: string;
}

const IntegrationStatus = () => {
  const integrations: IntegrationSystem[] = [
    {
      name: "Sha'ar Olami",
      status: 'connected',
      lastSync: '2024-03-17 10:30',
      logoUrl: '/images/saar_olami_2logo-1024x1010.png',
      description: 'Israeli Customs Authority Portal'
    },
    {
      name: 'MASLUL',
      status: 'issues',
      lastSync: '2024-03-16 15:45',
      logoUrl: '/images/Emblem_of_Israel.svg.png',
      description: 'Government Import Permits Portal'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {integrations.map((integration) => (
        <div 
          key={integration.name}
          className="bg-white rounded-lg shadow-sm p-6 flex items-start space-x-4 border border-gray-100"
        >
          <div className="flex-shrink-0">
            <img 
              src={integration.logoUrl} 
              alt={`${integration.name} logo`}
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
              {integration.status === 'connected' && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="w-5 h-5 mr-1" />
                  <span className="text-sm">Connected</span>
                </div>
              )}
              {integration.status === 'issues' && (
                <div className="flex items-center text-yellow-600">
                  <AlertCircle className="w-5 h-5 mr-1" />
                  <span className="text-sm">Issues Detected</span>
                </div>
              )}
              {integration.status === 'disconnected' && (
                <div className="flex items-center text-red-600">
                  <XCircle className="w-5 h-5 mr-1" />
                  <span className="text-sm">Disconnected</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">{integration.description}</p>
            {integration.lastSync && (
              <p className="text-xs text-gray-500 mt-2">
                Last synchronized: {integration.lastSync}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IntegrationStatus; 