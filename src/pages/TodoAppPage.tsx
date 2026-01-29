import { RemoteWrapper } from '../components';
import { createRemoteComponent } from '../utils/createRemoteComponent';
import './ExampleRemotePage.css';

// Create the lazy-loaded component for TodoApp
const TodoApp = createRemoteComponent(
  () => import('todoApp/HomePage')
);

/**
 * TodoAppPage - Página que carrega o módulo remoto TodoApp
 */
const TodoAppPage = () => {
  return (
    <div className="remote-page">
      <h1>✅ Todo List</h1>
      <p>
        Gerencie suas tarefas com o aplicativo Todo List.
      </p>
      
      <div className="demo-section">
        <RemoteWrapper 
          remoteComponent={TodoApp}
        />
      </div>
    </div>
  );
};

export default TodoAppPage;
