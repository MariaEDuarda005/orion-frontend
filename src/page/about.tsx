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
            <div className="team-img yasmin-img"></div>
            <h3>Yasmin Novais Vieira</h3>
            <p>Matrícula: 202508386461</p>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/yasmin-novais-vieira" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://github.com/Yasminnovaisvieira" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>

          <div className="team-card">
            <div className="team-img sara-img"></div>
            <h3>Sara Giglio Trombaioli</h3>
            <p>Matrícula: 202502515642</p>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/sara-giglio-trombaioli-b5011a293" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="https://github.com/saratgiglio" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-github"></i>
              </a>
            </div>
          </div>

        </div>
      </main>
    </>
  );
}