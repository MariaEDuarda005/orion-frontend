import { useState, type ChangeEvent, type FormEvent, useEffect } from "react";
import api from "../services/api";
import type { Cupom } from "../interface/cupom";

interface CupomModalProps {
  onClose: () => void;
  reload: () => void;
  cupom?: Cupom; // se existir, é edição
}

export default function CupomModal({ onClose, reload, cupom }: CupomModalProps) {
  const [form, setForm] = useState<Cupom>({
    codigo: "",
    percentualDesconto: 0,
    ativo: true,
    validadeInicio: "",
    validadeFinal: ""
  });

  // Se houver cupom (edição), preencher o form
  useEffect(() => {
    if (cupom) {
      setForm({
        codigo: cupom.codigo,
        percentualDesconto: cupom.percentualDesconto,
        ativo: cupom.ativo,
        validadeInicio: cupom.validadeInicio,
        validadeFinal: cupom.validadeFinal
      });
    }
  }, [cupom]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const payload = { ...form, percentualDesconto: Number(form.percentualDesconto) };

      if (cupom) {
        // Edição
        await api.put(`/cupons/atualizar/${cupom.idCupom}`, payload);
      } else {
        // Criação
        await api.post("/cupons/criar", payload);
      }

      reload();
      onClose();
    } catch (error) {
      console.error("Erro ao salvar cupom:", error);
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{cupom ? "Editar Cupom" : "Novo Cupom"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Código"
            name="codigo"
            value={form.codigo}
            onChange={handleChange}
          />

          <input
            type="number"
            placeholder="Percentual de desconto"
            name="percentualDesconto"
            value={form.percentualDesconto}
            onChange={handleChange}
          />

          <label>Validade Inicial</label>
          <input
            type="datetime-local"
            name="validadeInicio"
            value={form.validadeInicio}
            onChange={handleChange}
          />

          <label>Validade Final</label>
          <input
            type="datetime-local"
            name="validadeFinal"
            value={form.validadeFinal}
            onChange={handleChange}
          />

          <label>
            <input
              type="checkbox"
              name="ativo"
              checked={form.ativo}
              onChange={handleChange}
            />
            Ativo
          </label>

          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">{cupom ? "Salvar" : "Criar"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}