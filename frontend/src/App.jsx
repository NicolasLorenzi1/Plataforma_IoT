import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import DispositivosList from "./pages/DispositivosList";
import DispositivoNovo from "./pages/DispositivoNovo";
import DispositivoDetalhes from "./pages/DispositivoDetalhes";
import SensorDetalhes from "./pages/SensorDetalhes";
import SensorEditar from "./pages/SensorEditar";
import SensoresList from "./pages/SensoresList";
import SensorNovo from "./pages/SensorNovo";
import GraficoLeituras from "./pages/GraficoLeituras";


import MainLayout from "./components/Layout";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated() ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/login"
        element={
          !isAuthenticated() ? <Login /> : <Navigate to="/home" replace />
        }
      />

      <Route
        path="/register"
        element={
          !isAuthenticated() ? <Register /> : <Navigate to="/home" replace />
        }
      />

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

      <Route
        path="/dispositivos/:id"
        element={
          <MainLayout>
            <DispositivoDetalhes />
          </MainLayout>
        }
      />

      <Route
        path="/sensor/:id"
        element={
          <MainLayout>
            <SensorDetalhes />
          </MainLayout>
        }
      />

      <Route
        path="/sensor/editar/:id"
        element={
          <MainLayout>
            <SensorEditar />
          </MainLayout>
        }
      />

      <Route
        path="/sensores"
        element={
          <MainLayout>
            <SensoresList />
          </MainLayout>
        }
      />

      <Route
        path="/sensor/novo"
        element={
          <MainLayout>
            <SensorNovo />
          </MainLayout>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />

      <Route path="/grafico" element={<GraficoLeituras />} />

    </Routes>
  );
}
