import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function SensorEditar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sensor, setSensor] = useState({
    nome: "",
    unidadeMedida: "",
    precisao: "",
    intervaloDeOperacao: "",
    status: ""
  });

  async function carregar() {
    try {
      const response = await axiosInstance.get(`/api/sensor/listar/${id}`);
      setSensor(response.data);
    } catch (e) {
      console.error(e);
      alert("Erro ao carregar sensor");
    }
  }

  useEffect(() => {
    carregar();
  }, [id]);

  async function salvar(e) {
    e.preventDefault();

    try {
      await axiosInstance.put(`/api/sensor/atualizar/${id}`, sensor);
      alert("Sensor atualizado!");
      navigate(`/sensor/${id}`);
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar sensor");
    }
  }

  return (
    <div className="p-6">
      <button
        onClick={() => navigate(-1)}
        className="px-4 py-2 mb-4 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Voltar
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Editar Sensor
      </h1>

      <form onSubmit={salvar} className="bg-white shadow p-6 rounded-lg w-full max-w-xl">
        <label className="block mb-2">Nome</label>
        <input
          className="w-full p-2 mb-4 border rounded"
          value={sensor.nome}
          onChange={(e) => setSensor({ ...sensor, nome: e.target.value })}
        />

        <label className="block mb-2">Unidade</label>
        <input
          className="w-full p-2 mb-4 border rounded"
          value={sensor.unidadeMedida}
          onChange={(e) => setSensor({ ...sensor, unidadeMedida: e.target.value })}
        />

        <label className="block mb-2">Precisão</label>
        <input
          className="w-full p-2 mb-4 border rounded"
          value={sensor.precisao}
          onChange={(e) => setSensor({ ...sensor, precisao: e.target.value })}
        />

        <label className="block mb-2">Intervalo</label>
        <input
          className="w-full p-2 mb-4 border rounded"
          value={sensor.intervaloDeOperacao}
          onChange={(e) => setSensor({ ...sensor, intervaloDeOperacao: e.target.value })}
        />

        <label className="block mb-2">Status</label>
        <input
          className="w-full p-2 mb-4 border rounded"
          value={sensor.status}
          onChange={(e) => setSensor({ ...sensor, status: e.target.value })}
        />

        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Salvar
        </button>
      </form>
    </div>
  );
}
