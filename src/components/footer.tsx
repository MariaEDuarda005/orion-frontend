import Logo from "../assets/logo.png"
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../css/footer.css";

export default function Footer() {
  return (
    <footer>
        <div className="footer-infos">
            <div className="logo">
                <img src={Logo} alt="Logo Orion Fitness" />  
            </div>
            <div className="gerais">
                <p className="direitos">&copy; {new Date().getFullYear()} Orion Fitness. Todos os direitos reservados.</p>
                <div>
                    <p>Siga nossa redes sociais</p>
                    <div className="redes">
                        <FaFacebook />
                        <FaInstagram />
                        <FaLinkedin />
                    </div>
                </div>
            </div>
        </div>
    </footer>
  );
}
