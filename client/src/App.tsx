import Header from "@/components/Header";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Notifications from "@/components/Notifications";
import Footer from "@/components/Footer";

import Dashboard from "@/pages/Dashboard";

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header>
        <p className="text-xl font-bold">Fleet Management</p>
        <div className="flex items-center gap-4">
          <Notifications />
          <ThemeSwitcher />
        </div>
      </Header>
      <main className="p-4 flex-1 flex flex-col w-full gap-4">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}
