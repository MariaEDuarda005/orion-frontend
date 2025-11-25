import { Routes, Route } from "react-router-dom";
import Home from "../page/home";
import About from "../page/about";
import Produtos from "../page/produtos";
import Admin from "../page/admin";
import Cart from "../page/cart"; 
import ProdutoIndividual from "../page/produtoIndividual";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/produtos" element={<Produtos />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/carrinho" element={<Cart />} /> 
      <Route path="/produto/:id" element={<ProdutoIndividual />} />

    </Routes>
  );
}

