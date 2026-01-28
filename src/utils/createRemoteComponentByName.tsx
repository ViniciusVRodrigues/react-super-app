import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

/**
 * Creates a lazy-loaded component from a remote module by component name
 * 
 * @param remoteAppName - Name of the remote app (must match vite.config.ts remotes)
 * @param componentName - Name of the exposed component in the remote app
 * @returns Lazy-loaded React component
 * 
 * @example
 * const Dashboard = createRemoteComponentByName('despensa_inteligente', 'Dashboard');
 * const Products = createRemoteComponentByName('despensa_inteligente', 'Products');
 */
export const createRemoteComponentByName = (
  remoteAppName: string,
  componentName: string
): LazyExoticComponent<ComponentType<Record<string, unknown>>> => {
  return lazy(() => {
    // Dynamically import the component from the remote app
    // This uses the module federation configuration
    const modulePath = `${remoteAppName}/${componentName}`;
    
    return import(/* @vite-ignore */ modulePath)
      .then((module) => {
        // Handle both default and named exports
        return { default: module.default || module[componentName] };
      })
      .catch((error) => {
        console.error(`Failed to load component ${componentName} from ${remoteAppName}:`, error);
        // Return a fallback error component
        return {
          default: () => {
            return (
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>⚠️ Componente não disponível</h2>
                <p>Não foi possível carregar o componente: {componentName}</p>
                <p style={{ fontSize: '0.9rem', color: '#888' }}>
                  Remote: {remoteAppName}
                </p>
              </div>
            );
          },
        };
      });
  });
};
