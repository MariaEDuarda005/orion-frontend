import type { produtosData } from "../interface/produtosData";

interface ProdutoProps {
  data: produtosData;
  imagem: string;
}

export default function Produto({ data, imagem }: ProdutoProps) {
  return (
    <div className="item-produtos">
      <img src={imagem} alt={data.nome} />

      <p className="text1-produto">{data.nome}</p>

      <div className="estrelas">
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
        <i className="bi bi-star-fill"></i>
      </div>

      <p className="text2-produto">R$ {data.preco.toFixed(2)}</p>
      <p className="text3-produto">Preço à vista com desconto</p>

      <button className="comprar-produto">Comprar</button>
    </div>
  );
}
