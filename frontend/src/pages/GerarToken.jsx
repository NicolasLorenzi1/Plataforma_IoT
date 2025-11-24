import { useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function GerarToken() {
    const { id } = useParams(); 
    const [role, setRole] = useState("editor");
    const [tokenGerado, setTokenGerado] = useState(null);
    const [error, setError] = useState(null);

    async function gerar() {
        setError(null);
        setTokenGerado(null);

        try {
            const body = {
                dispositivoId: Number(id),
                role: role 
            };

            const res = await axiosInstance.post("api/token/gerar", body);

            const texto = res.data;
            const token = texto.split("Token:")[1]?.trim();

            setTokenGerado(token);
        } catch (e) {
            console.error(e);
            setError("Erro ao gerar token");
        }
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Gerar Token para o Dispositivo</h2>

            <label>Tipo do token:</label>
            <select value={role} onChange={e => setRole(e.target.value)}>
                <option value="editor">Editor (pode enviar leituras)</option>
                <option value="leitor">Leitor (somente lê dados)</option>
            </select>

            <br /><br />

            <button onClick={gerar} className="btn btn-success">
                Gerar Token
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {tokenGerado && (
                <div style={{ marginTop: 20 }}>
                    <h3>Token Gerado:</h3>
                    <code style={{
                        padding: "8px",
                        display: "block",
                        background: "#eee",
                        borderRadius: "5px"
                    }}>
                        {tokenGerado}
                    </code>
                </div>
            )}
        </div>
    );
}
