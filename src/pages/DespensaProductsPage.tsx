import { RemoteWrapper } from '../components';
import { createRemoteComponent } from '../utils/createRemoteComponent';
import './ExampleRemotePage.css';

// Create the lazy-loaded component for Produtos
const Products = createRemoteComponent(
  () => import('despensa_inteligente/Products')
);

/**
 * DespensaProductsPage - Página de Produtos da Despensa Inteligente
 */
const DespensaProductsPage = () => {
  return (
    <div className="remote-page">
      <h1>📦 Produtos</h1>
      <p>
        Gerencie os produtos da sua despensa.
      </p>
      
      <div className="demo-section">
        <RemoteWrapper 
          remoteComponent={Products}
        />
      </div>
    </div>
  );
};

export default DespensaProductsPage;
