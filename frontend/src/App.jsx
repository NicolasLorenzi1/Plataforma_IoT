import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Main
import Home from "./pages/Home";

// Dispositivos
import DispositivosList from "./pages/dispositivos/DispositivosList";
import DispositivoDetalhes from "./pages/dispositivos/DispositivoDetalhes";
import DispositivoNovo from "./pages/dispositivos/DispositivoNovo";
import DispositivoEditar from "./pages/dispositivos/DispositivoEditar";

// Sensores
import SensoresList from "./pages/sensores/SensoresList";
import SensorDetalhes from "./pages/sensores/SensorDetalhes";
import SensorNovo from "./pages/sensores/SensorNovo";
import SensorEditar from "./pages/sensores/SensorEditar";

// Outros
import GerarToken from "./pages/GerarToken";
import GraficoLeituras from "./pages/GraficoLeituras";

function App() {
  return (
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/grafico/:token" element={<GraficoLeituras />} />

        {/* Private Routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<Home />} />

                  {/* Dispositivos */}
                  <Route path="/dispositivos" element={<DispositivosList />} />
                  <Route path="/dispositivos/novo" element={<DispositivoNovo />} />
                  <Route path="/dispositivos/:id" element={<DispositivoDetalhes />} />
                  <Route path="/dispositivo/editar/:id" element={<DispositivoEditar />} />
                  <Route path="/dispositivo/:id/gerar-token" element={<GerarToken />} />

                  {/* Sensores */}
                  <Route path="/sensores" element={<SensoresList />} />
                  <Route path="/sensor/novo" element={<SensorNovo />} />
                  <Route path="/sensor/:id" element={<SensorDetalhes />} />
                  <Route path="/sensor/editar/:id" element={<SensorEditar />} />
                </Routes>
              </MainLayout>
            </PrivateRoute>
          }
        />
      </Routes>
  );
}

export default App;