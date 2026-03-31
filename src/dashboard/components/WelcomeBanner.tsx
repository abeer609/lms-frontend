import { Sparkles } from "lucide-react";

export default function WelcomeBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-xl p-8 mb-6 shadow-lg">
      <div className="flex items-center space-x-2 mb-2">
        <Sparkles className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Hello, Abeer!</h2>
      </div>
      <p className="text-blue-100">Welcome back ✨</p>
      {/* <div className="mt-4 flex space-x-6">
        <div>
          <div className="text-3xl font-bold">85%</div>
          <div className="text-blue-100 text-sm">Course Progress</div>
        </div>
        <div>
          <div className="text-3xl font-bold">12</div>
          <div className="text-blue-100 text-sm">Completed Tasks</div>
        </div>
        <div>
          <div className="text-3xl font-bold">3</div>
          <div className="text-blue-100 text-sm">Pending</div>
        </div>
      </div> */}
    </div>
  );
}
