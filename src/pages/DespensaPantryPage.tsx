import { RemoteWrapper } from '../components';
import { createRemoteComponent } from '../utils/createRemoteComponent';
import './ExampleRemotePage.css';

// Create the lazy-loaded component for Pantry
const Pantry = createRemoteComponent(
  () => import('despensa_inteligente/Pantry')
);

/**
 * DespensaPantryPage - Página de Despensa da Despensa Inteligente
 */
const DespensaPantryPage = () => {
  return (
    <div className="remote-page">
      <h1>🏠 Despensa</h1>
      <p>
        Visualize e gerencie sua despensa.
      </p>
      
      <div className="demo-section">
        <RemoteWrapper 
          remoteComponent={Pantry}
        />
      </div>
    </div>
  );
};

export default DespensaPantryPage;
