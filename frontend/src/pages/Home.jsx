import { useEffect, useState } from 'react';
import { Zap, Activity, BarChart3, TrendingUp } from 'lucide-react';
import { StatCard, Card, PageHeader, Loading } from '../components/ui/Index';
import axiosInstance from '../api/axiosInstance';

export default function Home() {
  const [stats, setStats] = useState({
    dispositivos: 0,
    sensores: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const [dispRes, sensRes] = await Promise.all([
        axiosInstance.get('/api/dispositivo/listar'),
        axiosInstance.get('/api/sensor/listar')
      ]);

      setStats({
        dispositivos: dispRes.data.length,
        sensores: sensRes.data.length,
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loading text="Carregando dashboard..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle="Visão geral da sua plataforma IoT"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Dispositivos Ativos"
          value={stats.dispositivos.toString()}
          icon={Zap}
          color="blue"
        />
        <StatCard
          title="Sensores Online"
          value={stats.sensores.toString()}
          icon={Activity}
          color="green"
        />
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Início Rápido
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• Configure seus dispositivos IoT na aba Dispositivos</p>
            <p>• Cadastre sensores para monitoramento</p>
            <p>• Vincule sensores aos dispositivos</p>
            <p>• Gere tokens para acesso aos dados</p>
            <p>• Visualize gráficos em tempo real</p>
          </div>
        </Card>

      </div>

      {/* Welcome Message */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-100">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Bem-vindo à Plataforma IoT!
        </h3>
        <p className="text-gray-700">
          Gerencie seus dispositivos, sensores e monitore dados em tempo real com nossa solução completa de IoT.
        </p>
      </Card>
    </div>
  );
}