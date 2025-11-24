import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import axios from "../api/axiosInstance";

export default function GraficoPublico() {
  const { token } = useParams(); 

  const [dispositivo, setDispositivo] = useState(null);
  const [dados, setDados] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const timerRef = useRef(null);

  useEffect(() => {
    if (token) fetchDeviceAndData();

    return () => clearInterval(timerRef.current);
  }, [token]);

  async function fetchDeviceAndData() {
    setLoading(true);
    setError("");

    try {
      const respDevice = await axios.get(`/api/dispositivo/por-token/${token}`);
      setDispositivo(respDevice.data);

      await fetchLeituras(respDevice.data.id);

      timerRef.current = setInterval(() => {
        fetchLeituras(respDevice.data.id);
      }, 10000);
    } catch (err) {
      console.error(err);
      setError("Token inválido ou dispositivo não encontrado.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchLeituras(dispositivoId) {
    try {
      const resp = await axios.get(`/api/leitura/dispositivo/${dispositivoId}`, {
        headers: { "X-DEVICE-TOKEN": token },
      });

      const leituras = resp.data;
      const agrupadoPorSensor = {};

      leituras.forEach((l) => {
        if (!agrupadoPorSensor[l.sensorNome]) {
          agrupadoPorSensor[l.sensorNome] = [];
        }
        agrupadoPorSensor[l.sensorNome].push({
          tempo: new Date(l.tempoDaLeitura).toLocaleString(),
          valor: l.valor,
        });
      });

    
      Object.keys(agrupadoPorSensor).forEach((sensor) => {
        agrupadoPorSensor[sensor].sort(
          (a, b) => new Date(a.tempo) - new Date(b.tempo)
        );
      });

      setDados(agrupadoPorSensor);
    } catch (err) {
      console.error("Erro ao buscar leituras:", err);
      setError("Erro ao obter leituras (token inválido ou sem permissão)");
    }
  }

  const sensorNames = Object.keys(dados);

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-6">
      <div className="w-full max-w-6xl">
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h1 className="text-2xl font-bold">Dashboard do Dispositivo</h1>
          <p className="text-sm text-gray-600">
            Visualização pública através do token do dispositivo.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          {error && <p className="text-red-500 mb-3">{error}</p>}
          {loading && <p>Carregando...</p>}

          {dispositivo && (
            <div className="mb-4">
              <h2 className="text-xl font-semibold">{dispositivo.nome}</h2>
              <p className="text-sm text-gray-600">
                Local: {dispositivo.local}
              </p>
            </div>
          )}

          {sensorNames.length === 0 ? (
            <p className="text-gray-600">Nenhuma leitura disponível.</p>
          ) : (
            <div style={{ width: "100%", height: 450 }}>
              <ResponsiveContainer>
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="tempo"
                    type="category"
                    allowDuplicatedCategory={false}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  {sensorNames.map((sensorName, i) => (
                    <Line
                      key={sensorName}
                      data={dados[sensorName]}
                      type="monotone"
                      dataKey="valor"
                      name={sensorName}
                      stroke={`hsl(${(i * 70) % 360}, 70%, 40%)`}
                      dot={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
