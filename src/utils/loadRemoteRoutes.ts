import type { RouteConfig, RemoteRouteConfig } from '../types/routes';

/**
 * Type for a route loader function that remote apps should export
 */
export type RouteLoader = () => Promise<{ default: RouteConfig[] }>;

/**
 * Dynamically loads routes from a remote application and tags them with the app name
 * 
 * @param loader - A function that imports routes from a remote module
 * @param remoteAppName - The name of the remote app (must match vite.config.ts remotes)
 * @returns Promise that resolves to an array of route configurations with remote app info
 * 
 * @example
 * // In the super app:
 * const todoRoutes = await loadRemoteRoutes(() => import('todoApp/routes'), 'todoApp');
 * 
 * @example
 * // In the remote app (todoApp), export routes like this:
 * // src/routes.ts
 * export default [
 *   {
 *     path: '/todo',
 *     label: 'Todo List',
 *     icon: '✅',
 *     component: 'App', // Name of exposed component
 *     showInNav: true
 *   }
 * ];
 */
export const loadRemoteRoutes = async (
  loader: RouteLoader,
  remoteAppName: string
): Promise<RemoteRouteConfig[]> => {
  try {
    const module = await loader();
    const routes = module.default || [];
    // Add remote app name to each route
    return routes.map(route => ({
      ...route,
      remoteApp: remoteAppName,
    }));
  } catch (error) {
    console.warn(`Failed to load remote routes from ${remoteAppName}:`, error);
    return [];
  }
};

/**
 * Loads routes from multiple remote applications
 * 
 * @param loaders - Array of objects with loader function and app name
 * @returns Promise that resolves to a flattened array of all route configurations
 * 
 * @example
 * const allRoutes = await loadMultipleRemoteRoutes([
 *   { loader: () => import('todoApp/routes'), appName: 'todoApp' },
 *   { loader: () => import('shopApp/routes'), appName: 'shopApp' },
 * ]);
 */
export const loadMultipleRemoteRoutes = async (
  loaders: Array<{ loader: RouteLoader; appName: string }>
): Promise<RemoteRouteConfig[]> => {
  const routeArrays = await Promise.all(
    loaders.map(({ loader, appName }) => loadRemoteRoutes(loader, appName))
  );
  return routeArrays.flat();
};
