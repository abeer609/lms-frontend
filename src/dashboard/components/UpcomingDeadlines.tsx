import React from "react";
import { Clock, AlertCircle, CheckCircle, Calendar } from "lucide-react";

const deadlines = [
  {
    id: 1,
    title: "Machine Learning Assignment #3",
    course: "CS 4780",
    dueDate: "2025-01-15",
    dueTime: "11:59 PM",
    priority: "high",
    type: "assignment",
  },
  {
    id: 2,
    title: "Database Design Quiz",
    course: "CS 3320",
    dueDate: "2025-01-17",
    dueTime: "2:00 PM",
    priority: "medium",
    type: "quiz",
  },
  {
    id: 3,
    title: "Software Engineering Project Presentation",
    course: "CS 3240",
    dueDate: "2025-01-20",
    dueTime: "10:00 AM",
    priority: "high",
    type: "presentation",
  },
  {
    id: 4,
    title: "Data Structures Homework",
    course: "CS 2110",
    dueDate: "2025-01-22",
    dueTime: "11:59 PM",
    priority: "low",
    type: "homework",
  },
];

export default function UpcomingDeadlines() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-600/15";
      case "medium":
        return "text-yellow-600 bg-yellow-600/15";
      case "low":
        return "text-green-600 bg-green-600/15";
      default:
        return "text-white bg-gray-100";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "quiz":
        return <CheckCircle className="w-4 h-4" />;
      case "presentation":
        return <Calendar className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Upcoming Deadlines</h3>
        <AlertCircle className="w-5 h-5 text-orange-500" />
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {deadlines.map((deadline) => (
          <div
            key={deadline.id}
            className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <div
              className={`p-2 rounded-lg ${getPriorityColor(
                deadline.priority
              )}`}
            >
              {getTypeIcon(deadline.type)}
            </div>

            <div className="flex-1">
              <h4 className="font-medium text-white">{deadline.title}</h4>
              <p className="text-sm text-white">{deadline.course}</p>
            </div>

            <div className="text-right">
              <p className="font-medium text-white">{deadline.dueDate}</p>
              <p className="text-sm text-white">{deadline.dueTime}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
          View All Assignments
        </button>
      </div>
    </div>
  );
}
