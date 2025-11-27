import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { Button, Input, Alert, Card } from '../../components/ui/Index';

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error("Falha no login");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/home");

    } catch (err) {
      console.error(err);
      setError("Email ou senha inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">IoT</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-gray-600">
            Faça login para acessar sua plataforma IoT
          </p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
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
              variant="primary"
              className="w-full"
              disabled={loading}
              icon={LogIn}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Cadastre-se
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

export default Login;