// src/components/Navbar.jsx
export default function Navbar({ onMenuClick }) {
  return (
    <header
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        padding: "0 15px",
        borderBottom: "1px solid #ddd",
        background: "#fff",
      }}
    >
      <button
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "28px",
        }}
        onClick={onMenuClick}
      >
        ☰
      </button>

      <h2 style={{ marginLeft: "15px" }}>Dashboard</h2>
    </header>
  );
}
