'use client';

interface Case {
  id: string;
  reference: string;
  system: 'customs' | 'maslul';
  status: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  assignedTo: string;
}

const OpenCases = () => {
  const cases: Case[] = [
    {
      id: '1',
      reference: 'CUS-2024-001',
      system: 'customs',
      status: 'Pending Review',
      description: 'Missing documentation for shipment clearance',
      priority: 'high',
      dueDate: '2024-03-20',
      assignedTo: 'David Cohen'
    },
    {
      id: '2',
      reference: 'MAS-2024-003',
      system: 'maslul',
      status: 'Awaiting Response',
      description: 'Import permit application for medical devices',
      priority: 'medium',
      dueDate: '2024-03-25',
      assignedTo: 'Sarah Levy'
    },
    {
      id: '3',
      reference: 'CUS-2024-002',
      system: 'customs',
      status: 'Documentation Required',
      description: 'Additional certificates needed for food products',
      priority: 'high',
      dueDate: '2024-03-21',
      assignedTo: 'Michael Ben-David'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                System
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assigned To
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cases.map((case_) => (
              <tr key={case_.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {case_.reference}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    case_.system === 'customs' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {case_.system.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {case_.status}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {case_.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(case_.priority)}`}>
                    {case_.priority.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {case_.dueDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {case_.assignedTo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OpenCases; 