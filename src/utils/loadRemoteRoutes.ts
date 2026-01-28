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
    console.log(`🔄 Loading remote routes from: ${remoteAppName}`);
    const module = await loader();
    const routes = module.default || [];
    console.log(`✅ Successfully loaded ${routes.length} route(s) from ${remoteAppName}`);
    // Add remote app name to each route
    return routes.map(route => ({
      ...route,
      remoteApp: remoteAppName,
    }));
  } catch (error) {
    console.error(`❌ Failed to load remote routes from ${remoteAppName}`);
    console.group(`🔍 Diagnostic Information for ${remoteAppName}`);
    console.error('Error details:', error);
    
    // Provide helpful diagnostic information
    if (error instanceof Error) {
      if (error.message.includes('Failed to fetch')) {
        console.error('⚠️ Network Error: Could not fetch the remote module.');
        console.info('📝 Possible causes:');
        console.info('  1. Remote entry URL is incorrect');
        console.info('  2. Remote app is not deployed or not accessible');
        console.info('  3. CORS policy is blocking the request');
        console.info('  4. Network connectivity issues');
        console.info('\n💡 To fix:');
        console.info('  1. Check .env.production for remote URL configuration');
        console.info('  2. Verify the remote app is deployed and accessible');
        console.info('  3. Try accessing the remoteEntry.js URL directly in browser');
      } else if (error.message.includes('Shared module is not available')) {
        console.error('⚠️ Shared Module Error: Dependency version mismatch.');
        console.info('📝 Possible causes:');
        console.info('  1. React versions differ between host and remote');
        console.info('  2. Shared dependencies are not properly configured');
        console.info('\n💡 To fix:');
        console.info('  1. Ensure both apps use the same React version');
        console.info('  2. Check shared config in vite.config.ts');
      } else if (error.message.includes('Cannot find module')) {
        console.error('⚠️ Module Not Found: The remote app doesn\'t expose this module.');
        console.info('📝 Possible causes:');
        console.info('  1. Remote app doesn\'t export routes');
        console.info('  2. Module name doesn\'t match the exposed name');
        console.info('\n💡 To fix:');
        console.info(`  1. Check if ${remoteAppName} exposes './routes' in vite.config.ts`);
        console.info('  2. Fallback routes will be used if configured');
      }
    }
    
    console.info('\n📚 See TROUBLESHOOTING_REMOTES.md for detailed debugging steps');
    console.groupEnd();
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
