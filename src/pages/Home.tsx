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
        <p className="highlight-text">
          ✨ <strong>Novidade:</strong> Agora com <strong>carregamento dinâmico de rotas</strong>! 
          Os aplicativos remotos exportam suas próprias rotas e botões de navegação, 
          que são automaticamente adicionados ao Super App. Não é mais necessário configurar 
          manualmente as rotas em App.tsx ou itens de navegação em MainTemplate.tsx!
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
          <AppLink to="/todo" icon="✅" name="Todo List (Remote App)" />
        </div>
      </section>

      <section className="home-section documentation">
        <h2>📚 Como adicionar um novo módulo remoto</h2>
        <p>Com o novo sistema de carregamento dinâmico, adicionar módulos é muito mais simples!</p>
        
        <h3>🎯 Modo Recomendado: Carregamento Dinâmico</h3>
        <ol>
          <li>
            <strong>Configure o módulo remoto no <code>vite.config.ts</code>:</strong>
            <CodeBlock code={`federation({
  name: 'superApp',
  remotes: {
    novaApp: 'http://localhost:3002/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
})`} />
          </li>
          <li>
            <strong>Declare os tipos de rotas em <code>src/remotes.d.ts</code>:</strong>
            <CodeBlock code={`declare module 'novaApp/routes' {
  import { RouteConfig } from './types/routes';
  const routes: RouteConfig[];
  export default routes;
}`} />
          </li>
          <li>
            <strong>Adicione em <code>src/config/remoteApps.ts</code>:</strong>
            <CodeBlock code={`export const remoteApps: RemoteAppEntry[] = [
  {
    name: 'novaApp',
    routeLoader: () => import('novaApp/routes'),
    enabled: true,
  },
  // ... outros apps
];`} />
          </li>
        </ol>
        <p className="info-text">
          ✨ <strong>Pronto!</strong> As rotas e botões de navegação serão automaticamente adicionados.
        </p>

        <h3>📝 No Aplicativo Remoto</h3>
        <p>O aplicativo remoto deve exportar suas rotas:</p>
        <CodeBlock code={`// src/routes.ts no app remoto
import App from './App';

const routes = [
  {
    path: '/nova-app',
    label: 'Nova App',
    icon: '🚀',
    component: App,
    showInNav: true,
  },
];

export default routes;

// vite.config.ts
exposes: {
  './App': './src/App.tsx',
  './routes': './src/routes.ts', // Exponha as rotas!
}`} />
      </section>

      <section className="home-section">
        <h2>🏗️ Arquitetura Atomic Design</h2>
        <p>
          Este projeto segue o padrão <strong>Atomic Design</strong> para organização de componentes,
          facilitando a manutenção, reutilização e escalabilidade.
        </p>
        <div className="atomic-structure">
          <CodeBlock code={`src/components/
├── atoms/          # Componentes básicos (Loading, Icon, ErrorMessage)
├── molecules/      # Combinações de atoms (NavLink, FeatureCard, AppLink)
├── organisms/      # Componentes complexos (Navbar, Footer, RemoteWrapper)
├── templates/      # Layouts de página (MainTemplate)
└── index.ts        # Exports centralizados`} />
        </div>
      </section>
    </div>
  );
};

export default Home;
