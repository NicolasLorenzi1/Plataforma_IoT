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
import { MapPin, Activity, RefreshCw } from 'lucide-react';
import axios from "../api/axiosInstance";
import { Card, Badge, Alert, Loading } from '../components/ui/Index';

export default function GraficoPublico() {
  const { token } = useParams();

  const [dispositivo, setDispositivo] = useState(null);
  const [dados, setDados] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdate, setLastUpdate] = useState(null);

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
          tempo: new Date(l.tempoDaLeitura).toLocaleString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          }),
          valor: l.valor,
        });
      });

      Object.keys(agrupadoPorSensor).forEach((sensor) => {
        agrupadoPorSensor[sensor].sort(
          (a, b) => new Date(a.tempo) - new Date(b.tempo)
        );
      });

      setDados(agrupadoPorSensor);
      setLastUpdate(new Date());
    } catch (err) {
      console.error("Erro ao buscar leituras:", err);
      setError("Erro ao obter leituras (token inválido ou sem permissão)");
    }
  }

  const sensorNames = Object.keys(dados);
  const colors = ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <Card className="p-6 bg-white">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                📊 Dashboard Público
              </h1>
              <p className="text-gray-600">
                Visualização em tempo real dos dados do dispositivo
              </p>
            </div>
            <div className="text-right">
              {lastUpdate && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RefreshCw size={14} className="animate-spin" />
                  Atualizado {lastUpdate.toLocaleTimeString('pt-BR')}
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Device Info */}
        {dispositivo && (
          <Card className="p-6">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-blue-50 rounded-2xl">
                <Activity className="text-blue-600" size={32} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {dispositivo.nome}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} />
                    <span>{dispositivo.local}</span>
                  </div>
                  <Badge variant={dispositivo.status?.toLowerCase() || 'default'}>
                    {dispositivo.status || 'N/A'}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Error Alert */}
        {error && (
          <Alert variant="error">
            {error}
          </Alert>
        )}

        {/* Loading */}
        {loading && <Loading text="Carregando dados..." />}

        {/* Chart */}
        {!loading && !error && (
          <Card className="p-6">
            {sensorNames.length === 0 ? (
              <div className="text-center py-12 text-gray-600">
                <Activity size={48} className="mx-auto mb-4 text-gray-400" />
                <p className="text-lg font-medium">Nenhuma leitura disponível</p>
                <p className="text-sm mt-2">Os dados aparecerão aqui assim que forem enviados</p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Leituras dos Sensores
                </h3>
                <div style={{ width: "100%", height: 450 }}>
                  <ResponsiveContainer>
                    <LineChart>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="tempo"
                        type="category"
                        allowDuplicatedCategory={false}
                        style={{ fontSize: 12 }}
                      />
                      <YAxis style={{ fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          padding: '8px'
                        }}
                      />
                      <Legend
                        wrapperStyle={{ paddingTop: '20px' }}
                      />

                      {sensorNames.map((sensorName, i) => (
                        <Line
                          key={sensorName}
                          data={dados[sensorName]}
                          type="monotone"
                          dataKey="valor"
                          name={sensorName}
                          stroke={colors[i % colors.length]}
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Sensor Legend */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Sensores Ativos</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {sensorNames.map((name, i) => (
                      <div key={name} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: colors[i % colors.length] }}
                        />
                        <span className="text-sm text-gray-700">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Info Footer */}
        <Card className="p-6 bg-gray-50 border-gray-200">
          <div className="text-center text-sm text-gray-600">
            <p>🔄 Os dados são atualizados automaticamente a cada 10 segundos</p>
            <p className="mt-1">Plataforma IoT - Visualização Pública</p>
          </div>
        </Card>
      </div>
    </div>
  );
}