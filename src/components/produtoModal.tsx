import { useState, useEffect, type FormEvent } from "react";
import api from "../services/api";
import type { produtosData } from "../interface/produtosData";
import "../css/admin.css";

interface Props {
  produto?: produtosData; // Se passado, é edição
  onClose: () => void;
  reload: () => void;
}

export default function ProdutoModal({ produto, onClose, reload }: Props) {
  const [form, setForm] = useState<produtosData>({
    nome: "",
    descricao: "",
    estoque: 0,
    preco: 0,
    categoria: "SUPLEMENTO",
  });

  const categorias = ["SUPLEMENTO", "LIFESTYLE_FITNESS", "ACESSORIOS_FITNESS"];

  useEffect(() => {
    if (produto) {
      setForm({
        nome: produto.nome,
        descricao: produto.descricao,
        estoque: produto.estoque,
        preco: produto.preco,
        categoria: produto.categoria
      }); 
    }
  }, [produto]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log("Payload Enviado")
    try {
      const payload = {
        ...form,
        preco: Number(form.preco),
        estoque: Number(form.estoque)
      };

      if (produto) {
        await api.put(`/produtos/atualizar/${produto.id}`, payload);
      } else {
        await api.post("/produtos/criar", payload);
      }

      reload();
      onClose();
    } catch (error: any) {
      console.error("Erro ao salvar produto:", error.response?.data || error.message);
      alert("Erro ao salvar produto. Veja o console para detalhes.");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: type === "number" ? +value : value,
    }));
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{produto?.id ? "Editar Produto" : "Novo Produto"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <textarea
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="estoque"
            placeholder="Estoque"
            value={form.estoque}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="preco"
            placeholder="Preço"
            value={form.preco}
            onChange={handleChange}
            required
          />
          <select name="categoria" value={form.categoria} onChange={handleChange}>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace("_", " ")}
              </option>
            ))}
          </select>

          <div className="modal-actions">
            <button type="submit">Salvar</button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}