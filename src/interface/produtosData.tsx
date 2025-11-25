import type { CartData } from "./card";

export interface produtosData {
  id?: number;
  nome: string;
  descricao: string;
  preco: number;
  estoque: number;
  categoria: string;
  precoUnitario?: number;
  imagem?: string;

  // itens pode ser opcional, dependendo do uso
  itens?: {
    id: number;
    quantidade: number;
  }[];
}
export interface finalizarPedidoData {
  cupomId: number;
  nome: string;
  cpf: string;
  telefone: string;
  items: CartData[]
}
