import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function SensoresList() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Navbar onMenuClick={() => setMenuOpen(!menuOpen)} />
      <Sidebar open={menuOpen} />

      <div style={{ padding: "20px" }}>
        <h1>Sensores</h1>
        <p>Tela de sensores (implementaremos depois).</p>
      </div>
    </>
  );
}
