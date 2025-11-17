import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar onMenuClick={() => setMenuOpen(!menuOpen)} />

        <main style={{ padding: 20 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
