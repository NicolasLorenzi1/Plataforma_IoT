import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, MapPin, Zap } from 'lucide-react';
import axiosInstance from "../../api/axiosInstance";
import { Button, Card, Badge, PageHeader, EmptyState, Loading } from '../../components/ui/Index';

export default function DispositivosList() {
  const [dispositivos, setDispositivos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/api/dispositivo/listar/todos")
      .then((res) => {
        setDispositivos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar dispositivos:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading text="Carregando dispositivos..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dispositivos"
        subtitle="Gerencie todos os seus dispositivos IoT"
        action={
          <Button
            variant="primary"
            icon={Plus}
            onClick={() => navigate("/dispositivos/novo")}
          >
            Adicionar Dispositivo
          </Button>
        }
      />

      {dispositivos.length === 0 ? (
        <Card className="p-12">
          <EmptyState
            icon={Zap}
            title="Nenhum dispositivo cadastrado"
            description="Comece adicionando seu primeiro dispositivo IoT"
            action={
              <Button
                variant="primary"
                icon={Plus}
                onClick={() => navigate("/dispositivos/novo")}
              >
                Adicionar Primeiro Dispositivo
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dispositivos.map((d) => (
            <Card
              key={d.id}
              hover
              className="p-6 cursor-pointer group"
              onClick={() => navigate(`/dispositivos/${d.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                  <Zap className="text-blue-600" size={24} />
                </div>
                <Badge variant={d.status?.toLowerCase() || 'default'}>
                  {d.status || 'N/A'}
                </Badge>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {d.nome}
              </h3>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{d.local}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Eye}
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dispositivos/${d.id}`);
                  }}
                >
                  Ver Detalhes
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}