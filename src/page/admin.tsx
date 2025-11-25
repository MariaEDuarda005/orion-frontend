import { useEffect, useState } from "react";
import api from "../services/api";
import type { produtosData } from "../interface/produtosData";
import type { Cupom } from "../interface/cupom";
import "../css/admin.css";
import CupomModal from "../components/cupomModal";
import ProdutoModal from "../components/produtoModal";
import type { PedidoAdmin } from "../interface/pedido";

export default function Admin() {
  const [abaAtiva, setAbaAtiva] = useState<"produtos" | "cupons" | "pedidos">("produtos");

  const [produtos, setProdutos] = useState<produtosData[]>([]);
  const [cupons, setCupons] = useState<Cupom[]>([]);
  const [pedidos, setPedidos] = useState<PedidoAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  const [editProduto, setEditProduto] = useState<produtosData | null>(null);
  const [editCupom, setEditCupom] = useState<Cupom | null>(null);

  const [showCreateProduto, setShowCreateProduto] = useState(false);
  const [showCreateCupom, setShowCreateCupom] = useState(false);

  async function loadProdutos() {
    try {
      const response = await api.get<produtosData[]>("/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadPedidos() {
    try {
      setLoading(true);
      const response = await api.get<PedidoAdmin[]>("/pedidos"); // endpoint do backend
      setPedidos(response.data);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    } finally {
      setLoading(false);
    }
  }

  async function loadCupons() {
    try {
      const response = await api.get<Cupom[]>("/cupons");
      setCupons(response.data);
    } catch (error) {
      console.error("Erro ao carregar cupons:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteProduto(id: number | undefined) {
    if (!id) return;
    if (confirm("Tem certeza que deseja excluir o produto?")) {
      try {
        await api.delete(`/produtos/${id}`);
        loadProdutos();
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
      }
    }
  }

  async function handleDeleteCupom(id: number | undefined) {
    if (!id) return;
    if (confirm("Tem certeza que deseja excluir o cupom?")) {
      try {
        await api.delete(`/cupons/${id}`);
        loadCupons();
      } catch (error) {
        console.error("Erro ao excluir cupom:", error);
      }
    }
  }

  useEffect(() => {
    loadProdutos();
    loadCupons();
    loadPedidos();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="admin-container">
      <h1>Painel Administrativo</h1>

      {/* MENU DAS ABAS */}
      <div className="admin-menu">
        <button
          className={abaAtiva === "produtos" ? "ativo" : ""}
          onClick={() => setAbaAtiva("produtos")}
        >
          Produtos
        </button>
        <button
          className={abaAtiva === "cupons" ? "ativo" : ""}
          onClick={() => setAbaAtiva("cupons")}
        >
          Cupons
        </button>
        <button
          className={abaAtiva === "pedidos" ? "ativo" : ""}
          onClick={() => setAbaAtiva("pedidos")}
        >
          Pedidos
        </button>
      </div>

      {/* ABA PRODUTOS */}
      {abaAtiva === "produtos" && (
        <>
          <div className="buttons">
            <button className="btn-create" onClick={() => setShowCreateProduto(true)}>
              + Novo Produto
            </button>
          </div>

          <table className="produtos-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Estoque</th>
                <th>Preço (R$)</th>
                <th>Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((p) => (
                <tr key={p.id}>
                  <td>{p.nome}</td>
                  <td>{p.descricao}</td>
                  <td>{p.estoque}</td>
                  <td>{p.preco.toFixed(2)}</td>
                  <td>{p.categoria}</td>
                  <td>
                    <button className="btn-edit" onClick={() => setEditProduto(p)}>
                      Editar
                    </button>
                    <button className="btn-delete" onClick={() => handleDeleteProduto(p.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {/* ABA CUPONS */}
      {abaAtiva === "cupons" && (
        <>
          <div className="buttons">
            <button className="btn-create" onClick={() => setShowCreateCupom(true)}>
              + Novo Cupom
            </button>
          </div>

          <table className="produtos-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>% Desconto</th>
                <th>Ativo</th>
                <th>Início</th>
                <th>Final</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cupons.map((c) => (
                <tr key={c.idCupom}>
                  <td>{c.codigo}</td>
                  <td>{c.percentualDesconto}</td>
                  <td>{c.ativo ? "Sim" : "Não"}</td>
                  <td>{new Date(c.validadeInicio).toLocaleString()}</td>
                  <td>{new Date(c.validadeFinal).toLocaleString()}</td>
                  <td>
                    <button className="btn-edit" onClick={() => setEditCupom(c)}>
                      Editar
                    </button>
                    <button className="btn-delete" onClick={() => handleDeleteCupom(c.idCupom)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {/* ABA PEDIDOS */}
      {abaAtiva === "pedidos" && (
        <div>
          {pedidos.length === 0 ? (
            <p>Nenhum pedido encontrado.</p>
          ) : (
            <table className="produtos-table">
              <thead>
                <tr>
                  <th>Cliente ID</th>
                  <th>Cupom</th>
                  <th>Itens</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((p) => (
                  <tr key={p.idPedido}>
                    <td>{p.clienteId}</td>
                    <td>{p.cupomId ?? "Nenhum"}</td>
                    <td>
                      <ul>
                        {p.itens.map((item) => (
                          <li key={item.produtoId}>
                            {item.produto.nome} — R$ {item.produto.preco.toFixed(2)} | Qtd: {item.quantidade}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>{p.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          </div>
        )}

      {/* MODAL PRODUTO */}
      {(showCreateProduto || editProduto) && (
        <ProdutoModal
          produto={editProduto ?? undefined}
          onClose={() => {
            setShowCreateProduto(false);
            setEditProduto(null);
          }}
          reload={loadCupons}
        />
      )}

      {/* MODAL CUPOM */}
      {(showCreateCupom || editCupom) && (
        <CupomModal
          cupom={editCupom ?? undefined}
          onClose={() => {
            setShowCreateCupom(false);
            setEditCupom(null);
          }}
          reload={loadCupons}
        />
      )}
    </div>
  );
}