// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DispositivosList from "./pages/DispositivosList";
import DispositivoNovo from "./pages/DispositivoNovo";

import MainLayout from "./components/Layout";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export default function App() {
  return (
    <Routes>
      {/* Redirecionamento inicial */}
      <Route
        path="/"
        element={
          isAuthenticated()
            ? <Navigate to="/home" replace />
            : <Navigate to="/login" replace />
        }
      />

      {/* Login e Registro sem layout */}
      <Route
        path="/login"
        element={!isAuthenticated() ? <Login /> : <Navigate to="/home" replace />}
      />

      <Route
        path="/register"
        element={!isAuthenticated() ? <Register /> : <Navigate to="/home" replace />}
      />

      {/* Rotas internas com Sidebar */}
      <Route
        path="/home"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/dispositivos"
        element={
          <MainLayout>
            <DispositivosList />
          </MainLayout>
        }
      />

      <Route
        path="/dispositivos/novo"
        element={
          <MainLayout>
            <DispositivoNovo />
          </MainLayout>
        }
      />

      {/* Rota coringa */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
