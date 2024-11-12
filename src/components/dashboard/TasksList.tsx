import React from 'react';
import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

const tasks = [
  {
    id: 1,
    title: "Review Import Declaration",
    description: "DEC-2024-005 needs review before submission",
    deadline: "Today, 5:00 PM",
    priority: "high",
    status: "pending"
  },
  {
    id: 2,
    title: "Update Client Documents",
    description: "Update expired certificates for TechCo Ltd",
    deadline: "Tomorrow, 12:00 PM",
    priority: "medium",
    status: "in-progress"
  },
  {
    id: 3,
    title: "Customs Inspection",
    description: "Prepare for scheduled inspection of shipment #4532",
    deadline: "Jan 25, 2024",
    priority: "low",
    status: "scheduled"
  }
];

export default function TasksList() {
  return (
    <div className="bg-white shadow-sm ring-1 ring-gray-200 rounded-xl overflow-hidden">
      <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">Pending Tasks</h2>
        <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {tasks.length} tasks
        </span>
      </div>
      <div className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {task.status === 'pending' ? (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                ) : task.status === 'in-progress' ? (
                  <Clock className="h-5 w-5 text-blue-500" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    {task.title}
                  </p>
                  <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full
                    ${task.priority === 'high' ? 'bg-red-100 text-red-700' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'}
                  `}>
                    {task.priority}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {task.description}
                </p>
                <p className="mt-2 text-xs text-gray-400 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {task.deadline}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 