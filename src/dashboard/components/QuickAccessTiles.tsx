import React from "react";
import {
  BookOpen,
  FileText,
  Brain,
  Code,
  TrendingUp,
  Users,
  Code2,
} from "lucide-react";

const tiles = [
  {
    icon: BookOpen,
    label: "My Courses",
    count: "6",
    color: "bg-blue-500",
    bgColor: "bg-blue-500/20",
  },
  {
    icon: FileText,
    label: "Assignments Due",
    count: "3",
    color: "bg-red-500",
    bgColor: "bg-red-500/20",
  },
  {
    icon: Code2,
    label: "Problem solved",
    count: "3",
    color: "bg-green-500",
    bgColor: "bg-green-500/20",
  },
];

export default function QuickAccessTiles() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {tiles.map((tile, index) => (
        <div
          key={index}
          className={`${tile.bgColor} p-6 rounded-xl border border-gray-800 hover:shadow-lg transition-all cursor-pointer group`}
        >
          <div className="flex items-center justify-between mb-3">
            <div
              className={`${tile.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform`}
            >
              <tile.icon className="w-6 h-6" />
            </div>
            {tile.count && (
              <span className="text-2xl font-bold text-white">
                {tile.count}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-white">{tile.label}</h3>
        </div>
      ))}
    </div>
  );
}
