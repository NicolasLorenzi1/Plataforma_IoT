import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Activity, Calendar, Edit } from 'lucide-react';
import axiosInstance from "../../api/axiosInstance";
import { Button, Card, Badge, PageHeader, Modal, Select, Alert, Loading } from '../../components/ui/Index';

export default function SensorDetalhes() {
  const { id } = useParams();
  const [sensor, setSensor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`/api/sensor/listar/${id}`)
      .then((res) => {
        setSensor(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar sensor:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loading text="Carregando sensor..." />;
  }

  if (!sensor) {
    return (
      <div className="p-6 text-center text-gray-600">
        Sensor não encontrado
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </div>

      <PageHeader
        title={sensor.nome}
        subtitle="Detalhes do sensor"
      />

      <Card className="p-8">
        <div className="space-y-6">
          {/* Header com ícone */}
          <div className="flex items-start gap-4 pb-6 border-b border-gray-100">
            <div className="p-4 bg-green-50 rounded-2xl">
              <Activity className="text-green-600" size={32} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {sensor.nome}
              </h2>
              <Badge variant={sensor.status?.toLowerCase() || 'default'}>
                {sensor.status || 'N/A'}
              </Badge>
            </div>
          </div>

          {/* Informações em grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Unidade de Medida</p>
              <p className="text-lg text-gray-900">{sensor.unidadeMedida}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Intervalo de Operação</p>
              <p className="text-lg text-gray-900">{sensor.intervaloDeOperacao}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Precisão</p>
              <p className="text-lg text-gray-900">{sensor.precisao}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Criado em</p>
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-gray-400" />
                <p className="text-lg text-gray-900">
                  {new Date(sensor.criacao).toLocaleString("pt-BR")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Ações */}
      <div className="flex gap-3">
        <Button
          variant="primary"
          icon={Edit}
          onClick={() => navigate(`/sensor/editar/${id}`)}
        >
          Editar Sensor
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate("/sensores")}
        >
          Ver Todos os Sensores
        </Button>
      </div>
    </div>
  );
}