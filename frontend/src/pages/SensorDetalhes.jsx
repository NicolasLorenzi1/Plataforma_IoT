import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function SensorDetalhes() {
  const { id } = useParams();
  const [sensor, setSensor] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/api/sensor/listar/${id}`)
      .then((res) => setSensor(res.data))
      .catch((err) => console.error("Erro ao carregar sensor:", err));
  }, [id]);

  if (!sensor)
    return (
        <div className="p-6 text-lg">Carregando...</div>
    );

  return (
      <div className="p-6 max-w-3xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Detalhes do Sensor</h1>

          <Link
            to={-1}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
          >
            Voltar
          </Link>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border space-y-3">

          <p>
            <strong className="font-semibold">Nome:</strong> {sensor.nome}
          </p>

          <p>
            <strong className="font-semibold">Unidade de Medida:</strong>{" "}
            {sensor.unidadeMedida}
          </p>

          <p>
            <strong className="font-semibold">Intervalo de Operação:</strong>{" "}
            {sensor.intervaloDeOperacao}
          </p>

          <p>
            <strong className="font-semibold">Precisão:</strong> {sensor.precisao}
          </p>

          <p>
            <strong className="font-semibold">Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-white ${
                sensor.status === "ativo"
                  ? "bg-green-600"
                  : sensor.status === "manutencao"
                  ? "bg-yellow-600"
                  : "bg-red-600"
              }`}
            >
              {sensor.status}
            </span>
          </p>

          <p>
            <strong className="font-semibold">Criado em:</strong>{" "}
            {new Date(sensor.criacao).toLocaleString("pt-BR")}
          </p>
        </div>
      </div>
  );
}
