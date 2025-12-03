import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Key, Copy, CheckCircle } from 'lucide-react';
import axiosInstance from "../api/axiosInstance";
import { Button, Select, Card, PageHeader, Alert } from '../components/ui/Index';

export default function GerarToken() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [role, setRole] = useState("editor");
  const [tokenGerado, setTokenGerado] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  async function gerar() {
    setError(null);
    setTokenGerado(null);
    setLoading(true);
    setCopied(false);

    try {
      const body = {
        dispositivoId: Number(id),
        role: role
      };

      const res = await axiosInstance.post("api/token/gerar", body);
      const texto = res.data;
      const token = texto.split("Token:")[1]?.trim();

      setTokenGerado(token);
    } catch (e) {
      console.error(e);
      setError("Erro ao gerar token. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function copiarToken() {
    if (tokenGerado) {
      navigator.clipboard.writeText(tokenGerado);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
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
        title="Gerar Token de Acesso"
        subtitle="Crie tokens para permitir acesso aos dados do dispositivo"
      />

      <div className="max-w-2xl space-y-6">
        <Card className="p-8">
          <div className="space-y-6">
            <Select
              label="Tipo de Token"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              options={[
                { value: 'editor', label: 'Editor (pode enviar leituras)' },
                { value: 'leitor', label: 'Leitor (somente lê dados)' }
              ]}
            />

            <Button
              variant="primary"
              icon={Key}
              onClick={gerar}
              disabled={loading}
              className="w-full"
            >
              {loading ? 'Gerando...' : 'Gerar Token'}
            </Button>

            {error && (
              <Alert variant="error">
                {error}
              </Alert>
            )}
          </div>
        </Card>

        {tokenGerado && (
          <Card className="p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Token Gerado</h3>
                {copied && (
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle size={16} />
                    Copiado!
                  </div>
                )}
              </div>

              <div className="relative">
                <code className="block p-4 bg-gray-50 rounded-xl text-sm text-gray-900 font-mono break-all border border-gray-200">
                  {tokenGerado}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={Copy}
                  onClick={copiarToken}
                  className="absolute top-2 right-2"
                >
                  Copiar
                </Button>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6 bg-blue-50 border-blue-100">
          <h4 className="font-semibold text-gray-900 mb-3">ℹ️ Sobre os Tokens</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• <strong>Editor:</strong> Pode enviar leituras e visualizar dados</li>
            <li>• <strong>Leitor:</strong> Apenas visualiza os dados, sem permissão de escrita</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}