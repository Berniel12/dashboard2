import React from 'react';

const declarations = [
  {
    id: 'DEC-001',
    client: 'Acme Corp',
    status: 'In Progress',
    type: 'Import',
    date: '2024-01-15',
  },
  {
    id: 'DEC-002',
    client: 'TechCo Ltd',
    status: 'Pending Review',
    type: 'Export',
    date: '2024-01-14',
  },
  {
    id: 'DEC-003',
    client: 'Global Trade Inc',
    status: 'Completed',
    type: 'Import',
    date: '2024-01-13',
  },
];

export default function DeclarationsTable() {
  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl overflow-hidden">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-base font-semibold text-gray-900">Recent Declarations</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Declaration ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {declarations.map((declaration) => (
              <tr key={declaration.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {declaration.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {declaration.client}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {declaration.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${declaration.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                      declaration.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {declaration.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {declaration.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 