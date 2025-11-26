export interface PedidoItemAdmin {
  idItem?: number;
  produtoId: number;
  pedidoId: number;
  quantidade: number;
  produto: {
    id: number;
    nome: string;
    descricao: string;
    estoque: number;
    preco: number;
    categoria: string;
  };
}

export interface ProdutoPedido {
  id: number;
  nome: string;
  descricao: string;
  estoque: number;
  preco: number;
  categoria: string;
}

export interface PedidoItemAdmin {
  produtoId: number;
  pedidoId: number;
  produto: ProdutoPedido;
  quantidade: number;
}

export interface PedidoAdmin {
  idPedido: number;
  clienteId: {
    idCliente: number;
    nomeCliente: string;
    telefoneCliente: string;
    cpf: string;
  };
  cupomId: number | null;
  total: number;
  itens: PedidoItemAdmin[];
}
