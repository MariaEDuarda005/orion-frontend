import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import api from "../services/api";
import imagemPadrao from "../assets/imagem.png";
import BannerOrion from "../assets/BannerOrion.svg";
import type { produtosData } from "../interface/produtosData";

import "../css/home.css";

function Home() {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<produtosData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const response = await api.get<produtosData[]>("/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mainHome">
      <img src={BannerOrion} id="imgBanner" alt="Banner Promocional" />

      <div className="promocoes">
        <div className="info-bar">
          <div className="info-item">
            <i className="bi bi-truck" id="icon"></i>
            <p>Entrega grátis em todos os pedidos</p>
          </div>
          <div className="divider"></div>
          <div className="info-item">
            <i className="bi bi-credit-card" id="icon"></i>
            <p>Pagamento na entrega ou por transferência</p>
          </div>
          <div className="divider"></div>
          <div className="info-item">
            <i className="bi bi-star" id="icon"></i>
            <p>Satisfação garantida</p>
          </div>
          <div className="divider"></div>
          <div className="info-item">
            <i className="bi bi-chat-dots" id="icon"></i>
            <p>Dúvidas? Fale com a gente</p>
          </div>
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: "center", padding: "2rem" }}>Carregando ofertas...</p>
      ) : (
        <div className="containerProdutos">
          <div className="product-grid">
            {produtos.slice(0, 4).map((produto) => (
              <div className="product-card" key={produto.id}>
                <div className="image-container">
                  <img
                    src={produto.imagem ? produto.imagem : imagemPadrao}
                    alt={produto.nome}
                  />
                </div>

                <div className="card-content">
                  <h3 className="product-name">{produto.nome}</h3>

                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} color="#FFD700" size={14} />
                    ))}
                  </div>

                  <p className="product-price">R$ {produto.preco.toFixed(2)}</p>

                  <button
                    className="btn-buy"
                    onClick={() => navigate(`/produto/${produto.id}`)}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;