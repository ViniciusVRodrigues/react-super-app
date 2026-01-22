import RemoteWrapper from '../components/RemoteWrapper';
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
        <h2>Como usar:</h2>
        <p>
          Para conectar um módulo remoto real, configure-o no arquivo <code>vite.config.ts</code>:
        </p>
        <pre>
{`remotes: {
  remoteApp: 'http://localhost:3001/assets/remoteEntry.js',
}`}
        </pre>
        <p>
          Depois, crie o componente remoto e use o <code>RemoteWrapper</code>:
        </p>
        <pre>
{`// Fora do componente (no topo do arquivo)
const RemoteApp = createRemoteComponent(
  () => import('remoteApp/Component')
);

// No JSX
<RemoteWrapper remoteComponent={RemoteApp} />`}
        </pre>
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
            <div className="error-container">
              <h3>⚠️ Módulo não disponível</h3>
              <p>Este é um exemplo de como o Super App lida com erros de módulos remotos.</p>
              <p>O aplicativo continua funcionando normalmente!</p>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default ExampleRemotePage;
