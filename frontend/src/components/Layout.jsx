import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenuClick={() => setMenuOpen(!menuOpen)} />

        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}