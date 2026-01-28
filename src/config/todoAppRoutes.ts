import type { RouteConfig } from '../types/routes';

/**
 * Fallback route configuration for the todoApp remote
 * 
 * This app has only one screen, so it exports a single route
 * pointing to the 'App' component exposed via module federation.
 */
export const todoAppRoutes: RouteConfig[] = [
  {
    path: '/todo',
    label: 'Todo List',
    icon: '✅',
    component: 'App', // Name of the exposed component in module federation
    showInNav: true,
  },
];

export default todoAppRoutes;
