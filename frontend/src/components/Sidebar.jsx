import { Link, useNavigate } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    onClose?.();
    navigate("/login", { replace: true });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: open ? 0 : "-260px",
        width: "260px",
        height: "100%",
        background: "#fff",
        borderRight: "1px solid #ddd",
        padding: "16px",
        transition: "left 0.25s ease",
        zIndex: 1000,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
        <strong>Menu</strong>

        <button
          onClick={onClose}
          style={{
            border: "none",
            background: "transparent",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>

      <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <Link to="/home" onClick={onClose}>🏠 Home</Link>
        <Link to="/dispositivos" onClick={onClose}>📟 Dispositivos</Link>
        <Link to="/sensores" onClick={onClose}>📡 Sensores</Link>

        <button
          onClick={handleLogout}
          style={{
            marginTop: 12,
            padding: "8px 10px",
            borderRadius: 6,
            border: "1px solid #eee",
            background: "#fafafa",
            cursor: "pointer",
          }}
        >
          🚪 Sair
        </button>
      </nav>
    </div>
  );
}
