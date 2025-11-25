import { useEffect, useState } from "react";
import { FaSearch, FaStar } from 'react-icons/fa';
import type { produtosData } from "../interface/produtosData";
import api from "../services/api";
import imagemPadrao from "../assets/imagem.png";
import { useNavigate } from "react-router-dom";
import "../css/produto.css";

function Produtos() {
  const [data, setData] = useState<produtosData[]>([]);
  const [loading, setLoading] = useState(true);
  const [valorDaBusca, setValorDaBusca] = useState("");
  const [categoria, setCategoria] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      setLoading(true);
      const response = await api.get<produtosData[]>("/produtos");
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function filtrarPorCategoria(cat: string) {
    try {
      setCategoria(cat);
      if (cat === "") {
        buscarProdutos();
      } else {
        const response = await api.get<produtosData[]>(`/produtos/categoria?categoria=${cat}`);
        setData(response.data);
      }
    } catch (error) {
      console.error("Erro ao filtrar por categoria:", error);
    }
  }

  if (loading) {
    return <div className="loading-container"><p>Carregando produtos...</p></div>;
  }

  const produtosFiltrados = data.filter((produto) =>
    produto.nome.toLowerCase().includes(valorDaBusca.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="page-title">Nossos Produtos</h1>

      <div className="controls-bar">
        <div className="search-wrapper">
          <input
            type="text"
            placeholder="O que você procura?"
            value={valorDaBusca}
            onChange={(event) => setValorDaBusca(event.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>

        <div className="filter-wrapper">
          <select
            value={categoria}
            onChange={(e) => filtrarPorCategoria(e.target.value)}
          >
            <option value="">Todas as categorias</option>
            <option value="SUPLEMENTO">Suplementos</option>
            <option value="LIFESTYLE_FITNESS">Lifestyle Fitness</option>
            <option value="ACESSORIOS_FITNESS">Acessórios Fitness</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto) => (
            <div className="product-card" key={produto.id || Math.random()}>
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
          ))
        ) : (
          <p className="no-results">Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Produtos;