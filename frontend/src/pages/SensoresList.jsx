import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SensoresList() {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function carregarSensores() {
    try {
      const response = await fetch("http://localhost:8080/api/sensor/listar/todos", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await response.json();
      setSensores(data);
    } catch (error) {
      console.error("Erro ao carregar sensores:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deletarSensor(id) {
    if (!confirm("Tem certeza que deseja remover este sensor?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/sensor/deletar/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.ok) {
        setSensores(sensores.filter(s => s.id !== id));
      } else {
        alert("Erro ao deletar sensor");
      }
    } catch (error) {
      console.error("Erro ao deletar sensor:", error);
    }
  }

  useEffect(() => {
    carregarSensores();
  }, []);

  if (loading) return <p>Carregando sensores...</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Gerenciar Sensores</h1>

        <button
          onClick={() => navigate("/sensor/novo")}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          + Adicionar Sensor
        </button>
      </div>

      {sensores.length === 0 ? (
        <p>Nenhum sensor cadastrado.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Nome</th>
              <th className="text-left p-2">Unidade</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Ações</th>
            </tr>
          </thead>

          <tbody>
            {sensores.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-100">
                <td className="p-2">{s.id}</td>
                <td className="p-2">{s.nome}</td>
                <td className="p-2">{s.unidadeMedida}</td>
                <td className="p-2">{s.status}</td>

                <td className="p-2 flex gap-3">
                  <button
                    onClick={() => navigate(`/sensor/${s.id}`)}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    Ver
                  </button>

                  <button
                    onClick={() => navigate(`/sensor/editar/${s.id}`)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deletarSensor(s.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
}
