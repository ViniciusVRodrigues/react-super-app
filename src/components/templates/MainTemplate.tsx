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
  { to: '/todo', label: 'Todo List' },
  { to: '/edespensa', label: 'eDespensa' },
];

/**
 * MainTemplate - The main page layout template with navbar, content area, and footer
 */
const MainTemplate = ({ children, navItems = defaultNavItems }: MainTemplateProps) => {
  return (
    <div className="layout">
      <Navbar navItems={navItems} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainTemplate;
