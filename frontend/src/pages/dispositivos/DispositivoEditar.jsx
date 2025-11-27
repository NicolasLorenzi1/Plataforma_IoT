import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from 'lucide-react';
import api from "../../api/axiosInstance";
import { Button, Input, Card, PageHeader, Loading } from '../../components/ui/Index';

export default function DispositivoEditar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    local: "",
    status: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function carregarDispositivo() {
      try {
        const response = await api.get(`/api/dispositivo/listar/${id}`);
        const data = response.data;

        setForm({
          nome: data.nome || "",
          local: data.local || "",
          status: data.status || ""
        });

        setLoading(false);
      } catch (e) {
        console.error("Erro ao carregar dispositivo", e);
        alert("Erro ao carregar dispositivo");
        setLoading(false);
      }
    }

    carregarDispositivo();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      await api.put(`/api/dispositivo/atualizar/${id}`, form);
      alert("Dispositivo atualizado com sucesso!");
      navigate(`/dispositivos/${id}`);
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar dispositivo");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <Loading text="Carregando dispositivo..." />;
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
        title="Editar Dispositivo"
        subtitle="Atualize as informações do dispositivo"
      />

      <Card className="p-8 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Nome do Dispositivo"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />

          <Input
            label="Local"
            name="local"
            value={form.local}
            onChange={handleChange}
            required
          />

          <Input
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
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