import type { produtosData } from "./produtosData";

export interface CartData {
  idCarrinho?: number;      // opcional, gerado pelo backend
  produtoId: number;        // referência ao produto
  produto: produtosData;
  pedidoId?: number;        // opcional, se o carrinho ainda não estiver associado a um pedido
  quantidade: number;       // quantidade do produto
  precoUnitario: number;    // preço do produto no momento
}
