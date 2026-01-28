import type { ComponentType } from 'react';

/**
 * Interface for a route configuration
 */
export interface RouteConfig {
  /**
   * The path for the route (e.g., "/todo", "/products")
   */
  path: string;
  
  /**
   * The label to display in navigation
   */
  label: string;
  
  /**
   * Optional icon for the navigation item
   */
  icon?: string;
  
  /**
   * The React component to render for this route
   */
  component: ComponentType<Record<string, unknown>>;
  
  /**
   * Whether to show this route in the navigation menu
   * @default true
   */
  showInNav?: boolean;
}

/**
 * Interface for a remote app configuration that exports routes
 */
export interface RemoteAppConfig {
  /**
   * Name of the remote app (must match the name in vite.config.ts remotes)
   */
  name: string;
  
  /**
   * Routes exported by this remote app
   */
  routes: RouteConfig[];
}
