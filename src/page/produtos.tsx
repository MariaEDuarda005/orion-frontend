import { useEffect, useState } from "react";
import { FaSearch } from 'react-icons/fa';
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
    return <p>Carregando produtos...</p>;
  }

  const produtosFiltrados = data.filter((produto) =>
    produto.nome.toLowerCase().includes(valorDaBusca.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Produtos</h1>

      <div className="search-bar">
        <div className="search">
          <input
            type="text"
            placeholder="Pesquisar produto..."
            value={valorDaBusca}
            onChange={(event) => setValorDaBusca(event.target.value)}
          />
          <FaSearch />
        </div>

        <div className="categoria-filter">
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

      <div className="card-grid">
        {produtosFiltrados.length > 0 ? (
          produtosFiltrados.map((produto, index) => (
            <div className="item-produtos" key={index}>
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
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </div>
    </div>
  );
}

export default Produtos;
