import "../css/about.css";

export default function Equipe() {
  return (
    <>
      <main className="about-container">
        <h1>Desenvolvedoras do Projeto</h1>

        <div className="team-wrapper">

          <div className="team-card">
            <div className="team-img carol-img"></div>
            <h3>Carolina Pinheiro</h3>
            <p>Matrícula: 202503740623</p>
            <div className="social-icons">
              <a href="https://br.linkedin.com/in/carolina-pinheiro-dos-santos-874022321?utm_source=share&utm_medium=member_mweb&utm_campaign=share_via&utm_content=profile" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://github.com/CarolinaPinheiroSantos" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>

          <div className="team-card">
            <div className="team-img maria-img"></div>
            <h3>Maria Eduarda Ferreira</h3>
            <p>Matrícula: 202502219679</p>
            <div className="social-icons">
              <a href="https://br.linkedin.com/in/maria-eduarda-ferreira-57b021227?utm_source=share&utm_medium=member_mweb&utm_campaign=share_via&utm_content=profile" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://github.com/MariaEDuarda005" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>

          <div className="team-card">
            <div className="team-img lipe-img"></div>
            <h3>Luis Felipe Anobile</h3>
            <p>Matrícula: 202302529984</p>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/luis-felipe-anobile-3a85941bb/" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://github.com/LipeAnobile" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}