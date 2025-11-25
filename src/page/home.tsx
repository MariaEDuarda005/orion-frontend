import { useEffect, useState } from "react";
import api from "../services/api";
import imagemPadrao from "../assets/imagem.png";
import type { produtosData } from "../interface/produtosData";
import "../css/home.css";
import BannerOrion from '../assets/BannerOrion.svg'
import { useNavigate } from "react-router-dom";



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
      <img src={BannerOrion} id="imgBanner" />

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
        <p style={{ textAlign: "center" }}>Carregando...</p>
      ) : (
        <div className="containerProdutos">
          {produtos.slice(0, 4).map((produto) => (
            <div className="item-produtos" key={produto.id}>
              <img
                src={produto.imagem ? produto.imagem : imagemPadrao}
                alt={produto.nome}
              />

              <p className="text1-produto">{produto.nome}</p>

              <div className="estrelas">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
              </div>

              <p className="text2-produto">R$ {produto.preco.toFixed(2)}</p>


              <button 
                className="comprar-produto" 
                onClick={() => navigate(`/produto/${produto.id}`)}
              >
                Ver mais
              </button>

            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Home;
