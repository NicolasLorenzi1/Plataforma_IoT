import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccess("");
  setError("");

  try {
    const response = await fetch("http://localhost:8080/api/user/cadastrar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      throw new Error("Erro ao cadastrar");
    }

    console.log("Cadastro bem-sucedido");
    setSuccess("Usuário cadastrado com sucesso");
  } catch (err) {
    console.error(err);
    setError("Falha ao cadastrar");
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-80"
    >
      <h2 className="text-xl font-bold mb-4">Cadastro</h2>
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
        className="w-full bg-green-500 text-white p-2 rounded"
      >
        Cadastrar
      </button>

      {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <p className="text-sm mt-3 text-center">
        Já tem conta?{" "}
        <Link to="/login" className="text-green-500 underline">
          Fazer login
        </Link>
      </p>
    </form>
  );
}

export default Register;
