import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import type { CartData } from "../interface/card";
import CheckoutModal from "../components/checkoutModal";
import api from "../services/api";
import "../css/cart.css";

export default function Cart() {
  const [cart, setCart] = useState<CartData[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [cupom, setCupom] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCart() {
      try {
        // 1. Carregar carrinho do localStorage
        const local = JSON.parse(localStorage.getItem("carrinho") || "[]");

        // Se não tiver nada no carrinho, não precisa ir no backend
        if (local.length === 0) {
          setCart([]);
          return;
        }

        // 2. Buscar dados completos de cada produto
        const produtosPromises = local.map(async (item: any) => {
          const produtoResponse = await api.get(`/produtos/${item.produtoId}`);
          return { 
            ...item, 
            precoUnitario: produtoResponse.data.preco,
            produto: produtoResponse.data 
          };
        });

        const cartWithProducts = await Promise.all(produtosPromises);
        setCart(cartWithProducts);

      } catch (error) {
        console.error("Erro ao carregar carrinho:", error);
      }
    }

    fetchCart();
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + item.precoUnitario * item.quantidade, 0);
  const total = subtotal - discount;

  const updateQuantity = (produtoId: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.produtoId === produtoId
          ? { ...item, quantidade: Math.max(item.quantidade + delta, 1) }
          : item
      )
    );
  };

  const removeItem = (produtoId: number) => {
    setCart((prev) => prev.filter((item) => item.produtoId !== produtoId));
  };

  const applyCupom = async () => {
    if (!cupom) {
      alert("Digite um cupom.");
      return;
    }

    if (discount > 0) {
      alert("Você já aplicou um cupom neste pedido.");
      return;
    }

    try {
      const response = await api.get(`/cupons/codigo/${cupom}`);
      const cupomData = response.data;

      const descontoPercentual = cupomData.percentualDesconto;

      // Calcula o desconto (%) em cima do subtotal
      const descontoCalculado = subtotal * (descontoPercentual / 100);

      setDiscount(descontoCalculado);
      localStorage.setItem("cupom", cupomData.codigo);
      localStorage.setItem("desconto", descontoCalculado.toString());

      alert(`Cupom aplicado! Desconto de ${descontoPercentual}%`);
    } catch (error) {
      console.error("Erro ao validar cupom:", error);
      alert("Cupom inválido, expirado ou inativo.");
    }
  };

  useEffect(() => {
    const simpleCart = cart.map(item => ({
      produtoId: item.produtoId,
      quantidade: item.quantidade
    }));

    localStorage.setItem("carrinho", JSON.stringify(simpleCart));
  }, [cart]);

  return (
    <div className="cart-container">
      <div style={{ flex: 1 }}>
        <h1 className="cart-title">Carrinho de compra</h1>

        <div className="cart-items">
          {cart.length === 0 && <p>Seu carrinho está vazio.</p>}

          {cart.map((item) => (
            <div className="cart-item" key={item.produtoId}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flex: 1 }}>
                {item.produto?.imagem ? (
                  <img src={item.produto.imagem} alt={item.produto.nome} />
                ) : (
                  <div
                    style={{
                      width: 75,
                      height: 75,
                      borderRadius: 8,
                      background: "#f3f3f3",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#999",
                    }}
                  >
                    IMG
                  </div>
                )}

                <div className="cart-item-info">
                  <h4>{item.produto?.nome}</h4>
                  <p>R$ {item.precoUnitario.toFixed(2)}</p>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <button className="cart-qty-btn" onClick={() => updateQuantity(item.produtoId, -1)}>
                  -
                </button>
                <span>{item.quantidade}</span>
                <button className="cart-qty-btn" onClick={() => updateQuantity(item.produtoId, 1)}>
                  +
                </button>
              </div>

              <div className="cart-item-price">
                <strong>R$ {(item.precoUnitario * item.quantidade).toFixed(2)}</strong>
              </div>

              <button
                className="cart-delete-btn"
                onClick={() => removeItem(item.produtoId)}
                aria-label="Remover item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <aside className="cart-summary">
        <h3>Resumo do pedido</h3>

        <div className="coupon-container">
          <input
            type="text"
            placeholder="Cupom de desconto"
            className="coupon-input"
            value={cupom}
            onChange={(e) => setCupom(e.target.value)}
          />
          <button className="coupon-btn" onClick={applyCupom}>
            Aplicar
          </button>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>SubTotal</p>
            <p>R$ {subtotal.toFixed(2)}</p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", color: "#666" }}>
            <p>Desconto</p>
            <p>- R$ {discount.toFixed(2)}</p>
          </div>

          <div className="cart-total">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Total</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button className="checkout-btn" onClick={() => setShowModal(true)}>
          Finalizar compra
        </button>
      </aside>

      {showModal && (
        <CheckoutModal
          onClose={() => setShowModal(false)}
          cart={cart}
          discount={discount}
          coupon={cupom}
          onClearCart={() => setCart([])}
        />
      )}
    </div>
  );
}