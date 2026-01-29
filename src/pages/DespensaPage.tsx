import { RemoteWrapper } from '../components';
import { createRemoteComponent } from '../utils/createRemoteComponent';
import './ExampleRemotePage.css';

// Create the lazy-loaded components for Despensa Inteligente
const Dashboard = createRemoteComponent(
  () => import('despensa_inteligente/Dashboard')
);

/**
 * DespensaPage - Página que carrega o módulo remoto Despensa Inteligente (Dashboard)
 */
const DespensaPage = () => {
  return (
    <div className="remote-page">
      <h1>📊 Despensa Inteligente</h1>
      <p>
        Dashboard da Despensa Inteligente.
      </p>
      
      <div className="demo-section">
        <RemoteWrapper 
          remoteComponent={Dashboard}
        />
      </div>
    </div>
  );
};

export default DespensaPage;
