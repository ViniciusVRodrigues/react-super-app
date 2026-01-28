/* eslint-disable react-refresh/only-export-components */
import type { RouteConfig } from '../types/routes';
import { RemoteWrapper, ErrorMessage } from '../components';
import { createRemoteComponent } from '../utils/createRemoteComponent';

/**
 * Example route configurations for the todoApp remote
 * 
 * This demonstrates how a remote app would export its routes.
 * In a real scenario, the remote app (todoApp) would export this directly.
 * 
 * For now, we create it here as an example/fallback configuration.
 */

// Create the lazy-loaded component
const TodoListRemote = createRemoteComponent(
  () => import('todoApp/App')
);

// Component wrapper for the Todo List page
const TodoListPage = () => {
  return (
    <div className="todo-list-page">
      <RemoteWrapper 
        remoteComponent={TodoListRemote} 
        errorFallback={
          <ErrorMessage 
            title="⚠️ Módulo não disponível"
            message="O aplicativo Todo List não está disponível no momento."
            details="Certifique-se de que o aplicativo remoto está rodando em http://localhost:3001"
          />
        } 
      />
    </div>
  );
};

export const todoAppRoutes: RouteConfig[] = [
  {
    path: '/todo',
    label: 'Todo List',
    icon: '✅',
    component: TodoListPage,
    showInNav: true,
  },
];

export default todoAppRoutes;
