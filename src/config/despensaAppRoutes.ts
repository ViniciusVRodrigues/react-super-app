import type { RouteConfig } from '../types/routes';

/**
 * Fallback route configuration for the despensa_inteligente remote
 * 
 * This app has multiple screens, each exposed as a separate component
 * via module federation. The routes reference the component names.
 */
export const despensaAppRoutes: RouteConfig[] = [
  {
    path: '/edespensa',
    label: 'Dashboard',
    icon: '📊',
    component: 'Dashboard', // Name of the exposed component
    showInNav: true,
  },
  {
    path: '/edespensa/products',
    label: 'Produtos',
    icon: '📦',
    component: 'Products',
    showInNav: true,
  },
  {
    path: '/edespensa/pantry',
    label: 'Despensa',
    icon: '🏠',
    component: 'Pantry',
    showInNav: true,
  },
  {
    path: '/edespensa/shopping-list',
    label: 'Lista de Compras',
    icon: '🛒',
    component: 'ShoppingList',
    showInNav: true,
  },
];

export default despensaAppRoutes;
