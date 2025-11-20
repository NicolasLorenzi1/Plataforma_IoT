import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

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
      console.log("Login bem-sucedido:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/home", { replace: true });

    } catch (err) {
      console.error(err);
      setError("Email ou senha inválidos");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-80"
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Entrar
      </button>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <p className="text-sm mt-3 text-center">
        Não tem conta?{" "}
        <Link to="/register" className="text-blue-500 underline">
          Cadastre-se
        </Link>
      </p>
    </form>
  );
}

export default Login;
