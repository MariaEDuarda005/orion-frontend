import Logo from "../assets/logo.svg";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../css/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
        <div className="footer-container">
            <div className="brand-column">
                <img src={Logo} alt="Logo Orion Fitness" className="footer-logo" />
                <p className="footer-description">
                    Transforme seu corpo e sua mente. A melhor estrutura para o seu treino está aqui na Orion Fitness.
                </p>
                <div className="social-links">
                    <a href="#" aria-label="Facebook"><FaFacebook /></a>
                    <a href="#" aria-label="Instagram"><FaInstagram /></a>
                    <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                </div>
            </div>
        </div>

        <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Orion Fitness. Todos os direitos reservados.</p>
        </div>
    </footer>
  );
}