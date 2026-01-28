import type { RouteLoader } from '../utils/loadRemoteRoutes';
import type { RouteConfig } from '../types/routes';

/**
 * Configuration for remote applications
 * 
 * Each entry represents a remote app that can export routes dynamically.
 * Add new remote apps here to automatically load their routes.
 */
export interface RemoteAppEntry {
  /**
   * Name of the remote app (for reference)
   */
  name: string;
  
  /**
   * Function to dynamically import routes from this remote app
   * Returns null if the remote app doesn't export routes
   */
  routeLoader: RouteLoader | null;
  
  /**
   * Fallback routes to use if the remote app doesn't export routes
   */
  fallbackRoutes?: RouteConfig[];
  
  /**
   * Whether this remote app is enabled
   */
  enabled: boolean;
}

/**
 * List of all remote applications configured in the super app
 * 
 * To add a new remote app:
 * 1. Add the remote in vite.config.ts
 * 2. Add the route declaration in remotes.d.ts
 * 3. Add an entry here with its route loader
 * 4. Optionally provide fallback routes if the remote doesn't export routes yet
 */
export const remoteApps: RemoteAppEntry[] = [
  {
    name: 'todoApp',
    // Try to load routes from the remote app first
    routeLoader: () => import('todoApp/routes').catch((error) => {
      // If routes export doesn't exist, use fallback
      console.info('todoApp does not export routes, using fallback configuration', error.message);
      return import('./todoAppRoutes').then(m => ({ default: m.default }));
    }),
    enabled: true,
  },
  {
    name: 'despensa_inteligente',
    // Try to load routes from the remote app first
    routeLoader: () => import('despensa_inteligente/routes').catch((error) => {
      // If routes export doesn't exist, use fallback
      console.info('despensa_inteligente does not export routes, using fallback configuration', error.message);
      return import('./despensaAppRoutes').then(m => ({ default: m.default }));
    }),
    enabled: true,
  },
  // Add more remote apps here as needed
  // {
  //   name: 'anotherApp',
  //   routeLoader: () => import('anotherApp/routes'),
  //   enabled: true,
  // },
];
