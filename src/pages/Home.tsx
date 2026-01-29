import { FeaturesGrid, AppLink, CodeBlock } from '../components';
import './Home.css';

const features = [
  {
    icon: '🔗',
    title: 'Module Federation',
    description: 'Carregamos módulos remotos em tempo real de outros repositórios.',
  },
  {
    icon: '🛡️',
    title: 'Resiliência',
    description: 'Se um módulo falhar, o Super App continua funcionando normalmente.',
  },
  {
    icon: '⚡',
    title: 'Performance',
    description: 'Carregamento sob demanda - apenas o que você precisa, quando precisa.',
  },
  {
    icon: '🔄',
    title: 'Independência',
    description: 'Cada aplicação pode ser desenvolvida e implantada de forma independente.',
  },
];

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
        <FeaturesGrid features={features} />
      </section>

      <section className="home-section">
        <h2>Aplicações Conectadas</h2>
        <p className="info-text">
          Configure seus módulos remotos no arquivo <code>vite.config.ts</code> para adicionar
          novas aplicações.
        </p>
        <div className="apps-list">
          <AppLink to="/example" icon="📦" name="Exemplo de Módulo Remoto" />
          <AppLink to="/todo" icon="✅" name="Todo List" />
          <AppLink to="/despensa" icon="📊" name="Despensa Inteligente" />
        </div>
      </section>

      <section className="home-section documentation">
        <h2>📚 Como adicionar um novo módulo remoto</h2>
        
        <ol>
          <li>
            <strong>Configure o módulo remoto no <code>vite.config.ts</code>:</strong>
            <CodeBlock code={`federation({
  name: 'superApp',
  remotes: {
    meuApp: 'http://localhost:3003/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
})`} />
          </li>
          <li>
            <strong>Declare os tipos em <code>src/remotes.d.ts</code>:</strong>
            <CodeBlock code={`declare module 'meuApp/Component' {
  import { ComponentType } from 'react';
  const Component: ComponentType<Record<string, unknown>>;
  export default Component;
}`} />
          </li>
          <li>
            <strong>Crie uma página em <code>src/pages/</code>:</strong>
            <CodeBlock code={`import { RemoteWrapper } from '../components';
import { createRemoteComponent } from '../utils/createRemoteComponent';

const MeuComponent = createRemoteComponent(
  () => import('meuApp/Component')
);

const MeuAppPage = () => (
  <div className="remote-page">
    <h1>Meu App</h1>
    <RemoteWrapper remoteComponent={MeuComponent} />
  </div>
);

export default MeuAppPage;`} />
          </li>
          <li>
            <strong>Adicione a rota em <code>App.tsx</code> e o link no <code>MainTemplate.tsx</code></strong>
          </li>
        </ol>
      </section>
    </div>
  );
};

export default Home;
