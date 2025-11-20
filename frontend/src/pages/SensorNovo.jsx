import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function SensorNovo() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    unidadeMedida: "",
    intervaloDeOperacao: "",
    precisao: "",
    status: "ATIVO",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post("/api/sensor/registrar", form);

      alert("Sensor registrado com sucesso!");
      navigate("/sensores");
    } catch (err) {
      console.error("Erro ao registrar sensor:", err);
      alert("Erro ao registrar sensor");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Cadastrar Novo Sensor</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow border"
      >
        <div className="mb-4">
          <label className="font-medium">Nome do Sensor:</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="font-medium">Unidade de Medida:</label>
          <input
            type="text"
            name="unidadeMedida"
            value={form.unidadeMedida}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="font-medium">Intervalo de Operação:</label>
          <input
            type="text"
            name="intervaloDeOperacao"
            value={form.intervaloDeOperacao}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="font-medium">Precisão:</label>
          <input
            type="text"
            name="precisao"
            value={form.precisao}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="mb-4">
          <label className="font-medium">Status:</label>
          <input
            type="text"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={() => navigate("/sensores")}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {loading ? "Salvando..." : "Salvar Sensor"}
          </button>
        </div>
      </form>
    </div>
  );
}
