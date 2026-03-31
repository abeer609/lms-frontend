import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import WelcomeBanner from "./components/WelcomeBanner";
import QuickAccessTiles from "./components/QuickAccessTiles";
import UpcomingDeadlines from "./components/UpcomingDeadlines";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <WelcomeBanner />
            <QuickAccessTiles />
            <div className="gap-6">
              <UpcomingDeadlines />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
