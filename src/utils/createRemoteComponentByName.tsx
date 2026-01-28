import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

type ModuleImporter = () => Promise<{ default: ComponentType<Record<string, unknown>> }>;

/**
 * Registry of component importers for each remote app.
 * 
 * Module Federation requires static imports at build time to properly
 * resolve remote modules. Dynamic imports with template literals don't work
 * because the federation plugin needs to know about imports ahead of time.
 * 
 * Add new components here as they are exposed from remote apps.
 */
const componentRegistry: Record<string, Record<string, ModuleImporter>> = {
  despensa_inteligente: {
    Dashboard: () => import('despensa_inteligente/Dashboard'),
    Products: () => import('despensa_inteligente/Products'),
    Pantry: () => import('despensa_inteligente/Pantry'),
    ShoppingList: () => import('despensa_inteligente/ShoppingList'),
  },
  todoApp: {
    HomePage: () => import('todoApp/HomePage'),
  },
};

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
    const remoteRegistry = componentRegistry[remoteAppName];
    const importer = remoteRegistry?.[componentName];

    if (!importer) {
      console.error(
        `Component "${componentName}" not found in registry for "${remoteAppName}". ` +
        `Available components: ${remoteRegistry ? Object.keys(remoteRegistry).join(', ') : 'none'}`
      );
      return Promise.resolve({
        default: () => (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>⚠️ Componente não registrado</h2>
            <p>O componente "{componentName}" não está registrado para "{remoteAppName}".</p>
            <p style={{ fontSize: '0.9rem', color: '#888' }}>
              Adicione o componente em componentRegistry no arquivo createRemoteComponentByName.tsx
            </p>
          </div>
        ),
      });
    }

    return importer()
      .then((module) => {
        // Handle both default and named exports
        return { default: module.default || (module as Record<string, ComponentType<Record<string, unknown>>>)[componentName] };
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
                <p style={{ fontSize: '0.8rem', color: '#666' }}>
                  Verifique se o app remoto está rodando e acessível.
                </p>
              </div>
            );
          },
        };
      });
  });
};
