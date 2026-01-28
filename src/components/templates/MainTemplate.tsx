import { Navbar, Footer } from '../organisms';
import type { RemoteRouteConfig } from '../../types/routes';
import './MainTemplate.css';

interface NavItem {
  to: string;
  label: string;
}

interface MainTemplateProps {
  children: React.ReactNode;
  navItems?: NavItem[];
  remoteRoutes?: RemoteRouteConfig[];
  isLoadingRoutes?: boolean;
}

const defaultNavItems: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/example', label: 'Exemplo' },
];

/**
 * MainTemplate - The main page layout template with navbar, content area, and footer
 * 
 * Now supports dynamic navigation items from remote routes.
 * If remoteRoutes are provided, they will be added to the navigation automatically.
 */
const MainTemplate = ({ 
  children, 
  navItems, 
  remoteRoutes = [], 
  isLoadingRoutes = false 
}: MainTemplateProps) => {
  // If custom navItems are provided, use them
  // Otherwise, combine default items with remote route items
  const finalNavItems = navItems || [
    ...defaultNavItems,
    ...remoteRoutes
      .filter(route => route.showInNav !== false)
      .map(route => ({
        to: route.path,
        label: route.icon ? `${route.icon} ${route.label}` : route.label,
      })),
  ];

  return (
    <div className="layout">
      <Navbar navItems={finalNavItems} isLoadingRoutes={isLoadingRoutes} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainTemplate;
