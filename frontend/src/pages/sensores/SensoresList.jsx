import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, Edit, Trash2, Activity } from 'lucide-react';
import { Button, Card, Badge, PageHeader, EmptyState, Loading } from '../../components/ui/Index';

export default function SensoresList() {
  const [sensores, setSensores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function carregarSensores() {
    try {
      const response = await fetch("http://localhost:8080/api/sensor/listar/todos", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await response.json();
      setSensores(data);
    } catch (error) {
      console.error("Erro ao carregar sensores:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deletarSensor(id) {
    if (!window.confirm("Tem certeza que deseja remover este sensor?")) return;

    try {
      const response = await fetch(`http://localhost:8080/api/sensor/deletar/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (response.ok) {
        setSensores(sensores.filter(s => s.id !== id));
        alert("Sensor removido com sucesso!");
      } else {
        alert("Erro ao deletar sensor");
      }
    } catch (error) {
      console.error("Erro ao deletar sensor:", error);
    }
  }

  useEffect(() => {
    carregarSensores();
  }, []);

  if (loading) {
    return <Loading text="Carregando sensores..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sensores"
        subtitle="Gerencie todos os seus sensores"
        action={
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => navigate("/sensor/novo")}
          >
            Adicionar Sensor
          </Button>
        }
      />

      {sensores.length === 0 ? (
        <Card className="p-12">
          <EmptyState
            icon={Activity}
            title="Nenhum sensor cadastrado"
            description="Comece adicionando seu primeiro sensor"
            action={
              <Button
                variant="primary"
                icon={Plus}
                onClick={() => navigate("/sensor/novo")}
              >
                Adicionar Primeiro Sensor
              </Button>
            }
          />
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nome
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Unidade
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {sensores.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      #{s.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {s.nome}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {s.unidadeMedida}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <Badge variant={s.status?.toLowerCase() || 'default'}>
                        {s.status || 'N/A'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Eye}
                          onClick={() => navigate(`/sensor/${s.id}`)}
                        >
                          Ver
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Edit}
                          onClick={() => navigate(`/sensor/editar/${s.id}`)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Trash2}
                          onClick={() => deletarSensor(s.id)}
                        >
                          Remover
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}