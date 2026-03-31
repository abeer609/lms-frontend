import { Search, Bell, User, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gray-950 border-b border-gray-700 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo and System Name */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <h1 className="text-xl font-bold text-white">EduLMS</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses, assignments, or notes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {/* Profile */}
          <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium text-white">Abeer</span>
            <ChevronDown className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
