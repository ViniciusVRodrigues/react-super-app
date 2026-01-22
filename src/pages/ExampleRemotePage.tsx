import { RemoteWrapper, CodeBlock, ErrorMessage } from '../components';
import { createRemoteComponent } from '../utils/createRemoteComponent';
import './ExampleRemotePage.css';

// Create the lazy-loaded component outside of render
// In a real scenario, this would import from a remote module:
// const RemoteApp = createRemoteComponent(() => import('remoteApp/Component'));
const FailingRemoteComponent = createRemoteComponent(
  () => Promise.reject(new Error('Módulo remoto não configurado'))
);

// This is an example of how to load a remote module.
// Configure the remote in vite.config.ts first.
const ExampleRemotePage = () => {
  return (
    <div className="remote-page">
      <h1>📦 Módulo Remoto de Exemplo</h1>
      <p>
        Esta página demonstra como carregar um módulo remoto usando Module Federation.
      </p>
      
      <div className="remote-info">
        <h2>Passo 1: Configurar o módulo remoto</h2>
        <p>
          Adicione a URL do módulo remoto no arquivo <code>vite.config.ts</code>:
        </p>
        <CodeBlock code={`// vite.config.ts
federation({
  name: 'superApp',
  remotes: {
    remoteApp: 'http://localhost:3001/assets/remoteEntry.js',
  },
  shared: ['react', 'react-dom', 'react-router-dom'],
})`} />
      </div>

      <div className="remote-info">
        <h2>Passo 2: Declarar os tipos</h2>
        <p>
          Adicione a declaração de tipos em <code>src/remotes.d.ts</code>:
        </p>
        <CodeBlock code={`declare module 'remoteApp/Component' {
  import { ComponentType } from 'react';
  const Component: ComponentType<Record<string, unknown>>;
  export default Component;
}`} />
      </div>

      <div className="remote-info">
        <h2>Passo 3: Criar o componente remoto</h2>
        <p>
          Use o <code>createRemoteComponent</code> e <code>RemoteWrapper</code>:
        </p>
        <CodeBlock code={`// No topo do arquivo (fora do componente)
import { RemoteWrapper } from '../components';
import { createRemoteComponent } from '../utils/createRemoteComponent';

const RemoteApp = createRemoteComponent(
  () => import('remoteApp/Component')
);

// No JSX
<RemoteWrapper 
  remoteComponent={RemoteApp}
  errorFallback={<div>Erro ao carregar</div>}
/>`} />
      </div>

      <div className="demo-section">
        <h2>Demonstração de Error Boundary</h2>
        <p>
          O componente abaixo tenta carregar um módulo que não existe. 
          O Error Boundary captura o erro e mostra uma mensagem amigável.
        </p>
        <RemoteWrapper 
          remoteComponent={FailingRemoteComponent}
          errorFallback={
            <ErrorMessage 
              title="⚠️ Módulo não disponível"
              message="Este é um exemplo de como o Super App lida com erros de módulos remotos."
              details="O aplicativo continua funcionando normalmente!"
            />
          }
        />
      </div>
    </div>
  );
};

export default ExampleRemotePage;
