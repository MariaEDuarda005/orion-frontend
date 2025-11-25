import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import api from "../services/api";
import imagemPadrao from "../assets/imagem.png";
import type { produtosData } from "../interface/produtosData";
import type { carrinhoItem } from "../interface/carrinho";

import "../css/produtoIndividual.css";

function ProdutoIndividual() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState<produtosData | null>(null);
  const [relacionados, setRelacionados] = useState<produtosData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    buscarProduto();
  }, [id]);

  async function buscarProduto() {
    try {
      setLoading(true);
      const response = await api.get(`/produtos/${id}`);
      const produtoAtual = response.data;

      setProduto(produtoAtual);

      if (produtoAtual.categoria) {
        const categoriaFormatada = encodeURIComponent(produtoAtual.categoria);
        const related = await api.get(`/produtos/categoria?categoria=${categoriaFormatada}`);
        const filtrados = related.data.filter((p: produtosData) => p.id !== Number(id));
        setRelacionados(filtrados);
      }
    } catch (error) {
      console.error("Erro ao carregar produto ou relacionados", error);
    } finally {
      setLoading(false);
    }
  }

  const adicionarCarrinho = () => {
    if (!produto || produto.id === undefined) return;

    const carrinho: carrinhoItem[] =
      JSON.parse(localStorage.getItem("carrinho") || "[]");

    const itemIndex = carrinho.findIndex((i) => i.produtoId === produto.id);

    if (itemIndex >= 0) {
      carrinho[itemIndex].quantidade += 1;
    } else {
      carrinho.push({ produtoId: produto.id, quantidade: 1 });
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho!");
  };

  const irParaProduto = (idProduto: number) => {
    navigate(`/produto/${idProduto}`);
  };

  if (loading)
    return (
      <div className="loading-container">
        <p>Carregando...</p>
      </div>
    );

  if (!produto)
    return (
      <div className="error-container">
        <p>Produto não encontrado.</p>
      </div>
    );

  return (
    <div className="produto-container">
      <div className="produto-main">
        <img
          src={produto.imagem || imagemPadrao}
          alt={produto.nome}
          className="produto-img"
        />
        <div className="produto-info">
          <h2>{produto.nome}</h2>
          <p className="produto-preco">R$ {produto.preco.toFixed(2)}</p>

          <div className="produto-stars">
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-half"></i>
          </div>

          <p className="produto-desc">{produto.descricao}</p>

          <p className="addCarrinhoTexto">
            *Adicione ao carrinho para inserir quantidade do item
          </p>

          <button className="btn-add" onClick={adicionarCarrinho}>
            <i className="bi bi-cart-plus"></i> Adicionar ao carrinho
          </button>

          {produto.itens && produto.itens.length > 0 && (
            <div className="itens-relacionados-produto">
              <h4>Itens deste produto (Carrinho):</h4>
              {produto.itens.map((i) => (
                <p key={i.id}>Quantidade no carrinho: {i.quantidade}</p>
              ))}
            </div>
          )}
        </div>
      </div>

      <h3 className="titulo-relacionados">Produtos Relacionados</h3>

      {relacionados.length === 0 ? (
        <p>Nenhum produto relacionado encontrado nesta categoria.</p>
      ) : (
        <div className="product-grid">
          {relacionados.map((item) => (
            <div className="product-card" key={item.id}>
              <div className="image-container">
                <img 
                  src={item.imagem || imagemPadrao} 
                  alt={item.nome} 
                />
              </div>

              <div className="card-content">
                <h3 className="product-name">{item.nome}</h3>

                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color="#FFD700" size={14} />
                  ))}
                </div>

                <p className="product-price">R$ {item.preco.toFixed(2)}</p>

                <button 
                  className="btn-buy" 
                  onClick={() => irParaProduto(item.id!)}
                >
                  Ver Detalhes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProdutoIndividual;