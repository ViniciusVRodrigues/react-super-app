import type { RouteConfig } from '../types/routes';

/**
 * Type for a route loader function that remote apps should export
 */
export type RouteLoader = () => Promise<{ default: RouteConfig[] }>;

/**
 * Dynamically loads routes from a remote application
 * 
 * @param loader - A function that imports routes from a remote module
 * @returns Promise that resolves to an array of route configurations
 * 
 * @example
 * // In the super app:
 * const todoRoutes = await loadRemoteRoutes(() => import('todoApp/routes'));
 * 
 * @example
 * // In the remote app (todoApp), export routes like this:
 * // src/routes.ts
 * export default [
 *   {
 *     path: '/todo',
 *     label: 'Todo List',
 *     icon: '✅',
 *     component: TodoApp,
 *     showInNav: true
 *   }
 * ];
 */
export const loadRemoteRoutes = async (
  loader: RouteLoader
): Promise<RouteConfig[]> => {
  try {
    const module = await loader();
    return module.default || [];
  } catch (error) {
    console.warn('Failed to load remote routes:', error);
    return [];
  }
};

/**
 * Loads routes from multiple remote applications
 * 
 * @param loaders - Array of route loader functions
 * @returns Promise that resolves to a flattened array of all route configurations
 * 
 * @example
 * const allRoutes = await loadMultipleRemoteRoutes([
 *   () => import('todoApp/routes'),
 *   () => import('shopApp/routes'),
 * ]);
 */
export const loadMultipleRemoteRoutes = async (
  loaders: RouteLoader[]
): Promise<RouteConfig[]> => {
  const routeArrays = await Promise.all(
    loaders.map(loader => loadRemoteRoutes(loader))
  );
  return routeArrays.flat();
};
