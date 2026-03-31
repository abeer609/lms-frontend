import React from 'react';
import { MessageSquare, FileCheck, Shield, Users, Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'forum',
    icon: MessageSquare,
    title: 'New reply in "Machine Learning Discussion"',
    description: 'Prof. Johnson replied to your question about neural networks',
    time: '2 hours ago',
    bgColor: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    id: 2,
    type: 'submission',
    icon: FileCheck,
    title: 'Assignment submitted successfully',
    description: 'Database Design Project - Assignment #2',
    time: '5 hours ago',
    bgColor: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    id: 3,
    type: 'ai-check',
    icon: Shield,
    title: 'AI Originality Check completed',
    description: 'Your essay scored 98% originality - Excellent work!',
    time: '1 day ago',
    bgColor: 'bg-purple-100',
    iconColor: 'text-purple-600'
  },
  {
    id: 4,
    type: 'group',
    icon: Users,
    title: 'Added to group project',
    description: 'You were added to "Software Engineering Team 5"',
    time: '2 days ago',
    bgColor: 'bg-orange-100',
    iconColor: 'text-orange-600'
  },
  {
    id: 5,
    type: 'deadline',
    icon: Clock,
    title: 'Deadline reminder',
    description: 'Machine Learning Assignment #3 due in 3 days',
    time: '2 days ago',
    bgColor: 'bg-red-100',
    iconColor: 'text-red-600'
  }
];

export default function RecentActivity() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Recent Activity</h3>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <div className={`p-2 rounded-lg ${activity.bgColor}`}>
              <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-800 text-sm">{activity.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
          View All Activities
        </button>
      </div>
    </div>
  );
}