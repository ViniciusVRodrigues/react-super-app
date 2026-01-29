import { Navbar, Footer } from '../organisms';
import './MainTemplate.css';

interface NavItem {
  to: string;
  label: string;
}

interface MainTemplateProps {
  children: React.ReactNode;
  navItems?: NavItem[];
}

const defaultNavItems: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/example', label: 'Exemplo' },
  { to: '/todo', label: '✅ Todo' },
  { to: '/despensa', label: '📊 Dashboard' },
  { to: '/despensa/products', label: '📦 Produtos' },
  { to: '/despensa/pantry', label: '🏠 Despensa' },
  { to: '/despensa/shopping-list', label: '🛒 Compras' },
];

/**
 * MainTemplate - Layout principal com navbar, conteúdo e footer
 */
const MainTemplate = ({ children, navItems }: MainTemplateProps) => {
  const finalNavItems = navItems || defaultNavItems;

  return (
    <div className="layout">
      <Navbar navItems={finalNavItems} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainTemplate;
