import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
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

export default function GraficoLeituras() {
  const [searchParams] = useSearchParams();
  const tokenFromQuery = searchParams.get("token") || "";

  const [token, setToken] = useState(tokenFromQuery);
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

      await fetchLeituras(respDevice.data.id, token);

      timerRef.current = setInterval(() => {
        fetchLeituras(respDevice.data.id, token);
      }, 10000);
    } catch (err) {
      console.error(err);
      setError("Token inválido ou erro ao carregar dispositivo.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchLeituras(dispositivoId, tokenToSend) {
    try {
      const resp = await axios.get(`/api/leitura/dispositivo/${dispositivoId}`, {
        headers: { "X-DEVICE-TOKEN": tokenToSend },
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
          <h1 className="text-2xl font-bold">Dashboard público do dispositivo</h1>
          <p className="text-sm text-gray-600">
            Acesse com seu token de dispositivo para visualizar gráficos.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">
                {dispositivo ? dispositivo.nome : "Sem dispositivo"}
              </h2>
              {dispositivo && (
                <p className="text-sm text-gray-600">Local: {dispositivo.local}</p>
              )}
            </div>

            <div>
              {!tokenFromQuery && (
                <input
                  placeholder="Cole o token do dispositivo aqui"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  className="border p-2 rounded mr-3"
                />
              )}
              <button
                onClick={() => fetchDeviceAndData()}
                className="px-3 py-2 bg-blue-600 text-white rounded"
              >
                Carregar
              </button>
            </div>
          </div>

          {error && <p className="text-red-500 mb-3">{error}</p>}
          {loading && <p>Carregando...</p>}

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
