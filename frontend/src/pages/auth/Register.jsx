import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus } from 'lucide-react';
import { Button, Input, Alert, Card } from '../../components/ui/Index';

function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/user/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar");
      }

      setSuccess("Usuário cadastrado com sucesso! Redirecionando...");
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

    } catch (err) {
      console.error(err);
      setError("Falha ao cadastrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">IoT</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Criar nova conta
          </h1>
          <p className="text-gray-600">
            Junte-se à nossa plataforma IoT
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {success && (
              <Alert variant="success">
                {success}
              </Alert>
            )}

            {error && (
              <Alert variant="error">
                {error}
              </Alert>
            )}

            <Input
              type="email"
              label="Email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              label="Senha"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="success"
              className="w-full"
              disabled={loading}
              icon={UserPlus}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Fazer login
              </Link>
            </p>
          </div>
        </Card>

        <p className="text-center text-xs text-gray-500 mt-8">
          Plataforma IoT v1.0 - Todos os direitos reservados
        </p>
      </div>
    </div>
  );
}

export default Register;