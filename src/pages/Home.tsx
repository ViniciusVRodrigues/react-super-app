import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🚀 Super App</h1>
        <p className="subtitle">Conectando suas aplicações em um único lugar</p>
      </header>

      <section className="home-section">
        <h2>O que é o Super App?</h2>
        <p>
          O Super App é uma aplicação host que utiliza <strong>Module Federation</strong> para
          integrar diversas micro-frontends de outros repositórios em uma única experiência
          unificada.
        </p>
      </section>

      <section className="home-section">
        <h2>Como funciona?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🔗</span>
            <h3>Module Federation</h3>
            <p>Carregamos módulos remotos em tempo real de outros repositórios.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🛡️</span>
            <h3>Resiliência</h3>
            <p>Se um módulo falhar, o Super App continua funcionando normalmente.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Performance</h3>
            <p>Carregamento sob demanda - apenas o que você precisa, quando precisa.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔄</span>
            <h3>Independência</h3>
            <p>Cada aplicação pode ser desenvolvida e implantada de forma independente.</p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <h2>Aplicações Conectadas</h2>
        <p className="info-text">
          Configure seus módulos remotos no arquivo <code>vite.config.ts</code> para adicionar
          novas aplicações.
        </p>
        <div className="apps-list">
          <Link to="/example" className="app-link">
            <span className="app-icon">📦</span>
            <span className="app-name">Exemplo de Módulo Remoto</span>
          </Link>
        </div>
      </section>

      <section className="home-section documentation">
        <h2>📚 Documentação</h2>
        <p>Para adicionar uma nova aplicação remota:</p>
        <ol>
          <li>Configure o módulo remoto no <code>vite.config.ts</code></li>
          <li>Crie uma rota no <code>App.tsx</code></li>
          <li>Use o <code>RemoteWrapper</code> para carregar o módulo com segurança</li>
        </ol>
      </section>
    </div>
  );
};

export default Home;
