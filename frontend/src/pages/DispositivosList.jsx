import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function DispositivosList() {
  const [dispositivos, setDispositivos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/api/dispositivo/listar/todos")
      .then((res) => setDispositivos(res.data))
      .catch((err) => console.error("Erro ao carregar dispositivos:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dispositivos</h1>

      <button
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/dispositivos/novo")}
      >
        + Adicionar Dispositivo
      </button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {dispositivos.map((d) => (
          <li
            key={d.id}
            style={{
              padding: "12px",
              marginBottom: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              cursor: "pointer",
            }}
            onClick={() => navigate(`/dispositivos/${d.id}`)}
          >
            <strong>{d.nome}</strong>
            <div>Local: {d.local}</div>
            <div>Status: {d.status}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
