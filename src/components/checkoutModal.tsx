import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/checkoutModal.css";
import type { CartData } from "../interface/card";
import api from "../services/api";

interface Props {
  onClose: () => void;
  cart: CartData[];
  discount: number;
  coupon: string;
  onClearCart: () => void;
}

export default function CheckoutModal({ onClose, cart, discount, coupon, onClearCart }: Props) {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.precoUnitario * item.quantidade, 0) - discount;

  async function handleSubmit() {
    if (!nome.trim() || !telefone.trim() || !cpf.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      setLoading(true);

      await api.post("/pedidos/finalizar", {
        cupomId: coupon.toLowerCase() === "desconto10" ? 1 : null,
        nome: nome, 
        telefone: telefone, 
        cpf: cpf,
        itens: cart.map(item => ({
          produtoId: item.produtoId,
          quantidade: item.quantidade,
        })),
      });

      let mensagem = `Olá ${nome}, seu pedido foi realizado:\n\n`;
      cart.forEach(item => {
        mensagem += `${item.quantidade}x ${item.produto?.nome} - R$ ${(item.precoUnitario * item.quantidade).toFixed(2)}\n`;
      });
      mensagem += `\nTotal: R$ ${total.toFixed(2)}`;

      const whatsappUrl = `https://wa.me/${telefone.replace(/\D/g, "")}?text=${encodeURIComponent(mensagem)}`;
      window.open(whatsappUrl, "_blank");

      onClearCart();
      onClose();
      alert("Pedido finalizado com sucesso!");
      navigate("/"); 
    } catch (error) {
      console.error(error);
      alert("Erro ao finalizar pedido.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Finalizar Pedido</h2>

        <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        <input type="text" placeholder="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />
        <input type="text" placeholder="CPF" value={cpf} onChange={e => setCpf(e.target.value)} />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Finalizando..." : `Enviar pedido (R$ ${total.toFixed(2)})`}
        </button>
      </div>
    </div>
  );
}