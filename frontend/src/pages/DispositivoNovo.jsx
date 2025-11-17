import { useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function DispositivoNovo() {
  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function salvar(e) {
    e.preventDefault();
    setLoading(true);

    api.post("/dispositivo/registrar", {
      nome,
      local,
      status
    })
      .then(() => {
        alert("Dispositivo registrado!");
        navigate("/dispositivos");
      })
      .catch(err => {
        console.error(err);
        alert("Erro ao registrar dispositivo.");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Novo Dispositivo</h1>

      <form onSubmit={salvar} style={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}>
        
        <label>Nome:</label>
        <input value={nome} onChange={e => setNome(e.target.value)} required />

        <label>Local:</label>
        <input value={local} onChange={e => setLocal(e.target.value)} required />

        <label>Status:</label>
        <input value={status} onChange={e => setStatus(e.target.value)} required />

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "15px", padding: "10px", cursor: "pointer" }}
        >
          {loading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}
