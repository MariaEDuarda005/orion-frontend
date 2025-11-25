import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Logo from "../assets/logo.png"
import "../css/header.css";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <div className="infos">
        <img src={Logo} alt="Logo Orion" />
        <h1 className="logo">Orion Fitness</h1>
      </div>

      <nav className="nav">
        <Link to="/" className={pathname === "/" ? "active" : ""}>Home</Link>
        <Link to="/sobre" className={pathname === "/sobre" ? "active" : ""}>Sobre</Link>
        <Link to="/produtos" className={pathname === "/produtos" ? "active" : ""}>Produtos</Link>
        <Link to="/admin" className={pathname === "/admin" ? "active" : ""}>Admin</Link>

        <Link to="/carrinho" className="cart-icon">
          <FaShoppingCart size={20} />
        </Link>
      </nav>
    </header>
  );
}
