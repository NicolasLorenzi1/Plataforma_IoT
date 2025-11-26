import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

export default function DispositivoEditar() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nome: "",
        local: "",
        status: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarDispositivo() {
            try {
                const response = await api.get(`/api/dispositivo/listar/${id}`);
                const data = response.data;

                setForm({
                    nome: data.nome || "",
                    local: data.local || "",
                    status: data.status || ""
                });

                setLoading(false);
            } catch (e) {
                console.error("Erro ao carregar dispositivo", e);
                alert("Erro ao carregar dispositivo");
                setLoading(false);
            }
        }

        carregarDispositivo();
    }, [id]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            await api.put(`/api/dispositivo/atualizar/${id}`, form);
            alert("Dispositivo atualizado com sucesso!");
            navigate(`/dispositivos/${id}`);
        } catch (error) {
            console.error(error);
            alert("Erro ao atualizar dispositivo");
        }
    }

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <div className="container">
            <h2>Editar Dispositivo</h2>

            <form onSubmit={handleSubmit} className="formulario">
                <label>Nome</label>
                <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    required
                />

                <label>Local</label>
                <input
                    type="text"
                    name="local"
                    value={form.local}
                    onChange={handleChange}
                    required
                />

                <label>Status</label>
                <input
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    required
                />
  

                <button type="submit" className="botao-primario">Salvar</button>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="botao-secundario"
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
}
