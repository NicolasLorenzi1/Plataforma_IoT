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
import GerarToken from "./pages/GerarToken";
import PrivateRoute from "./components/PrivateRoute";

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
          <PrivateRoute>
            <MainLayout>
              <Home />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/dispositivos"
        element={
          <PrivateRoute>
            <MainLayout>
              <DispositivosList />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/dispositivos/novo"
        element={
          <PrivateRoute>
            <MainLayout>
              <DispositivoNovo />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/dispositivos/:id"
        element={
          <PrivateRoute>
            <MainLayout>
              <DispositivoDetalhes />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/sensor/:id"
        element={
          <PrivateRoute>
            <MainLayout>
              <SensorDetalhes />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/sensor/editar/:id"
        element={
          <PrivateRoute>
            <MainLayout>
              <SensorEditar />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/sensores"
        element={
          <PrivateRoute>
            <MainLayout>
              <SensoresList />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/sensor/novo"
        element={
          <PrivateRoute>
            <MainLayout>
              <SensorNovo />
            </MainLayout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />

      <Route path="/grafico/:token" element={<GraficoLeituras />} />

      <Route
        path="/dispositivo/:id/gerar-token"
        element={
          <PrivateRoute>
            <MainLayout>
              <GerarToken />
            </MainLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
