import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

export default function DispositivoDetalhes() {
  const { id } = useParams();
  const [dispositivo, setDispositivo] = useState(null);
  const [sensores, setSensores] = useState([]);
  const [sensoresDisponiveis, setSensoresDisponiveis] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [sensorSelecionado, setSensorSelecionado] = useState("");

  useEffect(() => {
    axiosInstance
      .get(`/api/dispositivo/listar/${id}`)
      .then((res) => setDispositivo(res.data))
      .catch((err) => console.error("Erro ao carregar dispositivo:", err));

    atualizarListaSensores();
  }, [id]);

  function atualizarListaSensores() {
    axiosInstance
      .get(`/api/dispositivo/${id}/sensor/listarTodos`)
      .then((res) => setSensores(res.data))
      .catch((err) => console.error("Erro ao carregar sensores:", err));

    axiosInstance
      .get("/api/sensor/listar/todos")
      .then((res) => setSensoresDisponiveis(res.data))
      .catch((err) =>
        console.error("Erro ao carregar sensores disponíveis:", err)
      );
  }

  function removerVinculo(sensorId) {
    if (!confirm("Deseja realmente remover este vínculo?")) return;

    axiosInstance
      .delete(`/api/dispositivo/${id}/sensor/remover/${sensorId}`)
      .then(() => {
        alert("Vínculo removido!");
        atualizarListaSensores();
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao remover vínculo.");
      });
  }

  function associarSensor(e) {
    e.preventDefault();

    axiosInstance
      .post(`/api/dispositivo/${id}/sensor/associar`, {
        sensorId: sensorSelecionado,
      })
      .then(() => {
        alert("Sensor vinculado com sucesso!");
        setModalAberto(false);
        setSensorSelecionado("");
        atualizarListaSensores();
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao vincular sensor.");
      });
  }

  if (!dispositivo) return <div className="p-6 text-lg">Carregando...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Detalhes do Dispositivo</h1>

      <div className="bg-white p-5 rounded-xl shadow-md mb-8 border">
        <p>
          <strong>Nome:</strong> {dispositivo.nome}
        </p>
        <p>
          <strong>Local:</strong> {dispositivo.local}
        </p>
        <p>
          <strong>Status:</strong> {dispositivo.status}
        </p>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Sensores Vinculados</h2>

        <button
          onClick={() => setModalAberto(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Adicionar Sensor
        </button>
      </div>

      {sensores.length === 0 ? (
        <p className="text-gray-600">Nenhum sensor vinculado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {sensores.map((s) => (
            <div
              key={s.id}
              className="bg-white p-4 rounded-xl shadow border hover:shadow-lg transition"
            >
              <Link to={`/sensor/${s.id}`}>
                <h3 className="text-lg font-bold text-blue-700 hover:underline">
                  {s.nome}
                </h3>
              </Link>

              <p>
                <strong>Unidade:</strong> {s.unidadeMedida}
              </p>
              <p>
                <strong>Status:</strong> {s.status}
              </p>

              <button
                onClick={() => removerVinculo(s.id)}
                className="mt-3 w-full px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Remover Vínculo
              </button>
            </div>
          ))}
        </div>
      )}

      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white w-96 p-6 rounded-xl shadow-xl">
            <h3 className="text-xl font-semibold mb-4">
              Vincular Sensor ao Dispositivo
            </h3>

            <form onSubmit={associarSensor}>
              <label className="font-medium">Selecione um sensor:</label>

              <select
                value={sensorSelecionado}
                onChange={(e) => setSensorSelecionado(e.target.value)}
                required
                className="w-full border p-2 rounded mt-2"
              >
                <option value="">Selecione...</option>
                {sensoresDisponiveis.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nome} ({s.unidadeMedida})
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="px-3 py-2 bg-gray-300 rounded-lg"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Vincular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
