import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from 'lucide-react';
import axiosInstance from "../../api/axiosInstance";
import { Button, Card, Badge, PageHeader, Modal, Select, Alert, Loading } from '../../components/ui/Index';

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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate("/sensores")}
        >
          Voltar
        </Button>
      </div>

      <PageHeader
        title="Novo Sensor"
        subtitle="Cadastre um novo sensor no sistema"
      />

      <Card className="p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Nome do Sensor"
            name="nome"
            placeholder="Ex: Sensor de Temperatura"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <Input
            label="Unidade de Medida"
            name="unidadeMedida"
            placeholder="Ex: °C, %, ppm"
            value={form.unidadeMedida}
            onChange={handleChange}
            required
          />

          <Input
            label="Intervalo de Operação"
            name="intervaloDeOperacao"
            placeholder="Ex: -40°C a 85°C"
            value={form.intervaloDeOperacao}
            onChange={handleChange}
            required
          />

          <Input
            label="Precisão"
            name="precisao"
            placeholder="Ex: ±0.5°C"
            value={form.precisao}
            onChange={handleChange}
            required
          />

          <Input
            label="Status"
            name="status"
            placeholder="Ex: ATIVO, INATIVO"
            value={form.status}
            onChange={handleChange}
            required
          />

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              icon={Save}
              disabled={loading}
              className="flex-1"
            >
              {loading ? "Salvando..." : "Salvar Sensor"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/sensores")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}