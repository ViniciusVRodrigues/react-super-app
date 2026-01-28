/* eslint-disable react-refresh/only-export-components */
import type { RouteConfig } from '../types/routes';
import { RemoteWrapper, ErrorMessage } from '../components';
import { createRemoteComponent } from '../utils/createRemoteComponent';

/**
 * Example route configurations for the despensa_inteligente remote
 * 
 * This demonstrates how a remote app would export its routes.
 * In a real scenario, the remote app would export this directly.
 * 
 * For now, we create it here as an example/fallback configuration.
 */

// Create the lazy-loaded component
const EDespensaRemote = createRemoteComponent(
  () => import('despensa_inteligente/App')
);

// Component wrapper for the eDespensa page
const EDespensaPage = () => {
  return (
    <div className="edespensa-page">
      <RemoteWrapper 
        remoteComponent={EDespensaRemote} 
        errorFallback={
          <ErrorMessage 
            title="⚠️ Módulo não disponível"
            message="O aplicativo eDespensa não está disponível no momento."
            details="Certifique-se de que o aplicativo remoto está rodando em http://localhost:3002"
          />
        } 
      />
    </div>
  );
};

export const despensaAppRoutes: RouteConfig[] = [
  {
    path: '/edespensa/*',
    label: 'eDespensa',
    icon: '🏪',
    component: EDespensaPage,
    showInNav: true,
  },
];

export default despensaAppRoutes;
