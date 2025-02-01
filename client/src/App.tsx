import Header from "@/components/Header";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Notifications from "@/components/Notifications";
import Footer from "@/components/Footer";

import Dashboard from "@/pages/Dashboard";

export default function App() {
  return (
    <div className="grid grid-rows-[4rem_minmax(500px,1fr)_2rem] h-screen gap-2">
      <Header>
        <p>Fleet Management</p>
        <div className="flex items-center gap-2">
          <Notifications />
          <ThemeSwitcher />
        </div>
      </Header>
      <main>
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}
