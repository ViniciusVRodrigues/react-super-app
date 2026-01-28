import { lazy, type ComponentType, type LazyExoticComponent } from 'react';

/**
 * Registry of all remote components with static imports.
 * 
 * Module Federation with Vite requires static imports at build time.
 * Dynamic imports with variable paths (like `import(${remoteApp}/${component})`) 
 * don't work because Vite/Rollup cannot statically analyze them.
 * 
 * To add a new remote component:
 * 1. Add the type declaration in src/remotes.d.ts
 * 2. Add the lazy component here with a static import
 * 3. Use the key format: "remoteAppName/ComponentName"
 */
const remoteComponentRegistry: Record<
  string,
  LazyExoticComponent<ComponentType<Record<string, unknown>>>
> = {
  // TodoApp components
  'todoApp/HomePage': lazy(() => import('todoApp/HomePage')),
  
  // Despensa Inteligente components
  'despensa_inteligente/Dashboard': lazy(() => import('despensa_inteligente/Dashboard')),
  'despensa_inteligente/Products': lazy(() => import('despensa_inteligente/Products')),
  'despensa_inteligente/Pantry': lazy(() => import('despensa_inteligente/Pantry')),
  'despensa_inteligente/ShoppingList': lazy(() => import('despensa_inteligente/ShoppingList')),
};

/**
 * Fallback component shown when a remote component is not found in the registry
 */
const createFallbackComponent = (
  remoteAppName: string,
  componentName: string
): ComponentType<Record<string, unknown>> => {
  const FallbackComponent = () => (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>⚠️ Componente não disponível</h2>
      <p>Não foi possível carregar o componente: {componentName}</p>
      <p style={{ fontSize: '0.9rem', color: '#888' }}>
        Remote: {remoteAppName}
      </p>
      <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '1rem' }}>
        Verifique se o componente está registrado em 
        <code style={{ marginLeft: '0.25rem' }}>src/utils/createRemoteComponentByName.tsx</code>
      </p>
    </div>
  );
  
  FallbackComponent.displayName = `FallbackComponent(${remoteAppName}/${componentName})`;
  
  return FallbackComponent;
};

/**
 * Gets a lazy-loaded component from a remote module by component name
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
  const key = `${remoteAppName}/${componentName}`;
  
  // Check if the component is registered
  if (key in remoteComponentRegistry) {
    return remoteComponentRegistry[key];
  }
  
  // Log warning and return fallback component
  console.warn(
    `[createRemoteComponentByName] Component "${componentName}" from "${remoteAppName}" ` +
    `is not registered. Add it to remoteComponentRegistry in src/utils/createRemoteComponentByName.tsx`
  );
  
  // Return a lazy component that resolves to the fallback
  return lazy(() => 
    Promise.resolve({ default: createFallbackComponent(remoteAppName, componentName) })
  );
};
