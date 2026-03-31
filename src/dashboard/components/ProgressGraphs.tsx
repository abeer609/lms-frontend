import React from 'react';
import { TrendingUp, Target, Award } from 'lucide-react';

export default function ProgressGraphs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Assignments Progress */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Assignments</h3>
          <TrendingUp className="w-5 h-5 text-blue-500" />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Completed</span>
            <span className="font-medium">12 / 15</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full" style={{ width: '80%' }}></div>
          </div>
          <p className="text-xs text-gray-500">80% completion rate</p>
        </div>
      </div>

      {/* Average Grade */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Average Grade</h3>
          <Award className="w-5 h-5 text-green-500" />
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">A-</div>
          <div className="text-sm text-gray-600">87.5 / 100</div>
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '87.5%' }}></div>
          </div>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Weekly Goals</h3>
          <Target className="w-5 h-5 text-purple-500" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Study Hours</span>
            <span className="text-sm font-medium">25 / 30</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full" style={{ width: '83%' }}></div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Assignments</span>
            <span className="text-sm font-medium">3 / 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}