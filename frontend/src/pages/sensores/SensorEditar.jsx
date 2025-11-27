import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from 'lucide-react';
import axiosInstance from "../../api/axiosInstance";
import { Button, Input, Card, PageHeader, Loading } from '../../components/ui/Index';

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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function carregar() {
    try {
      const response = await axiosInstance.get(`/api/sensor/listar/${id}`);
      setSensor(response.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      alert("Erro ao carregar sensor");
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [id]);

  async function salvar(e) {
    e.preventDefault();
    setSaving(true);

    try {
      await axiosInstance.put(`/api/sensor/atualizar/${id}`, sensor);
      alert("Sensor atualizado!");
      navigate(`/sensor/${id}`);
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar sensor");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <Loading text="Carregando sensor..." />;
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
        title="Editar Sensor"
        subtitle="Atualize as informações do sensor"
      />

      <Card className="p-8 max-w-2xl">
        <form onSubmit={salvar} className="space-y-5">
          <Input
            label="Nome do Sensor"
            value={sensor.nome}
            onChange={(e) => setSensor({ ...sensor, nome: e.target.value })}
            required
          />

          <Input
            label="Unidade de Medida"
            value={sensor.unidadeMedida}
            onChange={(e) => setSensor({ ...sensor, unidadeMedida: e.target.value })}
            required
          />

          <Input
            label="Precisão"
            value={sensor.precisao}
            onChange={(e) => setSensor({ ...sensor, precisao: e.target.value })}
            required
          />

          <Input
            label="Intervalo de Operação"
            value={sensor.intervaloDeOperacao}
            onChange={(e) => setSensor({ ...sensor, intervaloDeOperacao: e.target.value })}
            required
          />

          <Input
            label="Status"
            value={sensor.status}
            onChange={(e) => setSensor({ ...sensor, status: e.target.value })}
            required
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              icon={Save}
              disabled={saving}
              className="flex-1"
            >
              {saving ? "Salvando..." : "Salvar Alterações"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}