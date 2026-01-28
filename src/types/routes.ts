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
   * Name of the exposed component in module federation
   * For remote apps, this should match the key in the 'exposes' config
   * Example: 'App', 'Dashboard', 'Products'
   */
  component: string;
  
  /**
   * Whether to show this route in the navigation menu
   * @default true
   */
  showInNav?: boolean;
}

/**
 * Extended route config with remote app information
 * Used internally by the super app
 */
export interface RemoteRouteConfig extends RouteConfig {
  /**
   * The name of the remote app this route belongs to
   * Must match the name in vite.config.ts remotes
   */
  remoteApp: string;
}
