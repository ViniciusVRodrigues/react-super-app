import { RemoteWrapper } from '../components';
import { createRemoteComponent } from '../utils/createRemoteComponent';
import './ExampleRemotePage.css';

// Create the lazy-loaded component for Shopping List
const ShoppingList = createRemoteComponent(
  () => import('despensa_inteligente/ShoppingList')
);

/**
 * DespensaShoppingListPage - Página de Lista de Compras da Despensa Inteligente
 */
const DespensaShoppingListPage = () => {
  return (
    <div className="remote-page">
      <h1>🛒 Lista de Compras</h1>
      <p>
        Gerencie sua lista de compras.
      </p>
      
      <div className="demo-section">
        <RemoteWrapper 
          remoteComponent={ShoppingList}
        />
      </div>
    </div>
  );
};

export default DespensaShoppingListPage;
