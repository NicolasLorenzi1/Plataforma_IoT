import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Trash2, Edit, BarChart3, Key, MapPin, Activity } from 'lucide-react';
import axiosInstance from "../../api/axiosInstance";
import { Button, Card, Badge, PageHeader, Modal, Select, Alert, Loading } from '../../components/ui/Index';

export default function DispositivoDetalhes() {
  const { id } = useParams();
  const [dispositivo, setDispositivo] = useState(null);
  const [sensores, setSensores] = useState([]);
  const [sensoresDisponiveis, setSensoresDisponiveis] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [sensorSelecionado, setSensorSelecionado] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    carregarDados();
  }, [id]);

  async function carregarDados() {
    try {
      const [dispRes, sensoresRes, disponiveisRes] = await Promise.all([
        axiosInstance.get(`/api/dispositivo/listar/${id}`),
        axiosInstance.get(`/api/dispositivo/${id}/sensor/listarTodos`),
        axiosInstance.get("/api/sensor/listar/todos")
      ]);

      setDispositivo(dispRes.data);
      setSensores(sensoresRes.data);
      setSensoresDisponiveis(disponiveisRes.data);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  }

  function removerVinculo(sensorId) {
    if (!window.confirm("Deseja realmente remover este vínculo?")) return;

    axiosInstance
      .delete(`/api/dispositivo/${id}/sensor/remover/${sensorId}`)
      .then(() => {
        alert("Vínculo removido!");
        carregarDados();
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao remover vínculo.");
      });
  }

  function associarSensor(e) {
    e.preventDefault();

    axiosInstance
      .post(`/api/dispositivo/${id}/sensor/associar`, {
        sensorId: sensorSelecionado,
      })
      .then(() => {
        alert("Sensor vinculado com sucesso!");
        setModalAberto(false);
        setSensorSelecionado("");
        carregarDados();
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao vincular sensor.");
      });
  }

  async function handleExcluir() {
    if (!window.confirm("Tem certeza que deseja excluir este dispositivo?")) {
      return;
    }

    try {
      await axiosInstance.delete(`/api/dispositivo/deletar/${id}`);
      alert("Dispositivo excluído com sucesso!");
      navigate("/dispositivos");
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir dispositivo.");
    }
  }

  const tokenDono =
    dispositivo &&
    Array.isArray(dispositivo.tokens) &&
    dispositivo.tokens.find((t) => t.role === "DONO" || t.role === "dono")
      ?.token;

  if (loading) {
    return <Loading text="Carregando dispositivo..." />;
  }

  if (!dispositivo) {
    return (
      <Alert variant="error">
        Dispositivo não encontrado
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          icon={ArrowLeft}
          onClick={() => navigate("/dispositivos")}
        >
          Voltar
        </Button>
      </div>

      <PageHeader
        title={dispositivo.nome}
        subtitle="Detalhes e configurações do dispositivo"
      />

      {/* Info Card */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Nome</p>
            <p className="text-lg font-semibold text-gray-900">{dispositivo.nome}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Local</p>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-gray-400" />
              <p className="text-lg font-semibold text-gray-900">{dispositivo.local}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Status</p>
            <Badge variant={dispositivo.status?.toLowerCase() || 'default'}>
              {dispositivo.status || 'N/A'}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="primary"
          icon={Edit}
          onClick={() => navigate(`/dispositivo/editar/${id}`)}
        >
          Editar
        </Button>
        <Button
          variant="secondary"
          icon={Key}
          onClick={() => navigate(`/dispositivo/${id}/gerar-token`)}
        >
          Gerar Token
        </Button>
        {tokenDono && (
          <Button
            variant="secondary"
            icon={BarChart3}
            onClick={() => navigate(`/grafico/${tokenDono}`)}
          >
            Ver Gráfico
          </Button>
        )}
        <Button
          variant="danger"
          icon={Trash2}
          onClick={handleExcluir}
        >
          Excluir
        </Button>
      </div>

      {/* Sensores Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Sensores Vinculados</h2>
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setModalAberto(true)}
          >
            Adicionar Sensor
          </Button>
        </div>

        {sensores.length === 0 ? (
          <Card className="p-8">
            <div className="text-center text-gray-600">
              <Activity size={48} className="mx-auto mb-4 text-gray-400" />
              <p>Nenhum sensor vinculado</p>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sensores.map((s) => (
              <Card key={s.id} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Activity className="text-green-600" size={20} />
                  </div>
                  <Badge variant={s.status?.toLowerCase() || 'default'}>
                    {s.status || 'N/A'}
                  </Badge>
                </div>

                <h3
                  className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600"
                  onClick={() => navigate(`/sensor/${s.id}`)}
                >
                  {s.nome}
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  Unidade: <span className="font-medium">{s.unidadeMedida}</span>
                </p>

                <Button
                  variant="danger"
                  size="sm"
                  icon={Trash2}
                  className="w-full"
                  onClick={() => removerVinculo(s.id)}
                >
                  Remover Vínculo
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal Adicionar Sensor */}
      <Modal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        title="Vincular Sensor"
        size="md"
      >
        <form onSubmit={associarSensor} className="space-y-4">
          <Select
            label="Selecione um sensor"
            value={sensorSelecionado}
            onChange={(e) => setSensorSelecionado(e.target.value)}
            options={sensoresDisponiveis.map(s => ({
              value: s.id,
              label: `${s.nome} (${s.unidadeMedida})`
            }))}
            required
          />

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => setModalAberto(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Vincular
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}