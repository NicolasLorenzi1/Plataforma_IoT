import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from 'lucide-react';
import axiosInstance from "../../api/axiosInstance";
import { Button, Input, Card, PageHeader } from '../../components/ui/Index';

export default function DispositivoNovo() {
  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function salvar(e) {
    e.preventDefault();
    setLoading(true);

    axiosInstance
      .post("/api/dispositivo/registrar", {
        nome,
        local,
        status,
      })
      .then(() => {
        alert("Dispositivo registrado!");
        navigate("/dispositivos");
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao registrar dispositivo.");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate("/dispositivos")}
        >
          Voltar
        </Button>
      </div>

      <PageHeader
        title="Novo Dispositivo"
        subtitle="Cadastre um novo dispositivo IoT"
      />

      <Card className="p-8 max-w-2xl">
        <form onSubmit={salvar} className="space-y-5">
          <Input
            label="Nome do Dispositivo"
            placeholder="Ex: Sensor Temperatura Sala 1"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <Input
            label="Local"
            placeholder="Ex: Sala 101, Prédio A"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            required
          />

          <Input
            label="Status"
            placeholder="Ex: ativo, inativo, manutenção"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
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
              {loading ? "Salvando..." : "Salvar Dispositivo"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/dispositivos")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}